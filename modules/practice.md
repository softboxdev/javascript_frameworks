# Практическая работа: Замыкания в JavaScript

## 🎯 Цель работы
Освоить практическое применение замыканий для создания инкапсулированных, переиспользуемых компонентов с сохранением состояния.

## 📋 Задание 1: Создание счетчика с историей

```javascript
// Задача: создать счетчик с возможностью отслеживания истории изменений
function createAdvancedCounter(initialValue = 0) {
    // Ваш код здесь
}

// Тесты для проверки
const counter = createAdvancedCounter(10);
console.log(counter.getValue()); // 10
console.log(counter.increment(5)); // 15
console.log(counter.decrement(3)); // 12
console.log(counter.getHistory()); // ['+5', '-3']
console.log(counter.reset()); // 10
```

<details>
<summary>📝 Решение задания 1</summary>

```javascript
function createAdvancedCounter(initialValue = 0) {
    let value = initialValue;
    const startValue = initialValue;
    const history = [];

    return {
        increment: function(amount = 1) {
            value += amount;
            history.push(`+${amount}`);
            return value;
        },
        
        decrement: function(amount = 1) {
            value -= amount;
            history.push(`-${amount}`);
            return value;
        },
        
        getValue: function() {
            return value;
        },
        
        getHistory: function() {
            return [...history]; // возвращаем копию массива
        },
        
        reset: function() {
            value = startValue;
            history.length = 0; // очищаем историю
            return value;
        }
    };
}

// Проверка работы
const counter = createAdvancedCounter(10);
console.log("Начальное значение:", counter.getValue()); // 10
console.log("Увеличиваем на 5:", counter.increment(5)); // 15
console.log("Уменьшаем на 3:", counter.decrement(3)); // 12
console.log("История операций:", counter.getHistory()); // ['+5', '-3']
console.log("Сброс:", counter.reset()); // 10
console.log("История после сброса:", counter.getHistory()); // []
```
</details>

## 📋 Задание 2: Система кэширования

```javascript
// Задача: создать функцию кэширования для дорогостоящих операций
function createCache() {
    // Ваш код здесь
}

// Тесты
const cache = createCache();
console.log(cache.get('user_1')); // null
cache.set('user_1', { name: 'John', age: 30 });
console.log(cache.get('user_1')); // { name: 'John', age: 30 }
console.log(cache.has('user_1')); // true
cache.clear();
console.log(cache.get('user_1')); // null
```

<details>
<summary>📝 Решение задания 2</summary>

```javascript
function createCache() {
    const storage = new Map();
    let stats = {
        hits: 0,
        misses: 0
    };

    return {
        set: function(key, value) {
            storage.set(key, value);
            return true;
        },
        
        get: function(key) {
            if (storage.has(key)) {
                stats.hits++;
                return storage.get(key);
            } else {
                stats.misses++;
                return null;
            }
        },
        
        has: function(key) {
            return storage.has(key);
        },
        
        delete: function(key) {
            return storage.delete(key);
        },
        
        clear: function() {
            storage.clear();
            stats.hits = 0;
            stats.misses = 0;
        },
        
        getStats: function() {
            return { ...stats }; // возвращаем копию
        },
        
        size: function() {
            return storage.size;
        }
    };
}

// Проверка работы
const cache = createCache();

// Тестируем кэш
cache.set('user_1', { name: 'John', age: 30 });
cache.set('user_2', { name: 'Alice', age: 25 });

console.log("Получаем user_1:", cache.get('user_1')); // { name: 'John', age: 30 }
console.log("Проверяем user_3:", cache.get('user_3')); // null
console.log("Есть ли user_2:", cache.has('user_2')); // true

cache.get('user_1'); // повторный запрос
console.log("Статистика:", cache.getStats()); // { hits: 2, misses: 1 }

console.log("Размер кэша:", cache.size()); // 2
cache.clear();
console.log("Размер после очистки:", cache.size()); // 0
```
</details>

## 📋 Задание 3: Генератор уникальных ID

```javascript
// Задача: создать генератор ID с различными префиксами
function createIdGenerator() {
    // Ваш код здесь
}

// Тесты
const idGen = createIdGenerator();
console.log(idGen.next('user')); // 'user_1'
console.log(idGen.next('order')); // 'order_1'
console.log(idGen.next('user')); // 'user_2'
console.log(idGen.getCounters()); // { user: 2, order: 1 }
```

<details>
<summary>📝 Решение задания 3</summary>

