
## **📚 УПРАЖНЕНИЕ 1: Базовый асинхронный action**

### **ПРИМЕР С РАЗБОРОМ:**

```javascript
// Создаем асинхронный action для загрузки списка товаров
export const fetchProducts = () => async (dispatch) => {
  // ↑ export - ключевое слово: делает функцию доступной для импорта в других файлах
  // ↑ const - объявление константы: создает неизменяемую переменную
  // ↑ fetchProducts - имя нашей асинхронной функции
  // ↑ () - параметры функции: здесь пустые скобки, значит функция не принимает параметров
  // ↑ => - стрелочная функция: современный синтаксис объявления функций в JavaScript
  // ↑ async - модификатор: указывает что функция содержит асинхронные операции
  // ↑ (dispatch) - параметры: Redux автоматически передает функцию dispatch
  
  try {
    // ↑ try - начало блока: пытаемся выполнить код внутри этих скобок
    // ↑ { - открывающая фигурная скобка: начало блока try
    
    // 1. Отправляем action о начале загрузки
    dispatch(loadProductsStart());
    // ↑ dispatch - функция: отправляет action в Redux хранилище
    // ↑ loadProductsStart - action creator: функция которая создает action объект
    // ↑ () - вызов функции: выполняем функцию loadProductsStart
    
    // 2. Выполняем HTTP запрос к API
    const response = await fetch('https://api.example.com/products');
    // ↑ const - объявление константы: создаем переменную response
    // ↑ response - имя переменной: будет хранить ответ от сервера
    // ↑ = - оператор присваивания: сохраняем значение справа в переменную слева
    // ↑ await - ключевое слово: ЖДЕМ завершения операции fetch перед продолжением
    // ↑ fetch - встроенная функция: выполняет HTTP запрос
    // ↑ 'https://...' - строка: URL адрес API endpoint
    // ↑ ; - точка с запятой: конец инструкции
    
    // 3. Проверяем успешность HTTP запроса
    if (!response.ok) {
      // ↑ if - условный оператор: если условие истинно, выполняем блок кода
      // ↑ ! - логическое НЕ: инвертирует значение (true становится false)
      // ↑ response.ok - свойство: true если HTTP статус 200-299
      // ↑ { - начало блока: код который выполнится если условие истинно
      
      throw new Error('Failed to load products');
      // ↑ throw - оператор: выбрасывает (создает) ошибку
      // ↑ new - оператор: создает новый экземпляр объекта
      // ↑ Error - встроенный класс: представляет ошибку в JavaScript
      // ↑ 'Failed...' - строка: сообщение об ошибке
    }
    
    // 4. Преобразуем ответ в JSON формат
    const products = await response.json();
    // ↑ const - объявление константы
    // ↑ products - имя переменной: будет хранить массив товаров
    // ↑ = - оператор присваивания
    // ↑ await - ключевое слово: ЖДЕМ преобразования ответа в JSON
    // ↑ response.json() - метод: читает тело ответа и преобразует его в JavaScript объект
    // ↑ () - вызов метода
    
    // 5. Отправляем action с загруженными данными
    dispatch(loadProductsSuccess(products));
    // ↑ dispatch - отправка action в Redux
    // ↑ loadProductsSuccess - action creator для успешной загрузки
    // ↑ (products) - аргумент: передаем данные товаров в action creator
    
  } catch (error) {
    // ↑ catch - блок: выполняется если в try произошла ошибка
    // ↑ (error) - параметр: объект ошибки который мы перехватили
    // ↑ { - начало блока catch
    
    // 6. Обрабатываем ошибку
    dispatch(loadProductsFailure(error.message));
    // ↑ dispatch - отправка action
    // ↑ loadProductsFailure - action creator для ошибки загрузки
    // ↑ (error.message) - аргумент: передаем текст ошибки
    // ↑ error.message - свойство: содержит сообщение об ошибке
  }
  // ↑ } - конец блока catch
};
// ↑ } - конец асинхронной функции
```

---

## **🎯 УПРАЖНЕНИЯ ДЛЯ ЗАКРЕПЛЕНИЯ:**

