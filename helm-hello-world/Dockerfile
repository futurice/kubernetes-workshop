FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm init -y && npm i express

RUN echo 'const app = require("express")(); app.get("/", (req, res) => { res.status(200).send("Hello World!"); }); app.listen(process.env.PORT);' > server.js

CMD [ "node", "server.js" ]
