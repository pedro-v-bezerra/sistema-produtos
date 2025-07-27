#!/bin/sh

echo "Aguardando MySQL subir..."
while ! nc -z mysql 3306; do
  sleep 1
done

echo "MySQL disponível. Rodando migrations..."
npx sequelize-cli db:migrate

echo "Iniciando a API..."
npm start