FROM node:22-alpine AS base

# Build stage
# -----------
FROM base AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
# ----------------
FROM base AS serve
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY package.json package-lock.json ./
RUN npm install --omit=dev
EXPOSE 3000
CMD ["node", "dist/index.js"]
