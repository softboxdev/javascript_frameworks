# Упражнения по Redux в React приложении

## Создание проекта и настройка

```bash
npx create-react-app my-redux-app
cd my-redux-app
npm install redux react-redux @reduxjs/toolkit
```

## Упражнение 1: Базовый счетчик

### 1.1. Actions (Действия)

```javascript
// src/actions/counterActions.js

// Константы для типов действий (предотвращают опечатки)
export const INCREMENT = 'INCREMENT';        // Тип действия для увеличения счетчика
export const DECREMENT = 'DECREMENT';        // Тип действия для уменьшения счетчика  
export const RESET = 'RESET';                // Тип действия для сброса счетчика
export const SET_VALUE = 'SET_VALUE';        // Тип действия для установки значения

// Action Creators (Создатели действий)
export const increment = () => ({            // Функция создает действие увеличения
  type: INCREMENT,                           // Тип действия
  // payload не нужен, так как увеличение на 1
});

export const decrement = () => ({            // Функция создает действие уменьшения
  type: DECREMENT,                           // Тип действия
});

export const reset = () => ({                // Функция создает действие сброса
  type: RESET,                               // Тип действия
});

export const setValue = (value) => ({        // Функция создает действие установки значения
  type: SET_VALUE,                           // Тип действия
  payload: value                             // Данные, передаваемые с действием
});
```

### 1.2. Reducer (Редьюсер)

```javascript
// src/reducers/counterReducer.js

import { 
  INCREMENT, 
  DECREMENT, 
  RESET, 
  SET_VALUE 
} from '../actions/counterActions';  // Импорт типов действий

// Начальное состояние редьюсера
const initialState = {
  count: 0,                           // Текущее значение счетчика
  history: [],                        // История изменений
  operationsCount: 0                  // Количество выполненных операций
};

// Редьюсер - чистая функция, принимающая state и action
const counterReducer = (state = initialState, action) => {
  switch (action.type) {              // Проверка типа действия
    case INCREMENT:
      return {                        // ВОЗВРАЩАЕМ НОВЫЙ ОБЪЕКТ (не мутируем старый!)
        ...state,                     // Копируем текущее состояние
        count: state.count + 1,       // Обновляем счетчик
        history: [...state.history, 'INCREMENT'], // Добавляем в историю
        operationsCount: state.operationsCount + 1 // Увеличиваем счетчик операций
      };
    
    case DECREMENT:
      return {
        ...state,                     // Копируем текущее состояние
        count: state.count - 1,       // Уменьшаем счетчик
        history: [...state.history, 'DECREMENT'], // Добавляем в историю
        operationsCount: state.operationsCount + 1 // Увеличиваем счетчик операций
      };
    
    case RESET:
      return {
        ...state,                     // Копируем текущее состояние
        count: 0,                     // Сбрасываем счетчик
        history: [...state.history, 'RESET'], // Добавляем в историю
        operationsCount: state.operationsCount + 1 // Увеличиваем счетчик операций
      };
    
    case SET_VALUE:
      return {
        ...state,                     // Копируем текущее состояние
        count: action.payload,        // Устанавливаем переданное значение
        history: [...state.history, `SET_TO_${action.payload}`], // Добавляем в историю
        operationsCount: state.operationsCount + 1 // Увеличиваем счетчик операций
      };
    
    default:
      return state;                   // Если действие неизвестно, возвращаем текущее состояние
  }
};

export default counterReducer;        // Экспорт редьюсера
```

### 1.3. Store (Хранилище)

```javascript
// src/store/index.js

import { createStore, combineReducers } from 'redux';  // Импорт функций Redux
import counterReducer from '../reducers/counterReducer'; // Импорт редьюсера

// Комбинирование редьюсеров (если их несколько)
const rootReducer = combineReducers({
  counter: counterReducer,            // Состояние счетчика доступно через state.counter
  // можно добавить другие редьюсеры здесь
});

// Создание хранилища
const store = createStore(
  rootReducer,                        // Корневой редьюсер
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Для Redux DevTools
);

export default store;                 // Экспорт хранилища
```

### 1.4. React Component (Компонент React)

