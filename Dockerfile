FROM node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock  next.config.js ./
RUN yarn install --frozen-lockfile
RUN ls -al 


FROM node:14-alpine AS builder
ENV API_HOSTNAME=neotechback
ENV API_PORT=3333
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/next.config.js ./
COPY . .
RUN yarn build

FROM node:14-alpine AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1
ENV API_HOSTNAME=neotechback
ENV API_PORT=3333
ARG PORT 3000

WORKDIR /app


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder  --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules


EXPOSE ${PORT}


CMD ["node_modules/.bin/next", "start"]