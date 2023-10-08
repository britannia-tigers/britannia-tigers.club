FROM node:18.18.0
COPY . /app

ADD ./package.json /tmp/package.json
WORKDIR /tmp
RUN pwd
RUN npm cache verify
RUN npm install webpack -g
RUN npm install

RUN pwd
RUN yes | cp -rf /tmp/node_modules /app/

WORKDIR /app

ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]