```javascript
function createIdGenerator() {
    const counters = {};
    
    return {
        next: function(prefix = 'item') {
            if (!counters[prefix]) {
                counters[prefix] = 0;
            }
            counters[prefix]++;
            return `${prefix}_${counters[prefix]}`;
        },
        
        reset: function(prefix = null) {
            if (prefix) {
                counters[prefix] = 0;
            } else {
                // Сбрасываем все счетчики
                Object.keys(counters).forEach(key => {
                    counters[key] = 0;
                });
            }
        },
        
        getCounters: function() {
            return { ...counters }; // возвращаем копию
        },
        
        getNextValue: function(prefix) {
            return counters[prefix] ? counters[prefix] + 1 : 1;
        }
    };
}

// Проверка работы
const idGen = createIdGenerator();

console.log("Генерация ID для пользователей:");
console.log(idGen.next('user')); // 'user_1'
console.log(idGen.next('user')); // 'user_2'
console.log(idGen.next('user')); // 'user_3'

console.log("Генерация ID для заказов:");
console.log(idGen.next('order')); // 'order_1'
console.log(idGen.next('order')); // 'order_2'

console.log("Генерация ID без префикса:");
console.log(idGen.next()); // 'item_1'

console.log("Текущие счетчики:", idGen.getCounters());
// { user: 3, order: 2, item: 1 }

console.log("Следующее значение для user:", idGen.getNextValue('user')); // 4

// Сброс только user
idGen.reset('user');
console.log("После сброса user:", idGen.getCounters());
// { user: 0, order: 2, item: 1 }

console.log("Новый user ID:", idGen.next('user')); // 'user_1'
```
</details>

## 📋 Задание 4: Система прав доступа

```javascript
// Задача: создать систему управления правами доступа
function createAuthSystem() {
    // Ваш код здесь
}

// Тесты
const auth = createAuthSystem();
auth.addUser('admin', ['read', 'write', 'delete']);
auth.addUser('user', ['read']);
console.log(auth.checkPermission('admin', 'delete')); // true
console.log(auth.checkPermission('user', 'delete')); // false
auth.updateUser('user', ['read', 'write']);
console.log(auth.checkPermission('user', 'write')); // true
```

<details>
<summary>📝 Решение задания 4</summary>

```javascript
function createAuthSystem() {
    const users = {};
    const roles = {
        admin: ['read', 'write', 'delete', 'manage_users'],
        moderator: ['read', 'write', 'delete'],
        user: ['read']
    };

    return {
        addUser: function(username, permissions) {
            users[username] = {
                permissions: [...permissions],
                loginAttempts: 0,
                isBlocked: false
            };
            return `Пользователь ${username} добавлен`;
        },
        
        addUserByRole: function(username, role) {
            if (!roles[role]) {
                return `Роль ${role} не существует`;
            }
            return this.addUser(username, roles[role]);
        },
        
        checkPermission: function(username, permission) {
            const user = users[username];
            if (!user || user.isBlocked) {
                return false;
            }
            return user.permissions.includes(permission);
        },
        
        updateUser: function(username, newPermissions) {
            if (users[username]) {
                users[username].permissions = [...newPermissions];
                return `Права пользователя ${username} обновлены`;
            }
            return `Пользователь ${username} не найден`;
        },
        
        loginAttempt: function(username, success) {
            if (!users[username]) return false;
            
            if (success) {
                users[username].loginAttempts = 0;
                return true;
            } else {
                users[username].loginAttempts++;
                if (users[username].loginAttempts >= 3) {
                    users[username].isBlocked = true;
                    return `Пользователь ${username} заблокирован`;
                }
                return `Неудачная попытка входа. Осталось попыток: ${3 - users[username].loginAttempts}`;
            }
        },
        
        unblockUser: function(username) {
            if (users[username]) {
                users[username].isBlocked = false;
                users[username].loginAttempts = 0;
                return `Пользователь ${username} разблокирован`;
            }
        },
        
        getUserInfo: function(username) {
            if (!users[username]) return null;
            return {
                username: username,
                permissions: [...users[username].permissions],
                loginAttempts: users[username].loginAttempts,
                isBlocked: users[username].isBlocked
            };
        }
    };
}

// Проверка работы
const auth = createAuthSystem();

// Добавляем пользователей
console.log(auth.addUserByRole('alice', 'admin'));
console.log(auth.addUserByRole('bob', 'user'));

// Проверяем права
console.log("Alice может удалять?", auth.checkPermission('alice', 'delete')); // true
console.log("Bob может писать?", auth.checkPermission('bob', 'write')); // false

// Симуляция попыток входа
console.log(auth.loginAttempt('bob', false)); // Неудачная попытка...
console.log(auth.loginAttempt('bob', false)); // Неудачная попытка...
console.log(auth.loginAttempt('bob', false)); // Пользователь заблокирован

console.log("Bob заблокирован?", auth.getUserInfo('bob').isBlocked); // true

// Разблокируем
console.log(auth.unblockUser('bob'));
console.log("Bob заблокирован?", auth.getUserInfo('bob').isBlocked); // false
```
</details>

