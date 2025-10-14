React проект с Redux, включающий упражнения с подробными комментариями. 

## Структура проекта

```
my-app/
├── src/
│   ├── store/
│   │   ├── index.js
│   │   ├── actions/
│   │   └── reducers/
│   ├── components/
│   └── App.js
```

## 1. Настройка Store

**src/store/index.js**
```jsx
import { createStore, combineReducers } from 'redux';
import counterReducer from './reducers/counterReducer';
import todoReducer from './reducers/todoReducer';

// Комбинируем все редьюсеры в один корневой редьюсер
const rootReducer = combineReducers({
  counter: counterReducer,    // Редьюсер для счетчика
  todos: todoReducer          // Редьюсер для списка задач
});

// Создаем store с корневым редьюсером
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Для Redux DevTools
);

export default store;
```

## 2. Действия (Actions)

**src/store/actions/counterActions.js**
```jsx
// Константы для типов действий
export const INCREMENT = 'INCREMENT';          // Увеличить счетчик
export const DECREMENT = 'DECREMENT';          // Уменьшить счетчик
export const RESET = 'RESET';                  // Сбросить счетчик
export const INCREMENT_BY_AMOUNT = 'INCREMENT_BY_AMOUNT'; // Увеличить на определенное значение

// Action Creator для увеличения счетчика
export const increment = () => ({
  type: INCREMENT                              // Возвращаем объект действия с типом INCREMENT
});

// Action Creator для уменьшения счетчика
export const decrement = () => ({
  type: DECREMENT                              // Возвращаем объект действия с типом DECREMENT
});

// Action Creator для сброса счетчика
export const reset = () => ({
  type: RESET                                  // Возвращаем объект действия с типом RESET
});

// Action Creator для увеличения на определенное значение
export const incrementByAmount = (amount) => ({
  type: INCREMENT_BY_AMOUNT,                   // Тип действия
  payload: amount                              // Данные, которые передаем в редьюсер
});
```

**src/store/actions/todoActions.js**
```jsx
// Константы для типов действий с задачами
export const ADD_TODO = 'ADD_TODO';            // Добавить задачу
export const TOGGLE_TODO = 'TOGGLE_TODO';      // Переключить статус выполнения
export const DELETE_TODO = 'DELETE_TODO';      // Удалить задачу
export const EDIT_TODO = 'EDIT_TODO';          // Редактировать задачу

// Action Creator для добавления новой задачи
export const addTodo = (text) => ({
  type: ADD_TODO,                              // Тип действия
  payload: {                                   // Данные задачи
    id: Date.now(),                            // Уникальный ID на основе времени
    text: text,                                // Текст задачи
    completed: false                           // Статус выполнения (по умолчанию false)
  }
});

// Action Creator для переключения статуса выполнения
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,                           // Тип действия
  payload: id                                  // ID задачи для переключения
});

// Action Creator для удаления задачи
export const deleteTodo = (id) => ({
  type: DELETE_TODO,                           // Тип действия
  payload: id                                  // ID задачи для удаления
});

// Action Creator для редактирования задачи
export const editTodo = (id, newText) => ({
  type: EDIT_TODO,                             // Тип действия
  payload: {                                   // Данные для редактирования
    id: id,                                    // ID редактируемой задачи
    text: newText                              // Новый текст задачи
  }
});
```

## 3. Редьюсеры (Reducers)

**src/store/reducers/counterReducer.js**
```jsx
import { 
  INCREMENT, 
  DECREMENT, 
  RESET, 
  INCREMENT_BY_AMOUNT 
} from '../actions/counterActions';

// Начальное состояние для счетчика
const initialState = {
  value: 0,                                    // Текущее значение счетчика
  history: []                                  // История изменений
};

// Редьюсер для управления состоянием счетчика
const counterReducer = (state = initialState, action) => {
  switch (action.type) {                       // Проверяем тип действия
    case INCREMENT:
      return {
        ...state,                              // Копируем текущее состояние
        value: state.value + 1,                // Увеличиваем значение на 1
        history: [...state.history, '+1']      // Добавляем запись в историю
      };
    
    case DECREMENT:
      return {
        ...state,                              // Копируем текущее состояние
        value: state.value - 1,                // Уменьшаем значение на 1
        history: [...state.history, '-1']      // Добавляем запись в историю
      };
    
    case RESET:
      return {
        ...state,                              // Копируем текущее состояние
        value: 0,                              // Сбрасываем значение на 0
        history: [...state.history, 'reset']   // Добавляем запись в историю
      };
    
    case INCREMENT_BY_AMOUNT:
      return {
        ...state,                              // Копируем текущее состояние
        value: state.value + action.payload,   // Увеличиваем на переданное значение
        history: [...state.history, `+${action.payload}`] // Добавляем запись в историю
      };
    
    default:
      return state;                            // Если действие не распознано, возвращаем текущее состояние
  }
};

export default counterReducer;
```

