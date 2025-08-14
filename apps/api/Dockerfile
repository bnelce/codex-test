FROM node:20-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm i --frozen-lockfile || true
EXPOSE 3333
CMD ["pnpm","--filter","@cbmce/api","dev"]
