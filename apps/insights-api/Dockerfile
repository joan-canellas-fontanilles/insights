FROM joancanellasfontanilles/nx-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npx nx build insights-api ${BUILD_FLAG}

FROM joancanellasfontanilles/nx-base

WORKDIR /app
COPY --from=builder /app/builder ./
ENV NODE_ENV=$NODE_ENV

CMD ["node", "./dist/apps/insights-api/main.js"]