### **ЗАДАНИЕ 1: Создайте асинхронный action для авторизации**

```javascript
// ЗАДАЧА: Создайте асинхронный action для входа пользователя
// Он должен принимать email и password, делать запрос к API
// и обрабатывать успех/ошибку

// TODO: Напишите код здесь
export const loginUser = (email, password) => async (dispatch) => {
  // Ваш код здесь
};
```

**ПОДСКАЗКА ДЛЯ РЕШЕНИЯ:**
```javascript
// Пример структуры:
try {
  // 1. Начало загрузки
  // 2. HTTP POST запрос к /api/login
  // 3. Проверка response.ok
  // 4. Преобразование в JSON
  // 5. Успешный dispatch с данными пользователя
} catch (error) {
  // 6. Dispatch ошибки
}
```

### **ЗАДАНИЕ 2: Асинхронный action с таймаутом**

```javascript
// ЗАДАЧА: Создайте action который ждет 3 секунды перед выполнением

export const delayedAction = () => {
  // Ваш код здесь
};
```

### **ЗАДАНИЕ 3: Цепочка запросов**

```javascript
// ЗАДАЧА: Сначала загрузите пользователя, затем его заказы

export const fetchUserAndOrders = (userId) => {
  // Ваш код здесь
};
```

---

## **📚 УПРАЖНЕНИЕ 2: Работа с несколькими действиями**

### **ПРИМЕР С РАЗБОРОМ:**

```javascript
// Слайс для управления состоянием загрузки
const productsSlice = createSlice({
  // ↑ const - объявление константы
  // ↑ productsSlice - переменная которая хранит созданный слайс
  // ↑ = - оператор присваивания
  // ↑ createSlice() - функция из Redux Toolkit: создает слайс (редьюсер + actions)
  
  name: 'products',
  // ↑ name - свойство: уникальное имя слайса (строка)
  // ↑ 'products' - значение: имя для этого слайса в хранилище
  
  initialState: {
    // ↑ initialState - свойство: начальное состояние слайса
    // ↑ { - начало объекта начального состояния
    
    items: [],
    // ↑ items - свойство: массив для хранения товаров
    // ↑ [] - пустой массив: начальное значение
    
    loading: false,
    // ↑ loading - свойство: флаг указывает идет ли загрузка
    // ↑ false - булево значение: изначально загрузка не идет
    
    error: null
    // ↑ error - свойство: для хранения сообщения об ошибке
    // ↑ null - специальное значение: означает "ничего"
    
  }, // ↑ } - конец объекта initialState
  // ↑ , - запятая: разделяет свойства в объекте
  
  reducers: {
    // ↑ reducers - свойство: объект содержащий функции-редьюсеры
    // ↑ { - начало объекта reducers
    
    loadProductsStart: (state) => {
      // ↑ loadProductsStart - имя редьюсера (action creator)
      // ↑ (state) - параметр: текущее состояние слайса
      // ↑ => - стрелочная функция
      // ↑ { - начало функции
      
      state.loading = true;
      // ↑ state - параметр: текущее состояние
      // ↑ .loading - обращение к свойству loading
      // ↑ = - присваивание
      // ↑ true - устанавливаем флаг загрузки в true
      
      state.error = null;
      // ↑ state.error - свойство error в состоянии
      // ↑ = - присваивание
      // ↑ null - очищаем предыдущие ошибки
      
    }, // ↑ } - конец функции, запятая для разделения
    
    loadProductsSuccess: (state, action) => {
      // ↑ loadProductsSuccess - имя редьюсера
      // ↑ (state, action) - параметры: состояние и action объект
      
      state.loading = false;
      // ↑ state.loading - флаг загрузки
      // ↑ = false - устанавливаем в false так как загрузка завершена
      
      state.items = action.payload;
      // ↑ state.items - массив товаров в состоянии
      // ↑ = - присваивание
      // ↑ action.payload - данные из action (массив товаров)
      
    },
    
    loadProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
    
  } // ↑ } - конец объекта reducers
}); // ↑ } - конец createSlice, закрывающая скобка и точка с запятой

// Экспортируем actions
export const { 
  loadProductsStart, 
  loadProductsSuccess, 
  loadProductsFailure 
} = productsSlice.actions;
// ↑ export - делает перечисленные функции доступными для импорта
// ↑ const - объявление констант
// ↑ { ... } - деструктуризация: извлекаем actions из productsSlice.actions
// ↑ productsSlice.actions - свойство: содержит автоматически созданные action creators

// Экспортируем редьюсер
export default productsSlice.reducer;
// ↑ export default - экспорт по умолчанию
// ↑ productsSlice.reducer - свойство: содержит готовый редьюсер
```

