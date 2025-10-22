# Функции высшего порядка (Higher-Order Functions) - подробное объяснение

## Что такое функции высшего порядка?

**Функция высшего порядка** - это функция, которая:
1. **Принимает другие функции в качестве аргументов** ИЛИ
2. **Возвращает функцию как результат** ИЛИ
3. **И то, и другое**

В JavaScript функции являются **объектами первого класса** (first-class citizens), что означает:
- Их можно хранить в переменных
- Передавать как аргументы в другие функции
- Возвращать из других функций
- Создавать во время выполнения программы

## 1. Функции, принимающие другие функции как аргументы

### Базовые примеры

```javascript
// Простая функция высшего порядка
function executeTwice(fn) {
    fn(); // Первый вызов
    fn(); // Второй вызов
}

function sayHello() {
    console.log('Привет!');
}

executeTwice(sayHello);
// Вывод:
// Привет!
// Привет!
```

### Функции с параметрами
```javascript
function processNumber(number, processor) {
    return processor(number);
}

function double(x) {
    return x * 2;
}

function square(x) {
    return x * x;
}

console.log(processNumber(5, double));  // 10
console.log(processNumber(5, square));  // 25
```

## 2. Встроенные функции высшего порядка в JavaScript

### Array Methods - самые распространенные примеры

#### forEach()
```javascript
const numbers = [1, 2, 3, 4, 5];

// Классический forEach
numbers.forEach(function(number) {
    console.log(number);
});

// С использованием стрелочной функции
numbers.forEach(number => console.log(number * 2));

// forEach с индексом и массивом
numbers.forEach((number, index, array) => {
    console.log(`Элемент ${number} имеет индекс ${index} в массиве [${array}]`);
});
```

#### map() - преобразование элементов
```javascript
const numbers = [1, 2, 3, 4, 5];

// Умножение каждого элемента на 2
const doubled = numbers.map(function(number) {
    return number * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// Преобразование объектов
const users = [
    { name: 'Анна', age: 25 },
    { name: 'Петр', age: 30 },
    { name: 'Мария', age: 28 }
];

const names = users.map(user => user.name);
console.log(names); // ['Анна', 'Петр', 'Мария']

const greetings = users.map(user => `Привет, ${user.name}!`);
console.log(greetings); // ['Привет, Анна!', 'Привет, Петр!', 'Привет, Мария!']
```

#### filter() - фильтрация элементов
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Четные числа
const evenNumbers = numbers.filter(function(number) {
    return number % 2 === 0;
});
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// Числа больше 5
const largeNumbers = numbers.filter(number => number > 5);
console.log(largeNumbers); // [6, 7, 8, 9, 10]

// Фильтрация объектов
const products = [
    { name: 'Телефон', price: 500, category: 'electronics' },
    { name: 'Книга', price: 20, category: 'education' },
    { name: 'Наушники', price: 100, category: 'electronics' },
    { name: 'Ручка', price: 5, category: 'office' }
];

const electronics = products.filter(product => 
    product.category === 'electronics'
);
console.log(electronics);
// [
//   { name: 'Телефон', price: 500, category: 'electronics' },
//   { name: 'Наушники', price: 100, category: 'electronics' }
// ]

const expensiveProducts = products.filter(product => product.price > 50);
console.log(expensiveProducts);
// [
//   { name: 'Телефон', price: 500, category: 'electronics' },
//   { name: 'Наушники', price: 100, category: 'electronics' }
// ]
```

#### reduce() - аккумуляция значений
```javascript
const numbers = [1, 2, 3, 4, 5];

// Сумма всех чисел
const sum = numbers.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
console.log(sum); // 15

// Поиск максимального значения
const max = numbers.reduce((acc, current) => 
    current > acc ? current : acc, numbers[0]
);
console.log(max); // 5

// Группировка объектов
const people = [
    { name: 'Анна', age: 25, city: 'Москва' },
    { name: 'Петр', age: 30, city: 'Санкт-Петербург' },
    { name: 'Мария', age: 28, city: 'Москва' },
    { name: 'Иван', age: 35, city: 'Казань' }
];

