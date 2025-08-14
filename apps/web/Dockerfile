FROM node:20-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm i --frozen-lockfile || true
EXPOSE 3000
CMD ["pnpm","--filter","@cbmce/web","dev"]
