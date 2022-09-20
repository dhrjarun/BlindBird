FROM node:16.15.0-alpine

WORKDIR /app
COPY config /app/config
COPY package.json /app/
COPY yarn.lock /app/
RUN  yarn install
COPY dist /app/dist

CMD [ "node", "dist/app.js" ]
USER node