const groupedByCity = people.reduce((acc, person) => {
    const city = person.city;
    if (!acc[city]) {
        acc[city] = [];
    }
    acc[city].push(person);
    return acc;
}, {});

console.log(groupedByCity);
// {
//   'Москва': [
//     { name: 'Анна', age: 25, city: 'Москва' },
//     { name: 'Мария', age: 28, city: 'Москва' }
//   ],
//   'Санкт-Петербург': [
//     { name: 'Петр', age: 30, city: 'Санкт-Петербург' }
//   ],
//   'Казань': [
//     { name: 'Иван', age: 35, city: 'Казань' }
//   ]
// }
```

#### find() и findIndex()
```javascript
const users = [
    { id: 1, name: 'Анна', active: true },
    { id: 2, name: 'Петр', active: false },
    { id: 3, name: 'Мария', active: true }
];

// find - возвращает первый найденный элемент
const activeUser = users.find(user => user.active);
console.log(activeUser); // { id: 1, name: 'Анна', active: true }

// findIndex - возвращает индекс первого найденного элемента
const inactiveIndex = users.findIndex(user => !user.active);
console.log(inactiveIndex); // 1
```

#### some() и every()
```javascript
const numbers = [1, 2, 3, 4, 5];

// some - хотя бы один элемент удовлетворяет условию
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// every - все элементы удовлетворяют условию
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // false
```

## 3. Создание собственных функций высшего порядка

### Универсальный обработчик данных
```javascript
function processArray(array, processor) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(processor(array[i], i, array));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];

// Использование с разными процессорами
const squared = processArray(numbers, num => num * num);
console.log(squared); // [1, 4, 9, 16, 25]

const withIndex = processArray(numbers, (num, index) => 
    `Элемент ${num} на позиции ${index}`
);
console.log(withIndex);
// [
//   'Элемент 1 на позиции 0',
//   'Элемент 2 на позиции 1',
//   'Элемент 3 на позиции 2',
//   'Элемент 4 на позиции 3',
//   'Элемент 5 на позиции 4'
// ]
```

### Функция-валидатор
```javascript
function createValidator(rules) {
    return function(data) {
        for (const rule of rules) {
            if (!rule.check(data)) {
                return { valid: false, error: rule.message };
            }
        }
        return { valid: true };
    };
}

// Создание конкретного валидатора
const userValidator = createValidator([
    {
        check: user => user.name && user.name.length >= 2,
        message: 'Имя должно содержать минимум 2 символа'
    },
    {
        check: user => user.age >= 18,
        message: 'Возраст должен быть не менее 18 лет'
    },
    {
        check: user => user.email && user.email.includes('@'),
        message: 'Некорректный email'
    }
]);

// Использование
const validUser = { name: 'Анна', age: 25, email: 'anna@example.com' };
const invalidUser = { name: 'А', age: 15, email: 'invalid' };

console.log(userValidator(validUser));   // { valid: true }
console.log(userValidator(invalidUser)); // { valid: false, error: 'Имя должно содержать минимум 2 символа' }
```

### Функция-обработчик событий
```javascript
function createEventHandler(handler, options = {}) {
    return function(event) {
        // Предобработка события
        if (options.preventDefault) {
            event.preventDefault();
        }
        
        if (options.logEvent) {
            console.log('Событие:', event.type, event.target);
        }
        
        // Вызов основного обработчика
        return handler(event);
    };
}

// Использование
const buttonHandler = createEventHandler(
    function(event) {
        console.log('Кнопка нажата!');
        // Основная логика
    },
    {
        preventDefault: true,
        logEvent: true
    }
);

