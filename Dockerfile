# Building layer
FROM node:16-alpine as development

WORKDIR /app/dev

# Create a group and user
RUN addgroup -g 1410 appgroup

RUN adduser -D -u 1410 dev -G appgroup

RUN chown -R dev:appgroup /app/dev/

USER dev


# Copy configuration files
COPY tsconfig*.json ./
COPY package*.json ./

# Here Prisma folder to the container
COPY prisma ./prisma/

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

# Copy application sources (.ts, .tsx, js)
COPY src/ src/

# Build application (produces dist/ folder)
RUN npm run build

# Runtime (production) layer
FROM node:16-alpine as production

WORKDIR /app/prod/

# Create a group and user
RUN addgroup -g 1410 appgroup

RUN adduser -D -u 1410 prod -G appgroup

RUN chown -R prod:appgroup /app/prod/

USER prod

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}


# Copy dependencies files
COPY package*.json ./

# Here Prisma folder to the container
COPY prisma ./prisma/

# Install runtime dependecies (without dev/test dependecies)
RUN npm ci --production

# Copy production build
COPY --from=development /app/dev/dist/ ./dist/

# Expose application port
EXPOSE 3000

# Start application
CMD [ "node", "dist/main.js" ]