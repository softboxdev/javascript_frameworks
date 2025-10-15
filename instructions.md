
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


## **📚 УПРАЖНЕНИЕ 1: Создание хранилища Redux Toolkit**

### **ПРИМЕР С РАЗБОРОМ:**

```javascript
// 1. Установка зависимостей (в терминале)
// npm install @reduxjs/toolkit react-redux

// 2. Создание структуры папок
// src/
//   store/
//     index.js          // Главный файл хранилища
//     slices/           // Папка для слайсов
//       counterSlice.js // Слайс счетчика
//       userSlice.js    // Слайс пользователя

// store/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';
// ↑ import - ключевое слово: импортирует функциональность из других модулей
// ↑ { createSlice } - деструктуризация: импортирует функцию createSlice из библиотеки
// ↑ '@reduxjs/toolkit' - путь к библиотеке: официальная библиотека Redux Toolkit

// Определяем начальное состояние
const initialState = {
// ↑ const - объявление константы: создает неизменяемую переменную
// ↑ initialState - имя переменной: начальное состояние для этого слайса
// ↑ = - оператор присваивания
// ↑ { - начало объекта начального состояния

  value: 0,
  // ↑ value - свойство: значение счетчика
  // ↑ 0 - числовое значение: начальное значение счетчика
  
  history: []
  // ↑ history - свойство: массив для хранения истории изменений
  // ↑ [] - пустой массив: начальное значение

}; // ↑ } - конец объекта, ; - конец инструкции

// Создаем слайс (slice) - комбинация редьюсера и actions
const counterSlice = createSlice({
// ↑ const - объявление константы
// ↑ counterSlice - имя переменной: будет хранить созданный слайс
// ↑ = - оператор присваивания
// ↑ createSlice() - функция из Redux Toolkit: создает слайс автоматически
// ↑ { - начало объекта конфигурации

  name: 'counter',
  // ↑ name - свойство: уникальное имя слайса (обязательный параметр)
  // ↑ 'counter' - строка: имя этого слайса в хранилище
  
  initialState,
  // ↑ initialState - свойство: начальное состояние слайса
  // ↑ Используем сокращенную запись когда имя свойства совпадает с именем переменной
  
  reducers: {
  // ↑ reducers - свойство: объект содержащий функции-редьюсеры
  // ↑ { - начало объекта reducers

    increment: (state) => {
    // ↑ increment - имя редьюсера: автоматически станет action creator
    // ↑ (state) - параметр: текущее состояние этого слайса
    // ↑ => - стрелочная функция
    // ↑ { - начало тела функции
    
      state.value += 1;
      // ↑ state - параметр: текущее состояние (Immer под капотом делает его иммутабельным)
      // ↑ .value - обращение к свойству value состояния
      // ↑ += - оператор: увеличивает значение на 1
      // ↑ 1 - число: на сколько увеличиваем
      
      state.history.push(`Увеличили до ${state.value}`);
      // ↑ state.history - массив истории в состоянии
      // ↑ .push() - метод массива: добавляет элемент в конец
      // ↑ `Увеличили...` - строка шаблон: запись в историю
      
    }, // ↑ } - конец функции, запятая для разделения свойств

    decrement: (state) => {
      state.value -= 1;
      state.history.push(`Уменьшили до ${state.value}`);
    },

    incrementByAmount: (state, action) => {
    // ↑ incrementByAmount - имя редьюсера
    // ↑ (state, action) - параметры: состояние и объект действия
    
      state.value += action.payload;
      // ↑ action.payload - свойство: данные переданные в action
      // ↑ += action.payload - увеличиваем на переданное число
      
      state.history.push(`Добавили ${action.payload}, стало ${state.value}`);
    },

    reset: (state) => {
      state.value = 0;
      state.history.push('Сбросили на 0');
    }

  } // ↑ } - конец объекта reducers
  
}); // ↑ } - конец createSlice, ; - конец инструкции

// Экспортируем автоматически сгенерированные action creators
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
// ↑ export - делает перечисленные функции доступными для импорта в других файлах
// ↑ const - объявление констант
// ↑ { increment, decrement, ... } - деструктуризация: извлекаем actions из counterSlice.actions
// ↑ counterSlice.actions - свойство: содержит автоматически созданные action creators
// ↑ ; - конец инструкции

// Экспортируем редьюсер по умолчанию
export default counterSlice.reducer;
// ↑ export default - экспорт по умолчанию (можно импортировать под любым именем)
// ↑ counterSlice.reducer - свойство: содержит готовый редьюсер для этого слайса

// store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
  data: null,
  isLoggedIn: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.data = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.data = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    updateProfile: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateProfile 
} = userSlice.actions;

export default userSlice.reducer;

// store/index.js - ГЛАВНЫЙ ФАЙЛ ХРАНИЛИЩА
import { configureStore } from '@reduxjs/toolkit';
// ↑ import - импорт
// ↑ { configureStore } - деструктуризация: импорт функции создания хранилища
// ↑ '@reduxjs/toolkit' - путь к библиотеке

import counterReducer from './slices/counterSlice';
// ↑ import - импорт
// ↑ counterReducer - имя импорта: редьюсер из файла counterSlice
// ↑ from - ключевое слово: указывает откуда импортировать
// ↑ './slices/counterSlice' - относительный путь к файлу

import userReducer from './slices/userSlice';
// ↑ import - импорт userReducer из файла userSlice

// Создаем и настраиваем хранилище Redux
const store = configureStore({
// ↑ const - объявление константы
// ↑ store - имя переменной: будет хранить наше Redux хранилище
// ↑ = - оператор присваивания
// ↑ configureStore() - функция: создает и настраивает хранилище
// ↑ { - начало объекта конфигурации

  reducer: {
  // ↑ reducer - свойство: объект содержащий все редьюсеры приложения
  // ↑ { - начало объекта reducer

    counter: counterReducer,
    // ↑ counter - ключ: имя части состояния в хранилище
    // ↑ : - разделитель ключа и значения
    // ↑ counterReducer - значение: редьюсер который управляет этой частью состояния
    // ↑ , - разделитель свойств объекта
    
    user: userReducer
    // ↑ user - ключ: имя для части состояния пользователя
    // ↑ userReducer - значение: редьюсер управления пользователем

  }, // ↑ } - конец объекта reducer

  // Дополнительные настройки (опционально)
  middleware: (getDefaultMiddleware) =>
  // ↑ middleware - свойство: настройка middleware (промежуточного ПО)
  // ↑ (getDefaultMiddleware) - параметр: функция возвращает массив middleware по умолчанию
  // ↑ => - стрелочная функция возвращающая новый массив middleware
    
    getDefaultMiddleware({
    // ↑ getDefaultMiddleware() - функция: возвращает стандартные middleware
    // ↑ { - начало объекта конфигурации middleware
    
      serializableCheck: {
      // ↑ serializableCheck - настройка: проверка сериализуемости данных
      // ↑ { - начало объекта конфигурации
        
        ignoredActions: ['persist/PERSIST'],
        // ↑ ignoredActions - свойство: массив actions которые игнорировать при проверке
        // ↑ ['persist/PERSIST'] - массив: действия redux-persist которые нужно игнорировать
        
        ignoredPaths: ['register']
        // ↑ ignoredPaths - свойство: пути в состоянии которые игнорировать
        
      } // ↑ } - конец объекта serializableCheck
      
    }), // ↑ } - конец getDefaultMiddleware, ) - закрывающая скобка вызова функции

  devTools: process.env.NODE_ENV !== 'production'
  // ↑ devTools - свойство: настройка Redux DevTools расширения
  // ↑ process.env.NODE_ENV - переменная окружения: текущий режим (development/production)
  // ↑ !== - оператор неравенства
  // ↑ 'production' - строка: режим production
  // ↑ ВСЯ СТРОКА: включаем DevTools только в режиме разработки

}); // ↑ } - конец configureStore, ; - конец инструкции

// Экспортируем хранилище по умолчанию
export default store;
// ↑ export default - экспорт store как основного экспорта файла
// ↑ store - наше созданное хранилище

// index.js - ПОДКЛЮЧЕНИЕ ХРАНИЛИЩА К REACT ПРИЛОЖЕНИЮ
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// ↑ import - импорт
// ↑ { Provider } - деструктуризация: импорт компонента Provider
// ↑ 'react-redux' - библиотека: связывает React и Redux

import store from './store';
// ↑ import - импорт
// ↑ store - имя импорта: наше хранилище Redux
// ↑ from - ключевое слово
// ↑ './store' - относительный путь к файлу store/index.js

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// ↑ const - объявление константы
// ↑ root - переменная: корневой элемент React приложения
// ↑ = - оператор присваивания
// ↑ ReactDOM.createRoot() - функция: создает корневой элемент для React 18
// ↑ document.getElementById('root') - DOM элемент: контейнер в index.html

root.render(
// ↑ root - корневой элемент
// ↑ .render() - метод: отрисовывает React приложение
// ↑ ( - начало аргументов метода render

  <React.StrictMode>
  // ↑ <React.StrictMode> - компонент: включает строгий режим React (для разработки)
  
    <Provider store={store}>
    // ↑ <Provider> - компонент из react-redux: предоставляет хранилище всему приложению
    // ↑ store={store} - проп: передаем наше хранилище в Provider
    // ↑ {store} - интерполяция: передаем переменную store как значение пропа
    
      <App />
      // ↑ <App /> - наш главный компонент приложения
      // ↑ Теперь все компоненты внутри имеют доступ к Redux хранилищу
      
    </Provider>
    
  </React.StrictMode>
  
); // ↑ ) - конец аргументов render
```

