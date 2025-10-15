
---

## **Маршрутизация в React: Полное руководство для начинающих**

### **• Введение**

#### **Что такое маршрутизация?**

Представьте, что ваше React-приложение — это многоэтажное здание с множеством комнат. **Маршрутизация** — это система навигации, которая помогает пользователям попасть в нужную "комнату" (страницу) вашего приложения.

**Без маршрутизации:** У вас всего одна страница, и вы не можете переходить между разными разделами приложения (например, со страницы "О нас" на страницу "Контакты").

**С маршрутизацией:** Ваше приложение становится **SPA (Single Page Application)** — одностраничным приложением, где переход между "страницами" происходит без перезагрузки браузера, быстро и плавно.

#### **Зачем нужна маршрутизация в React?**

- **Создание многостраничных приложений:** Главная, О нас, Блог, Контакты
- **Понятные URL:** `/about`, `/users/5`, `/products/laptop`
- **Навигация без перезагрузки:** Высокая скорость работы
- **История браузера:** Кнопки "Назад"/"Вперед" работают корректно
- **Возможность поделиться ссылкой:** Каждая "страница" имеет свой уникальный URL

**Важно:** React сам по себе НЕ включает маршрутизацию. Для этого мы используем стороннюю библиотеку.

---

### **• react-router-dom**

#### **Что это такое?**

`react-router-dom` — это самая популярная и официально рекомендуемая библиотека для маршрутизации в React-приложениях, которые работают в браузере.

#### **Установка**

```bash
npm install react-router-dom
```

#### **Ключевые компоненты**

1. **`BrowserRouter`** (`<Router>`)
   - "Мозг" маршрутизации
   - Оборачивает всё приложение и предоставляет функционал маршрутизации
   - Использует HTML5 History API для работы с URL

2. **`Routes`** (`<Switch>` в старых версиях)
   - "Контейнер" для маршрутов
   - Просматривает все дочерние `<Route>` и рендерит ПЕРВЫЙ подходящий

3. **`Route`**
   - "Правило" для отображения компонентов
   - Говорит: "Когда URL такой-то — покажи этот компонент"

4. **`Link`**
   - "Умная" ссылка для навигации
   - Заменяет обычный тег `<a>` (чтобы не было перезагрузки страницы)

---

### **• Базовая маршрутизация**

#### **Настройка базового приложения**

Давайте создадим простое приложение с тремя страницами: Главная, О нас и Контакты.

```jsx
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

// Простые компоненты-страницы
const Home = () => <h1>Главная страница</h1>;
const About = () => <h1>О нас</h1>;
const Contact = () => <h1>Контакты</h1>;

function App() {
  return (
    <Router>
      {/* Навигационное меню */}
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/about">О нас</Link>
          </li>
          <li>
            <Link to="/contact">Контакты</Link>
          </li>
        </ul>
      </nav>

      {/* Контейнер для маршрутов */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
```

#### **Как это работает:**

1. **`<Router>`** — оборачивает всё приложение
2. **`<Link to="/about">`** — при клике меняет URL на `/about` БЕЗ перезагрузки
3. **`<Routes>`** — проверяет все дочерние `<Route>`
4. **`<Route path="/about">`** — срабатывает, когда URL = `/about`
5. **`element={<About />}`** — показывает компонент `About`

#### **Динамические маршруты**

Часто нужно создавать страницы с динамическими параметрами, например, страницы пользователей.

```jsx
// App.js
// Добавляем в Routes
<Route path="/user/:id" element={<UserProfile />} />

// UserProfile.jsx
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams(); // Хук для получения параметров из URL
  
  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>ID пользователя: {id}</p>
    </div>
  );
};
```

**Примеры URL:**
- `/user/123` → покажет "ID пользователя: 123"
- `/user/maria` → покажет "ID пользователя: maria"

---

### **• Вложенные маршруты**

#### **Что такое вложенные маршруты?**

Это маршруты внутри других маршрутов. Представьте сайт интернет-магазина:
- `/products` — список всех товаров
- `/products/laptop` — товары категории "Ноутбуки" 
- `/products/laptop/123` — конкретный ноутбук

#### **Как реализовать?**

**Способ 1: Родительский компонент с `<Outlet />`**

```jsx
// App.js
<Routes>
  <Route path="/products" element={<ProductsLayout />}>
    <Route index element={<ProductsList />} />
    <Route path=":category" element={<ProductCategory />} />
    <Route path=":category/:id" element={<ProductDetail />} />
  </Route>
</Routes>

// ProductsLayout.jsx
import { Outlet, Link } from 'react-router-dom';

const ProductsLayout = () => {
  return (
    <div>
      <h1>Наш магазин</h1>
      <nav>
        <Link to="/products">Все товары</Link> | 
        <Link to="/products/laptop">Ноутбуки</Link> | 
        <Link to="/products/phone">Телефоны</Link>
      </nav>
      
      {/* Outlet - место, где будут появляться дочерние компоненты */}
      <Outlet />
    </div>
  );
};
```

**Способ 2: Полные пути**

```jsx
<Routes>
  <Route path="/products" element={<ProductsList />} />
  <Route path="/products/:category" element={<ProductCategory />} />
  <Route path="/products/:category/:id" element={<ProductDetail />} />
</Routes>
```

#### **Разница между способами:**

- **Способ 1:** Общий layout для ВСЕХ продуктовых страниц (меню всегда видно)
- **Способ 2:** Каждая страница независима (можно сделать разный дизайн)

#### **Хуки для навигации**

```jsx
import { useNavigate, useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const navigate = useNavigate(); // Для программной навигации
  const location = useLocation(); // Для получения информации о текущем URL
  
  const handleBack = () => {
    navigate(-1); // Назад по истории
    // или navigate('/products'); // На конкретный URL
  };
  
  return (
    <div>
      <p>Текущий путь: {location.pathname}</p>
      <button onClick={handleBack}>Назад</button>
    </div>
  );
};
```

---

### **Практические примеры для закрепления**

#### **Пример 1: Простой блог**

```jsx
// App.js
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/posts" element={<Posts />}>
      <Route index element={<PostList />} />
      <Route path=":postId" element={<PostDetail />} />
    </Route>
  </Routes>
</Router>
```

#### **Пример 2: Панель администратора**

```jsx
<Routes>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="users" element={<UserManagement />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```

---

### **Чек-лист для начинающего**

1. ✅ Установил `react-router-dom`
2. ✅ Обернул приложение в `<BrowserRouter>`
3. ✅ Создал компоненты для каждой страницы
4. ✅ Добавил `<Routes>` и `<Route>` для каждого пути
5. ✅ Использую `<Link>` вместо `<a>`
6. ✅ Понял разницу между `path="/"` и `path=""`
7. ✅ Научился использовать `useParams()` для динамических параметров
8. ✅ Понял, как работает `<Outlet />` для вложенных маршрутов

**Совет для практики:** Начните с простого приложения с 3-4 страницами, затем добавьте динамические маршруты, и только потом переходите к вложенным маршрутам.

Теперь вы готовы создавать полноценные многостраничные React-приложения! 🚀