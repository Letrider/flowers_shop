# Инструкция по деплою проекта Долина Роз 

## Вариант 1: Деплой на российские площадки (Рекомендуется для РФ)

### Frontend на REG.RU

REG.RU предлагает статический хостинг для фронтенда.

1. **Сборка проекта:**
   ```bash
   # В корне проекта
   npm install
   npm run build
   ```
   Это создаст папку `dist` с готовым приложением.

2. **Загрузка на REG.RU:**
   - Войдите в панель управления REG.RU
   - Перейдите в раздел "Хостинг" → "Файловый менеджер"
   - Загрузите содержимое папки `dist/*` в корневую директорию сайта
   - Либо используйте FTP загрузку

3. **Настройка .htaccess** (для SPA):
   Создайте файл `.htaccess` в корне сайта:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. **Переменные окружения:**
   Перед сборкой создайте `.env`:
   ```
   VITE_API_URL=https://ваш-бэкенд.timeweb.cloud
   ```
   Затем пересоберите проект (`npm run build`)

### Backend - Варианты для России

#### Вариант A: Timeweb Cloud (Рекомендуется)

**Timeweb** - надежный российский хостер с Node.js хостингом.

1. **Регистрация:**
   - Зарегистрируйтесь на [timeweb.cloud](https://timeweb.cloud)
   - Выберите тариф "Cloud VPS" (от 199₽/мес) или "Виртуальный хостинг Node.js"

2. **При выборе VPS:**
   ```bash
   # Подключитесь по SSH
   ssh root@ваш_ip
   
   # Установите Node.js 20.x
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Установите PM2
   sudo npm install -g pm2
   
   # Клонируйте проект
   git clone https://github.com/ваш-username/flowers_shop.git
   cd flowers_shop/server
   
   # Установите зависимости
   npm install
   
   # Создайте .env
   nano .env
   ```
   
   Содержимое `.env`:
   ```
   PORT=4000
   JWT_SECRET=создайте_очень_длинный_случайный_секрет_минимум_32_символа
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=надежный_пароль_123
   UPLOAD_DIR=uploads
   FRONTEND_URL=https://ваш-сайт.рег.рф
   ```
   
   ```bash
   # Создайте директории
   mkdir -p uploads/flowers uploads/map
   
   # Запустите с PM2
   pm2 start index.js --name flowers-api
   pm2 save
   pm2 startup
   
   # Настройте Nginx (если нужен)
   sudo apt install nginx
   ```

3. **Настройка Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/flowers-api
   ```
   
   ```nginx
   server {
       listen 80;
       server_name ваш-домен.ru;
       
       location / {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   sudo ln -s /etc/nginx/sites-available/flowers-api /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **SSL сертификат:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d ваш-домен.ru
   ```

#### Вариант B: Beget (Простой вариант)

**Beget** - популярный российский хостер с поддержкой Node.js из коробки.

1. **Регистрация:**
   - Купите тариф на [beget.com](https://beget.com) (от 200₽/мес)
   - В панели управления перейдите в "Node.js"

2. **Настройка:**
   - Загрузите папку `server` через FTP или Git
   - В панели Beget укажите:
     - **Точка входа**: `server/index.js`
     - **Версия Node.js**: 20.x
     - **Переменные окружения**: добавьте из `.env.example`

3. **Запуск:**
   - Нажмите "Запустить приложение"
   - Получите URL вида `https://ваш-поддомен.beget.tech`

#### Вариант C: VK Cloud (бывший Mail.ru Cloud)

**VK Cloud** - облачная платформа от VK.

1. **Регистрация:**
   - Зарегистрируйтесь на [cloud.vk.com](https://cloud.vk.com)
   - Создайте виртуальную машину (VM)

2. **Настройка аналогична Timeweb VPS** (см. выше)

#### Вариант D: Yandex Cloud

**Yandex Cloud** - надежная облачная платформа от Яндекса.

1. **Регистрация:**
   - Зарегистрируйтесь на [cloud.yandex.ru](https://cloud.yandex.ru)
   - Создайте виртуальную машину Compute Cloud

2. **Настройка:**
   - Выберите Ubuntu 22.04
   - Подключитесь по SSH
   - Следуйте инструкциям для VPS (см. Timeweb)

3. **Особенности:**
   - Используйте Yandex Object Storage для загруженных файлов
   - Настройте Application Load Balancer для SSL

#### Вариант E: REG.RU VPS (Все в одном месте)

Раз фронтенд уже на REG.RU, можно взять там же VPS:

1. **Заказ VPS:**
   - В панели REG.RU закажите VPS (от 250₽/мес)
   - Выберите Ubuntu 22.04

2. **Настройка:**
   - Следуйте инструкциям для VPS из раздела Timeweb
   - Можно разместить и фронт, и бэк на одном сервере

### Сравнение российских площадок для бэкенда

| Платформа | Цена | Простота | Node.js | SSL | Рекомендация |
|-----------|------|----------|---------|-----|--------------|
| **Timeweb Cloud** | от 199₽ | ⭐⭐⭐⭐ | ✅ | ✅ | **Лучший баланс** |
| **Beget** | от 200₽ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | Самый простой |
| **VK Cloud** | от 300₽ | ⭐⭐⭐ | ✅ | ✅ | Для масштабирования |
| **Yandex Cloud** | от 500₽ | ⭐⭐⭐ | ✅ | ✅ | Корпоративный уровень |
| **REG.RU VPS** | от 250₽ | ⭐⭐⭐ | ✅ | ✅ | Все в одном месте |

### Итоговая схема деплоя

1. ✅ **Frontend**: REG.RU статический хостинг (соберите `npm run build` → загрузите `dist/*`)
2. ✅ **Backend**: Timeweb Cloud / Beget / REG.RU VPS (см. инструкции выше)
3. ✅ **Обновите переменные**:
   - Frontend `.env`: `VITE_API_URL=https://ваш-бэкенд-домен`
   - Backend `.env`: `FRONTEND_URL=https://ваш-сайт.рег.рф`

---

## Вариант 2: Зарубежные площадки (если доступны)

### Frontend на Vercel

1. **Подготовка кода:**
   ```bash
   # Убедитесь, что код загружен в GitHub
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Настройка Vercel:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Нажмите "Add New Project"
   - Импортируйте ваш GitHub репозиторий
   - Настройки:
     - **Framework Preset**: Vite
     - **Root Directory**: `./` (оставьте пустым или корень)
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Переменные окружения в Vercel:**
   ```
   VITE_API_URL=https://ваш-бэкенд.onrender.com
   ```

4. **Нажмите Deploy**

### Backend на Render

1. **Подготовка:**
   - Зайдите на [render.com](https://render.com)
   - Нажмите "New +" → "Web Service"
   - Подключите GitHub репозиторий

2. **Настройки:**
   - **Name**: flowers-shop-api
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

3. **Environment Variables:**
   ```
   PORT=4000
   JWT_SECRET=ваш_секретный_ключ_минимум_32_символа
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=надежный_пароль
   UPLOAD_DIR=uploads
   FRONTEND_URL=https://ваш-сайт.vercel.app
   ```

4. **Настройка CORS в server/index.js:**
   Обновите строку с CORS:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
     credentials: true
   }));
   ```

5. **Нажмите Create Web Service**

6. **После деплоя:**
   - Скопируйте URL вашего бэкенда (например, `https://flowers-shop-api.onrender.com`)
   - Вернитесь в Vercel и обновите переменную `VITE_API_URL`
   - Redeploy frontend в Vercel

---

## Вариант 3: VPS (Ubuntu Server)

### Требования:
- VPS с Ubuntu 20.04+
- Минимум 1GB RAM
- Доменное имя (опционально)

### 1. Подключение к серверу:
```bash
ssh root@ваш_ip
```

### 2. Установка зависимостей:
```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Установка Nginx
sudo apt install -y nginx

# Установка PM2 (менеджер процессов)
sudo npm install -g pm2

# Установка Git
sudo apt install -y git
```

### 3. Клонирование проекта:
```bash
cd /var/www
sudo git clone https://github.com/ваш-username/flowers_shop.git
sudo chown -R $USER:$USER flowers_shop
cd flowers_shop
```

### 4. Настройка Backend:
```bash
cd server
npm install

# Создание .env файла
cat > .env << EOF
PORT=4000
JWT_SECRET=ваш_очень_секретный_ключ_минимум_32_символа
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=надежный_пароль
UPLOAD_DIR=uploads
EOF

# Создание директории для загрузок
mkdir -p uploads/flowers uploads/map

# Запуск с PM2
pm2 start index.js --name flowers-api
pm2 save
pm2 startup
```

### 5. Настройка Frontend:
```bash
cd /var/www/flowers_shop

# Создание .env файла
cat > .env << EOF
VITE_API_URL=http://ваш_ip:4000
EOF

# Сборка
npm install
npm run build
```

### 6. Настройка Nginx:
```bash
sudo nano /etc/nginx/sites-available/flowers-shop
```

Вставьте конфигурацию:
```nginx
server {
    listen 80;
    server_name ваш_домен.com;  # или ваш IP

    # Frontend
    location / {
        root /var/www/flowers_shop/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Статические файлы (загрузки)
    location /uploads {
        proxy_pass http://localhost:4000/uploads;
    }
}
```

Активация конфигурации:
```bash
sudo ln -s /etc/nginx/sites-available/flowers-shop /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Настройка Firewall:
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

### 8. SSL сертификат (Let's Encrypt):
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ваш_домен.com
```

---

## Вариант 4: Docker

### 1. Создайте Dockerfile для backend:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

### 2. Создайте Dockerfile для frontend:
```dockerfile
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3. Docker Compose (docker-compose.yml):
```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - JWT_SECRET=ваш_секрет
      - ADMIN_EMAIL=admin@example.com
      - ADMIN_PASSWORD=password
      - UPLOAD_DIR=uploads
    volumes:
      - ./server/data.json:/app/data.json
      - ./server/uploads:/app/uploads

  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://backend:4000
```

Запуск:
```bash
docker-compose up -d
```

---

## Важные замечания:

### Безопасность:
1. **Измените JWT_SECRET** на случайную строку минимум 32 символа
2. **Смените пароль администратора** сразу после первого входа
3. Используйте HTTPS в продакшене
4. Настройте валидацию загружаемых файлов

### База данных:
- Текущая БД - JSON файл (`server/data.json`)
- Для продакшена рассмотрите MongoDB/PostgreSQL
- Регулярно делайте бэкапы `data.json`

### Мониторинг:
```bash
# Логи PM2
pm2 logs flowers-api

# Статус
pm2 status

# Перезапуск
pm2 restart flowers-api
```

### Обновление:
```bash
cd /var/www/flowers_shop
git pull
cd server && npm install && pm2 restart flowers-api
cd .. && npm install && npm run build
```

---

## Полезные ссылки:

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [PM2 Guide](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)

---

## Поддержка:

Если возникли проблемы:
1. Проверьте логи: `pm2 logs` (VPS) или в панели Render/Vercel
2. Проверьте переменные окружения
3. Убедитесь, что CORS настроен правильно
4. Проверьте firewall правила
