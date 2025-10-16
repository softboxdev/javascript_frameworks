# Подробный разбор основ Vue.js

## 1. Установка Vue.js

### Способы установки:
```html
<!-- Способ 1: CDN -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Способ 2: npm -->
npm create vue@latest
# или
npm install vue

<!-- Способ 3: CLI -->
npm install -g @vue/cli
vue create my-project
```

### Быстрый старт:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue Start</title>
</head>
<body>
    <div id="app">
        {{ message }}
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;
        createApp({
            data() {
                return {
                    message: 'Привет Vue!'
                }
            }
        }).mount('#app');
    </script>
</body>
</html>
```

## 2. Введение в Vue.js

### Что такое Vue.js?
Vue.js — прогрессивный JavaScript-фреймворк для создания пользовательских интерфейсов. Основные особенности:
- **Реактивность**: Автоматическое обновление DOM при изменении данных
- **Компонентный подход**: Переиспользуемые компоненты
- **Интуитивный синтаксис**: Простая кривая обучения

### Декларативная отрисовка:
```javascript
const app = Vue.createApp({
    data() {
        return {
            title: 'Мое приложение',
            counter: 0
        }
    }
}).mount('#app');
```

```html
<div id="app">
    <h1>{{ title }}</h1>
    <p>Счетчик: {{ counter }}</p>
</div>
```

### Композиция приложения:
```javascript
// Основной экземпляр приложения
const app = Vue.createApp({
    // корневой компонент
});

// Глобальные компоненты
app.component('my-component', {
    /* опции компонента */
});

// Глобальные директивы
app.directive('focus', {
    mounted(el) {
        el.focus();
    }
});

app.mount('#app');
```

## 3. Экземпляры приложения и компонента

### Создание экземпляра:
```javascript
const app = Vue.createApp({
    // опции
    data() {
        return { message: 'Hello!' }
    },
    methods: {
        reverseMessage() {
            this.message = this.message.split('').reverse().join('');
        }
    },
    created() {
        console.log('Экземпляр создан!');
    }
});
```

### Свойства экземпляра:
```javascript
const app = Vue.createApp({
    data() {
        return { count: 0 }
    },
    computed: {
        doubleCount() {
            return this.count * 2;
        }
    },
    methods: {
        increment() {
            this.count++;
        }
    },
    watch: {
        count(newVal, oldVal) {
            console.log(`Count изменился с ${oldVal} на ${newVal}`);
        }
    }
});
```

### Хуки жизненного цикла:
```javascript
Vue.createApp({
    data() {
        return { data: null }
    },
    beforeCreate() {
        console.log('До инициализации данных');
    },
    created() {
        console.log('Данные инициализированы');
        this.fetchData();
    },
    beforeMount() {
        console.log('До монтирования DOM');
    },
    mounted() {
        console.log('Компонент монтирован в DOM');
    },
    beforeUpdate() {
        console.log('До обновления DOM');
    },
    updated() {
        console.log('DOM обновлен');
    },
    beforeUnmount() {
        console.log('До размонтирования');
    },
    unmounted() {
        console.log('Компонент размонтирован');
    },
    methods: {
        fetchData() {
            // получение данных
        }
    }
});
```

### Диаграмма жизненного цикла:
```
beforeCreate → created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted
```

## 4. Синтаксис шаблонов

### Интерполяция:
```html
<div id="app">
    <!-- Текст -->
    <span>{{ message }}</span>
    
    <!-- HTML -->
    <span v-html="rawHtml"></span>
    
    <!-- Атрибуты -->
    <div v-bind:id="dynamicId"></div>
    <button v-bind:disabled="isButtonDisabled">Кнопка</button>
    
    <!-- JavaScript выражения -->
    <p>{{ number + 1 }}</p>
    <p>{{ ok ? 'YES' : 'NO' }}</p>
    <p>{{ message.split('').reverse().join('') }}</p>
