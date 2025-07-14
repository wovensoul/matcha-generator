# Use official Node.js Alpine image for small size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port Next.js uses by default
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
