FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

ENV NODE_ENV=production
ENV DATABASE_URL="file:/data/prod.db"

RUN mkdir -p /data

EXPOSE 3000

CMD ["sh", "scripts/start.sh"]