</div>
```

### Директивы:
```html
<!-- Условная отрисовка -->
<p v-if="seen">Сейчас меня видно</p>
<p v-else-if="type === 'A'">Тип A</p>
<p v-else>Тип B</p>

<!-- Циклы -->
<ul>
    <li v-for="item in items" :key="item.id">
        {{ item.text }}
    </li>
</ul>

<!-- Обработка событий -->
<button v-on:click="doSomething">Клик</button>

<!-- Связывание данных -->
<input v-model="message">
```

### Сокращенная запись:
```html
<!-- v-bind сокращение -->
<a :href="url">Ссылка</a>
<button :disabled="isDisabled">Кнопка</button>

<!-- v-on сокращение -->
<button @click="handleClick">Клик</button>
<input @input="onInput">
```

## 5. Свойства data и методы

### Свойство data:
```javascript
const app = Vue.createApp({
    data() {
        return {
            message: 'Hello Vue!',
            count: 0,
            user: {
                name: 'John',
                age: 30
            },
            items: ['foo', 'bar', 'baz']
        }
    }
});
```

### Методы:
```javascript
const app = Vue.createApp({
    data() {
        return {
            count: 0,
            firstName: 'John',
            lastName: 'Doe'
        }
    },
    methods: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        },
        // Методы с параметрами
        greet(name) {
            alert(`Hello, ${name}!`);
        },
        // Доступ к данным
        getFullName() {
            return `${this.firstName} ${this.lastName}`;
        }
    }
});
```

### Использование в шаблоне:
```html
<div id="app">
    <p>Счетчик: {{ count }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="greet('Vue')">Поздороваться</button>
    <p>Полное имя: {{ getFullName() }}</p>
</div>
```

## 6. Вычисляемые свойства и наблюдатели

### Вычисляемые свойства:
```javascript
const app = Vue.createApp({
    data() {
        return {
            firstName: 'John',
            lastName: 'Doe',
            items: [
                { name: 'Item 1', price: 10 },
                { name: 'Item 2', price: 20 },
                { name: 'Item 3', price: 30 }
            ]
        }
    },
    computed: {
        // Простое вычисляемое свойство
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        },
        // Вычисляемое свойство с геттером и сеттером
        reversedMessage: {
            get() {
                return this.message.split('').reverse().join('');
            },
            set(newValue) {
                this.message = newValue.split('').reverse().join('');
            }
        },
        // Сложные вычисления
        totalPrice() {
            return this.items.reduce((total, item) => total + item.price, 0);
        },
        expensiveItems() {
            return this.items.filter(item => item.price > 15);
        }
    }
});
```

### Методы-наблюдатели:
```javascript
const app = Vue.createApp({
    data() {
        return {
            question: '',
            answer: 'Задайте вопрос!',
            user: {
                name: 'John',
                age: 30
            },
            deepObject: {
                nested: {
                    value: 'test'
                }
            }
        }
    },
    watch: {
        // Простой наблюдатель
        question(newQuestion, oldQuestion) {
            if (newQuestion.includes('?')) {
                this.getAnswer();
            }
        },
        // Наблюдатель для глубокого объекта
        user: {
            handler(newVal, oldVal) {
                console.log('User изменился:', newVal);
            },
            deep: true, // следить за вложенными свойствами
            immediate: true // вызвать сразу при создании
        },
        // Наблюдатель для конкретного пути
        'deepObject.nested.value'(newVal) {
            console.log('Nested value изменился:', newVal);
        }
    },
    methods: {
        getAnswer() {
            // асинхронная операция
            this.answer = 'Думаю...';
            setTimeout(() => {
                this.answer = 'Ответ!';
            }, 1000);
        }
    }
});
```

## 7. Работа со стилями

### Связывание CSS-классов:
```html
<div id="app">
    <!-- Объектный синтаксис -->
    <div :class="{ active: isActive, 'text-danger': hasError }">
        Текст
    </div>
    
    <!-- Синтаксис массива -->
    <div :class="[activeClass, errorClass]">
        Текст
    </div>
    
    <!-- Смешанный синтаксис -->
    <div class="static" :class="[isActive ? activeClass : '', errorClass]">
        Текст
    </div>
    
    <!-- С вычисляемым свойством -->
    <div :class="classObject">
        Текст
    </div>
