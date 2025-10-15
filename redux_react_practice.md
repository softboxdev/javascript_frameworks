# **Подробное руководство: Redux + React Router для начинающих**

## **ЧАСТЬ 1: Создание хранилища Redux**

### **Шаг 1.1: Установка зависимостей**

```bash
npm install @reduxjs/toolkit react-redux
```

### **Шаг 1.2: Создание структуры папок**

```
src/
  store/
    index.js          # Главный файл хранилища
    slices/           # Слайсы (редукторы + действия)
      authSlice.js    # Слайс для авторизации
      productsSlice.js # Слайс для товаров
      cartSlice.js    # Слайс для корзины
```

### **Шаг 1.3: Создание слайсов (редукторов + действий)**

```jsx
// store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Создание слайса (редуктор + действия)
const authSlice = createSlice({
  name: 'auth', // уникальное имя
  initialState,
  reducers: {
    // Действие: начало запроса на логин
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Действие: успешный логин
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload; // payload - данные которые передаем
      state.error = null;
    },
    
    // Действие: ошибка логина
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    
    // Действие: выход из системы
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    
    // Действие: обновление пользователя
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  }
});

// Экспортируем действия (actions) для использования в компонентах
export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser 
} = authSlice.actions;

// Экспортируем редуктор для добавления в хранилище
export default authSlice.reducer;
```

```jsx
// store/slices/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    search: '',
    sortBy: 'name'
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 9,
    totalItems: 0
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Загрузка товаров
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.products;
      state.pagination.totalItems = action.payload.totalCount;
      state.error = null;
    },
    
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Фильтрация и сортировка
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Сбрасываем на первую страницу при изменении фильтров
    },
    
    // Пагинация
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    
    // Добавление нового товара (для админа)
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    
    // Обновление товара
    updateProduct: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    
    // Удаление товара
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setFilters,
  setPage,
  addProduct,
  updateProduct,
  deleteProduct
} = productsSlice.actions;

export default productsSlice.reducer;
```

### **Шаг 1.4: Создание главного хранилища**

```jsx
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';

// Настройка хранилища
const store = configureStore({
  reducer: {
    auth: authReducer,       // state.auth
    products: productsReducer, // state.products
    cart: cartReducer        // state.cart
  },
  // Дополнительные настройки (опционально)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем эти пути в состоянии (например, для non-serializable данных)
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['register']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production' // Включаем Redux DevTools только в development
});

export default store;
```

---

## **ЧАСТЬ 2: Создание асинхронных действий (Thunk Actions)**

### **Шаг 2.1: Асинхронный action для логина**

```jsx
// store/actions/authActions.js
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';

// Асинхронный action creator (thunk)
export const loginUser = (credentials) => async (dispatch) => {
  try {
    // Диспатчим действие начала загрузки
    dispatch(loginStart());
    
    // Имитируем API запрос
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      throw new Error('Ошибка авторизации');
    }
    
    const userData = await response.json();
    
    // Диспатчим действие успешного логина
    dispatch(loginSuccess(userData));
    
    // Сохраняем в localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
  } catch (error) {
    // Диспатчим действие ошибки
    dispatch(loginFailure(error.message));
  }
};

// Action для проверки авторизации при загрузке приложения
export const checkAuth = () => (dispatch) => {
  const user = localStorage.getItem('user');
  if (user) {
    dispatch(loginSuccess(JSON.parse(user)));
  }
};
```

### **Шаг 2.2: Асинхронный action для загрузки товаров**

```jsx
// store/actions/productsActions.js
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setFilters
} from '../slices/productsSlice';

export const fetchProducts = (filters = {}) => async (dispatch, getState) => {
  try {
    dispatch(fetchProductsStart());
    
    // Получаем текущие фильтры из состояния
    const currentFilters = getState().products.filters;
    const mergedFilters = { ...currentFilters, ...filters };
    
    // Обновляем фильтры в состоянии
    dispatch(setFilters(mergedFilters));
    
    // Формируем URL с параметрами
    const params = new URLSearchParams();
    Object.entries(mergedFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.append(key, value);
      }
    });
    
    const response = await fetch(`/api/products?${params}`);
    
    if (!response.ok) {
      throw new Error('Ошибка загрузки товаров');
    }
    
    const productsData = await response.json();
    
    dispatch(fetchProductsSuccess({
      products: productsData.items,
      totalCount: productsData.totalCount
    }));
    
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};
```

---

## **ЧАСТЬ 3: Настройка маршрутов (React Router)**

### **Шаг 3.1: Установка зависимостей**

```bash
npm install react-router-dom
```

