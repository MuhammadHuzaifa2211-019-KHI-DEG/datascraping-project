# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilizes layer caching for faster builds
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining files
COPY . .

# Build react app
RUN npm run build

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
