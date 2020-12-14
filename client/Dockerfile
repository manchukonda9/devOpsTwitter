# FROM node:10.19.0

# # Create app directory
# WORKDIR /usr/src/app
# COPY package*.json ./


# RUN npm install --g cross-env

# RUN npm install

# RUN npm i is-empty

# # Bundle app source
# COPY . .

# EXPOSE 3000

# CMD [ "npm", "start" ]

FROM nginx:1.17.10-alpine

RUN apk add nano && apk add curl

COPY build /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY Nginx.conf /etc/nginx/conf.d

EXPOSE 80