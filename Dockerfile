# 使用 Node.js 官方镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有的话）
COPY package*.json ./

# 安装项目依赖
RUN npm install --production

# 复制项目代码到容器中
COPY . .

# 暴露服务端口
EXPOSE 3000

# 启动服务器
CMD ["node", "index.js"]