// document.getElementById('myButton').addEventListener('click', buttonHandler);
```

## 4. Комбинирование функций высшего порядка

### Цепочки методов
```javascript
const products = [
    { name: 'Телефон', price: 500, category: 'electronics', rating: 4.5 },
    { name: 'Книга', price: 20, category: 'education', rating: 4.2 },
    { name: 'Наушники', price: 100, category: 'electronics', rating: 4.7 },
    { name: 'Ручка', price: 5, category: 'office', rating: 3.9 },
    { name: 'Ноутбук', price: 1000, category: 'electronics', rating: 4.8 }
];

// Сложная обработка данных
const result = products
    .filter(product => product.category === 'electronics') // Только электроника
    .filter(product => product.price > 50)                // Дороже 50
    .map(product => ({                                    // Преобразуем объекты
        ...product,
        priceWithTax: product.price * 1.2,               // Добавляем налог
        isPopular: product.rating > 4.5                  // Помечаем популярные
    }))
    .sort((a, b) => b.rating - a.rating)                 // Сортируем по рейтингу
    .slice(0, 3);                                        // Берем топ-3

console.log(result);
```

### Создание конвейера обработки
```javascript
function createDataPipeline(...operations) {
    return function(data) {
        return operations.reduce((result, operation) => {
            return operation(result);
        }, data);
    };
}

// Операции для конвейера
const filterElectronics = products => 
    products.filter(p => p.category === 'electronics');

const addTax = products => 
    products.map(p => ({ ...p, priceWithTax: p.price * 1.2 }));

const sortByPrice = products => 
    products.sort((a, b) => a.price - b.price);

const getNames = products => 
    products.map(p => p.name);

// Создание конвейера
const electronicsPipeline = createDataPipeline(
    filterElectronics,
    addTax,
    sortByPrice,
    getNames
);

const productNames = electronicsPipeline(products);
console.log(productNames); // ['Наушники', 'Телефон', 'Ноутбук']
```

## 5. Практические паттерны с функциями высшего порядка

### Стратегия (Strategy Pattern)
```javascript
const paymentStrategies = {
    creditCard: function(amount) {
        console.log(`Оплата картой: ${amount} руб.`);
        // Логика обработки карты
        return true;
    },
    paypal: function(amount) {
        console.log(`Оплата PayPal: ${amount} руб.`);
        // Логика PayPal
        return true;
    },
    crypto: function(amount) {
        console.log(`Оплата криптовалютой: ${amount} руб.`);
        // Логика криптоплатежа
        return true;
    }
};

function processPayment(amount, strategy) {
    console.log(`Начинаем обработку платежа на ${amount} руб.`);
    return strategy(amount);
}

// Использование
processPayment(1000, paymentStrategies.creditCard);
processPayment(500, paymentStrategies.paypal);
```

### Observer Pattern (упрощенный)
```javascript
function createObservable() {
    const observers = [];
    
    return {
        subscribe: function(observer) {
            observers.push(observer);
            return function unsubscribe() {
                const index = observers.indexOf(observer);
                if (index > -1) {
                    observers.splice(index, 1);
                }
            };
        },
        
        notify: function(data) {
            observers.forEach(observer => observer(data));
        },
        
        getObserverCount: function() {
            return observers.length;
        }
    };
}

// Использование
const userActions = createObservable();

const unsubscribe1 = userActions.subscribe(function(action) {
    console.log('Логгер 1:', action);
});

const unsubscribe2 = userActions.subscribe(function(action) {
    console.log('Логгер 2:', action.toUpperCase());
});

userActions.notify('пользователь вошел в систему');
userActions.notify('пользователь добавил товар в корзину');

unsubscribe1();
userActions.notify('пользователь вышел из системы');
```

## Преимущества функций высшего порядка

1. **Абстракция** - скрытие сложной реализации
2. **Повторное использование** - один раз написал, много раз использовал
3. **Гибкость** - легко комбинировать и настраивать поведение
4. **Читаемость** - код становится более декларативным
5. **Тестируемость** - легче тестировать небольшие функции

Функции высшего порядка - это мощный инструмент, который делает JavaScript гибким и выразительным языком программирования!