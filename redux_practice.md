# Упражнения по Redux в React приложении

## Настройка проекта

```bash
npx create-react-app redux-exercises
cd redux-exercises
npm install redux react-redux @reduxjs/toolkit
```

## Упражнение 1: Базовый счетчик

### 1.1. Создание типов действий
```javascript
// src/constants/actionTypes.js

// Константы для типов действий (предотвращают опечатки)
export const INCREMENT = 'INCREMENT';          // Увеличить счетчик
export const DECREMENT = 'DECREMENT';          // Уменьшить счетчик
export const RESET = 'RESET';                  // Сбросить счетчик
export const INCREMENT_BY_AMOUNT = 'INCREMENT_BY_AMOUNT'; // Увеличить на значение
```

### 1.2. Создание действий (Actions)
```javascript
// src/actions/counterActions.js

import { 
  INCREMENT, 
  DECREMENT, 
  RESET, 
  INCREMENT_BY_AMOUNT 
} from '../constants/actionTypes';

// Простое действие - увеличить на 1
export const increment = () => ({
  type: INCREMENT,        // Тип действия
  // payload не нужен, так как увеличение фиксированное
});

// Простое действие - уменьшить на 1
export const decrement = () => ({
  type: DECREMENT,        // Тип действия
});

// Простое действие - сбросить в 0
export const reset = () => ({
  type: RESET,            // Тип действия
});

// Действие с payload - увеличить на указанное значение
export const incrementByAmount = (amount) => ({
  type: INCREMENT_BY_AMOUNT,  // Тип действия
  payload: amount,            // Данные для изменения состояния
});
```

### 1.3. Создание редуктора (Reducer)
```javascript
// src/reducers/counterReducer.js

import { 
  INCREMENT, 
  DECREMENT, 
  RESET, 
  INCREMENT_BY_AMOUNT 
} from '../constants/actionTypes';

// Начальное состояние
const initialState = {
  value: 0,               // Текущее значение счетчика
  history: [],            // История изменений
  operationCount: 0       // Количество операций
};

// Редуктор - чистая функция, которая принимает состояние и действие, возвращает новое состояние
const counterReducer = (state = initialState, action) => {
  switch (action.type) {   // Проверяем тип действия
    
    case INCREMENT:
      return {             // ВОЗВРАЩАЕМ НОВЫЙ ОБЪЕКТ, не изменяем старый!
        ...state,          // Копируем все поля из предыдущего состояния
        value: state.value + 1,                    // Увеличиваем значение
        history: [...state.history, state.value + 1], // Добавляем в историю
        operationCount: state.operationCount + 1   // Увеличиваем счетчик операций
      };
    
    case DECREMENT:
      return {
        ...state,          // Копируем состояние
        value: state.value - 1,                    // Уменьшаем значение
        history: [...state.history, state.value - 1], // Добавляем в историю
        operationCount: state.operationCount + 1   // Увеличиваем счетчик операций
      };
    
    case RESET:
      return {
        ...state,          // Копируем состояние
        value: 0,                                  // Сбрасываем значение
        history: [...state.history, 0],            // Добавляем в историю
        operationCount: state.operationCount + 1   // Увеличиваем счетчик операций
      };
    
    case INCREMENT_BY_AMOUNT:
      return {
        ...state,          // Копируем состояние
        value: state.value + action.payload,       // Увеличиваем на переданное значение
        history: [...state.history, state.value + action.payload], // Добавляем в историю
        operationCount: state.operationCount + 1   // Увеличиваем счетчик операций
      };
    
    default:
      // Если действие не распознано, возвращаем текущее состояние без изменений
      return state;
  }
};

export default counterReducer;
```

### 1.4. Создание хранилища (Store)
```javascript
// src/store/store.js

import { createStore } from 'redux';              // Импортируем createStore из Redux
import counterReducer from '../reducers/counterReducer'; // Импортируем наш редуктор

// Создаем хранилище Redux
const store = createStore(
  counterReducer,                                  // Передаем корневой редуктор
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()           // Подключаем Redux DevTools
);

export default store;                             // Экспортируем хранилище
```

