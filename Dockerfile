# Use an official node image as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app/

# Install any needed packages
RUN npm install

# Build the app
RUN npm run build

# Install a simple web server
RUN npm install -g serve

# Make port 80 available to the world outside this container
EXPOSE 80

# Serve the app
CMD ["serve", "-s", "dist"]