---

## **🎯 УПРАЖНЕНИЯ ДЛЯ ЗАКРЕПЛЕНИЯ 1:**

### **ЗАДАНИЕ 1: Создайте слайс для управления задачами**

```javascript
// store/slices/todosSlice.js
const initialState = {
  items: [],
  filter: 'all', // all, active, completed
  loading: false
};

// TODO: Создайте todosSlice с редьюсерами для:
// - addTodo (добавить задачу)
// - toggleTodo (переключить статус)
// - deleteTodo (удалить задачу)
// - setFilter (установить фильтр)
// - setLoading (установить загрузку)
```

### **ЗАДАНИЕ 2: Добавьте todosSlice в хранилище**

```javascript
// store/index.js
// TODO: Импортируйте и добавьте todosReducer в хранилище
```

---

## **📚 УПРАЖНЕНИЕ 2: Настройка маршрутов в React Router**

### **ПРИМЕР С РАЗБОРОМ:**

```javascript
// 1. Установка зависимостей (в терминале)
// npm install react-router-dom

// 2. index.js - ОБНОВЛЕННЫЙ ФАЙЛ С ПОДКЛЮЧЕНИЕМ ROUTER
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// ↑ import - импорт
// ↑ { BrowserRouter } - деструктуризация: импорт компонента роутера
// ↑ 'react-router-dom' - библиотека: маршрутизация для React

import store from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      // ↑ <BrowserRouter> - компонент: предоставляет функциональность маршрутизации
      // ↑ Оборачивает всё приложение чтобы маршрутизация работала везде
      
        <App />
        // ↑ <App /> - наше приложение теперь имеет доступ к маршрутизации
        
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// 3. App.js - НАСТРОЙКА МАРШРУТОВ
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// ↑ import - импорт
// ↑ { Routes, Route, Navigate } - деструктуризация: импорт компонентов маршрутизации
// ↑ Routes - компонент: контейнер для всех маршрутов (замена Switch в v6)
// ↑ Route - компонент: определяет отдельный маршрут
// ↑ Navigate - компонент: перенаправление на другой маршрут

import { useSelector } from 'react-redux';
// ↑ { useSelector } - деструктуризация: импорт хука для доступа к состоянию Redux

// Импортируем компоненты страниц
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Компонент защищенного маршрута
const ProtectedRoute = ({ children }) => {
// ↑ const - объявление константы
// ↑ ProtectedRoute - имя компонента: защищает маршруты требующие авторизации
// ↑ ({ children }) - параметры: деструктуризация пропсов, получаем children
// ↑ => - стрелочная функция
// ↑ { - начало тела компонента

  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  // ↑ const - объявление константы
  // ↑ isLoggedIn - переменная: флаг авторизации пользователя
  // ↑ = - оператор присваивания
  // ↑ useSelector - хук react-redux: получает данные из Redux хранилища
  // ↑ state => state.user.isLoggedIn - функция-селектор: извлекает isLoggedIn из состояния user

  return isLoggedIn ? children : <Navigate to="/login" />;
  // ↑ return - возвращает JSX
  // ↑ isLoggedIn - условие: проверяем авторизован ли пользователь
  // ↑ ? - тернарный оператор: если условие истинно
  // ↑ children - что показывать если пользователь авторизован
  // ↑ : - разделитель тернарного оператора (иначе)
  // ↑ <Navigate to="/login" /> - компонент: перенаправляет на страницу логина
  // ↑ to="/login" - проп: URL для перенаправления

}; // ↑ } - конец компонента

const App = () => {
  return (
    <div className="app">
      <Header />
      // ↑ <Header /> - компонент шапки: будет отображаться на всех страницах
      
      <main className="main-content">
      // ↑ <main> - основной контент страницы
        
        <Routes>
        // ↑ <Routes> - компонент: контейнер для всех маршрутов приложения
        // ↑ React Router v6: Routes заменяет Switch и имеет улучшенный алгоритм сопоставления
            
          {/* Главная страница - точное совпадение */}
          <Route path="/" element={<HomePage />} />
          // ↑ <Route> - компонент: определяет правило маршрута
          // ↑ path="/" - проп: шаблон пути URL (корневой путь)
          // ↑ element={<HomePage />} - проп: компонент который отобразится при совпадении пути
          // ↑ / - самозакрывающийся тег
          
          {/* Статические маршруты */}
          <Route path="/about" element={<AboutPage />} />
          // ↑ path="/about" - путь: /about в адресной строке
          // ↑ element={<AboutPage />} - компонент: страница "О нас"
          
          <Route path="/products" element={<ProductsPage />} />
          // ↑ path="/products" - путь: страница со списком товаров
          
          {/* Динамические маршруты с параметрами */}
          <Route path="/products/:id" element={<ProductDetailPage />} />
          // ↑ path="/products/:id" - путь с параметром: :id будет заменен на actual ID
          // ↑ :id - динамический параметр: может быть любым значением (1, 2, 'laptop' и т.д.)
          // ↑ element={<ProductDetailPage />} - компонент: страница деталей товара
          
          {/* Вложенные параметры */}
          <Route path="/category/:categoryId/product/:productId" element={<ProductDetailPage />} />
          // ↑ path="/category/:categoryId/product/:productId" - путь с двумя параметрами
          // ↑ :categoryId - параметр категории
          // ↑ :productId - параметр товара
          // ↑ Пример URL: /category/electronics/product/123
          
          {/* Защищенные маршруты (только для авторизованных) */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
              // ↑ <ProtectedRoute> - наш кастомный компонент защиты
              // ↑ children - всё что внутри ProtectedRoute
                
                <ProfilePage />
                // ↑ <ProfilePage /> - защищенный компонент: покажется только авторизованным
                
              </ProtectedRoute>
            } 
          />
          // ↑ path="/profile" - путь: страница профиля
          // ↑ element={...} - проп: принимает JSX выражение с ProtectedRoute
          
          {/* Публичные маршруты */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Маршрут с индексом (дочерний по умолчанию) */}
          <Route path="/admin" element={<AdminLayout />}>
          // ↑ <Route> с вложенными маршрутами: path и element для родительского layout
          // ↑ AdminLayout - компонент-layout: обертка для дочерних страниц
            
            <Route index element={<AdminDashboard />} />
            // ↑ <Route index> - индексный маршрут: отображается когда путь точно /admin
            // ↑ element={<AdminDashboard />} - компонент: dashboard администратора
            
            <Route path="users" element={<AdminUsers />} />
            // ↑ path="users" - относительный путь: будет /admin/users
            // ↑ element={<AdminUsers />} - компонент: управление пользователями
            
            <Route path="settings" element={<AdminSettings />} />
            // ↑ path="settings" - относительный путь: /admin/settings
            
          </Route>
          // ↑ </Route> - закрывающий тег для родительского маршрута
          
          {/* Маршрут для всех несуществующих путей (404) */}
          <Route path="*" element={<NotFoundPage />} />
          // ↑ path="*" - специальный путь: совпадает с ЛЮБЫМ необработанным URL
          // ↑ element={<NotFoundPage />} - компонент: страница 404 (не найдено)
          
        </Routes>
        // ↑ </Routes> - закрывающий тег контейнера маршрутов
        
      </main>
    </div>
  );
};

export default App;

// 4. components/Header.js - НАВИГАЦИОННОЕ МЕНЮ
import React from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
// ↑ import - импорт
// ↑ { Link, useLocation, NavLink } - деструктуризация: импорт компонентов навигации
// ↑ Link - компонент: навигационная ссылка (заменяет <a> для SPA)
// ↑ useLocation - хук: возвращает информацию о текущем URL
// ↑ NavLink - компонент: специальная ссылка с стилями для активного состояния

import { useSelector, useDispatch } from 'react-redux';
// ↑ { useSelector, useDispatch } - деструктуризация: импорт Redux хуков
// ↑ useDispatch - хук: возвращает функцию dispatch для отправки actions

import { logout } from '../store/slices/userSlice';
// ↑ { logout } - импорт action creator из userSlice

const Header = () => {
  const dispatch = useDispatch();
  // ↑ const - объявление константы
  // ↑ dispatch - переменная: функция для отправки actions в Redux
  // ↑ = - оператор присваивания
  // ↑ useDispatch() - хук: возвращает функцию dispatch
  
  const location = useLocation();
  // ↑ const - объявление константы
  // ↑ location - переменная: объект с информацией о текущем URL
  // ↑ = - оператор присваивания
  // ↑ useLocation() - хук: возвращает текущий location { pathname, search, hash, state }
  
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const user = useSelector(state => state.user.data);

  const handleLogout = () => {
    dispatch(logout());
    // ↑ dispatch - функция отправки actions
    // ↑ logout() - action creator: возвращает action { type: 'user/logout' }
  };

  return (
    <header className="header">
      <nav className="navigation">
        {/* Обычные ссылки Link */}
        <Link to="/" className="logo">
        // ↑ <Link> - компонент: навигационная ссылка без перезагрузки страницы
        // ↑ to="/" - проп: целевой URL для навигации
        // ↑ className="logo" - проп: CSS класс для стилизации
        
          MyApp
        </Link>
        
        <div className="nav-links">
          {/* NavLink с автоматическим активным классом */}
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            // ↑ className - проп: функция которая получает объект с isActive
            // ↑ ({ isActive }) - параметр: деструктуризация, получаем isActive
            // ↑ isActive - булево: true если текущий URL совпадает с to
            // ↑ ? : - тернарный оператор: добавляем 'active' класс если ссылка активна
            
          >
            Главная
          </NavLink>
          
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            О нас
          </NavLink>
          
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Товары
          </NavLink>
          
          {/* Условный рендеринг на основе авторизации */}
          {isLoggedIn ? (
          // ↑ {isLoggedIn ? ... : ...} - тернарный оператор: показываем разный контент
          
            <div className="user-menu">
              <span>Привет, {user?.name}</span>
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Профиль
              </NavLink>
              <button onClick={handleLogout}>Выйти</button>
            </div>
            
          ) : (
          
            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Войти
            </NavLink>
            
          )}
        </div>
        
        {/* Отображение текущего пути (для отладки) */}
        <div className="current-path">
          Текущий путь: {location.pathname}
          // ↑ {location.pathname} - интерполяция: показываем текущий URL путь
        </div>
      </nav>
    </header>
  );
};

export default Header;

// 5. pages/ProductDetailPage.js - ИСПОЛЬЗОВАНИЕ ПАРАМЕТРОВ МАРШРУТА
import React, { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
// ↑ import - импорт
// ↑ { useParams, useNavigate, useSearchParams } - деструктуризация: импорт хуков
// ↑ useParams - хук: возвращает объект с параметрами из URL
// ↑ useNavigate - хук: возвращает функцию для программной навигации
// ↑ useSearchParams - хук: работа с query параметрами (?search=...)

import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/slices/productsSlice';

const ProductDetailPage = () => {
  const { id } = useParams();
  // ↑ const - объявление константы
  // ↑ { id } - деструктуризация: извлекаем параметр id из объекта useParams()
  // ↑ = - оператор присваивания
  // ↑ useParams() - хук: возвращает объект с параметрами маршрута { id: 'value' }
  // ↑ Пример: для /products/123 вернет { id: '123' }
  
  const navigate = useNavigate();
  // ↑ const - объявление константы
  // ↑ navigate - переменная: функция для программной навигации
  // ↑ = - оператор присваивания
  // ↑ useNavigate() - хук: возвращает функцию navigate
  
  const [searchParams, setSearchParams] = useSearchParams();
  // ↑ const - объявление константы
  // ↑ [searchParams, setSearchParams] - деструктуризация массива
  // ↑ searchParams - объект URLSearchParams: работа с query параметрами
  // ↑ setSearchParams - функция: обновляет query параметры
  // ↑ useSearchParams() - хук: возвращает текущие query параметры
  
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.currentProduct);
  const loading = useSelector(state => state.products.loading);

  // Получаем query параметры
  const tab = searchParams.get('tab') || 'details';
  // ↑ const - объявление
  // ↑ tab - переменная: значение параметра tab из URL
  // ↑ = - оператор присваивания
  // ↑ searchParams.get('tab') - метод: получает значение параметра tab
  // ↑ || 'details' - оператор ИЛИ: значение по умолчанию если параметра нет

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  const handleTabChange = (newTab) => {
    setSearchParams({ tab: newTab });
    // ↑ setSearchParams() - функция: обновляет query параметры
    // ↑ { tab: newTab } - объект: новые значения параметров
    // ↑ Пример: установит ?tab=reviews в URL
  };

  const handleGoBack = () => {
    navigate(-1);
    // ↑ navigate() - функция навигации
    // ↑ (-1) - аргумент: переход на одну страницу назад в истории
  };

  const handleGoToProducts = () => {
    navigate('/products', { replace: true });
    // ↑ navigate() - функция навигации
    // ↑ '/products' - аргумент: целевой URL
    // ↑ { replace: true } - опции: заменяет текущую запись в истории (не добавляет новую)
  };

  if (loading) {
    return <div>Загрузка товара...</div>;
  }

  if (!product) {
    return (
      <div>
        <h2>Товар не найден</h2>
        <button onClick={handleGoToProducts}>Вернуться к товарам</button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button onClick={handleGoBack}>Назад</button>
      
      <h2>Товар ID: {id}</h2>
      // ↑ {id} - интерполяция: показываем ID из параметров URL
      
      <h3>{product.name}</h3>
      <p>Цена: ${product.price}</p>
      
      {/* Табы через query параметры */}
      <div className="tabs">
        <button 
          className={tab === 'details' ? 'active' : ''}
          onClick={() => handleTabChange('details')}
        >
          Описание
        </button>
        <button 
          className={tab === 'reviews' ? 'active' : ''}
          onClick={() => handleTabChange('reviews')}
        >
          Отзывы
        </button>
      </div>
      
      {/* Контент в зависимости от выбранной вкладки */}
      <div className="tab-content">
        {tab === 'details' && <div>{product.description}</div>}
        {tab === 'reviews' && <div>Отзывы о товаре...</div>}
      </div>
    </div>
  );
};

export default ProductDetailPage;
```

