FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --include=dev

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "run", "dev"]