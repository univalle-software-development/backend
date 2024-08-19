FROM node:lts-bullseye

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV APPPATH /app/backend

WORKDIR $APPPATH
RUN node -v
RUN npm -v
RUN chown -R node:node /usr/local/lib/node_modules
RUN chown -R node:node /usr/local/bin
RUN chown -R node:node $APPPATH
USER node
EXPOSE 3000
RUN npm init -y 
RUN npm install express --save
RUN npm install -g nodemon
COPY . $APPPATH

CMD ["nodemon", "server.js"]

