### Dockerfile in docker-vue-test
# 指定 Node.js 版本並建立需要的執行環境
FROM node:16-alpine as build-stage

#執行指定命令，於根目錄建立資料夾 
#WORKDIR指令為Dockerfile中設置工作目錄，之後的指令都在此工作目錄上運行。
WORKDIR /src/app
#複製本地端 (為 Dockerfile 所在路徑) 的所有檔案到容器中的指定路徑
COPY package*.json ./
#使用 npm 執行 install 下載網頁相關的模組
RUN npm install

#目前本機所在目錄的「所有」檔案複製到容器的 WORKDIR 指定路徑下。	
COPY . .
#使用 npm 執行 build 指令來編譯網頁程式碼；
RUN npm run build
#RUN npm run serve


# 使用 NGINX image
FROM nginx
# 首先删除 nginx default.conf 文件
WORKDIR /src/app
# 首先删除 nginx default.conf 文件
RUN rm /etc/nginx/conf.d/default.conf

# 用本地的 default.conf 替换 nginx 镜像的默认配置
ADD default.conf /etc/nginx/conf.d/
COPY --from=build-stage /src/app/dist /usr/share/nginx/html

EXPOSE 8081 

