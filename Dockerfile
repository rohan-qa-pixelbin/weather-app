# Step 1: Build React App
# Use the official Node.js image to build the React app
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Create NGINX Server to Serve React App
# Use the official NGINX image to serve the React app
FROM nginx:alpine

# Copy the build output to replace the default NGINX HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access the app
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
