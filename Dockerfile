FROM node:18-alpine

# Update apk packages to reduce vulnerabilities
RUN apk update && apk upgrade --no-cache


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


EXPOSE 3000


CMD ["npm", "run", "start:prod"]