### 1.5. Компонент счетчика
```javascript
// src/components/Counter.js

import React, { useState } from 'react';          // Импортируем React и хук useState
import { useSelector, useDispatch } from 'react-redux'; // Импортируем хуки Redux
import { 
  increment, 
  decrement, 
  reset, 
  incrementByAmount 
} from '../actions/counterActions';                // Импортируем наши действия

const Counter = () => {
  // useSelector - хук для доступа к состоянию Redux
  const counter = useSelector(state => state);    // Получаем все состояние счетчика
  
  // useDispatch - хук для отправки действий
  const dispatch = useDispatch();                 // Получаем функцию dispatch
  
  // Локальное состояние для input
  const [amount, setAmount] = useState('');       // Состояние для значения input

  // Обработчик изменения input
  const handleAmountChange = (e) => {
    setAmount(e.target.value);                    // Обновляем состояние при вводе
  };

  // Обработчик увеличения на указанное значение
  const handleIncrementByAmount = () => {
    const numAmount = parseInt(amount);           // Преобразуем строку в число
    if (!isNaN(numAmount)) {                      // Проверяем, что это число
      dispatch(incrementByAmount(numAmount));     // Отправляем действие с payload
      setAmount('');                              // Очищаем input
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Упражнение 1: Счетчик Redux</h2>
      
      {/* Отображение текущего значения счетчика */}
      <div style={{ fontSize: '2rem', margin: '20px 0' }}>
        Текущее значение: <strong>{counter.value}</strong>
      </div>
      
      {/* Кнопки управления счетчиком */}
      <div style={{ margin: '10px 0' }}>
        <button 
          onClick={() => dispatch(increment())}   // Отправляем действие INCREMENT
          style={{ margin: '5px', padding: '10px' }}
        >
          +1
        </button>
        
        <button 
          onClick={() => dispatch(decrement())}   // Отправляем действие DECREMENT
          style={{ margin: '5px', padding: '10px' }}
        >
          -1
        </button>
        
        <button 
          onClick={() => dispatch(reset())}       // Отправляем действие RESET
          style={{ margin: '5px', padding: '10px' }}
        >
          Сбросить
        </button>
      </div>
      
      {/* Увеличение на произвольное значение */}
      <div style={{ margin: '20px 0' }}>
        <input 
          type="number" 
          value={amount}                          // Привязываем значение к состоянию
          onChange={handleAmountChange}           // Обработчик изменения
          placeholder="Введите число"
          style={{ margin: '5px', padding: '8px' }}
        />
        <button 
          onClick={handleIncrementByAmount}       // Обработчик клика
          style={{ margin: '5px', padding: '8px' }}
        >
          Увеличить на значение
        </button>
      </div>
      
      {/* Дополнительная информация */}
      <div style={{ marginTop: '20px' }}>
        <p>Количество операций: {counter.operationCount}</p>
        <p>
          История: {counter.history && counter.history.slice(-5).join(', ')}
          {/* Показываем последние 5 значений */}
        </p>
      </div>
    </div>
  );
};

export default Counter;
```

## Упражнение 2: Список задач (Todo List)

### 2.1. Типы действий для Todo
```javascript
// src/constants/todoActionTypes.js

export const ADD_TODO = 'ADD_TODO';              // Добавить задачу
export const TOGGLE_TODO = 'TOGGLE_TODO';        // Переключить статус выполнения
export const DELETE_TODO = 'DELETE_TODO';        // Удалить задачу
export const EDIT_TODO = 'EDIT_TODO';            // Редактировать задачу
export const SET_FILTER = 'SET_FILTER';          // Установить фильтр
```

### 2.2. Действия для Todo
```javascript
// src/actions/todoActions.js

import { 
  ADD_TODO, 
  TOGGLE_TODO, 
  DELETE_TODO, 
  EDIT_TODO, 
  SET_FILTER 
} from '../constants/todoActionTypes';

// Генератор ID для задач
let nextTodoId = 0;                              // Простой счетчик для ID

// Добавить задачу
export const addTodo = (text) => ({
  type: ADD_TODO,                                // Тип действия
  payload: {                                     // Данные задачи
    id: ++nextTodoId,                            // Увеличиваем ID и используем
    text: text,                                  // Текст задачи
    completed: false                             // Статус выполнения
  }
});

// Переключить статус выполнения
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,                             // Тип действия
  payload: { id }                                // ID задачи для переключения
});

// Удалить задачу
export const deleteTodo = (id) => ({
  type: DELETE_TODO,                             // Тип действия
  payload: { id }                                // ID задачи для удаления
});

// Редактировать задачу
export const editTodo = (id, newText) => ({
  type: EDIT_TODO,                               // Тип действия
  payload: { id, newText }                       // ID и новый текст
});

// Установить фильтр
export const setFilter = (filter) => ({
  type: SET_FILTER,                              // Тип действия
  payload: { filter }                            // Тип фильтра
});
```

