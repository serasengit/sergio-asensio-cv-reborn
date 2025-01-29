
# ---- Base Node ----
FROM node:alpine as base
# Set working directory
RUN mkdir -p /app
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies
# Copy configs to /app folder
COPY ["package.json", "package-lock.json*",".eslintrc.json",".eslintignore","tsconfig.json","angular.json", "/app/"]

# ---- Unit tests ----
# Run linters, setup and tests
FROM dependencies AS integration-tests
RUN apk add chromium
# Clean cached node_modules
RUN npm cache clean --force
# Install ALL node_modules, including 'devDependencies'
RUN npm install
# Copy files from local machine to virtual directory in docker image
COPY . /app
# Execute  eslint
RUN  npm run lint
# Execute unit tests
CMD [ "npm", "run", "test:coverage" ]


# ---- Release ----
FROM base AS release
# Copy production node_modules (excepting eslint configuration files)
COPY ["package.json", "package-lock.json*","tsconfig.json","angular.json", "/app/"] --from=dependencies
# Clean cached node_modules
RUN npm cache clean --force
# Install app dependencies
RUN npm ci --only=production
# Copy files from local machine to virtual directory in docker image
COPY . /app
# Default build configuration.
ARG CONFIGURATION=production
RUN echo "Environment: ${CONFIGURATION}"
RUN ["sh", "-c", "npm run build -- --c ${CONFIGURATION}"]

# ---- Nginx image ----
FROM nginxinc/nginx-unprivileged as nginx
# Copy nginx conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
# Copy artifact build from the 'build environment'
COPY --from=release /app/dist/sergio-asensio-cv-app /usr/share/nginx/html
# Run
CMD ["nginx", "-g", "daemon off;"]