FROM node:12.18.3
WORKDIR /app
COPY . .
RUN ls
RUN npm install --production
RUN npm run build
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]
