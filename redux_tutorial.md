# Подробное руководство по Redux

## Оглавление
1. [Введение в Redux](#введение-в-redux)
2. [Действия (Actions)](#действия-actions)
3. [Редукторы (Reducers)](#редукторы-reducers)
4. [Хранилище (Store)](#хранилище-store)
5. [Поток данных в Redux](#поток-данных-в-redux)
6. [Практический пример](#практический-пример)

---

## Введение в Redux

### Что такое Redux?
Redux — это предсказуемый контейнер состояния для JavaScript-приложений. Он помогает управлять состоянием приложения единообразно и предсказуемо.

### Основные принципы Redux:
1. **Единый источник истины** - Состояние всего приложения хранится в одном объекте дерева состояний
2. **Состояние только для чтения** - Изменять состояние можно только через действия (actions)
3. **Изменения делаются чистыми функциями** - Редукторы (reducers) описывают, как состояние изменяется в ответ на действия

### Когда использовать Redux?
- Сложное состояние приложения
- Частые изменения состояния
- Большая кодовая база с множеством разработчиков
- Необходимость отладки и отслеживания состояния

---

## Действия (Actions)

### Что такое действия?
Действия — это простые JavaScript-объекты, которые описывают, что должно произойти в приложении.

### Структура действия:
```javascript
{
  type: 'ACTION_TYPE',
  payload: данные // опционально
}
```

### Создание действий:
```javascript
// Простое действие
const increment = () => ({
  type: 'INCREMENT'
});

// Действие с данными
const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});

// Действие с ошибкой
const fetchError = (error) => ({
  type: 'FETCH_ERROR',
  payload: error,
  error: true
});
```

### Action Creators (Создатели действий):
```javascript
// Базовые создатели действий
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: { text }
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  payload: { id }
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  payload: { filter }
});
```

### Асинхронные действия с Redux Thunk:
```javascript
// Установка: npm install redux-thunk
import thunk from 'redux-thunk';

// Асинхронный создатель действия
export const fetchUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USER_REQUEST' });
    
    try {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_FAILURE', payload: error });
    }
  };
};
```

---

## Редукторы (Reducers)

### Что такое редукторы?
Редукторы — это чистые функции, которые принимают текущее состояние и действие, возвращают новое состояние.

### Принципы редукторов:
- **Чистые функции** - Без побочных эффектов
- **Неизменяемость** - Не изменяют оригинальное состояние
- **Предсказуемость** - Одинаковый ввод → одинаковый вывод

### Базовый редуктор:
```javascript
const initialState = {
  count: 0
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      };
    case 'RESET':
      return {
        ...state,
        count: 0
      };
    default:
      return state;
  }
};
```

### Комбинирование редукторов:
```javascript
import { combineReducers } from 'redux';

// Редуктор для todos
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

// Редуктор для фильтра видимости
const visibilityFilterReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.payload.filter;
    default:
      return state;
  }
};

// Комбинирование редукторов
const rootReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer
});
```

### Иммутабельные обновления:
```javascript
// ПЛОХО - мутация состояния
const badReducer = (state, action) => {
  state.count++; // МУТАЦИЯ!
  return state;
};

// ХОРОШО - иммутабельное обновление
const goodReducer = (state, action) => {
  return {
    ...state,
    count: state.count + 1
  };
};

// Обновление вложенных объектов
const updateNestedState = (state, action) => {
  return {
    ...state,
    user: {
      ...state.user,
      profile: {
        ...state.user.profile,
        name: action.payload.name
      }
    }
  };
};
```

---

## Хранилище (Store)

### Что такое хранилище?
Хранилище — это объект, который:
- Содержит состояние приложения
- Позволяет доступ к состоянию через `getState()`
- Позволяет обновлять состояние через `dispatch(action)`
- Регистрирует слушателей через `subscribe(listener)`

### Создание хранилища:
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Создание хранилища
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // применение middleware
);

export default store;
```

### Методы хранилища:
```javascript
// Получение текущего состояния
const currentState = store.getState();

// Отправка действия
store.dispatch({ type: 'INCREMENT' });

// Подписка на изменения
const unsubscribe = store.subscribe(() => {
  console.log('State changed:', store.getState());
});

// Отмена подписки
unsubscribe();
```

### Middleware (Промежуточное ПО):
```javascript
import { createStore, applyMiddleware } from 'redux';

// Логирующий middleware
const logger = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

// Middleware для обработки ошибок
const errorHandler = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    console.error('Error in action:', action, error);
    throw error;
  }
};

const store = createStore(
  rootReducer,
  applyMiddleware(logger, errorHandler, thunk)
);
```

### Redux DevTools:
```javascript
// Настройка с Redux DevTools Extension
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
```

---

## Поток данных в Redux

### Однонаправленный поток данных:
Redux следует строгому однонаправленному потоку данных:

1. **Компонент** инициирует действие
2. **Действие** отправляется в хранилище
3. **Хранилище** вызывает редуктор
4. **Редуктор** возвращает новое состояние
5. **Хранилище** обновляет состояние
6. **Компонент** получает обновленное состояние

### Визуализация потока:
```
View → Action → Reducer → Store → View
     ↑                       ↓
     ←--- Subscription -----←
```

### Детальное описание шагов:

#### Шаг 1: Инициирование действия
```javascript
// В компоненте React
const handleClick = () => {
  store.dispatch({ type: 'INCREMENT' });
};
```

#### Шаг 2: Обработка действия редуктором
```javascript
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};
```

#### Шаг 3: Обновление состояния хранилища
```javascript
// Хранилище автоматически обновляет состояние
// и уведомляет подписчиков
```

#### Шаг 4: Компонент получает обновления
```javascript
// Подписка на изменения
store.subscribe(() => {
  const newState = store.getState();
  // Обновление компонента с новым состоянием
});
```

---

## Практический пример

### Полный пример приложения счетчика:
```javascript
// actions.js
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });
export const reset = () => ({ type: 'RESET' });
export const setValue = (value) => ({
  type: 'SET_VALUE',
  payload: value
});