## 📋 Задание 5: Таймер обратного отсчета

```javascript
// Задача: создать таймер с паузой, сбросом и callback'ами
function createCountdownTimer(initialTime) {
    // Ваш код здесь
}

// Тесты
const timer = createCountdownTimer(5);
timer.onTick((time) => console.log(`Осталось: ${time} сек`));
timer.onComplete(() => console.log('Время вышло!'));
timer.start();
```

<details>
<summary>📝 Решение задания 5</summary>

```javascript
function createCountdownTimer(initialTime) {
    let time = initialTime;
    let timerId = null;
    let isRunning = false;
    const callbacks = {
        tick: [],
        complete: [],
        pause: [],
        reset: []
    };

    function executeCallbacks(type, data = null) {
        if (callbacks[type]) {
            callbacks[type].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('Ошибка в callback:', error);
                }
            });
        }
    }

    function tick() {
        if (time > 0) {
            time--;
            executeCallbacks('tick', time);
            
            if (time === 0) {
                stop();
                executeCallbacks('complete');
            }
        }
    }

    function stop() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
            isRunning = false;
        }
    }

    return {
        start: function() {
            if (!isRunning && time > 0) {
                isRunning = true;
                timerId = setInterval(tick, 1000);
            }
            return this;
        },
        
        pause: function() {
            if (isRunning) {
                stop();
                executeCallbacks('pause', time);
            }
            return this;
        },
        
        reset: function() {
            stop();
            time = initialTime;
            executeCallbacks('reset', time);
            return this;
        },
        
        setTime: function(newTime) {
            stop();
            time = newTime;
            initialTime = newTime;
            return this;
        },
        
        getTime: function() {
            return time;
        },
        
        isRunning: function() {
            return isRunning;
        },
        
        onTick: function(callback) {
            callbacks.tick.push(callback);
            return this;
        },
        
        onComplete: function(callback) {
            callbacks.complete.push(callback);
            return this;
        },
        
        onPause: function(callback) {
            callbacks.pause.push(callback);
            return this;
        },
        
        onReset: function(callback) {
            callbacks.reset.push(callback);
            return this;
        }
    };
}

// Проверка работы
console.log("Создаем таймер на 5 секунд:");
const timer = createCountdownTimer(5);

// Добавляем обработчики событий
timer.onTick((time) => {
    console.log(`⏰ Осталось: ${time} сек`);
});

timer.onComplete(() => {
    console.log('🎉 Время вышло!');
});

timer.onPause((time) => {
    console.log(`⏸️ Таймер на паузе на ${time} сек`);
});

timer.onReset((time) => {
    console.log(`🔄 Таймер сброшен до ${time} сек`);
});

// Запускаем таймер
console.log("Запускаем таймер:");
timer.start();

// Через 2 секунды ставим на паузу
setTimeout(() => {
    console.log("Ставим на паузу:");
    timer.pause();
    
    // Через 2 секунды продолжаем
    setTimeout(() => {
        console.log("Продолжаем:");
        timer.start();
    }, 2000);
}, 2000);

// Через 8 секунд сбрасываем
setTimeout(() => {
    console.log("Сбрасываем таймер:");
    timer.reset();
    
    // Перезапускаем с новым временем
    setTimeout(() => {
        console.log("Новый таймер на 3 секунды:");
        timer.setTime(3).start();
    }, 1000);
}, 8000);
```
</details>

## 🧪 Дополнительные задания для самостоятельной работы

### Задание 6: Конструктор форм с валидацией
```javascript
function createFormValidator() {
    // Создайте систему валидации форм с правилами:
    // - required (обязательное поле)
    // - minLength (минимальная длина)
    // - email (валидация email)
    // - custom (пользовательская функция)
}
```

### Задание 7: Система подписок (Observable)
```javascript
function createObservable() {
    // Создайте систему, где объекты могут подписываться на события
    // и получать уведомления при их наступлении
}
```

## 📊 Критерии оценки

| Задание | Максимальный балл | Критерии |
|---------|------------------|----------|
| 1 | 2 балла | Рабочий счетчик с историей |
| 2 | 2 балла | Эффективная система кэширования |
| 3 | 2 балла | Генератор с префиксами и статистикой |
| 4 | 2 балла | Система прав с блокировкой |
| 5 | 2 балла | Таймер с событиями и управлением |
| **Итого** | **10 баллов** | |

## 💡 Советы по выполнению

1. **Инкапсуляция**: Используйте замыкания для скрытия внутренних переменных
2. **Неизменяемость**: Возвращайте копии массивов/объектов для безопасности
3. **Гибкость**: Предусмотрите различные сценарии использования
4. **Обработка ошибок**: Добавляйте проверки входных параметров

Удачи в выполнении практической работы! 🚀