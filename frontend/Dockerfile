

FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that your app will run on
EXPOSE 3000

# Set environment variables
ENV REACT_APP_SOCKET_URL=http://localhost:3500

# Command to run your application
CMD ["npm", "start"]