**src/store/reducers/todoReducer.js**
```jsx
import { 
  ADD_TODO, 
  TOGGLE_TODO, 
  DELETE_TODO, 
  EDIT_TODO 
} from '../actions/todoActions';

// Начальное состояние для списка задач
const initialState = {
  todos: [],                                   // Массив задач
  filter: 'all'                                // Фильтр: all, active, completed
};

// Редьюсер для управления состоянием задач
const todoReducer = (state = initialState, action) => {
  switch (action.type) {                       // Проверяем тип действия
    
    case ADD_TODO:
      return {
        ...state,                              // Копируем текущее состояние
        todos: [...state.todos, action.payload] // Добавляем новую задачу в конец массива
      };
    
    case TOGGLE_TODO:
      return {
        ...state,                              // Копируем текущее состояние
        todos: state.todos.map(todo =>         // Проходим по всем задачам
          todo.id === action.payload           // Если ID совпадает
            ? { ...todo, completed: !todo.completed } // Меняем статус выполнения
            : todo                            // Иначе оставляем без изменений
        )
      };
    
    case DELETE_TODO:
      return {
        ...state,                              // Копируем текущее состояние
        todos: state.todos.filter(todo =>      // Фильтруем массив задач
          todo.id !== action.payload           // Оставляем только задачи с другим ID
        )
      };
    
    case EDIT_TODO:
      return {
        ...state,                              // Копируем текущее состояние
        todos: state.todos.map(todo =>         // Проходим по всем задачам
          todo.id === action.payload.id        // Если ID совпадает
            ? { ...todo, text: action.payload.text } // Обновляем текст задачи
            : todo                            // Иначе оставляем без изменений
        )
      };
    
    default:
      return state;                            // Если действие не распознано, возвращаем текущее состояние
  }
};

export default todoReducer;
```

## 4. React Компоненты

**src/components/Counter.js**
```jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  increment, 
  decrement, 
  reset, 
  incrementByAmount 
} from '../store/actions/counterActions';

const Counter = () => {
  // useSelector - хук для доступа к состоянию Redux
  const counter = useSelector(state => state.counter); // Получаем состояние счетчика
  
  // useDispatch - хук для отправки действий
  const dispatch = useDispatch();               // Получаем функцию dispatch
  
  // Локальное состояние для ввода значения
  const [amount, setAmount] = useState(0);     // Состояние для ввода числа

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>Счетчик: {counter.value}</h2>         {/* Отображаем текущее значение счетчика */}
      
      {/* Кнопки для управления счетчиком */}
      <button onClick={() => dispatch(increment())}>+1</button> {/* Отправляем действие INCREMENT */}
      <button onClick={() => dispatch(decrement())}>-1</button> {/* Отправляем действие DECREMENT */}
      <button onClick={() => dispatch(reset())}>Сбросить</button> {/* Отправляем действие RESET */}
      
      <div style={{ marginTop: '10px' }}>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(Number(e.target.value))} // Обновляем локальное состояние
        />
        <button onClick={() => dispatch(incrementByAmount(amount))}>
          Добавить {amount}
        </button> {/* Отправляем действие с payload */}
      </div>
      
      {/* Отображаем историю изменений */}
      <div style={{ marginTop: '10px' }}>
        <h4>История изменений:</h4>
        <ul>
          {counter.history.map((item, index) => (
            <li key={index}>{item}</li>         {/* Отображаем каждый элемент истории */}
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Counter;
```

