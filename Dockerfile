FROM node:lts-bullseye

ARG NODE_ENV=development
ARG PORT=3000
ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}
ENV APPPATH /app/backend

WORKDIR $APPPATH
RUN node -v
RUN npm -v
COPY . $APPPATH
RUN chown -R node:node /usr/local/lib/node_modules
RUN chown -R node:node /usr/local/bin
RUN chown -R node:node $APPPATH
USER node
RUN npm i -g nodemon
RUN npm i express --save
EXPOSE 3000
CMD ["nodemon", "server.js"]

