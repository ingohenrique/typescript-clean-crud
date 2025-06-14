FROM oven/bun:1.2.16

RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN bun --version

COPY package.json ./
COPY bun.lock ./

RUN ls -la
RUN cat package.json

RUN bun pm cache rm

RUN bun install --verbose --no-progress

COPY prisma ./prisma

COPY src ./src
COPY tsconfig.json ./

RUN bunx prisma generate

EXPOSE 3000
ENV NODE_ENV=production

CMD ["bun", "run", "src/main/index.ts"]