### 2.3. Редуктор для Todo
```javascript
// src/reducers/todoReducer.js

import { 
  ADD_TODO, 
  TOGGLE_TODO, 
  DELETE_TODO, 
  EDIT_TODO, 
  SET_FILTER 
} from '../constants/todoActionTypes';

// Начальное состояние
const initialState = {
  todos: [],                                     // Массив задач
  filter: 'ALL'                                  // Активный фильтр: ALL, ACTIVE, COMPLETED
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ADD_TODO:
      return {
        ...state,                                // Копируем состояние
        todos: [                                 // Создаем новый массив todos
          ...state.todos,                        // Копируем существующие задачи
          action.payload                         // Добавляем новую задачу
        ]
      };
    
    case TOGGLE_TODO:
      return {
        ...state,                                // Копируем состояние
        todos: state.todos.map(todo =>           // Проходим по всем задачам
          todo.id === action.payload.id          // Находим нужную задачу по ID
            ? { ...todo, completed: !todo.completed } // Инвертируем статус выполнения
            : todo                              // Остальные задачи без изменений
        )
      };
    
    case DELETE_TODO:
      return {
        ...state,                                // Копируем состояние
        todos: state.todos.filter(todo =>        // Фильтруем массив
          todo.id !== action.payload.id          // Убираем задачу с указанным ID
        )
      };
    
    case EDIT_TODO:
      return {
        ...state,                                // Копируем состояние
        todos: state.todos.map(todo =>           // Проходим по всем задачам
          todo.id === action.payload.id          // Находим нужную задачу по ID
            ? { ...todo, text: action.payload.newText } // Обновляем текст
            : todo                              // Остальные задачи без изменений
        )
      };
    
    case SET_FILTER:
      return {
        ...state,                                // Копируем состояние
        filter: action.payload.filter            // Устанавливаем новый фильтр
      };
    
    default:
      return state;                              // Возвращаем состояние без изменений
  }
};

export default todoReducer;
```

### 2.4. Комбинирование редукторов
```javascript
// src/reducers/rootReducer.js

import { combineReducers } from 'redux';         // Импортируем combineReducers
import counterReducer from './counterReducer';   // Импортируем редуктор счетчика
import todoReducer from './todoReducer';         // Импортируем редуктор задач

// Комбинируем редукторы
const rootReducer = combineReducers({
  counter: counterReducer,                       // Состояние счетчика
  todos: todoReducer                             // Состояние задач
});

export default rootReducer;
```

### 2.5. Обновленное хранилище
```javascript
// src/store/store.js

import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer'; // Импортируем комбинированный редуктор

const store = createStore(
  rootReducer,                                    // Передаем корневой редуктор
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
```

