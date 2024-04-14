# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /client

# Installing dependencies
COPY ./package*.json /client

RUN npm install --force

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["npm","run","dev"]