</div>
```

```javascript
const app = Vue.createApp({
    data() {
        return {
            isActive: true,
            hasError: false,
            activeClass: 'active',
            errorClass: 'text-danger'
        }
    },
    computed: {
        classObject() {
            return {
                active: this.isActive && !this.hasError,
                'text-danger': this.hasError && this.hasError.type === 'fatal'
            }
        }
    }
});
```

### Связывание inline-стилей:
```html
<div id="app">
    <!-- Объектный синтаксис -->
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
        Текст
    </div>
    
    <!-- Синтаксис массива -->
    <div :style="[baseStyles, overridingStyles]">
        Текст
    </div>
    
    <!-- Автоматические префиксы -->
    <div :style="{ transform: 'scale(' + scale + ')' }">
        Масштабируемый элемент
    </div>
</div>
```

```javascript
const app = Vue.createApp({
    data() {
        return {
            activeColor: 'red',
            fontSize: 30,
            scale: 1.2,
            baseStyles: {
                color: 'blue',
                fontSize: '16px'
            },
            overridingStyles: {
                fontWeight: 'bold'
            }
        }
    }
});
```

## 8. Условная отрисовка и списки

### Условная отрисовка:
```html
<div id="app">
    <!-- v-if / v-else-if / v-else -->
    <div v-if="type === 'A'">
        Тип A
    </div>
    <div v-else-if="type === 'B'">
        Тип B
    </div>
    <div v-else>
        Другой тип
    </div>
    
    <!-- v-show -->
    <div v-show="isVisible">
        Показывается с помощью display
    </div>
    
    <!-- v-if vs v-show -->
    <p v-if="heavyCondition">Тяжелый рендеринг (удаляется из DOM)</p>
    <p v-show="frequentToggle">Часто переключается (display: none)</p>
</div>
```

```javascript
const app = Vue.createApp({
    data() {
        return {
            type: 'A',
            isVisible: true,
            heavyCondition: false,
            frequentToggle: true
        }
    }
});
```

### Отрисовка списков:
```html
<div id="app">
    <!-- Простой список -->
    <ul>
        <li v-for="item in items" :key="item.id">
            {{ item.name }}
        </li>
    </ul>
    
    <!-- С индексом -->
    <ul>
        <li v-for="(item, index) in items" :key="item.id">
            {{ index }}. {{ item.name }}
        </li>
    </ul>
    
    <!-- Объекты -->
    <ul>
        <li v-for="(value, key, index) in userObject" :key="key">
            {{ index }}. {{ key }}: {{ value }}
        </li>
    </ul>
    
    <!-- Диапазон -->
    <span v-for="n in 10" :key="n">{{ n }} </span>
    
    <!-- v-for с v-if -->
    <template v-for="item in items" :key="item.id">
        <li v-if="item.isActive">
            {{ item.name }}
        </li>
    </template>
</div>
```

```javascript
const app = Vue.createApp({
    data() {
        return {
            items: [
                { id: 1, name: 'Item 1', isActive: true },
                { id: 2, name: 'Item 2', isActive: false },
                { id: 3, name: 'Item 3', isActive: true }
            ],
            userObject: {
                firstName: 'John',
                lastName: 'Doe',
                age: 30
            }
        }
    }
});
```

## 9. Обработка событий

### Прослушивание событий:
```html
<div id="app">
    <!-- Прямое выполнение -->
    <button @click="counter++">Добавить 1</button>
    
    <!-- Вызов метода -->
    <button @click="increment">Добавить 1</button>
    
    <!-- Вызов метода с параметрами -->
    <button @click="sayHello('Vue')">Поздороваться</button>
    
    <!-- Доступ к原生 event -->
    <button @click="warn('Форма не может быть отправлена.', $event)">
        Отправить
    </button>
    
    <!-- Несколько обработчиков -->
    <button @click="firstHandler(), secondHandler()">
        Двойное действие
    </button>
