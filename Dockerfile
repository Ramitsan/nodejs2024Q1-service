FROM node:20-alpine As development

# Create app directory
WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./
COPY  package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY . .

# Run the build command which creates the production bundle
RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start:dev"]