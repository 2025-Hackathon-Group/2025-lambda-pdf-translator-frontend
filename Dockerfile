FROM node:22.16.0-bookworm AS builder

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
