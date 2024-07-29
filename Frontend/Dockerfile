#docker build -t dawa_ws_image:latest .

FROM node:lts-bullseye as build
WORKDIR /app/app_web2p
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000

CMD ["npm","start"]