</div>
```

### Методы обработчиков:
```javascript
const app = Vue.createApp({
    data() {
        return {
            counter: 0,
            message: 'Hello Vue!'
        }
    },
    methods: {
        increment() {
            this.counter++;
        },
        sayHello(name) {
            alert(`Hello, ${name}!`);
        },
        warn(message, event) {
            if (event) {
                event.preventDefault();
            }
            alert(message);
        },
        firstHandler() {
            console.log('Первый обработчик');
        },
        secondHandler() {
            console.log('Второй обработчик');
        }
    }
});
```

### Модификаторы событий:
```html
<div id="app">
    <!-- Модификаторы событий -->
    <form @submit.prevent="onSubmit">
        <button type="submit">Отправить</button>
    </form>
    
    <!-- Цепочка модификаторов -->
    <a @click.stop.prevent="doThat" href="https://vuejs.org">
        Ссылка
    </a>
    
    <!-- Клавиши-модификаторы -->
    <input @keyup.enter="submit" placeholder="Нажмите Enter">
    <input @keyup.ctrl.enter="ctrlEnter" placeholder="Ctrl+Enter">
    
    <!-- Точной модификаторы клавиш -->
    <input @keyup.page-down="onPageDown">
    
    <!-- Модификаторы мыши -->
    <button @click.middle="middleClick">Средняя кнопка</button>
    <button @click.right="rightClick">Правая кнопка</button>
</div>
```

```javascript
const app = Vue.createApp({
    methods: {
        onSubmit() {
            console.log('Форма отправлена');
        },
        doThat() {
            console.log('Ссылка кликнута');
        },
        submit() {
            console.log('Enter нажат');
        },
        ctrlEnter() {
            console.log('Ctrl+Enter нажат');
        },
        onPageDown() {
            console.log('Page Down нажат');
        },
        middleClick() {
            console.log('Средняя кнопка мыши');
        },
        rightClick() {
            console.log('Правая кнопка мыши');
        }
    }
});
```

## 10. Работа с формами

### Основы работы с формами:
```html
<div id="app">
    <!-- Текст -->
    <input v-model="message" placeholder="Редактируйте меня">
    <p>Сообщение: {{ message }}</p>
    
    <!-- Многострочный текст -->
    <textarea v-model="multilineText" placeholder="Многострочный текст"></textarea>
    <p style="white-space: pre-line;">{{ multilineText }}</p>
    
    <!-- Чекбокс (один) -->
    <input type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{ checked }}</label>
    
    <!-- Чекбокс (несколько) -->
    <div>
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <p>Выбраны: {{ checkedNames }}</p>
    </div>
    
    <!-- Радиокнопки -->
    <div>
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <p>Выбрано: {{ picked }}</p>
    </div>
    
    <!-- Выпадающий список -->
    <select v-model="selected">
        <option disabled value="">Выберите один из вариантов</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
    </select>
    <p>Выбрано: {{ selected }}</p>
</div>
```

### Привязка значений:
```html
<div id="app">
    <!-- Чекбокс с привязкой -->
    <input type="checkbox" v-model="toggle" true-value="yes" false-value="no">
    <p>{{ toggle }}</p>
    
    <!-- Радиокнопки с привязкой объектов -->
    <input type="radio" v-model="pick" :value="first">
    <input type="radio" v-model="pick" :value="second">
    <p>Выбрано: {{ pick }}</p>
    
    <!-- Выпадающий список с объектами -->
    <select v-model="selectedObject">
        <option :value="{ number: 123 }">123</option>
        <option :value="{ number: 456 }">456</option>
    </select>
    <p>Выбран объект: {{ selectedObject }}</p>
