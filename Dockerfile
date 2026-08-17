# syntax=docker/dockerfile:1

FROM oven/bun:1.3.14-slim AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# bun installs, node builds: bun 1.3.14 segfaults in next's TypeScript pass
# inside this image (exit 133, SIGTRAP). Node also matches the runner below.
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# lib/projects.ts throws without a token: the pinned-repo GraphQL query runs
# during the static prerender. Mounted as a BuildKit secret rather than an ARG
# so it never lands in an image layer or in `docker history`.
RUN --mount=type=secret,id=GITHUB_TOKEN \
    GITHUB_TOKEN="$(cat /run/secrets/GITHUB_TOKEN)" \
    node node_modules/next/dist/bin/next build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
# /feed.xml renders on demand and reads content/posts via process.cwd(), so the
# posts must exist at runtime; Next's file tracing does not pick up that path.
COPY --from=builder /app/content ./content
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
