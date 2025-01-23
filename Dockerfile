FROM node:latest

# Create app directory
WORKDIR /usr/app

COPY yarn.lock package.json ./
RUN yarn global add @nestjs/cli
RUN yarn install
COPY . .
EXPOSE ${APP_SERVER_PORT}
CMD ["yarn", "start:dev"]
