# Simple dockerfile that builds the frontend and serves with Caddy
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy frontend package files
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy frontend source and build
COPY . .

CMD ["npm", "run", "dev"]
