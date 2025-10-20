# Модуль 1. Углубленная работа с функциями в JavaScript

## 1. Методы apply, call, bind

### Контекст выполнения (this)
В JavaScript значение `this` зависит от того, **как** вызывается функция, а не от того, **где** она объявлена.

```javascript
const person = {
    name: 'Анна',
    greet: function() {
        console.log(`Привет, я ${this.name}`);
    }
};

person.greet(); // "Привет, я Анна" - this = person

const greetFunc = person.greet;
greetFunc(); // "Привет, я undefined" - this = global/window
```

### Метод call()
Вызывает функцию с указанным значением `this` и аргументами, переданными индивидуально.

```javascript
function introduce(age, city) {
    console.log(`Меня зовут ${this.name}, мне ${age} лет, я из ${city}`);
}

const person1 = { name: 'Мария' };
const person2 = { name: 'Иван' };

introduce.call(person1, 25, 'Москва'); // "Меня зовут Мария, мне 25 лет, я из Москвы"
introduce.call(person2, 30, 'Санкт-Петербург'); // "Меня зовут Иван, мне 30 лет, я из Санкт-Петербурга"
```

### Метод apply()
Аналогичен `call()`, но аргументы передаются в виде массива.

```javascript
function introduce(age, city) {
    console.log(`Меня зовут ${this.name}, мне ${age} лет, я из ${city}`);
}

const person = { name: 'Елена' };
const args = [28, 'Казань'];

introduce.apply(person, args); // "Меня зовут Елена, мне 28 лет, я из Казань"
```

**Практическое применение apply()**:
```javascript
// Нахождение максимального значения в массиве
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers); // 7

// Более современная альтернатива - spread оператор
const maxModern = Math.max(...numbers); // 7
```

### Метод bind()
Создает новую функцию с привязанным контекстом `this`. Не вызывает функцию сразу.

```javascript
function introduce(age, city) {
    console.log(`Меня зовут ${this.name}, мне ${age} лет, я из ${city}`);
}

const person = { name: 'Алексей' };
const boundIntroduce = introduce.bind(person);

boundIntroduce(35, 'Новосибирск'); // "Меня зовут Алексей, мне 35 лет, я из Новосибирск"

// Частичное применение (каррирование)
const introduceWithAge = introduce.bind(person, 40);
introduceWithAge('Екатеринбург'); // "Меня зовут Алексей, мне 40 лет, я из Екатеринбург"
```

**Практическое применение bind()**:
```javascript
// Обработчики событий
class Button {
    constructor(text) {
        this.text = text;
        this.clicked = false;
    }
    
    handleClick() {
        this.clicked = true;
        console.log(`Кнопка "${this.text}" нажата`);
    }
    
    attachListener() {
        // Без bind this будет undefined
        document.getElementById('myBtn').addEventListener(
            'click', 
            this.handleClick.bind(this)
        );
    }
}
```

## 2. Замыкания (Closures)

Замыкание - это функция, которая запоминает свое лексическое окружение даже после того, как внешняя функция завершила выполнение.

### Базовый пример
```javascript
function createCounter() {
    let count = 0; // приватная переменная
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

### Практическое применение замыканий

**1. Создание приватных переменных**
```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance; // приватная переменная
    
    return {
        deposit: function(amount) {
            balance += amount;
            return balance;
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            }
            return 'Недостаточно средств';
        },
        getBalance: function() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
console.log(account.deposit(500)); // 1500
console.log(account.withdraw(200)); // 1300
// console.log(account.balance); // undefined - переменная приватная
```

**2. Создание функций с предустановленными параметрами**
```javascript
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**3. Мемоизация (кэширование результатов)**
```javascript
function createCachedFunction(fn) {
    const cache = new Map();
    
    return function(arg) {
        if (cache.has(arg)) {
            console.log('Из кэша:', arg);
            return cache.get(arg);
        }
        
        console.log('Вычисление для:', arg);
        const result = fn(arg);
        cache.set(arg, result);
        return result;
    };
}

const expensiveCalculation = createCachedFunction(function(n) {
    // Имитация сложных вычислений
    return n * n;
});

console.log(expensiveCalculation(5)); // "Вычисление для: 5", 25
console.log(expensiveCalculation(5)); // "Из кэша: 5", 25
```

## 3. Рекурсия

Рекурсия - это когда функция вызывает саму себя.

### Базовый пример - факториал
```javascript
function factorial(n) {
    // Базовый случай - условие выхода из рекурсии
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Рекурсивный случай
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

### Обход дерева
```javascript
const company = {
    name: 'CEO',
    subordinates: [
        {
            name: 'CTO',
            subordinates: [
                { name: 'Dev Lead', subordinates: [] },
                { name: 'QA Lead', subordinates: [] }
            ]
        },
        {
            name: 'CFO',
            subordinates: [
                { name: 'Accountant', subordinates: [] }
            ]
        }
    ]
};

function printHierarchy(employee, level = 0) {
    console.log('  '.repeat(level) + employee.name);
    
    employee.subordinates.forEach(sub => {
        printHierarchy(sub, level + 1);
    });
}