### **Шаг 3.2: Создание структуры маршрутов**

```jsx
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Компоненты страниц
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AdminPage from './pages/Admin/AdminPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// Защищенные маршруты
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminRoute from './components/ProtectedRoute/AdminRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            {/* Публичные маршруты */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Защищенные маршруты (только для авторизованных) */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Маршруты только для администраторов */}
            <Route 
              path="/admin/*" 
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              } 
            />
            
            {/* Обработка несуществующих маршрутов */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
```

### **Шаг 3.3: Создание защищенных маршрутов**

```jsx
// components/ProtectedRoute/ProtectedRoute.js
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const location = useLocation();

  // Показываем loader во время проверки авторизации
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если не авторизован, перенаправляем на страницу логина
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Если авторизован, показываем запрашиваемый компонент
  return children;
};

export default ProtectedRoute;
```

```jsx
// components/ProtectedRoute/AdminRoute.js
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useSelector(state => state.auth);
  const location = useLocation();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Проверяем авторизацию и роль администратора
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
```

### **Шаг 3.4: Компонент Layout с навигацией**

```jsx
// components/Layout/Layout.js
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import './Layout.css';

const Layout = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/');
  };

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            MyStore
          </Link>
          
          <div className="nav-links">
            <Link to="/">Главная</Link>
            <Link to="/products">Товары</Link>
            <Link to="/cart">
              Корзина
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="user-menu">
                <Link to="/profile">
                  {user?.name || 'Профиль'}
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin">Админка</Link>
                )}
                <button onClick={handleLogout}>Выйти</button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login">Войти</Link>
                <Link to="/register">Регистрация</Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>&copy; 2024 MyStore. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Layout;
```

---

## **ЧАСТЬ 4: Использование в компонентах**

### **Шаг 4.1: Компонент страницы продуктов**

```jsx
// pages/ProductsPage/ProductsPage.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, setFilters } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Filters from '../../components/Filters/Filters';
import './ProductsPage.css';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Получаем данные из Redux store
  const { items, loading, error, filters, pagination } = useSelector(
    state => state.products
  );

  // Загружаем продукты при монтировании и изменении фильтров
  useEffect(() => {
    // Синхронизируем URL с фильтрами
    const urlFilters = {};
    for (const [key, value] of searchParams.entries()) {
      urlFilters[key] = value;
    }
    
    dispatch(fetchProducts(urlFilters));
  }, [dispatch, searchParams]);

  // Обработчик изменения фильтров
  const handleFilterChange = (newFilters) => {
    const mergedFilters = { ...filters, ...newFilters };
    dispatch(setFilters(mergedFilters));
    
    // Обновляем URL
    const params = new URLSearchParams();
    Object.entries(mergedFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  };

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="products-page">
      <h1>Каталог товаров</h1>
      
      <Filters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <div className="products-grid">
        {items.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
          />
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="no-products">
          Товары не найдены
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
```

### **Шаг 4.2: Компонент логина**

```jsx
// pages/Auth/LoginPage.js
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../store/actions/authActions';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const { loading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Получаем путь, с которого перенаправили на логин
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(loginUser(formData)).unwrap();
      // После успешного логина перенаправляем обратно или на главную
      navigate(from, { replace: true });
    } catch (error) {
      // Ошибка уже обработана в slice
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Вход в систему</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="submit-btn"
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
```

---

## **Итоговая структура проекта**

```
src/
  store/
    index.js                 # Главное хранилище
    slices/                  # Слайсы (редукторы + действия)
      authSlice.js
      productsSlice.js
      cartSlice.js
    actions/                 # Асинхронные actions (thunks)
      authActions.js
      productsActions.js
      cartActions.js
      
  components/
    Layout/
      Layout.js
      Layout.css
    ProtectedRoute/
      ProtectedRoute.js
      AdminRoute.js
    ProductCard/
      ProductCard.js
      ProductCard.css
    Filters/
      Filters.js
      Filters.css
      
  pages/
    HomePage/
      HomePage.js
      HomePage.css
    ProductsPage/
      ProductsPage.js
      ProductsPage.css
    ProductDetailPage/
      ProductDetailPage.js
      ProductDetailPage.css
    Auth/
      LoginPage.js
      LoginPage.css
      RegisterPage.js
    ProfilePage/
      ProfilePage.js
    CartPage/
      CartPage.js
    Admin/
      AdminPage.js
    NotFoundPage/
      NotFoundPage.js
      
  App.js
  index.js
```

Это руководство покрывает все аспекты создания современного React-приложения с Redux Toolkit и React Router! 🚀