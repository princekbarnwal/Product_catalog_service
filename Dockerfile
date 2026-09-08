FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/server.js"]

# first we copy packages and install it then we copy other files due  to Docker Layer Caching so that if other codes will changes no need to install dependencies again install it only when there is a change in packages