---

## **🎯 УПРАЖНЕНИЯ ДЛЯ ЗАКРЕПЛЕНИЯ 2:**

### **ЗАДАНИЕ 4: Создайте слайс для корзины покупок**

```javascript
// ЗАДАЧА: Создайте слайс для управления корзиной с товарами
// Должен содержать: массив items, общую сумму, флаг загрузки

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    // TODO: определите начальное состояние
  },
  reducers: {
    // TODO: создайте редьюсеры для:
    // - addToCart (добавить товар)
    // - removeFromCart (удалить товар)
    // - updateQuantity (изменить количество)
    // - clearCart (очистить корзину)
  }
});
```

### **ЗАДАНИЕ 5: Асинхронный action для корзины**

```javascript
// ЗАДАЧА: Создайте асинхронный action для отправки заказа

export const submitOrder = (orderData) => async (dispatch) => {
  // TODO: реализуйте логику:
  // 1. Начало отправки
  // 2. POST запрос к /api/orders
  // 3. Обработка успеха/ошибки
  // 4. Очистка корзины при успехе
};
```

---

## **📚 УПРАЖНЕНИЕ 3: Использование getState**

### **ПРИМЕР С РАЗБОРОМ:**

```javascript
export const addProductToCart = (productId) => async (dispatch, getState) => {
  // ↑ (dispatch, getState) - второй параметр: функция для получения текущего состояния
  
  try {
    // Получаем текущее состояние всего Redux хранилища
    const state = getState();
    // ↑ const - объявление константы
    // ↑ state - переменная: будет хранить все состояние приложения
    // ↑ = - присваивание
    // ↑ getState() - функция: возвращает текущее состояние хранилища
    // ↑ () - вызов функции без параметров
    
    // Проверяем существует ли уже товар в корзине
    const existingCartItem = state.cart.items.find(item => item.id === productId);
    // ↑ const - объявление константы
    // ↑ existingCartItem - переменная: найденный товар или undefined
    // ↑ = - присваивание
    // ↑ state.cart - обращение к части состояния "cart"
    // ↑ .items - обращение к массиву товаров в корзине
    // ↑ .find() - метод массива: ищет первый элемент удовлетворяющий условию
    // ↑ item => - стрелочная функция для каждого элемента массива
    // ↑ item.id - свойство id текущего товара
    // ↑ === - строгое равенство
    // ↑ productId - ID товара который мы хотим добавить
    
    if (existingCartItem) {
      // ↑ if - условие: если товар уже есть в корзине
      // ↑ existingCartItem - будет true если товар найден
      
      // Увеличиваем количество существующего товара
      dispatch(updateCartItemQuantity(productId, existingCartItem.quantity + 1));
      // ↑ dispatch - отправка action
      // ↑ updateCartItemQuantity - action creator для обновления количества
      // ↑ (productId, ...) - первый аргумент: ID товара
      // ↑ existingCartItem.quantity - текущее количество товара
      // ↑ + 1 - увеличиваем на 1
      
    } else {
      // ↑ else - блок: если товара нет в корзине (условие if ложно)
      
      // Получаем информацию о товаре из состояния products
      const product = state.products.items.find(p => p.id === productId);
      // ↑ const - объявление константы
      // ↑ product - переменная: информация о товаре
      // ↑ = - присваивание
      // ↑ state.products - часть состояния с товарами
      // ↑ .items - массив всех товаров
      // ↑ .find() - поиск товара по ID
      // ↑ p => p.id === productId - условие поиска
      
      if (product) {
        // ↑ if - условие: если товар найден в каталоге
        
        // Добавляем новый товар в корзину
        dispatch(addToCart(product));
        // ↑ dispatch - отправка action
        // ↑ addToCart - action creator для добавления товара
        // ↑ (product) - передаем объект товара
        
      } else {
        // ↑ else - блок: если товар не найден в каталоге
        
        // Ошибка: товар не существует
        throw new Error('Product not found');
        // ↑ throw - создаем ошибку
        // ↑ new Error - новый объект ошибки
        // ↑ 'Product not found' - сообщение об ошибке
      }
    }
    
  } catch (error) {
    // ↑ catch - блок: перехват ошибок
    // ↑ (error) - объект ошибки
    
    // Обрабатываем ошибку
    console.error('Failed to add product to cart:', error.message);
    // ↑ console.error - вывод ошибки в консоль
    // ↑ 'Failed...' - сообщение для разработчика
    // ↑ error.message - текст ошибки
    
    dispatch(showNotification('Failed to add product to cart'));
    // ↑ dispatch - отправка action
    // ↑ showNotification - action creator для показа уведомления
    // ↑ 'Failed...' - текст уведомления для пользователя
  }
};
```

