# Dockerfile
FROM node:18-alpine
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Next.js application for production
RUN npm run build
# Set the environment variable to run the Next.js application in production mode
ENV NEXT_PUBLIC_USERS_API=http://users-api:3001
ENV NEXT_PUBLIC_FIELDS_API=http://fields-api:3002
ENV NEXT_PUBLIC_MATCHES_API=http://matches-api:3003

# Expose the port that the application will run on
EXPOSE 80

# Start the application
CMD ["npm", "start"]