```jsx
// src/components/Counter.jsx

import React, { useState } from 'react';              // Импорт React и хука состояния
import { connect } from 'react-redux';                // Импорт функции подключения к Redux
import { increment, decrement, reset, setValue } from '../actions/counterActions'; // Импорт действий

// Компонент счетчика
const Counter = ({ 
  count, 
  history, 
  operationsCount, 
  onIncrement, 
  onDecrement, 
  onReset, 
  onSetValue 
}) => {
  const [inputValue, setInputValue] = useState('');   // Локальное состояние для input

  const handleSetValue = () => {
    const value = parseInt(inputValue);               // Преобразуем строку в число
    if (!isNaN(value)) {                              // Проверяем, что это число
      onSetValue(value);                              // Вызываем действие
      setInputValue('');                              // Очищаем input
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Redux Counter Exercise</h1>
      
      {/* Отображение текущего значения счетчика */}
      <h2>Current Count: {count}</h2>
      
      {/* Кнопки управления */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={onIncrement}                       // Обработчик увеличения
          style={buttonStyle}
        >
          + Increment
        </button>
        
        <button 
          onClick={onDecrement}                       // Обработчик уменьшения
          style={buttonStyle}
        >
          - Decrement
        </button>
        
        <button 
          onClick={onReset}                           // Обработчик сброса
          style={buttonStyle}
        >
          Reset
        </button>
      </div>

      {/* Установка произвольного значения */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Обновление локального состояния
          placeholder="Enter value"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button 
          onClick={handleSetValue}                    // Обработчик установки значения
          style={buttonStyle}
        >
          Set Value
        </button>
      </div>

      {/* Статистика */}
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Operations performed:</strong> {operationsCount}</p>
      </div>

      {/* История операций */}
      <div>
        <h3>Operation History:</h3>
        <ul>
          {history.map((operation, index) => (        // Отображение истории операций
            <li key={index}>{operation}</li>          // Каждая операция в списке
          ))}
        </ul>
      </div>
    </div>
  );
};

// Стили для кнопок
const buttonStyle = {
  padding: '10px 15px',
  margin: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px'
};

// Функция для映射 state к props компонента
const mapStateToProps = (state) => ({
  count: state.counter.count,                        // state.counter - из combineReducers
  history: state.counter.history,                    // История из состояния
  operationsCount: state.counter.operationsCount     // Счетчик операций
});

// Функция для映射 dispatch к props компонента
const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => dispatch(increment()),          // Диспатч действия увеличения
  onDecrement: () => dispatch(decrement()),          // Диспатч действия уменьшения
  onReset: () => dispatch(reset()),                  // Диспатч действия сброса
  onSetValue: (value) => dispatch(setValue(value))   // Диспатч действия установки значения
});

// Подключение компонента к Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

### 1.5. App.js и index.js

```jsx
// src/App.js

import React from 'react';
import { Provider } from 'react-redux';              // Импорт Provider для Redux
import store from './store';                         // Импорт хранилища
import Counter from './components/Counter';          // Импорт компонента счетчика
import './App.css';

function App() {
  return (
    <Provider store={store}>                         {/* Оборачиваем приложение в Provider */}
      <div className="App">
        <Counter />                                  {/* Рендер компонента счетчика */}
      </div>
    </Provider>
  );
}

export default App;
```

```javascript
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Упражнение 2: Todo List

### 2.1. Actions для Todo

```javascript
// src/actions/todoActions.js

// Константы типов действий
export const ADD_TODO = 'ADD_TODO';                  // Добавление задачи
export const TOGGLE_TODO = 'TOGGLE_TODO';            // Переключение статуса задачи
export const DELETE_TODO = 'DELETE_TODO';            // Удаление задачи
export const EDIT_TODO = 'EDIT_TODO';                // Редактирование задачи
export const SET_FILTER = 'SET_FILTER';              // Установка фильтра

// Создатели действий
export const addTodo = (text) => ({                  // Добавление новой задачи
  type: ADD_TODO,
  payload: {
    id: Date.now(),                                  // Генерация ID на основе времени
    text,                                            // Текст задачи
    completed: false                                 // Статус выполнения
  }
});

export const toggleTodo = (id) => ({                 // Переключение статуса выполнения
  type: TOGGLE_TODO,
  payload: id                                        // ID задачи для переключения
});

export const deleteTodo = (id) => ({                 // Удаление задачи
  type: DELETE_TODO,
  payload: id                                        // ID задачи для удаления
});

export const editTodo = (id, newText) => ({          // Редактирование текста задачи
  type: EDIT_TODO,
  payload: {
    id,                                             // ID редактируемой задачи
    text: newText                                   // Новый текст
  }
});

export const setFilter = (filter) => ({              // Установка фильтра отображения
  type: SET_FILTER,
  payload: filter                                   // Тип фильтра
});
```

