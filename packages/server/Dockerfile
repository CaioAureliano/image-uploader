FROM node:16

WORKDIR /server

COPY package.json ./

RUN yarn install --production=true --fronzen-lockfile

COPY ./build .env .

EXPOSE ${PORT}

CMD ["node", "./src/server"]