---

## **🎯 ФИНАЛЬНЫЕ УПРАЖНЕНИЯ:**

### **ЗАДАНИЕ 6: Комплексный асинхронный action**

```javascript
// ЗАДАЧА: Создайте action который:
// 1. Проверяет авторизацию пользователя
// 2. Если не авторизован - показывает ошибку
// 3. Если авторизован - загружает персональные рекомендации
// 4. Обновляет историю просмотров

export const loadPersonalizedData = () => async (dispatch, getState) => {
  // TODO: Ваш код здесь
};
```

### **ЗАДАНИЕ 7: Обработка нескольких ошибок**

```javascript
// ЗАДАЧА: Создайте action с разными типами ошибок

export const complexOperation = (data) => async (dispatch) => {
  // TODO: Обработайте разные сценарии:
  // - Сетевая ошибка
  // - Ошибка валидации данных
  // - Ошибка авторизации
  // - Успешное выполнение
};
```

---

## **📋 ЧЕК-ЛИСТ ДЛЯ САМОПРОВЕРКИ:**

После выполнения упражнений проверьте, что вы понимаете:

- [ ] Что делает ключевое слово `async`
- [ ] Для чего нужен `await` 
- [ ] Как работает `dispatch` в асинхронных actions
- [ ] Зачем нужен блок `try/catch`
- [ ] Как использовать `getState()`
- [ ] Как создавать и экспортировать actions
- [ ] Как обрабатывать разные сценарии ошибок
- [ ] Как работать с цепочками запросов


## **📚 УПРАЖНЕНИЕ 1: Базовые действия и редукторы**

### **ПРИМЕР С РАЗБОРОМ useReducer:**

