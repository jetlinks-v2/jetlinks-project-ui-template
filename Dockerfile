# 使用Node.js LTS版本
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制包管理文件
COPY package*.json ./

# 安装依赖（包含开发依赖）, 使用淘宝镜像
RUN npm config set registry https://registry.npmmirror.com
RUN npm install pnpm -g
RUN pnpm install

# 复制项目文件
COPY . .

# 暴露端口
EXPOSE 3000

# 启动开发服务器
CMD ["pnpm", "run", "dev"]