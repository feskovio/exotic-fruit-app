FROM node:12.18.3
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
RUN npm run build
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]
