FROM node:17-alpine3.12

WORKDIR /AutoMerge-releaseV2

COPY . .

RUN  npm install

EXPOSE 3000

CMD ["npm", "start"]
