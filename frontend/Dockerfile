FROM node:22-alpine

WORKDIR /app

ENV HOST=0.0.0.0

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY frontend/package.json ./frontend/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN corepack enable && corepack pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["corepack", "pnpm", "--filter", "chatbot-frontend", "start"]