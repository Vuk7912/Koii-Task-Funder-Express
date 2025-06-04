const express = require('express');
const request = require('supertest');
const crypto = require('crypto');

// Mock the external dependencies
jest.mock('@_koii/create-task-cli', () => {
  return {
    FundTask: jest.fn().mockResolvedValue(true),
    KPLEstablishConnection: jest.fn().mockResolvedValue(true),
    KPLFundTask: jest.fn().mockResolvedValue(true),
    getTaskStateInfo: jest.fn().mockResolvedValue({
      stake_pot_account: 'mockStakePotAccount',
      token_type: null
    }),
    establishConnection: jest.fn().mockResolvedValue(true),
    checkProgram: jest.fn().mockResolvedValue(true),
    KPLCheckProgram: jest.fn().mockResolvedValue(true)
  };
});

jest.mock('@_koii/web3.js', () => {
  return {
    PublicKey: jest.fn().mockImplementation((key) => ({
      toString: () => key
    })),
    Connection: jest.fn().mockImplementation(() => ({
      // Mock connection methods if needed
    })),
    Keypair: {
      fromSecretKey: jest.fn().mockReturnValue({
        publicKey: 'mockPublicKey',
        secretKey: new Uint8Array([1,2,3,4])
      })
    }
  };
});

jest.mock('axios', () => {
  return {
    post: jest.fn().mockResolvedValue({})
  };
});

// Import the app after mocking dependencies
const app = require('./index');

describe('Task Funding Service', () => {
  let server;

  beforeAll(() => {
    // Set up environment variables for testing
    process.env.SIGNING_SECRET = 'test_secret';
    process.env.funder_keypair = JSON.stringify([1,2,3,4]); // Mock keypair
  });

  beforeEach(() => {
    server = app.listen(0); // Use a random available port
  });

  afterEach(() => {
    server.close();
    jest.clearAllMocks();
  });

  function createSlackSignature(body, secret, timestamp) {
    const sigBasestring = `v0:${timestamp}:${body}`;
    const hmac = crypto.createHmac('sha256', secret);
    return 'v0=' + hmac.update(sigBasestring).digest('hex');
  }

  it('should reject requests without valid Slack signature', async () => {
    const body = 'text=fund+task123+100&user_id=U06NM9A2VC1&response_url=http://example.com';
    const timestamp = Math.floor(Date.now() / 1000);
    
    const response = await request(server)
      .post('/fundtask')
      .set('x-slack-signature', 'invalid_signature')
      .set('x-slack-request-timestamp', timestamp)
      .send(body);
    
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Invalid request signature');
  }, 10000);

  it('should reject requests from unauthorized users', async () => {
    const body = 'text=fund+task123+100&user_id=UNAUTHORIZED_USER&response_url=http://example.com';
    const timestamp = Math.floor(Date.now() / 1000);
    
    const signature = createSlackSignature(body, process.env.SIGNING_SECRET, timestamp);
    
    const response = await request(server)
      .post('/fundtask')
      .set('x-slack-signature', signature)
      .set('x-slack-request-timestamp', timestamp)
      .send(body);
    
    expect(response.statusCode).toBe(403);
  }, 10000);

  it('should successfully fund a task for authorized user', async () => {
    const body = 'text=task123+100&user_id=U06NM9A2VC1&response_url=http://example.com';
    const timestamp = Math.floor(Date.now() / 1000);
    
    const signature = createSlackSignature(body, process.env.SIGNING_SECRET, timestamp);
    
    const response = await request(server)
      .post('/fundtask')
      .set('x-slack-signature', signature)
      .set('x-slack-request-timestamp', timestamp)
      .send(body);
    
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Task funded successfully');
  }, 10000);

  it('should handle invalid request body gracefully', async () => {
    const body = 'invalid_body';
    const timestamp = Math.floor(Date.now() / 1000);
    
    const signature = createSlackSignature(body, process.env.SIGNING_SECRET, timestamp);
    
    const response = await request(server)
      .post('/fundtask')
      .set('x-slack-signature', signature)
      .set('x-slack-request-timestamp', timestamp)
      .send(body);
    
    expect(response.statusCode).toBe(500);
  }, 10000);
});