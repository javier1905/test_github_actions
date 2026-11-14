ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine AS builder

# RUN apk upgrade --no-cache
# ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
# RUN corepack enable

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm@$(node -p "require('./package.json').packageManager.split('@')[1]")

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build:standalone
RUN cp -r public .next/standalone && cp -r .next/static .next/standalone/.next
RUN tar -czf app.tar.gz -C .next/standalone .

FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /app

COPY --from=builder app/app.tar.gz .
RUN tar -xzf app.tar.gz && rm app.tar.gz

EXPOSE 3000

USER node

CMD ["node", "server.js"]