// reducer.js
const initialState = {
  count: 0,
  history: []
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, state.count + 1]
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      };
    case 'RESET':
      return {
        ...state,
        count: 0,
        history: [...state.history, 0]
      };
    case 'SET_VALUE':
      return {
        ...state,
        count: action.payload,
        history: [...state.history, action.payload]
      };
    default:
      return state;
  }
};

export default counterReducer;

// store.js
import { createStore } from 'redux';
import counterReducer from './reducer';

const store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

// app.js (использование)
import store from './store';
import { increment, decrement, reset, setValue } from './actions';

// Подписка на изменения
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  console.log('Current count:', state.count);
  console.log('History:', state.history);
  updateUI(state);
});

// Функция обновления UI
function updateUI(state) {
  document.getElementById('count').textContent = state.count;
  document.getElementById('history').textContent = state.history.join(', ');
}

// Обработчики событий
document.getElementById('increment').addEventListener('click', () => {
  store.dispatch(increment());
});

document.getElementById('decrement').addEventListener('click', () => {
  store.dispatch(decrement());
});

document.getElementById('reset').addEventListener('click', () => {
  store.dispatch(reset());
});

document.getElementById('setValue').addEventListener('click', () => {
  const value = parseInt(document.getElementById('valueInput').value);
  if (!isNaN(value)) {
    store.dispatch(setValue(value));
  }
});
```

### HTML для примера:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Redux Counter Example</title>
</head>
<body>
    <div>
        <h1>Counter: <span id="count">0</span></h1>
        <button id="increment">+</button>
        <button id="decrement">-</button>
        <button id="reset">Reset</button>
        <br><br>
        <input type="number" id="valueInput" placeholder="Enter value">
        <button id="setValue">Set Value</button>
        <br><br>
        <h3>History: <span id="history"></span></h3>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

### Лучшие практики:

1. **Структура проекта**:
```
src/
  actions/
    index.js
  reducers/
    index.js
  store/
    index.js
  components/
  constants/
```

2. **Константы для типов действий**:
```javascript
// constants/actionTypes.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
```

3. **Селекторы для доступа к состоянию**:
```javascript
// selectors/counterSelectors.js
export const getCount = state => state.count;
export const getHistory = state => state.history;
export const getLastValue = state => state.history[state.history.length - 1];
```

Это руководство охватывает все основные аспекты Redux. Для дальнейшего изучения рекомендуется ознакомиться с официальной документацией Redux и рассмотреть интеграцию с React через библиотеку react-redux.