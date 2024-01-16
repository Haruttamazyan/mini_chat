# Use an official Node runtime as a base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Expose the port that your app will run on
EXPOSE 3500

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3500

# Command to run your application
CMD ["npm", "start"]
