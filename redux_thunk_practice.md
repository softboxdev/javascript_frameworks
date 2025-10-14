# Пошаговое руководство по Redux Thunk: Асинхронные действия

## Шаг 1: Установка зависимостей

```bash
npm install redux react-redux redux-thunk
```

## Шаг 2: Базовая настройка store

```javascript
// store/index.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Импортируем thunk middleware
import rootReducer from './reducers'; // Импортируем корневой редюсер

// Создаем store с применением thunk middleware
// Thunk позволяет диспатчить функции вместо обычных action объектов
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Применяем thunk как middleware
);

export default store;
```

## Шаг 3: Создание типов действий (Action Types)

```javascript
// store/types/userTypes.js

// Константы для типов действий
export const FETCH_USERS_START = 'FETCH_USERS_START';    // Начало загрузки
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'; // Успешная загрузка
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'; // Ошибка загрузки
export const ADD_USER_START = 'ADD_USER_START';          // Начало добавления
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';      // Успешное добавление
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';      // Ошибка добавления
```

## Шаг 4: Создание action creators с Thunk

```javascript
// store/actions/userActions.js
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_START,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE
} from '../types/userTypes';

// Синхронный action creator - запускает загрузку
export const fetchUsersStart = () => ({
  type: FETCH_USERS_START // Возвращаем объект действия
});

// Синхронный action creator - успешное получение данных
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users // Передаем полученные данные в payload
});

// Синхронный action creator - ошибка загрузки
export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error // Передаем ошибку в payload
});

// АСИНХРОННЫЙ action creator с Thunk
// Thunk позволяет возвращать функцию вместо объекта
export const fetchUsers = () => {
  // Возвращаем функцию, которая получает dispatch и getState как аргументы
  return async (dispatch, getState) => {
    
    // Диспатчим действие начала загрузки
    dispatch(fetchUsersStart());
    
    try {
      // Выполняем асинхронный запрос
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      // Проверяем успешность ответа
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      // Парсим JSON ответ
      const users = await response.json();
      
      // Диспатчим действие успешного завершения с данными
      dispatch(fetchUsersSuccess(users));
      
    } catch (error) {
      // Диспатчим действие ошибки
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

// Action creator для добавления пользователя
export const addUserStart = () => ({
  type: ADD_USER_START
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user
});

export const addUserFailure = (error) => ({
  type: ADD_USER_FAILURE,
  payload: error
});

// Асинхронный action для добавления пользователя
export const addUser = (userData) => {
  return async (dispatch) => {
    dispatch(addUserStart()); // Начало операции
    
    try {
      // Имитация API запроса
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      
      const newUser = await response.json();
      dispatch(addUserSuccess(newUser)); // Успешное добавление
      
    } catch (error) {
      dispatch(addUserFailure(error.message)); // Ошибка
    }
  };
};
```

## Шаг 5: Создание редюсера

```javascript
// store/reducers/userReducer.js
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_START,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE
} from '../types/userTypes';

// Начальное состояние
const initialState = {
  users: [],           // Массив пользователей
  loading: false,      // Флаг загрузки
  error: null,         // Объект ошибки
  adding: false        // Флаг добавления нового пользователя
};

// Редюсер для управления состоянием пользователей
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    
    // Начало загрузки пользователей
    case FETCH_USERS_START:
      return {
        ...state,           // Сохраняем предыдущее состояние
        loading: true,      // Устанавливаем флаг загрузки
        error: null         // Сбрасываем ошибки
      };
    
    // Успешная загрузка пользователей
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,     // Сбрасываем флаг загрузки
        users: action.payload, // Записываем полученных пользователей
        error: null         // Сбрасываем ошибки
      };
    
    // Ошибка загрузки
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,     // Сбрасываем флаг загрузки
        error: action.payload // Сохраняем ошибку
      };
    
    // Начало добавления пользователя
    case ADD_USER_START:
      return {
        ...state,
        adding: true,       // Устанавливаем флаг добавления
        error: null         // Сбрасываем ошибки
      };
    
    // Успешное добавление пользователя
    case ADD_USER_SUCCESS:
      return {
        ...state,
        adding: false,      // Сбрасываем флаг добавления
        users: [...state.users, action.payload], // Добавляем нового пользователя
        error: null
      };
    
    // Ошибка добавления
    case ADD_USER_FAILURE:
      return {
        ...state,
        adding: false,
        error: action.payload
      };
    
    // Дефолтный случай - возвращаем текущее состояние
    default:
      return state;
  }
};

export default userReducer;
```