**src/components/TodoList.js**
```jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  editTodo 
} from '../store/actions/todoActions';

const TodoList = () => {
  // Получаем состояние задач из Redux store
  const todos = useSelector(state => state.todos.todos); // Массив задач
  
  // Получаем функцию dispatch
  const dispatch = useDispatch();               // Функция для отправки действий
  
  // Локальные состояния
  const [text, setText] = useState('');        // Текст новой задачи
  const [editingId, setEditingId] = useState(null); // ID редактируемой задачи
  const [editText, setEditText] = useState(''); // Текст для редактирования

  // Функция для добавления новой задачи
  const handleAddTodo = () => {
    if (text.trim()) {                          // Проверяем, что текст не пустой
      dispatch(addTodo(text));                  // Отправляем действие ADD_TODO
      setText('');                              // Очищаем поле ввода
    }
  };

  // Функция для начала редактирования
  const startEditing = (todo) => {
    setEditingId(todo.id);                      // Устанавливаем ID редактируемой задачи
    setEditText(todo.text);                     // Устанавливаем текст для редактирования
  };

  // Функция для сохранения редактирования
  const saveEdit = () => {
    if (editText.trim()) {                      // Проверяем, что текст не пустой
      dispatch(editTodo(editingId, editText));  // Отправляем действие EDIT_TODO
      setEditingId(null);                       // Сбрасываем режим редактирования
      setEditText('');                          // Очищаем поле редактирования
    }
  };

  // Функция для отмены редактирования
  const cancelEdit = () => {
    setEditingId(null);                         // Сбрасываем режим редактирования
    setEditText('');                            // Очищаем поле редактирования
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>Список задач</h2>
      
      {/* Форма добавления новой задачи */}
      <div>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} // Обновляем текст новой задачи
          placeholder="Введите новую задачу"
        />
        <button onClick={handleAddTodo}>Добавить</button> {/* Вызываем функцию добавления */}
      </div>
      
      {/* Список задач */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none',
            margin: '5px 0'
          }}>
            {/* Режим редактирования */}
            {editingId === todo.id ? (
              <div>
                <input 
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)} 
                />
                <button onClick={saveEdit}>Сохранить</button>
                <button onClick={cancelEdit}>Отмена</button>
              </div>
            ) : (
              // Режим просмотра
              <div>
                <span 
                  onClick={() => dispatch(toggleTodo(todo.id))} // Переключаем статус выполнения
                  style={{ cursor: 'pointer' }}
                >
                  {todo.text}
                </span>
                <button onClick={() => startEditing(todo)}>Редактировать</button>
                <button onClick={() => dispatch(deleteTodo(todo.id))}>Удалить</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {/* Статистика */}
      <div>
        Всего задач: {todos.length} | 
        Выполнено: {todos.filter(todo => todo.completed).length} |
        Не выполнено: {todos.filter(todo => !todo.completed).length}
      </div>
    </div>
  );
};

export default TodoList;
```

## 5. Главный компонент App

**src/App.js**
```jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    // Provider делает store доступным для всех компонентов
    <Provider store={store}>
      <div className="App">
        <h1>Redux Упражнения</h1>
        <p>Демонстрация работы с Redux: действия и редьюсеры</p>
        
        {/* Компонент счетчика */}
        <Counter />
        
        {/* Компонент списка задач */}
        <TodoList />
        
        {/* Блок с объяснениями */}
        <div style={{ padding: '20px', margin: '10px', backgroundColor: '#f5f5f5' }}>
          <h3>Объяснение концепций:</h3>
          <ul>
            <li><strong>Store</strong> - централизованное хранилище состояния</li>
            <li><strong>Actions</strong> - объекты, которые описывают что произошло</li>
            <li><strong>Reducers</strong> - функции, которые определяют как состояние изменяется в ответ на действия</li>
            <li><strong>Dispatch</strong> - функция для отправки действий в store</li>
            <li><strong>Selector</strong> - функции для извлечения конкретных данных из состояния</li>
          </ul>
        </div>
      </div>
    </Provider>
  );
}

export default App;
```

## 6. index.js

**src/index.js**
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Создаем корневой элемент и рендерим приложение
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Упражнения для практики:

1. **Добавьте фильтрацию задач** - создайте действия и редьюсер для фильтрации задач (все/активные/выполненные)

2. **Добавьте асинхронные действия** - используйте Redux Thunk для загрузки задач с API

3. **Создайте редьюсер для пользователей** - управление данными пользователя

4. **Добавьте локальное хранилище** - сохраняйте состояние в localStorage

5. **Создайте middleware** - логируйте все действия в консоль

Этот проект демонстрирует все основные концепции Redux с подробными комментариями к каждой строке кода!