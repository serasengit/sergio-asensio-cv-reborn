
# ---- Base Node ----
FROM node:20-slim AS base
# Set working directory
RUN mkdir -p /app
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies
# Copy configs to /app folder
COPY package.json package-lock.json eslint.config.js tsconfig.json angular.json /app/
RUN npm ci


# ---- Unit tests ----
# Run linters, setup and tests
FROM dependencies AS integration-tests
RUN apt-get update && apt-get install -y --no-install-recommends chromium && rm -rf /var/lib/apt/lists/*
ENV CHROME_BIN=/usr/bin/chromium
# Clean cached node_modules
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . /app
# Execute  eslint
RUN  npm run lint
# Execute unit tests
CMD [ "npm", "run", "test:coverage" ]


# ---- Release ----
FROM dependencies AS release
# Copy files from local machine to virtual directory in docker image
COPY . /app
# Default build configuration.
ARG CONFIGURATION=prod
RUN echo "Environment: ${CONFIGURATION}"
RUN ["sh", "-c", "npm run build -- --configuration ${CONFIGURATION}"]

# ---- Nginx image ----
FROM nginx:stable-alpine AS nginx
# Copy nginx conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
# Copy artifact build from the 'build environment'
COPY --from=release /app/dist/sergio-asensio-cv/browser /usr/share/nginx/html
# Run
CMD ["nginx", "-g", "daemon off;"]