### 2.2. Reducer для Todo

```javascript
// src/reducers/todoReducer.js

import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_FILTER
} from '../actions/todoActions';

// Начальное состояние
const initialState = {
  todos: [],                                        // Массив задач
  filter: 'ALL'                                     // Активный фильтр: ALL, ACTIVE, COMPLETED
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,                                   // Копируем состояние
        todos: [...state.todos, action.payload]     // Добавляем новую задачу в конец массива
      };
    
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>              // Проходим по всем задачам
          todo.id === action.payload                // Находим задачу по ID
            ? { ...todo, completed: !todo.completed } // Инвертируем статус выполнения
            : todo                                 // Остальные задачи без изменений
        )
      };
    
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo =>           // Фильтруем массив
          todo.id !== action.payload                // Удаляем задачу с указанным ID
        )
      };
    
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id             // Находим задачу по ID
            ? { ...todo, text: action.payload.text } // Обновляем текст
            : todo
        )
      };
    
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload                      // Устанавливаем новый фильтр
      };
    
    default:
      return state;
  }
};

export default todoReducer;
```

### 2.3. Комбинирование редьюсеров

```javascript
// src/reducers/index.js

import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import todoReducer from './todoReducer';

// Комбинируем все редьюсеры
const rootReducer = combineReducers({
  counter: counterReducer,                          // Состояние счетчика
  todo: todoReducer                                 // Состояние списка задач
});

export default rootReducer;
```

### 2.4. Компонент Todo List

