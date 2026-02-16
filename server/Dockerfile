FROM node:20-alpine

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Создаем директории для загрузок
RUN mkdir -p uploads/flowers uploads/map

# Открываем порт
EXPOSE 4000

# Запускаем приложение
CMD ["npm", "start"]
