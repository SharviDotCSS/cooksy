# Frontend Dockerfile - Multi-stage build
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and env file
COPY . .

# Build the application (Vite will use VITE_* env vars if available)
ARG VITE_BASE_ROUTE=/cooksy
ARG VITE_API_BASE_URL=http://localhost:3000
ENV VITE_BASE_ROUTE=$VITE_BASE_ROUTE
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration for SPA routing with base path
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location /cooksy { \
        alias /usr/share/nginx/html; \
        try_files $uri $uri/ /cooksy/index.html; \
    } \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