printHierarchy(company);
// CEO
//   CTO
//     Dev Lead
//     QA Lead
//   CFO
//     Accountant
```

### Хвостовая рекурсия (оптимизация)
```javascript
// Обычная рекурсия (может вызвать переполнение стека)
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

// Хвостовая рекурсия (может быть оптимизирована)
function factorialTail(n, accumulator = 1) {
    if (n === 1) return accumulator;
    return factorialTail(n - 1, n * accumulator);
}
```

## 4. Функции высшего порядка (Higher-Order Functions)

Функции высшего порядка - это функции, которые принимают другие функции в качестве аргументов и/или возвращают функции.

### Функции, принимающие другие функции
```javascript
// Array methods - классические примеры
const numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach(function(number) {
    console.log(number * 2);
});

// map
const doubled = numbers.map(function(number) {
    return number * 2;
});

// filter
const even = numbers.filter(function(number) {
    return number % 2 === 0;
});

// reduce
const sum = numbers.reduce(function(acc, number) {
    return acc + number;
}, 0);
```

### Создание собственных функций высшего порядка
```javascript
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(5, console.log); // 0, 1, 2, 3, 4

repeat(3, function(i) {
    console.log(`Повторение ${i + 1}`);
});
```

## 5. Каррирование (Currying)

Каррирование - это преобразование функции от многих аргументов в набор функций, каждая из которых принимает один аргумент.

### Базовое каррирование
```javascript
// Обычная функция
function add(a, b, c) {
    return a + b + c;
}

// Каррированная версия
function addCurried(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

console.log(add(1, 2, 3)); // 6
console.log(addCurried(1)(2)(3)); // 6

// Частичное применение
const addFive = addCurried(5);
const addFiveAndTwo = addFive(2);
console.log(addFiveAndTwo(3)); // 10
```

### Утилита для каррирования
```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

// Использование
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

### Практическое применение каррирования
```javascript
// Создание специализированных функций
function createLogger(level) {
    return function(message) {
        console.log(`[${level}] ${new Date().toISOString()}: ${message}`);
    };
}

const errorLogger = createLogger('ERROR');
const infoLogger = createLogger('INFO');
const debugLogger = createLogger('DEBUG');

errorLogger('Произошла критическая ошибка');
infoLogger('Приложение запущено');
debugLogger('Отладочная информация');

// В функциональном программировании
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
];

// Каррированная функция фильтрации
const filterByAge = curry(function(minAge, user) {
    return user.age >= minAge;
});

const adults = users.filter(filterByAge(18));
const overThirty = users.filter(filterByAge(30));
```

## 6. Практика работы с функциями

### Композиция функций
```javascript
// Композиция двух функций
function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}

// Композиция нескольких функций
function composeAll(...fns) {
    return function(x) {
        return fns.reduceRight((acc, fn) => fn(acc), x);
    };
}

// Пример использования
const double = x => x * 2;
const square = x => x * x;
const increment = x => x + 1;

const transform = composeAll(double, square, increment);
console.log(transform(3)); // ((3 + 1)²) * 2 = 32
```

### Декораторы функций
```javascript
// Декоратор для логирования
function withLogging(fn) {
    return function(...args) {
        console.log(`Вызов функции ${fn.name} с аргументами:`, args);
        const result = fn.apply(this, args);
        console.log(`Функция ${fn.name} вернула:`, result);
        return result;
    };
}

// Декоратор для измерения времени
function withTiming(fn) {
    return function(...args) {
        const start = performance.now();
        const result = fn.apply(this, args);
        const end = performance.now();
        console.log(`Функция ${fn.name} выполнилась за ${end - start} мс`);
        return result;
    };
}

// Использование декораторов
const slowCalculation = withTiming(withLogging(function(n) {
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    return result;
}));

slowCalculation(1000000);
```

### Паттерн "Модуль" с замыканиями
```javascript
const MyModule = (function() {
    // Приватные переменные и функции
    let privateCounter = 0;
    
    function privateFunction() {
        return 'Это приватно';
    }
    
    function changeBy(val) {
        privateCounter += val;
    }
    
    // Публичный API
    return {
        increment: function() {
            changeBy(1);
        },
        
        decrement: function() {
            changeBy(-1);
        },
        
        value: function() {
            return privateCounter;
        },
        
        publicMethod: function() {
            return privateFunction() + ', но доступно публично';
        }
    };
})();

console.log(MyModule.value()); // 0
MyModule.increment();
MyModule.increment();
console.log(MyModule.value()); // 2
console.log(MyModule.publicMethod()); // "Это приватно, но доступно публично"
```

## Заключение

Понимание этих концепций позволяет писать более гибкий, модульный и поддерживаемый код. Ключевые преимущества:

- **apply/call/bind**: Контроль над контекстом выполнения
- **Замыкания**: Инкапсуляция и создание приватных данных
- **Рекурсия**: Элегантное решение для древовидных структур
- **Функции высшего порядка**: Абстракция и повторное использование кода
- **Каррирование**: Специализация и частичное применение функций

Эти техники являются фундаментальными для функционального программирования и широко используются в современных JavaScript-фреймворках и библиотеках.