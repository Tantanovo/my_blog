FROM node:20-alpine

WORKDIR /app

# 先复制 prisma，避免 postinstall 里 prisma generate 找不到 schema
COPY package.json package-lock.json .npmrc ./
COPY prisma ./prisma

ENV DATABASE_URL="file:/data/prod.db"
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

ENV NODE_ENV=production

RUN mkdir -p /data

EXPOSE 3000

CMD ["sh", "scripts/start.sh"]