```javascript
import React, { useReducer } from 'react';
// ↑ import - ключевое слово: импортирует функциональность из других модулей
// ↑ React - основная библиотека React
// ↑ useReducer - хук: альтернатива useState для сложного состояния

// 1. Определяем начальное состояние
const initialState = {
// ↑ const - объявление константы: создает неизменяемую переменную
// ↑ initialState - имя переменной: начальное состояние нашего компонента
// ↑ = - оператор присваивания
// ↑ { - начало объекта начального состояния

  count: 0,
  // ↑ count - свойство объекта: счетчик со значением 0
  // ↑ 0 - числовое значение: начальное значение счетчика
  
  history: []
  // ↑ history - свойство: массив для хранения истории изменений
  // ↑ [] - пустой массив: начальное значение

}; // ↑ } - конец объекта, ; - конец инструкции

// 2. Создаем редуктор (reducer) - функцию для управления состоянием
const counterReducer = (state, action) => {
// ↑ const - объявление константы
// ↑ counterReducer - имя функции-редьюсера
// ↑ (state, action) - параметры: текущее состояние и действие
// ↑ => - стрелочная функция
// ↑ { - начало тела функции

  switch (action.type) {
  // ↑ switch - оператор множественного выбора
  // ↑ (action.type) - выражение: тип действия которое нужно обработать
  // ↑ { - начало блока switch

    case 'INCREMENT':
    // ↑ case - ветка switch: если action.type === 'INCREMENT'
    // ↑ 'INCREMENT' - строка: тип действия "увеличить"
    
      return {
      // ↑ return - оператор возврата: возвращает новое состояние
      // ↑ { - начало объекта нового состояния
        
        ...state,
        // ↑ ... - оператор spread: копирует все свойства из текущего состояния
        // ↑ state - текущее состояние компонента
        
        count: state.count + 1,
        // ↑ count - свойство: обновляем значение счетчика
        // ↑ state.count - текущее значение счетчика
        // ↑ + 1 - увеличиваем на 1
        
        history: [...state.history, `Incremented to ${state.count + 1}`]
        // ↑ history - свойство: обновляем массив истории
        // ↑ [...] - создаем новый массив
        // ↑ state.history - текущий массив истории
        // ↑ , - разделитель элементов массива
        // ↑ `Incremented...` - строка: запись в историю
        
      }; // ↑ } - конец объекта, ; - конец инструкции return

    case 'DECREMENT':
    // ↑ case - ветка: действие "уменьшить"
    
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, `Decremented to ${state.count - 1}`]
      };

    case 'RESET':
    // ↑ case - ветка: действие "сбросить"
    
      return {
        ...state,
        count: 0,
        history: [...state.history, 'Reset to 0']
      };

    case 'ADD':
    // ↑ case - ветка: действие "добавить число"
    
      return {
        ...state,
        count: state.count + action.payload,
        // ↑ action.payload - дополнительная информация в действии
        // ↑ + action.payload - прибавляем переданное число
        
        history: [...state.history, `Added ${action.payload}`]
      };

    default:
    // ↑ default - ветка по умолчанию: если тип действия не распознан
    
      return state;
      // ↑ return - возвращаем состояние без изменений
      // ↑ state - текущее состояние (не изменяем)
      
  } // ↑ } - конец блока switch
  
}; // ↑ } - конец функции reducer

// 3. Компонент использующий useReducer
const Counter = () => {
// ↑ const - объявление константы
// ↑ Counter - имя функционального компонента
// ↑ () - параметры (здесь пустые)
// ↑ => - стрелочная функция
// ↑ { - начало тела компонента

  const [state, dispatch] = useReducer(counterReducer, initialState);
  // ↑ const - объявление константы
  // ↑ [state, dispatch] - деструктуризация массива: получаем состояние и функцию dispatch
  // ↑ useReducer - хук React: инициализирует управление состоянием через редуктор
  // ↑ (counterReducer, initialState) - аргументы: функция-редуктор и начальное состояние

  return (
  // ↑ return - возвращает JSX разметку
  // ↑ ( - начало возвращаемого выражения
    
    <div>
    // ↑ <div> - JSX элемент: блочный контейнер
      
      <h2>Счетчик: {state.count}</h2>
      // ↑ <h2> - заголовок второго уровня
      // ↑ {state.count} - интерполяция: вставляет значение счетчика из состояния
      
      <div>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        // ↑ <button> - кнопка
        // ↑ onClick - обработчик события клика
        // ↑ {() => ...} - стрелочная функция которая выполнится при клике
        // ↑ dispatch - функция: отправляет действие в редуктор
        // ↑ ({ type: 'INCREMENT' }) - объект действия с типом 'INCREMENT'
        
          +1
        </button>
        
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>
          -1
        </button>
        
        <button onClick={() => dispatch({ type: 'RESET' })}>
          Сброс
        </button>
        
        <button onClick={() => dispatch({ type: 'ADD', payload: 5 })}>
        // ↑ payload: 5 - дополнительная информация: число которое нужно прибавить
        
          +5
        </button>
      </div>

      <div>
        <h3>История изменений:</h3>
        <ul>
          {state.history.map((item, index) => (
          // ↑ state.history - массив истории из состояния
          // ↑ .map() - метод массива: преобразует каждый элемент
          // ↑ (item, index) - параметры: элемент массива и его индекс
          // ↑ => - стрелочная функция возвращающая JSX
            
            <li key={index}>{item}</li>
            // ↑ <li> - элемент списка
            // ↑ key={index} - уникальный ключ для React (обязателен в массивах)
            // ↑ {item} - отображаем запись истории
            
          ))}
        </ul>
      </div>
      
    </div>
  ); // ↑ ) - конец return, ; - конец инструкции
}; // ↑ } - конец компонента

export default Counter;
// ↑ export default - экспорт компонента по умолчанию
```

