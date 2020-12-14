FROM node:10.19.0


# Create app directory

WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied

COPY package*.json ./

# Bundle app source

COPY . .

# Install app dependencies

RUN npm install

RUN npm install bad-words



EXPOSE 5000

CMD [ "node", "server.js" ]