Project: flowers_shop — MVP admin + backend

## Быстрый старт

### 1) Backend

Запустите сервер в папке `server`:

```bash
cd server
npm install
cp .env.example .env  # Скопируйте и настройте переменные окружения
npm run dev
```

Сервер запустится на `http://localhost:4000`

### 2) Frontend

Установите зависимости и запустите Vite dev server (из корня проекта):

```bash
npm install
npm run dev
```

Убедитесь, что в корне проекта есть `.env` с настройкой API:

```
VITE_API_URL=http://localhost:4000
```

**Важно:** После добавления/изменения `.env` перезапустите сервер разработки.

## 🚀 Деплой

Подробные инструкции по деплою приложения смотрите в [DEPLOYMENT.md](./DEPLOYMENT.md)

**Быстрый старт:**
- **Vercel + Render** (бесплатно): см. раздел "Вариант 1" в DEPLOYMENT.md
- **VPS**: см. раздел "Вариант 2" в DEPLOYMENT.md  
- **Docker**: `docker-compose up -d`

## Админ-панель

Админ-панель доступна по адресу: `http://localhost:5173/admin`

**Учетные данные по умолчанию:**
- Email: `admin@example.com`
- Пароль: `admin`

**Возможности админки:**
- Управление товарами (создание, редактирование, удаление)
- Управление домашней каруселью
- Загрузка изображений
- Просмотр товаров с полной информацией

**Важно:** Измените учетные данные в `server/.env` для продакшена!

## Архитектура

### Backend
- REST API на Express.js
- JWT авторизация
- Файловое хранилище данных (JSON)
- Загрузка файлов через Multer
- Автоматическое создание upload директорий

### Frontend
- React + TypeScript + Vite
- React Router для навигации
- SCSS для стилей
- React Toastify для уведомлений
- Контекст для корзины

## Структура данных

Данные хранятся в `server/data.json`:
- `products` - товары
- `admins` - администраторы
- `homeCarousel` - слайды домашней карусели

Загруженные файлы: `server/uploads/`

## API Endpoints

См. `server/README.md` для полного списка эндпоинтов.

## Атрибуция шрифтов

В проекте используется шрифт, распространяемый по лицензии Creative Commons.

- Разрешено коммерческое и некоммерческое использование.
- Обязательное условие лицензии: при любом использовании должен быть указан автор.
- Автор шрифта: **@NEUDEMONIA** (Instagram).
- Рекомендуемая строка атрибуции: `Font author: @NEUDEMONIA (Creative Commons)`.

## Следующие шаги

- Замените файловое хранилище на SQLite/Postgres для продакшена
- Используйте Cloudinary/S3 для хранения изображений
- Добавьте role-based доступ при необходимости
- Настройте CORS для продакшн-домена
- Добавьте rate limiting и другие меры безопасности
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
