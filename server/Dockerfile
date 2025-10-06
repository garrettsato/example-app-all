FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8090
RUN npm run build
CMD ["node", "dist/server.js"]