</div>
```

```javascript
const app = Vue.createApp({
    data() {
        return {
            toggle: 'yes',
            first: { name: 'First' },
            second: { name: 'Second' },
            pick: null,
            selectedObject: null
        }
    }
});
```

### Модификаторы:
```html
<div id="app">
    <!-- .lazy - обновление на change -->
    <input v-model.lazy="lazyMessage">
    <p>{{ lazyMessage }}</p>
    
    <!-- .number - преобразование в число -->
    <input v-model.number="age" type="number">
    <p>Тип: {{ typeof age }}</p>
    
    <!-- .trim - удаление пробелов -->
    <input v-model.trim="trimmedMessage">
    <p>Длина: {{ trimmedMessage.length }}</p>
    
    <!-- Комбинация модификаторов -->
    <input v-model.lazy.trim="combined" placeholder="lazy + trim">
</div>
```

```javascript
const app = Vue.createApp({
    data() {
        return {
            lazyMessage: '',
            age: 0,
            trimmedMessage: '',
            combined: ''
        }
    }
});
```

## 11. Основы компонентов

### Переиспользование компонентов:
```javascript
// Глобальная регистрация
const app = Vue.createApp({});

app.component('button-counter', {
    data() {
        return {
            count: 0
        }
    },
    template: `
        <button @click="count++">
            Вы нажали {{ count }} раз.
        </button>
    `
});

app.mount('#app');
```

```html
<div id="app">
    <button-counter></button-counter>
    <button-counter></button-counter>
    <button-counter></button-counter>
</div>
```

### Организация компонентов:
```javascript
// Локальная регистрация
const app = Vue.createApp({
    components: {
        'component-a': {
            template: '<div>Компонент A</div>'
        },
        'component-b': {
            template: '<div>Компонент B</div>'
        }
    }
});

// Файловая структура
/*
components/
  TodoItem.vue
  UserProfile.vue
  App.vue
*/
```

### Передача данных в дочерние компоненты:
```javascript
const app = Vue.createApp({
    data() {
        return {
            posts: [
                { id: 1, title: 'Vue basics' },
                { id: 2, title: 'Components guide' },
                { id: 3, title: 'Reactivity deep dive' }
            ],
            postFontSize: 1
        }
    }
});

app.component('blog-post', {
    props: ['title', 'likes', 'isPublished', 'commentIds', 'author'],
    template: `
        <div class="blog-post">
            <h3>{{ title }}</h3>
            <button @click="$emit('enlarge-text')">
                Увеличить размер текста
            </button>
            <button @click="$emit('enlarge-text', 0.1)">
                Увеличить на 0.1
            </button>
        </div>
    `
});

app.mount('#blog-posts-demo');
```

```html
<div id="blog-posts-demo">
    <div :style="{ fontSize: postFontSize + 'em' }">
        <blog-post
            v-for="post in posts"
            :key="post.id"
            :title="post.title"
            @enlarge-text="postFontSize += $event"
        ></blog-post>
    </div>
