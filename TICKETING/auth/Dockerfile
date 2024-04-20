FROM node:14-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install --omit=dev
COPY ./ ./

# Default command
CMD ["npm", "start"]