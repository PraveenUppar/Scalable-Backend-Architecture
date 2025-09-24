FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 5000

CMD ["npm", "start"]
