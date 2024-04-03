FROM node:20

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]