```jsx
// src/components/TodoList.jsx

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  editTodo, 
  setFilter 
} from '../actions/todoActions';

const TodoList = ({ 
  todos, 
  filter, 
  onAddTodo, 
  onToggleTodo, 
  onDeleteTodo, 
  onEditTodo, 
  onSetFilter 
}) => {
  const [text, setText] = useState('');                    // Текст новой задачи
  const [editingId, setEditingId] = useState(null);        // ID редактируемой задачи
  const [editText, setEditText] = useState('');            // Текст для редактирования

  // Обработчик добавления задачи
  const handleAddTodo = () => {
    if (text.trim()) {                                     // Проверяем, что текст не пустой
      onAddTodo(text);                                     // Диспатчим действие
      setText('');                                         // Очищаем input
    }
  };

  // Обработчик начала редактирования
  const startEditing = (todo) => {
    setEditingId(todo.id);                                 // Устанавливаем ID редактируемой задачи
    setEditText(todo.text);                                // Устанавливаем текущий текст
  };

  // Обработчик сохранения редактирования
  const saveEdit = () => {
    if (editText.trim()) {                                 // Проверяем, что текст не пустой
      onEditTodo(editingId, editText);                     // Диспатчим действие редактирования
      setEditingId(null);                                  // Сбрасываем режим редактирования
      setEditText('');                                     // Очищаем текст редактирования
    }
  };

  // Обработчик отмены редактирования
  const cancelEdit = () => {
    setEditingId(null);                                    // Сбрасываем режим редактирования
    setEditText('');                                       // Очищаем текст редактирования
  };

  // Фильтрация задач в зависимости от выбранного фильтра
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'ACTIVE':
        return !todo.completed;                            // Только невыполненные
      case 'COMPLETED':
        return todo.completed;                             // Только выполненные
      default:
        return true;                                       // Все задачи
    }
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Todo List with Redux</h1>
      
      {/* Добавление новой задачи */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}        // Обновление текста новой задачи
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()} // Добавление по Enter
          placeholder="Enter new todo..."
          style={{ 
            padding: '10px', 
            width: '70%', 
            marginRight: '10px',
            fontSize: '16px'
          }}
        />
        <button 
          onClick={handleAddTodo}                          // Обработчик добавления
          style={buttonStyle}
        >
          Add Todo
        </button>
      </div>

      {/* Фильтры */}
      <div style={{ marginBottom: '20px' }}>
        <strong>Filter: </strong>
        {['ALL', 'ACTIVE', 'COMPLETED'].map(filterType => (
          <button
            key={filterType}
            onClick={() => onSetFilter(filterType)}        // Установка фильтра
            style={{
              ...buttonStyle,
              backgroundColor: filter === filterType ? '#28a745' : '#6c757d'
            }}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Список задач */}
      <div>
        <h3>
          Tasks: {filteredTodos.length} 
          ({todos.filter(t => !t.completed).length} active)
        </h3>
        
        {filteredTodos.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTodos.map(todo => (
              <li 
                key={todo.id} 
                style={{ 
                  padding: '10px', 
                  border: '1px solid #ddd', 
                  marginBottom: '5px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: todo.completed ? '#f8f9fa' : 'white'
                }}
              >
                {/* Режим редактирования или отображения */}
                {editingId === todo.id ? (
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)} // Обновление текста редактирования
                      style={{ width: '100%', padding: '5px' }}
                    />
                    <button onClick={saveEdit} style={{ ...smallButton, backgroundColor: '#28a745' }}>
                      Save
                    </button>
                    <button onClick={cancelEdit} style={{ ...smallButton, backgroundColor: '#dc3545' }}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span 
                      style={{ 
                        flex: 1,
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? '#6c757d' : 'black'
                      }}
                      onClick={() => onToggleTodo(todo.id)} // Переключение по клику на текст
                    >
                      {todo.text}
                    </span>
                    
                    <div>
                      <button 
                        onClick={() => startEditing(todo)}   // Начало редактирования
                        style={{ ...smallButton, backgroundColor: '#ffc107' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDeleteTodo(todo.id)} // Удаление задачи
                        style={{ ...smallButton, backgroundColor: '#dc3545' }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Стили для кнопок
const buttonStyle = {
  padding: '10px 15px',
  fontSize: '14px',
  cursor: 'pointer',
  color: 'white',
  border: 'none',
  borderRadius: '4px'
};

const smallButton = {
  padding: '5px 10px',
  fontSize: '12px',
  cursor: 'pointer',
  color: 'white',
  border: 'none',
  borderRadius: '3px',
  marginLeft: '5px'
};

// Подключение к Redux
const mapStateToProps = (state) => ({
  todos: state.todo.todos,                                // Все задачи из состояния
  filter: state.todo.filter                               // Активный фильтр
});

const mapDispatchToProps = (dispatch) => ({
  onAddTodo: (text) => dispatch(addTodo(text)),           // Диспатч добавления
  onToggleTodo: (id) => dispatch(toggleTodo(id)),         // Диспатч переключения
  onDeleteTodo: (id) => dispatch(deleteTodo(id)),         // Диспатч удаления
  onEditTodo: (id, text) => dispatch(editTodo(id, text)), // Диспатч редактирования
  onSetFilter: (filter) => dispatch(setFilter(filter))    // Диспатч установки фильтра
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

### 2.5. Обновленный App.js

```jsx
// src/App.js

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
        <hr style={{ margin: '40px 0' }} />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
```

## Упражнение 3: Асинхронные действия с Redux Thunk

### 3.1. Установка Redux Thunk

```bash
npm install redux-thunk
```

### 3.2. Обновление store

```javascript
// src/store/index.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';                          // Импорт middleware
import counterReducer from '../reducers/counterReducer';
import todoReducer from '../reducers/todoReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  todo: todoReducer
});

// Применяем middleware thunk
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)                                  // Подключение thunk middleware
);

export default store;
```

### 3.3. Асинхронные действия

```javascript
// src/actions/asyncActions.js

// Синхронные действия
export const FETCH_DATA_START = 'FETCH_DATA_START';       // Начало загрузки
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';   // Успешная загрузка
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';   // Ошибка загрузки

// Создатели синхронных действий
export const fetchDataStart = () => ({
  type: FETCH_DATA_START
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error
});

