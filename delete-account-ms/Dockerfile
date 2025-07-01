FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY app.js .
COPY swagger.js .
COPY config ./config
COPY controllers ./controllers
COPY middlewares ./middlewares
COPY routes ./routes

EXPOSE 3008

CMD ["node", "app.js"]