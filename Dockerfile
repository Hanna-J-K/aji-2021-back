FROM node:14

WORKDIR /usr/src/app/back

COPY package.json /usr/src/app/back
COPY yarn.lock /usr/src/app/back

RUN yarn install

COPY . .

EXPOSE 4000

CMD yarn dev