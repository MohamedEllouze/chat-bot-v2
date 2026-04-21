FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY backend/package.json ./backend/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN corepack enable && corepack pnpm install --frozen-lockfile

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["corepack", "pnpm", "--filter", "chatbot-backend", "run", "dev"]