## Шаг 6: Корневой редюсер

```javascript
// store/reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';

// Объединяем все редюсеры в один корневой
const rootReducer = combineReducers({
  users: userReducer // Состояние пользователей будет доступно как state.users
  // Здесь можно добавить другие редюсеры
});

export default rootReducer;
```

## Шаг 7: React компонент с использованием Thunk

```jsx
// components/UserList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store/actions/userActions';

const UserList = () => {
  // Хук для диспатча действий
  const dispatch = useDispatch();
  
  // Хук для доступа к состоянию из store
  const { users, loading, error, adding } = useSelector(state => state.users);
  
  // Локальное состояние для формы
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  // Загружаем пользователей при монтировании компонента
  useEffect(() => {
    dispatch(fetchUsers()); // Диспатчим асинхронное действие
  }, [dispatch]); // dispatch в зависимостях (стабильная ссылка)

  // Обработчик добавления пользователя
  const handleAddUser = (e) => {
    e.preventDefault();
    
    if (newUserName.trim() && newUserEmail.trim()) {
      // Диспатчим асинхронное действие добавления
      dispatch(addUser({
        name: newUserName,
        email: newUserEmail,
        id: Date.now() // Временный ID
      }));
      
      // Очищаем форму
      setNewUserName('');
      setNewUserEmail('');
    }
  };

  // Отображение состояния загрузки
  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  // Отображение ошибки
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="user-list">
      <h2>Users List</h2>
      
      {/* Форма добавления пользователя */}
      <form onSubmit={handleAddUser} className="add-user-form">
        <input
          type="text"
          placeholder="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          disabled={adding} // Отключаем при добавлении
        />
        <input
          type="email"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          disabled={adding}
        />
        <button type="submit" disabled={adding}>
          {adding ? 'Adding...' : 'Add User'}
        </button>
      </form>

      {/* Список пользователей */}
      <div className="users">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
```

## Шаг 8: Подключение к приложению

```jsx
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import UserList from './components/UserList';

const App = () => {
  return (
    // Provider делает store доступным для всех компонентов
    <Provider store={store}>
      <div className="App">
        <h1>Redux Thunk Example</h1>
        <UserList />
      </div>
    </Provider>
  );
};

export default App;
```

## Упражнения для закрепления:

### Упражнение 1: Добавьте удаление пользователя
```javascript
// Добавьте в userTypes.js
export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'; 
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

// Добавьте в userActions.js
export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: 'DELETE_USER_START' });
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'DELETE_USER_SUCCESS', payload: userId });
    } catch (error) {
      dispatch({ type: 'DELETE_USER_FAILURE', payload: error.message });
    }
  };
};
```

### Упражнение 2: Добавьте обновление пользователя
Создайте полный цикл CRUD операций

### Упражнение 3: Добавьте оптимистичные обновления
Обновляйте UI сразу, а затем синхронизируйте с сервером

## Ключевые концепции Thunk:

1. **Thunk** - это функция, которая возвращает другую функцию
2. **dispatch** и **getState** автоматически передаются thunk'ам
3. **Позволяет** выполнять побочные эффекты (API вызовы)
4. **Может** диспатчить multiple actions в одном thunk'е
5. **Упрощает** обработку асинхронных операций

Это руководство показывает полный цикл работы с асинхронными действиями в Redux с использованием Thunk middleware!