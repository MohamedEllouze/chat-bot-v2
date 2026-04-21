FROM node:22-alpine

WORKDIR /app

ENV HOST=0.0.0.0

COPY package.json package-lock.json ./

RUN npm install --include=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]