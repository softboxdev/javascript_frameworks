# Подробное руководство по асинхронным генераторам и ВПФ в JavaScript

## 1. Основы асинхронных генераторов

### Что такое асинхронный генератор?

Асинхронный генератор — это функция, которая объединяет возможности генераторов (`function*`) и асинхронных функций (`async`). Она позволяет использовать `yield` вместе с `await`.

```javascript
// Базовый пример асинхронного генератора
async function* asyncGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
}
```

### Создание и использование

```javascript
// Пример 1: Простой асинхронный генератор
async function* createAsyncGenerator() {
    for (let i = 0; i < 5; i++) {
        // Имитация асинхронной операции
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

// Использование с for await...of
async function processGenerator() {
    for await (const value of createAsyncGenerator()) {
        console.log(value); // 0, 1, 2, 3, 4 (с задержкой)
    }
}

processGenerator();
```

## 2. Ключевые возможности асинхронных генераторов

### Yield с Promise

```javascript
async function* fetchDataGenerator() {
    const urls = [
        'https://api.example.com/data1',
        'https://api.example.com/data2',
        'https://api.example.com/data3'
    ];
    
    for (const url of urls) {
        // Yield промиса, который разрешится в данные
        const response = yield fetch(url);
        const data = yield response.json();
        console.log(data);
    }
}
```

### Await внутри генератора

```javascript
async function* delayedCounter() {
    console.log('Начало генератора');
    
    for (let i = 1; i <= 3; i++) {
        // Ожидание между yield
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Выдаем значение: ${i}`);
        yield i;
    }
    
    console.log('Конец генератора');
}

// Использование
(async () => {
    const generator = delayedCounter();
    
    for await (const value of generator) {
        console.log(`Получено: ${value}`);
    }
})();
```

## 3. ВПФ (Высокоуровневые функции работы) для асинхронных генераторов

### Async Map Генератор

```javascript
async function* asyncMap(asyncIterable, mapper) {
    for await (const item of asyncIterable) {
        yield await mapper(item);
    }
}

