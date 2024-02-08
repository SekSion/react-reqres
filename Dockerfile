# Use the official Node.js 14 image as base
FROM node:20

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build your Vite project
RUN npm run build

# Install serve package globally
RUN npm install -g serve

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build"]
