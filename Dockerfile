FROM node:22.16.0-bookworm AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies in the container (gets Linux binaries)
RUN npm ci --include=dev


EXPOSE 5173

CMD ["npm", "run", "dev"]