---

## **🎯 УПРАЖНЕНИЯ ДЛЯ ЗАКРЕПЛЕНИЯ 1:**

### **ЗАДАНИЕ 1: Создайте редуктор для управления списком задач**

```javascript
const initialState = {
  tasks: [],
  filter: 'all' // all, active, completed
};

// TODO: Создайте редуктор tasksReducer с обработкой:
// - 'ADD_TASK' - добавляет новую задачу
// - 'TOGGLE_TASK' - переключает статус выполнения
// - 'DELETE_TASK' - удаляет задачу
// - 'SET_FILTER' - устанавливает фильтр

const tasksReducer = (state, action) => {
  switch (action.type) {
    // Ваш код здесь
    default:
      return state;
  }
};
```

### **ЗАДАНИЕ 2: Создайте компонент списка задач**

```javascript
const TaskList = () => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  
  // TODO: Реализуйте:
  // - Добавление задачи
  // - Переключение статуса
  // - Удаление задачи
  // - Фильтрацию задач
  
  return (
    <div>
      {/* Ваш JSX код */}
    </div>
  );
};
```

---

## **📚 УПРАЖНЕНИЕ 2: Action Creators (Создатели действий)**

### **ПРИМЕР С РАЗБОРОМ:**

```javascript
// 1. Action Creators (функции которые создают действия)
const increment = () => {
// ↑ const - объявление константы
// ↑ increment - имя функции-создателя действия
// ↑ () - параметры (без параметров)
// ↑ => - стрелочная функция
// ↑ { - начало тела функции

  return {
  // ↑ return - возвращает объект действия
  // ↑ { - начало объекта действия
    
    type: 'INCREMENT'
    // ↑ type - свойство: тип действия (обязательное поле)
    // ↑ 'INCREMENT' - значение: строка идентифицирующая действие
    
  }; // ↑ } - конец объекта, ; - конец return

}; // ↑ } - конец функции

const decrement = () => ({
// ↑ const - объявление
// ↑ decrement - имя функции
// ↑ () - параметры
// ↑ => - стрелочная функция
// ↑ ({ - сразу возвращаем объект (короткий синтаксис)

  type: 'DECREMENT'
  // ↑ type - тип действия

}); // ↑ }) - конец возвращаемого объекта и функции

const add = (amount) => ({
// ↑ const - объявление
// ↑ add - имя функции
// ↑ (amount) - параметр: число которое нужно прибавить
// ↑ => - стрелочная функция
// ↑ ({ - возвращаем объект

  type: 'ADD',
  // ↑ type - тип действия
  // ↑ , - разделитель свойств объекта
  
  payload: amount
  // ↑ payload - свойство: полезная нагрузка (данные действия)
  // ↑ amount - значение: переданный параметр

}); // ↑ }) - конец

const reset = () => ({
  type: 'RESET'
});

// 2. Улучшенный редуктор с Action Creators
const counterReducer = (state, action) => {
  switch (action.type) {
    case increment().type:
    // ↑ increment() - вызов action creator
    // ↑ .type - обращение к свойству type возвращаемого объекта
    
      return {
        ...state,
        count: state.count + 1
      };

    case decrement().type:
      return {
        ...state,
        count: state.count - 1
      };

    case add().type:
    // ↑ add().type - получаем тип из action creator
      return {
        ...state,
        count: state.count + action.payload
        // ↑ action.payload - данные переданные в action creator
      };

    case reset().type:
      return {
        ...state,
        count: 0
      };

    default:
      return state;
  }
};

// 3. Компонент с использованием Action Creators
const CounterWithActions = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h2>Счетчик: {state.count}</h2>
      
      <button onClick={() => dispatch(increment())}>
      // ↑ onClick - обработчик клика
      // ↑ {() => dispatch(increment())} - при клике вызываем dispatch с action creator
      // ↑ increment() - вызываем функцию которая возвращает действие { type: 'INCREMENT' }
      
        +1
      </button>
      
      <button onClick={() => dispatch(decrement())}>
        -1
      </button>
      
      <button onClick={() => dispatch(add(5))}>
      // ↑ dispatch(add(5)) - передаем 5 в action creator
      // ↑ add(5) возвращает { type: 'ADD', payload: 5 }
      
        +5
      </button>
      
      <button onClick={() => dispatch(reset())}>
        Сброс
      </button>
    </div>
  );
};
```