// Пример использования
async function* numberGenerator() {
    for (let i = 1; i <= 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

// Применяем map для умножения на 2
(async () => {
    const doubled = asyncMap(numberGenerator(), async (x) => x * 2);
    
    for await (const value of doubled) {
        console.log(value); // 2, 4, 6, 8, 10
    }
})();
```

### Async Filter Генератор

```javascript
async function* asyncFilter(asyncIterable, predicate) {
    for await (const item of asyncIterable) {
        if (await predicate(item)) {
            yield item;
        }
    }
}

// Пример использования
(async () => {
    const numbers = numberGenerator();
    const evenNumbers = asyncFilter(numbers, async (x) => x % 2 === 0);
    
    for await (const value of evenNumbers) {
        console.log(value); // 2, 4
    }
})();
```

### Async Reduce Генератор

```javascript
async function asyncReduce(asyncIterable, reducer, initialValue) {
    let accumulator = initialValue;
    let index = 0;
    
    for await (const item of asyncIterable) {
        accumulator = await reducer(accumulator, item, index++);
    }
    
    return accumulator;
}

// Пример использования
(async () => {
    const numbers = numberGenerator();
    const sum = await asyncReduce(numbers, async (acc, curr) => acc + curr, 0);
    console.log(`Сумма: ${sum}`); // Сумма: 15
})();
```

### Async Transform Генератор

```javascript
async function* asyncTransform(asyncIterable, ...transforms) {
    let stream = asyncIterable;
    
    for (const transform of transforms) {
        stream = transform(stream);
    }
    
    yield* stream;
}

// Пример комплексного преобразования
(async () => {
    const numbers = numberGenerator();
    
    const pipeline = asyncTransform(
        numbers,
        stream => asyncMap(stream, async x => x * 2),
        stream => asyncFilter(stream, async x => x > 5),
        stream => asyncMap(stream, async x => `Число: ${x}`)
    );
    
    for await (const value of pipeline) {
        console.log(value); // "Число: 6", "Число: 8", "Число: 10"
    }
})();
```

## 4. Практические примеры

### Обработка потоков данных

```javascript
// Генератор для чтения файлов построчно
async function* readFileLines(filePath) {
    // Предположим, что у нас есть асинхронный итератор для файла
    const fileStream = await createFileStream(filePath);
    
    try {
        for await (const line of fileStream) {
            yield line;
        }
    } finally {
        await fileStream.close();
    }
}

// Обработка логов в реальном времени
async function* processLogs(logGenerator) {
    const processedLogs = asyncTransform(
        logGenerator,
        stream => asyncFilter(stream, async log => log.level === 'ERROR'),
        stream => asyncMap(stream, async log => ({
            ...log,
            timestamp: new Date(log.timestamp),
            processed: true
        }))
    );
    
    yield* processedLogs;
}
```

### Пагинация API

```javascript
async function* paginatedAPI(endpoint) {
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
        const response = await fetch(`${endpoint}?page=${page}`);
        const data = await response.json();
        
        for (const item of data.items) {
            yield item;
        }
        
        hasMore = data.hasMore;
        page++;
        
        // Задержка между запросами
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Использование
(async () => {
    const userGenerator = paginatedAPI('https://api.example.com/users');
    
    // Фильтруем активных пользователей
    const activeUsers = asyncFilter(
        userGenerator, 
        async user => user.status === 'active'
    );
    
    for await (const user of activeUsers) {
        console.log(`Активный пользователь: ${user.name}`);
    }
})();
```

## 5. Обработка ошибок

```javascript
async function* robustAsyncGenerator() {
    try {
        for (let i = 0; i < 5; i++) {
            try {
                // Имитация операции, которая может завершиться ошибкой
                if (i === 2) {
                    throw new Error('Ошибка на итерации 2');
                }
                
                await new Promise(resolve => setTimeout(resolve, 100));
                yield i;
            } catch (error) {
                console.error(`Ошибка на итерации ${i}:`, error.message);
                // Продолжаем работу после ошибки
            }
        }
    } finally {
        console.log('Генератор завершил работу');
    }
}

// Обработка ошибок при итерации
(async () => {
    try {
        for await (const value of robustAsyncGenerator()) {
            console.log(value);
        }
    } catch (error) {
        console.error('Критическая ошибка:', error);
    }
})();
```

## 6. Продвинутые паттерны

### Композиция генераторов

```javascript
async function* mergeAsyncGenerators(...generators) {
    const promises = generators.map(async function* (gen) {
        for await (const item of gen) {
            yield item;
        }
    });
    
    // Простая реализация слияния (в реальности нужна более сложная логика)
    for (const gen of promises) {
        yield* gen;
    }
}

// Генератор с обратной связью
async function* interactiveGenerator() {
    let value = 0;
    
    while (true) {
        const input = yield value;
        
        if (input === 'stop') break;
        if (typeof input === 'number') {
            value = input;
        } else {
            value++;
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

// Использование с обратной связью
(async () => {
    const gen = interactiveGenerator();
    
    // Пропускаем первое значение (оно undefined)
    await gen.next();
    
    console.log(await gen.next()); // { value: 1, done: false }
    console.log(await gen.next(10)); // { value: 10, done: false }
    console.log(await gen.next()); // { value: 11, done: false }
    console.log(await gen.next('stop')); // { value: undefined, done: true }
})();
```

## 7. Производительность и лучшие практики

### Ленивые вычисления

```javascript
// Генератор создает данные только когда они запрашиваются
async function* lazyDataProcessor(dataSource) {
    for await (const chunk of dataSource) {
        // Обработка происходит только при запросе следующего значения
        const processed = await expensiveProcessing(chunk);
        yield processed;
    }
}

async function expensiveProcessing(data) {
    await new Promise(resolve => setTimeout(resolve, 50));
    return data * 2;
}
```

### Ограничение параллелизма

```javascript
async function* withConcurrencyLimit(asyncIterable, limit) {
    const queue = [];
    const iterator = asyncIterable[Symbol.asyncIterator]();
    
    // Начальное заполнение очереди
    for (let i = 0; i < limit; i++) {
        queue.push(iterator.next());
    }
    
    while (queue.length > 0) {
        const result = await Promise.race(
            queue.map((promise, index) => 
                promise.then(result => ({ result, index }))
            )
        );
        
        yield result.result.value;
        
        // Заменяем завершившуюся задачу новой
        queue[result.index] = iterator.next();
        
        // Убираем завершенные задачи
        if (result.result.done) {
            queue.splice(result.index, 1);
        }
    }
}
```