---

## **🎯 УПРАЖНЕНИЯ ДЛЯ ЗАКРЕПЛЕНИЯ 2:**

### **ЗАДАНИЕ 3: Создайте систему маршрутов для блога**

```javascript
// TODO: Создайте маршруты для:
// - / - Главная страница блога
// - /posts - Список всех постов
// - /posts/:id - Детальная страница поста
// - /categories/:category - Посты по категории
// - /admin/* - Админ панель с вложенными маршрутами
// - /login - Страница входа
// - * - 404 страница
```

### **ЗАДАНИЕ 4: Создайте защищенный маршрут для администратора**

```javascript
// TODO: Создайте AdminRoute компонент который:
// 1. Проверяет авторизацию
// 2. Проверяет роль пользователя (должен быть 'admin')
// 3. Перенаправляет на /login если не админ
```

---

## **📋 ЧЕК-ЛИСТ ДЛЯ САМОПРОВЕРКИ:**

**Создание хранилища:**
- [ ] Понимаю что такое слайс (slice) в Redux Toolkit
- [ ] Умею создавать начальное состояние (initialState)
- [ ] Понимаю как работают редьюсеры в createSlice
- [ ] Знаю как экспортировать actions и reducer
- [ ] Умею настраивать хранилище с configureStore
- [ ] Понимаю как подключить хранилище к React с Provider

**Настройка маршрутов:**
- [ ] Понимаю разницу между BrowserRouter и HashRouter
- [ ] Умею настраивать основные маршруты с Route
- [ ] Знаю как работать с динамическими параметрами (:id)
- [ ] Понимаю как использовать вложенные маршруты
- [ ] Умею создавать защищенные маршруты
- [ ] Знаю как использовать хуки useParams, useNavigate, useLocation
- [ ] Понимаю разницу между Link и NavLink

