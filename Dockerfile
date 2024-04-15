FROM node:14-alpine

ENV PROJECT_ENV production

# http-server 不变动也可以利用缓存
#RUN npm install -g http-server

WORKDIR /app

# 首次添加此两个文件，充分利用缓存
# 当这两个文件不发生变化时，下一步的 npm i 将利用缓存不会执行
COPY package*.json ./
RUN npm install --registry=https://registry.npmmirror.com

# 这是镜像缓存的关键部分
# 注意此时把该命令放在了添加 package.json 之后
COPY ./ .
RUN npm run build
EXPOSE 8081

CMD ["npm", "run", "serve"]