// Асинхронный создатель действия (thunk)
export const fetchData = () => {
  return async (dispatch) => {                            // Thunk возвращает функцию
    dispatch(fetchDataStart());                           // Диспатч начала загрузки
    
    try {
      // Имитация API запроса
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            users: [
              { id: 1, name: 'John Doe', email: 'john@example.com' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
              { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
            ]
          });
        }, 2000);                                        // Задержка 2 секунды
      });
      
      dispatch(fetchDataSuccess(response.users));         // Диспатч успешной загрузки
    } catch (error) {
      dispatch(fetchDataFailure(error.message));          // Диспатч ошибки
    }
  };
};
```

### 3.4. Редьюсер для асинхронных данных

```javascript
// src/reducers/dataReducer.js

import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from '../actions/asyncActions';

const initialState = {
  data: [],                                              // Загруженные данные
  loading: false,                                        // Флаг загрузки
  error: null,                                           // Ошибка (если есть)
  lastFetch: null                                        // Время последней загрузки
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        loading: true,                                   // Устанавливаем флаг загрузки
        error: null                                      // Сбрасываем ошибку
      };
    
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,                                  // Сбрасываем флаг загрузки
        data: action.payload,                            // Сохраняем полученные данные
        error: null,                                     // Сбрасываем ошибку
        lastFetch: new Date().toISOString()              // Сохраняем время загрузки
      };
    
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,                                  // Сбрасываем флаг загрузки
        error: action.payload,                           // Сохраняем ошибку
        data: []                                         // Очищаем данные при ошибке
      };
    
    default:
      return state;
  }
};

export default dataReducer;
```

### 3.5. Компонент для асинхронных данных

```jsx
// src/components/AsyncData.jsx

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/asyncActions';

const AsyncData = ({ 
  data, 
  loading, 
  error, 
  lastFetch, 
  onFetchData 
}) => {
  // Загрузка данных при монтировании компонента
  useEffect(() => {
    onFetchData();                                        // Вызов асинхронного действия
  }, [onFetchData]);                                      // Зависимость от функции

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Async Data with Redux Thunk</h1>
      
      <button 
        onClick={onFetchData}                             // Ручная загрузка данных
        disabled={loading}                                // Блокировка при загрузке
        style={{
          ...buttonStyle,
          backgroundColor: loading ? '#6c757d' : '#007bff'
        }}
      >
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>

      {/* Отображение времени последней загрузки */}
      {lastFetch && (
        <p style={{ color: '#6c757d', fontSize: '14px' }}>
          Last fetched: {new Date(lastFetch).toLocaleString()}
        </p>
      )}

      {/* Отображение состояния загрузки */}
      {loading && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div style={{ 
            border: '4px solid #f3f3f3', 
            borderTop: '4px solid #007bff', 
            borderRadius: '50%', 
            width: '40px', 
            height: '40px', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p>Loading data...</p>
        </div>
      )}

      {/* Отображение ошибки */}
      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '4px',
          margin: '10px 0'
        }}>
          Error: {error}
        </div>
      )}

      {/* Отображение данных */}
      {!loading && data.length > 0 && (
        <div>
          <h3>Loaded Data:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.map(item => (
              <li 
                key={item.id}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  marginBottom: '5px',
                  backgroundColor: 'white'
                }}
              >
                <strong>{item.name}</strong> - {item.email}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Стили для анимации спиннера */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

// Стили для кнопок
const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  marginBottom: '20px'
};

// Подключение к Redux
const mapStateToProps = (state) => ({
  data: state.data.data,                                 // Данные из состояния
  loading: state.data.loading,                           // Флаг загрузки
  error: state.data.error,                               // Ошибка
  lastFetch: state.data.lastFetch                        // Время последней загрузки
});

const mapDispatchToProps = (dispatch) => ({
  onFetchData: () => dispatch(fetchData())               // Диспатч асинхронного действия
});

export default connect(mapStateToProps, mapDispatchToProps)(AsyncData);
```

## Запуск приложения

```bash
npm start
```

Эти упражнения демонстрируют все основные концепции Redux в React приложении с подробными комментариями для каждой строки кода.