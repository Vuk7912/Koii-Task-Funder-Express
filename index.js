const express = require('express');
const { FundTask, KPLEstablishConnection, KPLFundTask, getTaskStateInfo, KPLCheckProgram } = require('@_koii/create-task-cli');
const { establishConnection, checkProgram } = require('@_koii/create-task-cli');
const {PublicKey, Connection,Keypair} = require('@_koii/web3.js');
const crypto = require('crypto');
const { parse } = require('path');
const axios = require('axios');
const app = express();
const port = 3000;
const SIGNING_SECRET = process.env.SIGNING_SECRET
const funder_keypair = process.env.funder_keypair
const user_id_list = ['U06NM9A2VC1', 'U02QTSK9R3N', 'U02QNL3PPFF']
app.use(express.raw({ type: 'application/x-www-form-urlencoded' }));
function verifySlackRequest(req) {
    const slackSignature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    const fiveMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 5);
    
    // Prevent replay attacks by checking timestamp
    if (timestamp < fiveMinutesAgo) {
        return false; // Request is too old
    }
    
    const sigBasestring = `v0:${timestamp}:${req.body.toString()}`;
    const hmac = crypto.createHmac('sha256', SIGNING_SECRET);
    const mySignature = 'v0=' + hmac.update(sigBasestring).digest('hex');

    // Constant time comparison to prevent timing attacks
    return crypto.timingSafeEqual(Buffer.from(mySignature, 'utf8'), Buffer.from(slackSignature, 'utf8'));
}

// Route to handle funding task
app.post('/fundtask', async (req, res) => {

    if (!verifySlackRequest(req)) {
        return res.status(400).send('Invalid request signature');
    }
    
    // Required 
    res.send('Request received and verified integrity.');

    const rawBody = req.body.toString('utf8');
    console.log('Raw Body:', rawBody);

    const bodyParams = new URLSearchParams(rawBody);
    const parsedBody = Object.fromEntries(bodyParams.entries());
    console.log('Parsed Body:', parsedBody);
    const text = parsedBody.text;
    const response_url = parsedBody.response_url;
    const user_id = parsedBody.user_id; 
    if (!user_id || !user_id_list.includes(user_id)) {
        await axios.post(response_url, {
            response_type: "in_channel",
            text: 'Sorry, please tag <@U06NM9A2VC1> to add you to the list! '
        })
    }
    
    let parts = text.split(' ').filter(part => part.trim() !== '');
    let TASK_ID = parts[0].trim();
    let AMOUNT = parts[1].trim();
    try{
        await generic_fund_task(TASK_ID, AMOUNT)
        await axios.post(response_url, {
            response_type: "in_channel",
            text: `Congrats! <@${user_id}> You funded ${AMOUNT} to task ${TASK_ID} successfully. `
        })
    }catch(e){
        await axios.post(response_url, {
            response_type: "in_channel",
            text: `Failed to fund ${AMOUNT} to ${TASK_ID}. ${e}`
        })
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});


async function generic_fund_task(TASK_ID, AMOUNT){
    const connection = new Connection("https://testnet.koii.network", "confirmed");

    const taskStateJSON = await getTaskStateInfo(
        connection,
        TASK_ID,
      );
    const stakePotAccount = new PublicKey(taskStateJSON.stake_pot_account, connection);
    if (taskStateJSON.token_type) {
        const mint_uint8 = Uint8Array.from(taskStateJSON.token_type);

        // Create the PublicKey
        const mint_publicKey = new PublicKey(mint_uint8);
        await fund_a_KPL_task(TASK_ID, AMOUNT, stakePotAccount, connection, mint_publicKey)
        
    }else{

        await fund_a_task(TASK_ID, AMOUNT, stakePotAccount, connection)
   
    }
}
async function fund_a_task(TASK_ID, AMOUNT, stakePotAccount,connection){
    console.log("Start Funding:");
    console.log("Funding task with Id: ", TASK_ID);
    console.log("Funding amount: ", AMOUNT);
    const payerKeypairString = process.env.funder_keypair;
    // Parse the JSON string into an array
    const payerKeypairArray = JSON.parse(payerKeypairString);
    // Convert the array to a Uint8Array
    const payerWallet = Uint8Array.from(payerKeypairArray);
    const payerKeypair = Keypair.fromSecretKey(payerWallet);
    const taskStateInfoAddress = new PublicKey(TASK_ID);
   
    const amount = parseInt(AMOUNT);
    
    // Create-task-cli package setup
    await establishConnection(connection);
    await checkProgram();
    await FundTask(payerKeypair,taskStateInfoAddress,stakePotAccount, amount);
}

async function fund_a_KPL_task(TASK_ID, AMOUNT, stakePotAccount,connection, mint_publicKey){
    console.log("Start Funding:");
    console.log("Funding task with Id: ", TASK_ID);
    console.log("Funding amount: ", AMOUNT);
    const payerKeypairString = funder_keypair
    // Parse the JSON string into an array
    const payerKeypairArray = JSON.parse(payerKeypairString);
    // Convert the array to a Uint8Array
    const payerWallet = Uint8Array.from(payerKeypairArray);
    const payerKeypair = Keypair.fromSecretKey(payerWallet);
    const taskStateInfoAddress = new PublicKey(TASK_ID);
    const amount = parseInt(AMOUNT);
    // Create-task-cli package setup
    await KPLEstablishConnection(connection);
    await KPLCheckProgram(); 
    await KPLFundTask(payerKeypair,taskStateInfoAddress, stakePotAccount, amount, mint_publicKey);
}
