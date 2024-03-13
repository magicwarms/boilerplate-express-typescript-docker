FROM node:18.18-alpine
# Set the working directory in the container
WORKDIR /app
# Only copy package* before installing to make better use of cache
# COPY package*.json .
# Copy everything
COPY . .
# Upgrade npm to the latest version globally
RUN npm install -g npm@latest
# Install project dependencies
RUN npm install
# Run prisma migrate to apply database migrations and generate prisma client
RUN npx prisma generate
# Default command to run when the container starts in dev mode
CMD npm run development:start