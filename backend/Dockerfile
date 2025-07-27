FROM node:20

RUN apt-get update \
  && apt-get install -y netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["sh", "/app/entrypoint.sh"]