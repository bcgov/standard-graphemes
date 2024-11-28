# Build stage
# -----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Pass the API base URL during build time
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Serve stage
# -----------
FROM nginxinc/nginx-unprivileged:alpine AS serve
WORKDIR /app

# Copy nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy built Vite files to nginx public web root folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
