FROM node:latest

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

RUN npx prisma generate

EXPOSE ${PORT}

CMD ["npm", "run", "start"]