</div>
```

### Валидация props:
```javascript
app.component('my-component', {
    props: {
        // Базовая проверка типа
        propA: Number,
        
        // Несколько допустимых типов
        propB: [String, Number],
        
        // Обязательное поле строкового типа
        propC: {
            type: String,
            required: true
        },
        
        // Число со значением по умолчанию
        propD: {
            type: Number,
            default: 100
        },
        
        // Объект со значением по умолчанию
        propE: {
            type: Object,
            default() {
                return { message: 'hello' };
            }
        },
        
        // Пользовательская функция-валидатор
        propF: {
            validator(value) {
                return ['success', 'warning', 'danger'].includes(value);
            }
        },
        
        // Функция со значением по умолчанию
        propG: {
            type: Function,
            default() {
                return 'Default function';
            }
        }
    },
    template: `
        <div>
            <p>{{ propA }}</p>
            <p>{{ propB }}</p>
            <p>{{ propC }}</p>
        </div>
    `
});
```

### Полный пример приложения:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Vue.js Complete Example</title>
    <style>
        .active { background-color: #4CAF50; color: white; }
        .text-danger { color: red; }
        .blog-post { border: 1px solid #ddd; padding: 10px; margin: 10px; }
    </style>
</head>
<body>
    <div id="app">
        <h1>{{ appTitle }}</h1>
        
        <!-- Условная отрисовка -->
        <div v-if="user.isLoggedIn">
            <p>Добро пожаловать, {{ user.name }}!</p>
            <button @click="logout">Выйти</button>
        </div>
        <div v-else>
            <button @click="login">Войти</button>
        </div>
        
        <!-- Форма -->
        <form @submit.prevent="addTodo">
            <input v-model.trim="newTodo" placeholder="Добавить задачу">
            <button type="submit">Добавить</button>
        </form>
        
        <!-- Список -->
        <ul>
            <li v-for="(todo, index) in todos" 
                :key="todo.id"
                :class="{ 'text-danger': todo.priority === 'high' }">
                {{ todo.text }}
                <button @click="removeTodo(index)">×</button>
            </li>
        </ul>
        
        <!-- Компоненты -->
        <blog-post
            v-for="post in blogPosts"
            :key="post.id"
            :title="post.title"
            :content="post.content"
            @enlarge-text="enlargeText"
        ></blog-post>
        
        <!-- Вычисляемые свойства -->
        <p>Всего задач: {{ totalTodos }}</p>
        <p>Высокоприоритетные: {{ highPriorityTodos }}</p>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
        const { createApp } = Vue;
        
        const app = createApp({
            data() {
                return {
                    appTitle: 'Мое Vue приложение',
                    user: {
                        isLoggedIn: false,
                        name: 'John Doe'
                    },
                    newTodo: '',
                    todos: [
                        { id: 1, text: 'Изучить Vue', priority: 'high' },
                        { id: 2, text: 'Создать приложение', priority: 'medium' }
                    ],
                    blogPosts: [
                        { id: 1, title: 'Первый пост', content: 'Содержание первого поста' },
                        { id: 2, title: 'Второй пост', content: 'Содержание второго поста' }
                    ],
                    fontSize: 1
                }
            },
            computed: {
                totalTodos() {
                    return this.todos.length;
                },
                highPriorityTodos() {
                    return this.todos.filter(todo => todo.priority === 'high').length;
                }
            },
            methods: {
                login() {
                    this.user.isLoggedIn = true;
                },
                logout() {
                    this.user.isLoggedIn = false;
                },
                addTodo() {
                    if (this.newTodo) {
                        this.todos.push({
                            id: Date.now(),
                            text: this.newTodo,
                            priority: 'medium'
                        });
                        this.newTodo = '';
                    }
                },
                removeTodo(index) {
                    this.todos.splice(index, 1);
                },
                enlargeText(increment = 0.1) {
                    this.fontSize += increment;
                }
            }
        });
        
        // Компонент
        app.component('blog-post', {
            props: {
                title: String,
                content: String
            },
            template: `
                <div class="blog-post" :style="{ fontSize: '1em' }">
                    <h3>{{ title }}</h3>
                    <p>{{ content }}</p>
                    <button @click="$emit('enlarge-text')">
                        Увеличить текст
                    </button>
                </div>
            `
        });
        
        app.mount('#app');
    </script>
</body>
</html>
```

Этот подробный разбор охватывает все основные концепции Vue.js и предоставляет практические примеры для лучшего понимания материала. Каждый раздел можно изучать и тестировать отдельно для закрепления знаний.