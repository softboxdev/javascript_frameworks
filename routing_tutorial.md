# Практическая работа: "Динамическая маршрутизация в React"

**Время выполнения:** 1-1.5 часа  
**Уровень:** Начинающий  
**Цель:** Закрепить навыки работы с динамическими маршрутами и хуком `useParams`

---

## **Задание 1: Базовое приложение (20 минут)**

### **1.1. Настройка проекта**
Создайте новое React-приложение и установите зависимости:
```bash
npx create-react-app routing-practice
cd routing-practice
npm install react-router-dom
```

### **1.2. Базовая структура**
Создайте компоненты в папке `src/components/`:
- `Home.js` - Главная страница
- `UserProfile.js` - Профиль пользователя
- `ProductPage.js` - Страница продукта
- `Navigation.js` - Навигационное меню

---

## **Задание 2: Реализация маршрутов (30 минут)**

### **2.1. App.js - Настройка маршрутизации**
```jsx
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import ProductPage from './components/ProductPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          {/* TODO: Добавьте маршруты здесь */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

**Задача:** Замените `{/* TODO: Добавьте маршруты здесь */}` на работающие маршруты:
- `/` - Главная страница
- `/user/:userId` - Профиль пользователя
- `/product/:productId` - Страница продукта
- `/category/:categoryName/product/:productId` - Продукт в категории

### **2.2. Navigation.js - Навигационное меню**
```jsx
// components/Navigation.js
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <h2>Практика маршрутизации</h2>
      <div className="nav-links">
        {/* TODO: Создайте ссылки для навигации */}
      </div>
    </nav>
  );
};

export default Navigation;
```

**Задача:** Создайте ссылки для:
- Главная страница
- Профили пользователей: /user/1, /user/2, /user/3
- Продукты: /product/laptop, /product/phone
- Продукты в категориях: /category/electronics/product/123

---

## **Задание 3: Компоненты с динамическими параметрами (40 минут)**

### **3.1. UserProfile.js - Профиль пользователя**
```jsx
// components/UserProfile.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css';

// Mock данные пользователей
const usersData = {
  1: { name: 'Анна Петрова', email: 'anna@example.com', city: 'Москва' },
  2: { name: 'Иван Сидоров', email: 'ivan@example.com', city: 'Санкт-Петербург' },
  3: { name: 'Мария Иванова', email: 'maria@example.com', city: 'Казань' }
};

const UserProfile = () => {
  // TODO: Получите userId из URL параметров
  
  // TODO: Найдите данные пользователя по ID
  
  return (
    <div className="user-profile">
      <h2>Профиль пользователя</h2>
      {/* TODO: Отобразите информацию о пользователе */}
      {/* Если пользователь не найден, покажите сообщение об ошибке */}
    </div>
  );
};

export default UserProfile;
```

### **3.2. ProductPage.js - Страница продукта**
```jsx
// components/ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

const productsData = {
  laptop: { name: 'Ноутбук Gaming Pro', price: 89990, description: 'Мощный игровой ноутбук' },
  phone: { name: 'Смартфон SuperPhone', price: 45990, description: 'Флагманский смартфон' },
  123: { name: 'Наушники AudioMax', price: 12990, description: 'Беспроводные наушники' }
};

const ProductPage = () => {
  // TODO: Получите productId из URL параметров
  
  return (
    <div className="product-page">
      <h2>Страница продукта</h2>
      {/* TODO: Отобразите информацию о продукте */}
    </div>
  );
};

export default ProductPage;
```

### **3.3. Расширенный компонент для вложенных параметров**
```jsx
// components/CategoryProduct.js
import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryProduct = () => {
  // TODO: Получите categoryName и productId из URL
  
  const categories = {
    electronics: 'Электроника',
    books: 'Книги',
    clothing: 'Одежда'
  };

  return (
    <div className="category-product">
      <h2>Продукт в категории</h2>
      {/* TODO: Отобразите:
        - Название категории (преобразуйте electronics -> Электроника)
        - ID продукта
        - Полный путь
      */}
    </div>
  );
};

export default CategoryProduct;
```

---

## **Задание 4: Дополнительные задачи (20 минут)**

### **4.1. Обработка несуществующих ID**
Модифицируйте компоненты так, чтобы при несуществующем ID показывалось сообщение: "Пользователь/продукт не найден"

### **4.2. Динамические ссылки**
В каждом компоненте добавьте ссылки на связанные страницы:
- В профиле пользователя - ссылка на продукты
- На странице продукта - ссылка на категорию

### **4.3. Хлебные крошки**
Создайте компонент `Breadcrumbs.js`, который показывает текущий путь:
- Главная > Пользователь > Анна Петрова
- Главная > Электроника > Ноутбук Gaming Pro

---

## **Проверка решения**

### **Что должно работать:**
1. ✅ Приложение запускается без ошибок
2. ✅ Навигация работает без перезагрузки страницы
3. ✅ `/user/1` показывает профиль Анны Петровой
4. ✅ `/user/4` показывает "Пользователь не найден"
5. ✅ `/product/laptop` показывает информацию о ноутбуке
6. ✅ `/category/electronics/product/123` показывает продукт в категории
7. ✅ Кнопки "Назад/Вперед" в браузере работают корректно

### **Пример готового Navigation.js:**
```jsx
const Navigation = () => {
  return (
    <nav>
      <Link to="/">Главная</Link>
      <Link to="/user/1">Анна</Link>
      <Link to="/user/2">Иван</Link>
      <Link to="/product/laptop">Ноутбук</Link>
      <Link to="/category/electronics/product/123">Наушники</Link>
    </nav>
  );
};
```

---

## **Критерии оценки**

| **Задание** | **Баллы** | **Критерии** |
|-------------|-----------|--------------|
| Задание 2 | 30 | Маршруты настроены корректно, навигация работает |
| Задание 3.1 | 20 | useParams работает, данные отображаются |
| Задание 3.2 | 20 | Продукты показываются по ID |
| Задание 3.3 | 15 | Вложенные параметры обрабатываются |
| Задание 4 | 15 | Дополнительные функции реализованы |
| **Итого** | **100** | |

**Оценка:**
- 85-100 баллов: Отлично
- 70-84 балла: Хорошо
- 50-69 баллов: Удовлетворительно

---

## **Подсказки**

1. Не забывайте импортировать хук `useParams`
2. Все параметры из URL - строки, даже если это цифры
3. Для проверки используйте `console.log(useParams())` чтобы увидеть все параметры
4. Создайте простые CSS файлы для красивого отображения