### 2.6. Компонент Todo List
```javascript
// src/components/TodoList.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  editTodo, 
  setFilter 
} from '../actions/todoActions';

const TodoList = () => {
  // Получаем состояние из Redux store
  const { todos, filter } = useSelector(state => state.todos);
  
  const dispatch = useDispatch();                 // Функция для отправки действий
  
  // Локальное состояние для новой задачи и редактирования
  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Фильтрация задач в зависимости от активного фильтра
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'ACTIVE':
        return !todo.completed;                   // Только невыполненные
      case 'COMPLETED':
        return todo.completed;                    // Только выполненные
      default:
        return true;                              // Все задачи
    }
  });

  // Обработчик добавления новой задачи
  const handleAddTodo = () => {
    if (newTodoText.trim()) {                     // Проверяем, что текст не пустой
      dispatch(addTodo(newTodoText.trim()));      // Отправляем действие добавления
      setNewTodoText('');                         // Очищаем input
    }
  };

  // Обработчик начала редактирования
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);                        // Устанавливаем ID редактируемой задачи
    setEditText(todo.text);                       // Устанавливаем текст для редактирования
  };

  // Обработчик сохранения редактирования
  const handleSaveEdit = () => {
    if (editText.trim()) {                        // Проверяем, что текст не пустой
      dispatch(editTodo(editingId, editText.trim())); // Отправляем действие редактирования
    }
    setEditingId(null);                           // Сбрасываем режим редактирования
    setEditText('');                              // Очищаем текст редактирования
  };

  // Обработчик отмены редактирования
  const handleCancelEdit = () => {
    setEditingId(null);                           // Сбрасываем режим редактирования
    setEditText('');                              // Очищаем текст редактирования
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Упражнение 2: Список задач Redux</h2>
      
      {/* Форма добавления новой задачи */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Введите новую задачу"
          style={{ 
            marginRight: '10px', 
            padding: '8px', 
            width: '300px' 
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()} // Добавление по Enter
        />
        <button 
          onClick={handleAddTodo}
          style={{ padding: '8px 16px' }}
        >
          Добавить задачу
        </button>
      </div>
      
      {/* Фильтры */}
      <div style={{ marginBottom: '20px' }}>
        <strong>Фильтры: </strong>
        {['ALL', 'ACTIVE', 'COMPLETED'].map(filterType => (
          <button
            key={filterType}
            onClick={() => dispatch(setFilter(filterType))}
            style={{ 
              margin: '0 5px', 
              padding: '5px 10px',
              backgroundColor: filter === filterType ? '#007bff' : '#f8f9fa',
              color: filter === filterType ? 'white' : 'black'
            }}
          >
            {filterType === 'ALL' && 'Все'}
            {filterType === 'ACTIVE' && 'Активные'}
            {filterType === 'COMPLETED' && 'Выполненные'}
          </button>
        ))}
      </div>
      
      {/* Список задач */}
      <div>
        <h3>Задачи ({filteredTodos.length})</h3>
        {filteredTodos.length === 0 ? (
          <p>Нет задач для отображения</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTodos.map(todo => (
              <li 
                key={todo.id}
                style={{ 
                  padding: '10px', 
                  margin: '5px 0', 
                  border: '1px solid #ddd',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: todo.completed ? '#f8f9fa' : 'white'
                }}
              >
                {/* Режим редактирования */}
                {editingId === todo.id ? (
                  <div style={{ flexGrow: 1 }}>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{ width: '100%', padding: '5px' }}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                    />
                    <div style={{ marginTop: '5px' }}>
                      <button 
                        onClick={handleSaveEdit}
                        style={{ marginRight: '5px', padding: '3px 8px' }}
                      >
                        Сохранить
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        style={{ padding: '3px 8px' }}
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Режим просмотра */
                  <>
                    <div style={{ flexGrow: 1 }}>
                      <span
                        style={{ 
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          cursor: 'pointer'
                        }}
                        onClick={() => dispatch(toggleTodo(todo.id))} // Переключение по клику на текст
                      >
                        {todo.text}
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleStartEdit(todo)}
                        style={{ marginRight: '5px', padding: '3px 8px' }}
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => dispatch(deleteTodo(todo.id))}
                        style={{ padding: '3px 8px', backgroundColor: '#dc3545', color: 'white' }}
                      >
                        Удалить
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Статистика */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa' }}>
        <strong>Статистика:</strong>
        <p>Всего задач: {todos.length}</p>
        <p>Выполнено: {todos.filter(t => t.completed).length}</p>
        <p>Активных: {todos.filter(t => !t.completed).length}</p>
      </div>
    </div>
  );
};

export default TodoList;
```

### 2.7. Главный компонент приложения
```javascript
// src/App.js

import React from 'react';
import { Provider } from 'react-redux';           // Provider для подключения Redux
import store from './store/store';                // Импортируем наше хранилище
import Counter from './components/Counter';       // Компонент счетчика
import TodoList from './components/TodoList';     // Компонент списка задач
import './App.css';

function App() {
  return (
    // Provider делает store доступным для всех компонентов
    <Provider store={store}>
      <div className="App">
        <header style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
          <h1>Redux Упражнения</h1>
          <p>Изучение действий и редукторов в Redux</p>
        </header>
        
        <main>
          {/* Компонент счетчика */}
          <Counter />
          
          <hr style={{ margin: '40px 0' }} />
          
          {/* Компонент списка задач */}
          <TodoList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
```

## Запуск приложения

```bash
npm start
```

## Что изучается в этих упражнениях:

### Действия (Actions):
- Создание простых действий
- Действия с payload
- Action creators
- Организация констант

### Редукторы (Reducers):
- Чистые функции
- Иммутабельные обновления
- Обработка разных типов действий
- Комбинирование редукторов

### Работа с React:
- Хуки useSelector и useDispatch
- Интеграция Redux с React
- Локальное состояние vs глобальное состояние

### Паттерны Redux:
- Однонаправленный поток данных
- Предсказуемое состояние
- Централизованное управление состоянием

Каждое упражнение содержит подробные комментарии, объясняющие назначение каждой строки кода и принципы работы Redux.