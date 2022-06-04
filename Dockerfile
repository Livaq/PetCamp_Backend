FROM node:14-alpine
RUN mkdir -p /pet-camp
WORKDIR /pet-camp/
COPY package*.json /pet-camp/
RUN npm i
COPY . /pet-camp/
CMD ["node", "./src/app.js"]

