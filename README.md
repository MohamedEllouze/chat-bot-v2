# Chatbot

Fullstack support chatbot MVP built as a pnpm monorepo with shared TypeScript contracts.

## Tech Stack

- Backend: Node.js, Express, MongoDB
- Frontend: React, TypeScript, MUI, Axios
- Shared package: `packages/shared`

## Project Structure

- `backend/` - API server and message processing logic
- `frontend/` - Chat UI
- `packages/shared/` - Shared types and contracts

## Prerequisites

- Node.js 22+
- Corepack enabled
- pnpm 9+
- MongoDB connection string

If `pnpm` is not available on your machine, enable Corepack first:

```bash
corepack enable
```

## Environment Setup

Create a root `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Set your MongoDB connection string in `.env`:

```bash
PORT=3001
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

## Install Dependencies

Install everything from the repository root:

```bash
corepack pnpm install
```

## Run Locally

### Option 1: Docker Compose

Start both services with Docker:

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Option 2: Local Development

Run the backend in one terminal:

```bash
corepack pnpm --filter chatbot-backend run dev
```

Run the frontend in another terminal:

```bash
corepack pnpm --filter chatbot-frontend start
```

## Build

Build all workspace packages:

```bash
corepack pnpm build
```

You can also build each package individually:

```bash
corepack pnpm build:shared
corepack pnpm build:backend
corepack pnpm build:frontend
```

## Notes

- The frontend uses Axios for API calls.
- Shared request/response types live in `packages/shared`.
- The backend persists message history in MongoDB.