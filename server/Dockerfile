# https://github.com/vguleaev/React-Express-Mongo-Docker-tutorial/tree/master/react-express-mongo-app
# https://finnian.io/blog/rapid-development-with-node-js-and-docker/
# https://github.com/joshdcuneo/mern-docker-starter

FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 5000
CMD [ "npm", "start" ]