---

## **🎯 УПРАЖНЕНИЯ ДЛЯ ЗАКРЕПЛЕНИЯ 2:**

### **ЗАДАНИЕ 3: Создайте Action Creators для списка задач**

```javascript
// TODO: Создайте Action Creators для:
// - addTask(text) - добавляет задачу с текстом
// - toggleTask(id) - переключает статус задачи по ID
// - deleteTask(id) - удаляет задачу по ID
// - setFilter(filter) - устанавливает фильтр

const addTask = (text) => ({
  // Ваш код
});

const toggleTask = (id) => ({
  // Ваш код
});

// TODO: Создайте остальные Action Creators
```

### **ЗАДАНИЕ 4: Обновите редуктор для работы с Action Creators**

```javascript
const tasksReducer = (state, action) => {
  switch (action.type) {
    case addTask().type:
      // Обработка добавления задачи
      
    case toggleTask().type:
      // Обработка переключения статуса
      
    // TODO: Добавьте обработку остальных действий
  }
};
```

---

## **📚 УПРАЖНЕНИЕ 3: Сложное состояние с вложенными объектами**

### **ПРИМЕР С РАЗБОРОМ:**

```javascript
const userInitialState = {
// ↑ const - объявление константы
// ↑ userInitialState - имя переменной
// ↑ = - присваивание
// ↑ { - начало объекта

  profile: {
  // ↑ profile - свойство: объект с данными профиля
  // ↑ { - начало вложенного объекта
    
    name: '',
    // ↑ name - свойство: имя пользователя
    // ↑ '' - пустая строка: начальное значение
    
    email: '',
    age: 0
    
  }, // ↑ } - конец объекта profile
  
  preferences: {
  // ↑ preferences - свойство: настройки пользователя
    
    theme: 'light',
    // ↑ theme - свойство: тема интерфейса
    // ↑ 'light' - строка: светлая тема по умолчанию
    
    language: 'ru',
    notifications: true
    
  }, // ↑ } - конец объекта preferences
  
  isLoading: false,
  error: null

}; // ↑ } - конец основного объекта

// Редуктор для управления пользователем
const userReducer = (state, action) => {
// ↑ const - объявление
// ↑ userReducer - имя редуктора
// ↑ (state, action) - параметры
// ↑ => - стрелочная функция
// ↑ { - начало тела

  switch (action.type) {
  // ↑ switch - оператор выбора
  // ↑ (action.type) - выражение для сравнения

    case 'UPDATE_PROFILE':
    // ↑ case - ветка: обновление профиля
    
      return {
      // ↑ return - возврат нового состояния
        
        ...state,
        // ↑ ...state - копируем все свойства текущего состояния
        
        profile: {
        // ↑ profile - свойство которое мы обновляем
        // ↑ { - начало нового объекта profile
          
          ...state.profile,
          // ↑ ...state.profile - копируем текущие данные профиля
          
          ...action.payload
          // ↑ ...action.payload - добавляем/заменяем свойства из action
          // ↑ action.payload - объект с новыми данными профиля
          
        } // ↑ } - конец объекта profile
        
      }; // ↑ } - конец возвращаемого объекта

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
        // ↑ action.payload - булево значение true/false
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'RESET_USER':
      return userInitialState;
      // ↑ userInitialState - возвращаем начальное состояние

    default:
      return state;
  }
};

// Action Creators для пользователя
const updateProfile = (profileData) => ({
// ↑ const - объявление
// ↑ updateProfile - имя action creator
// ↑ (profileData) - параметр: объект с данными профиля
// ↑ => - стрелочная функция
// ↑ ({ - возвращаем объект действия

  type: 'UPDATE_PROFILE',
  payload: profileData
  // ↑ payload - полезная нагрузка: данные для обновления профиля

});

const updatePreferences = (preferences) => ({
  type: 'UPDATE_PREFERENCES',
  payload: preferences
});

const setLoading = (isLoading) => ({
  type: 'SET_LOADING',
  payload: isLoading
});

const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error
});

const resetUser = () => ({
  type: 'RESET_USER'
});

// Компонент управления пользователем
const UserProfile = () => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  const handleSaveProfile = (profileData) => {
  // ↑ const - объявление
  // ↑ handleSaveProfile - имя обработчика
  // ↑ (profileData) - параметр: данные профиля
  // ↑ => - стрелочная функция
  // ↑ { - начало тела функции
    
    dispatch(setLoading(true));
    // ↑ dispatch - отправка действия
    // ↑ setLoading(true) - action creator с параметром true
    
    // Имитация API запроса
    setTimeout(() => {
      dispatch(updateProfile(profileData));
      // ↑ updateProfile(profileData) - action creator с данными профиля
      
      dispatch(setLoading(false));
      // ↑ setLoading(false) - выключаем загрузку
    }, 1000);
    
  }; // ↑ } - конец функции

  return (
    <div>
      {state.isLoading && <div>Загрузка...</div>}
      // ↑ {state.isLoading && ...} - условный рендеринг: показываем если isLoading true
      
      {state.error && <div>Ошибка: {state.error}</div>}
      
      <div>
        <h3>Профиль:</h3>
        <p>Имя: {state.profile.name}</p>
        <p>Email: {state.profile.email}</p>
        <p>Возраст: {state.profile.age}</p>
      </div>
      
      <button onClick={() => handleSaveProfile({ name: 'Иван', age: 25 })}>
        Обновить профиль
      </button>
      
      <button onClick={() => dispatch(updatePreferences({ theme: 'dark' }))}>
        Сменить тему на темную
      </button>
    </div>
  );
};
```

