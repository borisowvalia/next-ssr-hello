## Smoke fixture — real Next.js standalone build.
##
## Multi-stage:
##   1. install deps + `next build` to produce `.next/standalone` and `.next/static`
##   2. slim runtime image with just `server.js`, static assets, and `public/`
##
## In production the Builder generates a similar Dockerfile from
## runtime/templates/Dockerfile.ssr_next; this fixture lets us exercise the
## full Next.js cold-start path locally without going through the Builder.
FROM node:20-slim AS build
WORKDIR /app
COPY package.json ./
# `npm install` (not `ci`) — we don't ship a lockfile for the fixture so
# minor patch versions can drift; that's fine for a smoke test.
RUN npm install --no-audit --no-fund
COPY next.config.js ./
COPY pages ./pages
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

ENV PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]