---

## **🎯 ФИНАЛЬНЫЕ УПРАЖНЕНИЯ:**

### **ЗАДАНИЕ 5: Создайте систему управления магазином**

```javascript
const shopInitialState = {
  products: [],
  cart: {
    items: [],
    total: 0
  },
  user: null,
  ui: {
    loading: false,
    theme: 'light'
  }
};

// TODO: Создайте редуктор и action creators для:
// - Добавления товара в корзину
// - Удаления товара из корзины
// - Очистки корзины
// - Обновления данных пользователя
// - Переключения темы
```

### **ЗАДАНИЕ 6: Комбинированные действия**

```javascript
// TODO: Создайте action creator который:
// 1. Начинает загрузку
// 2. Добавляет товар в корзину
// 3. Пересчитывает итоговую сумму
// 4. Заканчивает загрузку

const addToCartWithTotal = (product) => {
  // Ваш код
};
```

---

## **📋 ЧЕК-ЛИСТ ДЛЯ САМОПРОВЕРКИ:**

После выполнения упражнений проверьте, что вы понимаете:

- [ ] Как создавать начальное состояние (initialState)
- [ ] Как работает функция-редуктор (reducer)
- [ ] Что такое action и его структура { type, payload }
- [ ] Как использовать хук useReducer
- [ ] Для чего нужны Action Creators
- [ ] Как обновлять вложенные объекты в состоянии
- [ ] Как работать с массивами в состоянии
- [ ] Как обрабатывать несколько связанных действий

Каждое понятие разобрано максимально подробно! 🚀