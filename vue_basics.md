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
    
    <!-- Доступ к event -->
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

# 🎯 Vue.js: Экземпляры приложения и компоненты

## 📖 Что такое экземпляр Vue?

**Экземпляр Vue** - это корневой объект, который запускает и управляет всем приложением. Это "мозг" вашего Vue приложения.

### Простая аналогия:
- **Экземпляр Vue** = как главный директор компании
- **Компоненты** = как отделы компании (бухгалтерия, IT, маркетинг)
- **Данные (data)** = как документы и информация
- **Методы (methods)** = как действия, которые можно выполнить

---

## 🚀 Создание экземпляра приложения

### Базовое создание:
```javascript
// Создание экземпляра Vue приложения
const app = Vue.createApp({
  // Здесь будут все настройки и логика
  data() {
    return {
      message: 'Привет, Vue!',
      counter: 0
    }
  }
})

// Монтирование приложения в DOM элемент
app.mount('#app')
```

```html
<!-- HTML -->
<div id="app">
  <p>{{ message }}</p>
  <p>Счетчик: {{ counter }}</p>
</div>
```

### Полный пример с разбором:
```javascript
const app = Vue.createApp({
  // DATA - реактивные данные (изменяются и автоматически обновляют вид)
  data() {
    return {
      title: 'Мое приложение',
      users: [],
      isLoading: false,
      userInput: ''
    }
  },
  
  // COMPUTED - вычисляемые свойства (автоматически пересчитываются)
  computed: {
    userCount() {
      return this.users.length
    },
    reversedTitle() {
      return this.title.split('').reverse().join('')
    }
  },
  
  // METHODS - функции, которые можно вызывать
  methods: {
    addUser() {
      if (this.userInput.trim()) {
        this.users.push(this.userInput.trim())
        this.userInput = ''
      }
    },
    removeUser(index) {
      this.users.splice(index, 1)
    },
    async fetchData() {
      this.isLoading = true
      // имитация загрузки данных
      setTimeout(() => {
        this.users = ['Анна', 'Борис', 'Виктор']
        this.isLoading = false
      }, 1000)
    }
  },
  
  // WATCH - наблюдатели за изменениями данных
  watch: {
    users(newUsers, oldUsers) {
      console.log('Список пользователей изменился:', newUsers)
    },
    userInput(newValue) {
      if (newValue.length > 10) {
        console.log('Введено больше 10 символов')
      }
    }
  }
})

// Монтируем приложение
app.mount('#app')
```

---

## 🔧 Свойства экземпляра

### Основные свойства:

| Свойство | Назначение | Пример |
|----------|------------|---------|
| `data` | Реактивные данные | `data() { return { count: 0 } }` |
| `computed` | Вычисляемые свойства | `doubleCount() { return this.count * 2 }` |
| `methods` | Методы/функции | `increment() { this.count++ }` |
| `watch` | Наблюдатели изменений | `count(newVal) { console.log(newVal) }` |
| `props` | Входящие параметры (в компонентах) | `props: ['title', 'content']` |
| `emits` | События (в компонентах) | `emits: ['update', 'delete']` |

### Подробный пример всех свойств:
```javascript
const app = Vue.createApp({
  // 1. DATA - состояние приложения
  data() {
    return {
      firstName: 'Иван',
      lastName: 'Петров',
      age: 25,
      posts: [
        { id: 1, title: 'Первая статья', views: 100 },
        { id: 2, title: 'Вторая статья', views: 200 }
      ]
    }
  },
  
  // 2. COMPUTED - производные данные
  computed: {
    // Автоматически обновляются при изменении зависимостей
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    totalViews() {
      return this.posts.reduce((sum, post) => sum + post.views, 0)
    },
    popularPosts() {
      return this.posts.filter(post => post.views > 150)
    }
  },
  
  // 3. METHODS - действия
  methods: {
    celebrateBirthday() {
      this.age++
      this.updateTitle()
    },
    updateTitle() {
      this.posts[0].title = `Статья от ${this.fullName}`
    },
    // Методы с параметрами
    addPost(title) {
      const newPost = {
        id: Date.now(),
        title: title,
        views: 0
      }
      this.posts.push(newPost)
    },
    // Асинхронные методы
    async loadData() {
      try {
        const response = await fetch('/api/data')
        this.posts = await response.json()
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      }
    }
  },
  
  // 4. WATCH - наблюдение за изменениями
  watch: {
    // Простой наблюдатель
    age(newAge, oldAge) {
      console.log(`Возраст изменился с ${oldAge} на ${newAge}`)
    },
    
    // Глубокое наблюдение за объектом
    posts: {
      handler(newPosts) {
        console.log('Посты обновлены:', newPosts)
        this.saveToLocalStorage()
      },
      deep: true, // следить за вложенными свойствами
      immediate: true // вызвать сразу при создании
    },
    
    // Наблюдение за конкретным свойством объекта
    'posts.length'(newLength) {
      console.log(`Количество постов: ${newLength}`)
    }
  },
  
  // 5. HOOKS - хуки жизненного цикла
  beforeCreate() {
    console.log('❶ beforeCreate: Экземпляр инициализируется')
  },
  
  created() {
    console.log('❷ created: Экземпляр создан, данные доступны')
    this.loadInitialData()
  },
  
  beforeMount() {
    console.log('❸ beforeMount: Перед монтированием в DOM')
  },
  
  mounted() {
    console.log('❹ mounted: Приложение монтировано в DOM')
    // Здесь можно работать с DOM
    this.setupEventListeners()
  },
  
  beforeUpdate() {
    console.log('❺ beforeUpdate: Данные изменились, DOM еще не обновлен')
  },
  
  updated() {
    console.log('❻ updated: DOM обновлен после изменения данных')
  },
  
  beforeUnmount() {
    console.log('❼ beforeUnmount: Перед уничтожением экземпляра')
  },
  
  unmounted() {
    console.log('❽ unmounted: Экземпляр уничтожен')
  }
})

// Вспомогательные методы
app.mount('#app')
```

---

## ⚡ Компоненты - строительные блоки

### Что такое компонент?
**Компонент** - это переиспользуемый экземпляр Vue с заранее определенными опциями.

### Создание компонента:
```javascript
// Глобальная регистрация компонента
app.component('user-profile', {
  // Входящие параметры
  props: {
    userName: {
      type: String,
      required: true
    },
    userAge: {
      type: Number,
      default: 18
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  
  // Локальные данные компонента
  data() {
    return {
      isExpanded: false,
      localScore: 0
    }
  },
  
  // Вычисляемые свойства
  computed: {
    userStatus() {
      return this.isAdmin ? 'Администратор' : 'Пользователь'
    },
    displayName() {
      return this.userName.toUpperCase()
    }
  },
  
  // Методы
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    },
    incrementScore() {
      this.localScore++
      // Отправка события родителю
      this.$emit('score-changed', this.localScore)
    }
  },
  
  // События компонента
  emits: ['score-changed', 'user-clicked'],
  
  // Хуки жизненного цикла
  mounted() {
    console.log('Компонент пользователя создан')
  },
  
  // Шаблон компонента
  template: `
    <div class="user-profile" :class="{ 'expanded': isExpanded }">
      <div class="user-header" @click="toggleExpand">
        <h3>{{ displayName }}</h3>
        <span class="age">({{ userAge }} лет)</span>
        <span class="status">{{ userStatus }}</span>
      </div>
      
      <div v-if="isExpanded" class="user-details">
        <p>Счет: {{ localScore }}</p>
        <button @click="incrementScore">+1 к счету</button>
        <button @click="$emit('user-clicked', userName)">
          Сообщить о клике
        </button>
      </div>
    </div>
  `
})
```

### Использование компонента:
```html
<div id="app">
  <user-profile 
    user-name="Анна Иванова"
    :user-age="25"
    :is-admin="true"
    @score-changed="onScoreChanged"
    @user-clicked="onUserClicked"
  ></user-profile>
  
  <user-profile 
    user-name="Петр Сидоров"
    :user-age="30"
    @score-changed="onScoreChanged"
  ></user-profile>
</div>
```

```javascript
const app = Vue.createApp({
  methods: {
    onScoreChanged(newScore) {
      console.log('Счет изменился:', newScore)
    },
    onUserClicked(userName) {
      alert(`Кликнули на пользователя: ${userName}`)
    }
  }
})
```

---

## 🔄 Диаграмма жизненного цикла

### Полный цикл экземпляра Vue:

```
┌─────────────────────────────────────────────────────────────┐
│                    ИНИЦИАЛИЗАЦИЯ                            │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   beforeCreate()    │  ❌ Данные НЕ доступны
                    └─────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     created()       │  ✅ Данные доступны
                    └─────────────────────┘  ❌ DOM НЕ доступен
                               │
                               ▼
                    ┌─────────────────────┐
                    │   beforeMount()     │  ❌ DOM еще не создан
                    └─────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     mounted()       │  ✅ DOM доступен
                    └─────────────────────┘
                               │
                               ▼
       ┌─────────────────────────────────────────┐
       │             ОБНОВЛЕНИЕ ДАННЫХ           │
       └─────────────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   beforeUpdate()    │  ❌ DOM еще старый
                    └─────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     updated()       │  ✅ DOM обновлен
                    └─────────────────────┘
                               │
                               ▼
       ┌─────────────────────────────────────────┐
       │             РАЗМОНТИРОВАНИЕ             │
       └─────────────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  beforeUnmount()    │  ✅ Экземпляр еще активен
                    └─────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    unmounted()      │  ❌ Экземпляр уничтожен
                    └─────────────────────┘
```

### Практический пример с хуками:
```javascript
const app = Vue.createApp({
  data() {
    return {
      timer: null,
      seconds: 0,
      updates: 0
    }
  },
  
  // 1. ИНИЦИАЛИЗАЦИЯ
  beforeCreate() {
    console.group('🚀 ИНИЦИАЛИЗАЦИЯ ЭКЗЕМПЛЯРА')
    console.log('❶ beforeCreate:')
    console.log('   - Данные:', this.$data) // undefined
    console.log('   - DOM:', document.getElementById('app')) // null
  },
  
  created() {
    console.log('❷ created:')
    console.log('   - Данные:', this.$data) // доступны!
    console.log('   - seconds:', this.seconds) // 0
    console.log('   - DOM все еще недоступен')
    
    // Запускаем таймер
    this.timer = setInterval(() => {
      this.seconds++
    }, 1000)
  },
  
  // 2. МОНТИРОВАНИЕ
  beforeMount() {
    console.log('❸ beforeMount:')
    console.log('   - Шаблон скомпилирован')
    console.log('   - Готовимся к вставке в DOM')
  },
  
  mounted() {
    console.log('❹ mounted:')
    console.log('   - Приложение в DOM!')
    console.log('   - Можем работать с элементами:')
    const appElement = document.getElementById('app')
    console.log('   - app element:', appElement)
    
    // Пример работы с DOM
    const title = document.querySelector('h1')
    if (title) {
      title.style.color = 'blue'
    }
  },
  
  // 3. ОБНОВЛЕНИЕ
  beforeUpdate() {
    this.updates++
    console.log(`❺ beforeUpdate (обновление #${this.updates}):`)
    console.log('   - Данные изменились, DOM еще старый')
    console.log('   - seconds:', this.seconds)
    
    // Проверим текущее значение в DOM
    const counterElement = document.querySelector('.counter')
    if (counterElement) {
      console.log('   - В DOM еще:', counterElement.textContent)
    }
  },
  
  updated() {
    console.log(`❻ updated (обновление #${this.updates}):`)
    console.log('   - DOM обновлен!')
    
    // Проверим обновленное значение в DOM
    const counterElement = document.querySelector('.counter')
    if (counterElement) {
      console.log('   - В DOM теперь:', counterElement.textContent)
    }
  },
  
  // 4. РАЗМОНТИРОВАНИЕ
  beforeUnmount() {
    console.log('❼ beforeUnmount:')
    console.log('   - Приложение будет удалено')
    console.log('   - Очищаем ресурсы...')
    
    // Очищаем таймер
    if (this.timer) {
      clearInterval(this.timer)
      console.log('   - Таймер очищен')
    }
  },
  
  unmounted() {
    console.log('❽ unmounted:')
    console.log('   - Приложение удалено из DOM')
    console.log('   - Все обработчики очищены')
    console.groupEnd()
  },
  
  // Метод для демонстрации размонтирования
  methods: {
    destroyApp() {
      app.unmount()
    }
  },
  
  template: `
    <div class="lifecycle-demo">
      <h1>Демо жизненного цикла Vue</h1>
      <p class="counter">Секунд: {{ seconds }}</p>
      <p>Обновлений: {{ updates }}</p>
      <button @click="destroyApp">Уничтожить приложение</button>
    </div>
  `
})

app.mount('#app')
```

---

## 🎯 Ключевые отличия: Экземпляр vs Компонент

| Аспект | Экземпляр приложения | Компонент |
|--------|---------------------|-----------|
| **Назначение** | Управление всем приложением | Переиспользуемый блок |
| **Создание** | `Vue.createApp()` | `app.component()` |
| **Количество** | Один на приложение | Много |
| **Область видимости** | Глобальная | Локальная |
| **Данные** | Глобальное состояние | Локальное состояние |
| **Коммуникация** | Прямой доступ | Через props/events |

### Пример взаимодействия:
```javascript
// Главный экземпляр приложения
const app = Vue.createApp({
  data() {
    return {
      globalUsers: [],
      selectedUser: null
    }
  }
})

// Компонент списка пользователей
app.component('user-list', {
  props: ['users'],
  data() {
    return {
      localSearch: ''
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => 
        user.name.toLowerCase().includes(this.localSearch.toLowerCase())
      )
    }
  },
  methods: {
    selectUser(user) {
      this.$emit('user-selected', user)
    }
  },
  emits: ['user-selected'],
  template: `
    <div>
      <input v-model="localSearch" placeholder="Поиск...">
      <ul>
        <li v-for="user in filteredUsers" 
            :key="user.id"
            @click="selectUser(user)">
          {{ user.name }}
        </li>
      </ul>
    </div>
  `
})

// Компонент деталей пользователя
app.component('user-details', {
  props: ['user'],
  template: `
    <div v-if="user">
      <h3>{{ user.name }}</h3>
      <p>Email: {{ user.email }}</p>
      <p>Телефон: {{ user.phone }}</p>
    </div>
  `
})

app.mount('#app')
```

```html
<div id="app">
  <user-list 
    :users="globalUsers" 
    @user-selected="selectedUser = $event"
  ></user-list>
  
  <user-details :user="selectedUser"></user-details>
</div>
```

---

## 💡 Практические советы для новичков

### 1. **Когда использовать created vs mounted**
```javascript
created() {
  // ХОРОШО: загрузка данных, инициализация переменных
  this.fetchUserData()
  this.initializeConfiguration()
},

mounted() {
  // ХОРОШО: работа с DOM, инициализация библиотек
  this.initChart()
  this.setupScrollListener()
}
```

### 2. **Оптимизация наблюдателей**
```javascript
// ПЛОХО - тяжелая операция при каждом изменении
watch: {
  searchQuery() {
    this.performHeavySearch()
  }
}

// ХОРОШО - с debounce
watch: {
  searchQuery: {
    handler: _.debounce(function() {
      this.performHeavySearch()
    }, 500),
    immediate: true
  }
}
```

### 3. **Правильная структура компонента**
```javascript
export default {
  name: 'MyComponent',
  props: {},           // 1. Входящие параметры
  emits: [],           // 2. Исходящие события
  data() {             // 3. Локальные данные
    return {}
  },
  computed: {},        // 4. Вычисляемые свойства
  watch: {},           // 5. Наблюдатели
  methods: {},         // 6. Методы
  created() {},        // 7. Хуки жизненного цикла
  mounted() {}
}
```

## 🎓 Заключение

**Экземпляр Vue** - это основа вашего приложения, а **компоненты** - его строительные блоки. Понимание жизненного цикла помогает правильно организовать код и избежать распространенных ошибок.

**Запомните главное:**
- ✅ Используйте `created` для инициализации данных
- ✅ Используйте `mounted` для работы с DOM
- ✅ Очищайте ресурсы в `beforeUnmount`
- ✅ Компоненты делают код переиспользуемым и поддерживаемым



# 🎯 Vue.js Синтаксис: Полное Руководство с Комментариями

## 📖 Основной синтаксис Vue.js

### 1. Создание приложения
```javascript
// const - объявление константы (неизменяемая переменная)
// app - имя переменной для экземпляра приложения
// Vue - глобальный объект Vue.js
// createApp - метод Vue для создания экземпляра приложения
// ({ ... }) - объект конфигурации с опциями приложения
const app = Vue.createApp({
  // data - опция для определения реактивных данных
  // () - функция возвращает объект с начальными данными
  data() {
    // return - возвращает объект данных
    return {
      // message - реактивное свойство (строка)
      message: 'Привет Vue!',
      // counter - реактивное свойство (число)
      counter: 0
    }
  }
})

// mount - метод для подключения приложения к DOM-элементу
// '#app' - CSS-селектор элемента, куда монтируется приложение
app.mount('#app')
```

---

## 🏗 Структура компонента Vue

### Single File Component (.vue файл)
```vue
<!-- template - секция шаблона (HTML с Vue-директивами) -->
<!-- div - HTML элемент -->
<!-- class - CSS класс -->
<!-- {{ }} - синтаксис интерполяции (вывод данных) -->
<template>
  <div class="my-component">
    <!-- h1 - заголовок HTML -->
    <!-- {{ title }} - вывод значения свойства title -->
    <h1>{{ title }}</h1>
    
    <!-- p - параграф HTML -->
    <!-- {{ }} - интерполяция вычисляемого свойства -->
    <p>{{ reversedTitle }}</p>
    
    <!-- button - кнопка HTML -->
    <!-- @click - директива обработки события клика -->
    <!-- increment - метод компонента -->
    <button @click="increment">Нажми меня</button>
  </div>
</template>

<!-- script - секция логики компонента -->
<!-- lang="js" - указывает язык JavaScript -->
<!-- export default - экспорт компонента как модуля -->
<script>
export default {
  // name - имя компонента (для отладки)
  name: 'MyComponent',
  
  // props - массив/объект входящих параметров
  // ['title'] - массив строк с именами props
  props: ['title'],
  
  // data - функция, возвращающая начальное состояние
  data() {
    // return - возвращает объект с данными компонента
    return {
      // count - реактивное свойство компонента
      count: 0
    }
  },
  
  // computed - объект вычисляемых свойств
  computed: {
    // reversedTitle - вычисляемое свойство
    reversedTitle() {
      // this - ссылка на экземпляр компонента
      // .title - доступ к prop
      // split('') - разбивает строку на массив символов
      // reverse() - переворачивает массив
      // join('') - объединяет массив в строку
      return this.title.split('').reverse().join('')
    }
  },
  
  // methods - объект методов компонента
  methods: {
    // increment - метод компонента
    increment() {
      // this.count - доступ к реактивному свойству
      // ++ - инкремент (увеличение на 1)
      this.count++
    }
  },
  
  // mounted - хук жизненного цикла (после монтирования в DOM)
  mounted() {
    // console.log - вывод в консоль браузера
    console.log('Компонент создан')
  }
}
</script>

<!-- style - секция стилей компонента -->
<!-- scoped - атрибут для ограничения стилей этим компонентом -->
<style scoped>
/* .my-component - CSS класс */
.my-component {
  /* padding - внутренние отступы */
  padding: 20px;
  /* border - граница элемента */
  border: 1px solid #ccc;
}

/* h1 - стиль для заголовка */
h1 {
  /* color - цвет текста */
  color: #2c3e50;
}
</style>
```

---

## 📝 Директивы шаблонов

### Интерполяция и привязка данных
```vue
<template>
  <!-- Директива v-text - устанавливает textContent элемента -->
  <!-- ="message" - выражение Vue (доступ к данным) -->
  <span v-text="message"></span>
  
  <!-- Эквивалентно: -->
  <span>{{ message }}</span>
  
  <!-- Директива v-html - устанавливает innerHTML -->
  <!-- rawHtml - свойство содержащее HTML строку -->
  <div v-html="rawHtml"></div>
  
  <!-- Директива v-bind - привязка атрибутов -->
  <!-- :id - сокращение v-bind:id -->
  <!-- "dynamicId" - выражение с именем свойства -->
  <div v-bind:id="dynamicId"></div>
  
  <!-- Сокращенная запись v-bind -->
  <div :id="dynamicId"></div>
  
  <!-- Привязка класса через объект -->
  <!-- :class - директива привязки класса -->
  <!-- { active: isActive } - объект: ключ-класс, значение-условие -->
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>
  
  <!-- Привязка стилей через объект -->
  <!-- :style - директива привязки стилей -->
  <!-- { color: activeColor } - объект CSS свойств -->
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Текст сообщения',
      rawHtml: '<span style="color: red">Красный текст</span>',
      dynamicId: 'my-element',
      isActive: true,
      hasError: false,
      activeColor: 'blue',
      fontSize: 16
    }
  }
}
</script>
```

---

## 🔄 Условная отрисовка

### Директивы v-if, v-else-if, v-else
```vue
<template>
  <!-- v-if - условная отрисовка элемента -->
  <!-- "seen" - условие (true/false) -->
  <!-- Элемент полностью удаляется/добавляется из DOM -->
  <p v-if="seen">Сейчас меня видно</p>
  
  <!-- v-else-if - дополнительное условие -->
  <!-- "type === 'A'" - выражение JavaScript -->
  <div v-else-if="type === 'A'">
    Контент типа A
  </div>
  
  <!-- v-else - блок "во всех остальных случаях" -->
  <!-- Не требует выражения -->
  <div v-else>
    Другой контент
  </div>
  
  <!-- v-show - условное отображение (через display) -->
  <!-- "isVisible" - условие видимости -->
  <!-- Элемент всегда в DOM, но скрыт через CSS -->
  <div v-show="isVisible">Показывается/скрывается</div>
</template>

<script>
export default {
  data() {
    return {
      seen: true,
      type: 'A',
      isVisible: true
    }
  }
}
</script>
```

---

## 🔄 Отрисовка списков

### Директива v-for
```vue
<template>
  <!-- v-for - директива для отрисовки списков -->
  <!-- "item in items" - синтаксис цикла -->
  <!-- :key - специальный атрибут для идентификации элементов -->
  <!-- "item.id" - уникальный идентификатор (рекомендуется) -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  
  <!-- v-for с индексом -->
  <!-- (item, index) - второй параметр - индекс элемента -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index }}. {{ item.name }}
    </li>
  </ul>
  
  <!-- v-for для объектов -->
  <!-- (value, key, index) - параметры для объектов -->
  <ul>
    <li v-for="(value, key, index) in userObject" :key="key">
      {{ index }}. {{ key }}: {{ value }}
    </li>
  </ul>
  
  <!-- v-for с диапазоном -->
  <!-- n in 10 - цикл от 1 до 10 -->
  <span v-for="n in 10" :key="n">{{ n }} </span>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: 'Элемент 1' },
        { id: 2, name: 'Элемент 2' },
        { id: 3, name: 'Элемент 3' }
      ],
      userObject: {
        firstName: 'Иван',
        lastName: 'Петров',
        age: 30
      }
    }
  }
}
</script>
```

---

## 🎯 Обработка событий

### Директива v-on
```vue
<template>
  <!-- v-on:click - прослушивание события click -->
  <!-- "increment" - метод-обработчик -->
  <button v-on:click="increment">+1</button>
  
  <!-- Сокращенная запись @click -->
  <button @click="increment">+1</button>
  
  <!-- Вызов метода с параметрами -->
  <!-- "sayHello('Vue')" - вызов метода с аргументом -->
  <button @click="sayHello('Vue')">Поздороваться</button>
  
  <!-- Доступ к event через $event -->
  <!-- "warn('Сообщение', $event)" - передача события -->
  <button @click="warn('Форма не отправлена', $event)">
    Отправить
  </button>
  
  <!-- Несколько обработчиков через запятую -->
  <button @click="firstHandler(), secondHandler()">
    Двойное действие
  </button>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    // increment - метод без параметров
    increment() {
      // this.counter - доступ к данным компонента
      this.counter++
    },
    
    // sayHello - метод с параметром
    sayHello(name) {
      // alert - встроенная функция браузера
      alert(`Привет, ${name}!`)
    },
    
    // warn - метод с параметрами и событием
    warn(message, event) {
      // event - объект события
      if (event) {
        // preventDefault - отмена стандартного действия
        event.preventDefault()
      }
      alert(message)
    },
    
    firstHandler() {
      console.log('Первый обработчик')
    },
    
    secondHandler() {
      console.log('Второй обработчик')
    }
  }
}
</script>
```

---

## ⚡ Модификаторы событий

### Использование модификаторов
```vue
<template>
  <!-- .prevent - модификатор, вызывает event.preventDefault() -->
  <form @submit.prevent="onSubmit">
    <button type="submit">Отправить</button>
  </form>
  
  <!-- .stop - модификатор, вызывает event.stopPropagation() -->
  <div @click="parentClick">
    <button @click.stop="childClick">Кнопка</button>
  </div>
  
  <!-- Цепочка модификаторов -->
  <!-- .stop.prevent - оба модификатора -->
  <a @click.stop.prevent="doThat" href="https://vuejs.org">
    Ссылка
  </a>
  
  <!-- Модификаторы клавиш -->
  <!-- .enter - срабатывает только на клавишу Enter -->
  <input @keyup.enter="submit" placeholder="Нажмите Enter">
  
  <!-- .ctrl - срабатывает с зажатым Ctrl -->
  <input @keyup.ctrl.enter="ctrlEnter" placeholder="Ctrl+Enter">
  
  <!-- Точной модификаторы клавиш -->
  <input @keyup.page-down="onPageDown">
  
  <!-- Модификаторы мыши -->
  <!-- .middle - средняя кнопка мыши -->
  <button @click.middle="middleClick">Средняя кнопка</button>
  
  <!-- .right - правая кнопка мыши -->
  <button @click.right="rightClick">Правая кнопка</button>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      console.log('Форма отправлена (предотвращена перезагрузка)')
    },
    parentClick() {
      console.log('Клик по родителю')
    },
    childClick() {
      console.log('Клик по кнопке (всплытие остановлено)')
    },
    doThat() {
      console.log('Действие выполнено')
    },
    submit() {
      console.log('Enter нажат')
    },
    ctrlEnter() {
      console.log('Ctrl+Enter нажат')
    },
    onPageDown() {
      console.log('Page Down нажат')
    },
    middleClick() {
      console.log('Средняя кнопка мыши')
    },
    rightClick() {
      console.log('Правая кнопка мыши')
    }
  }
}
</script>
```

---

## 📝 Работа с формами

### Директива v-model
```vue
<template>
  <!-- v-model - двусторонняя привязка данных -->
  <!-- "message" - свойство для привязки -->
  <input v-model="message" placeholder="Редактируйте меня">
  <p>Введено: {{ message }}</p>
  
  <!-- textarea -->
  <textarea v-model="multilineText"></textarea>
  <p style="white-space: pre-line;">{{ multilineText }}</p>
  
  <!-- checkbox (один) -->
  <!-- "checked" - булево значение -->
  <input type="checkbox" id="checkbox" v-model="checked">
  <label for="checkbox">{{ checked }}</label>
  
  <!-- checkbox (несколько) -->
  <!-- "checkedNames" - массив выбранных значений -->
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <p>Выбраны: {{ checkedNames }}</p>
  
  <!-- radio -->
  <!-- "picked" - одно выбранное значение -->
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <p>Выбрано: {{ picked }}</p>
  
  <!-- select -->
  <select v-model="selected">
    <option disabled value="">Выберите один из вариантов</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <p>Выбрано: {{ selected }}</p>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      multilineText: '',
      checked: false,
      checkedNames: [],
      picked: '',
      selected: ''
    }
  }
}
</script>
```

---

## 🔧 Модификаторы v-model

### Модификаторы для форм
```vue
<template>
  <!-- .lazy - обновление на событии change (вместо input) -->
  <input v-model.lazy="lazyMessage">
  <p>{{ lazyMessage }}</p>
  
  <!-- .number - автоматическое преобразование в число -->
  <input v-model.number="age" type="number">
  <p>Тип возраста: {{ typeof age }}</p>
  
  <!-- .trim - автоматическое удаление пробелов в начале и конце -->
  <input v-model.trim="trimmedMessage">
  <p>Длина: {{ trimmedMessage.length }}</p>
  
  <!-- Комбинация модификаторов -->
  <input v-model.lazy.trim="combined">
</template>

<script>
export default {
  data() {
    return {
      lazyMessage: '',
      age: 0,
      trimmedMessage: '',
      combined: ''
    }
  }
}
</script>
```

---

## 🧩 Вычисляемые свойства и наблюдатели

### Computed vs Watch
```vue
<template>
  <div>
    <!-- fullName - вычисляемое свойство -->
    <p>Полное имя: {{ fullName }}</p>
    
    <!-- reversedMessage - вычисляемое свойство -->
    <p>Перевернутое: {{ reversedMessage }}</p>
    
    <input v-model="firstName" placeholder="Имя">
    <input v-model="lastName" placeholder="Фамилия">
    <input v-model="message" placeholder="Сообщение">
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'Иван',
      lastName: 'Петров',
      message: 'Привет Vue'
    }
  },
  
  // computed - вычисляемые свойства (кэшируются)
  computed: {
    // fullName - автоматически обновляется при изменении firstName/lastName
    fullName() {
      // return - возвращает вычисленное значение
      return `${this.firstName} ${this.lastName}`
    },
    
    // reversedMessage - вычисляемое свойство с зависимостью от message
    reversedMessage: {
      // get - геттер (вычисление значения)
      get() {
        return this.message.split('').reverse().join('')
      },
      // set - сеттер (вызывается при присваивании)
      set(newValue) {
        this.message = newValue.split('').reverse().join('')
      }
    }
  },
  
  // watch - наблюдатели (для побочных эффектов)
  watch: {
    // Наблюдатель за firstName
    firstName(newName, oldName) {
      // newName - новое значение
      // oldName - старое значение
      console.log(`Имя изменилось с "${oldName}" на "${newName}"`)
    },
    
    // Наблюдатель за fullName (вычисляемым свойством)
    fullName: {
      handler(newFullName) {
        console.log('Полное имя изменилось:', newFullName)
      },
      // immediate: true - вызвать сразу при создании
      immediate: true
    },
    
    // Глубокий наблюдатель за объектом
    someObject: {
      handler(newObj) {
        console.log('Объект изменился:', newObj)
      },
      // deep: true - следить за вложенными свойствами
      deep: true
    }
  }
}
</script>
```

---

## 🔄 Хуки жизненного цикла

### Все хуки с комментариями
```vue
<template>
  <div>
    <p>Счетчик: {{ count }}</p>
    <button @click="count++">+1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      timer: null
    }
  },
  
  // beforeCreate - вызывается до инициализации
  beforeCreate() {
    // this.count - НЕ доступен (undefined)
    console.log('❶ beforeCreate - данные еще не инициализированы')
  },
  
  // created - вызывается после инициализации данных
  created() {
    // this.count - доступен
    console.log('❷ created - данные инициализированы', this.count)
    
    // Загрузка начальных данных
    this.fetchInitialData()
  },
  
  // beforeMount - вызывается перед монтированием в DOM
  beforeMount() {
    // this.$el - НЕ доступен (еще не создан)
    console.log('❸ beforeMount - перед рендерингом DOM')
  },
  
  // mounted - вызывается после монтирования в DOM
  mounted() {
    // this.$el - доступен (DOM элемент компонента)
    console.log('❹ mounted - компонент в DOM', this.$el)
    
    // Работа с DOM, инициализация библиотек
    this.setupTimer()
  },
  
  // beforeUpdate - вызывается при изменении данных, до обновления DOM
  beforeUpdate() {
    console.log('❺ beforeUpdate - данные изменились, DOM еще старый')
  },
  
  // updated - вызывается после обновления DOM
  updated() {
    console.log('❻ updated - DOM обновлен')
  },
  
  // beforeUnmount - вызывается перед уничтожением компонента
  beforeUnmount() {
    console.log('❼ beforeUnmount - перед уничтожением компонента')
    
    // Очистка ресурсов
    this.cleanup()
  },
  
  // unmounted - вызывается после уничтожения компонента
  unmounted() {
    console.log('❽ unmounted - компонент уничтожен')
  },
  
  methods: {
    fetchInitialData() {
      console.log('Загрузка начальных данных...')
    },
    
    setupTimer() {
      this.timer = setInterval(() => {
        console.log('Таймер работает...')
      }, 5000)
    },
    
    cleanup() {
      if (this.timer) {
        clearInterval(this.timer)
        console.log('Таймер очищен')
      }
    }
  }
}
</script>
```

---

## 🧩 Компоненты и передача данных
https://github.com/softboxdev/javascript_frameworks/blob/main/parent_child.md


### Создание дочернего компонента
# Подробное объяснение кода Vue компонентов

## ParentComponent.vue - построчное объяснение

```vue
<!-- ParentComponent.vue -->
<template>
  <!-- Корневой элемент компонента - обязательное требование Vue -->
  <div class="parent-component">
    <!-- Статический заголовок -->
    <h2>Родительский компонент</h2>
    
    <!-- Блок управления состоянием родителя -->
    <div class="controls">
      <!-- 
        Input с двухсторонним связыванием через v-model
        v-model="parentMessage" - синтаксический сахар для:
        :value="parentMessage" + @input="parentMessage = $event.target.value"
        При вводе текста автоматически обновляется parentMessage в data
      -->
      <input 
        v-model="parentMessage" 
        placeholder="Введите сообщение для ребенка"
      >
      <!-- 
        Кнопка с обработчиком клика и интерполяцией данных
        @click="incrementParentCounter" - при клике вызывает метод
        {{ parentCounter }} - отображает текущее значение счетчика
      -->
      <button @click="incrementParentCounter">
        Родительский счетчик: {{ parentCounter }}
      </button>
    </div>
    
    <!-- Блок для отображения данных, полученных от дочернего компонента -->
    <div class="child-data">
      <!-- 
        Отображение сообщения от ребенка
        messageFromChild инициализируется пустой строкой и обновляется через события
      -->
      <p>Сообщение от ребенка: {{ messageFromChild }}</p>
      <!-- 
        Условное отображение данных от ребенка
        childData ? childData.message : 'нет' - тернарный оператор:
        если childData существует, показываем childData.message, иначе 'нет'
      -->
      <p>Данные от ребенка: {{ childData ? childData.message : 'нет' }}</p>
      <!-- Отображение счетчика от дочернего компонента -->
      <p>Счетчик ребенка: {{ childCounter }}</p>
    </div>
    
    <!-- 
      Первый экземпляр дочернего компонента
      :message-from-parent - передача пропса (данные от родителя к ребенку)
      @message-from-child - прослушивание события (данные от ребенка к родителю)
    -->
    <ChildComponent
      <!-- 
        Динамическая передача пропса messageFromParent
        :message-from-parent - синтаксис для v-bind (динамическое значение)
        "parentMessage" - ссылка на данные из data()
        Преобразуется в kebab-case: messageFromParent → message-from-parent
      -->
      :message-from-parent="parentMessage"
      <!-- Передача текущего значения счетчика родителя -->
      :parent-counter="parentCounter"
      <!-- 
        Прослушивание кастомного события от ребенка
        @message-from-child - когда ребенок emits это событие, вызывается handleChildMessage
      -->
      @message-from-child="handleChildMessage"
      <!-- Прослушивание события с объектом данных -->
      @child-event="handleChildEvent"
      <!-- Прослушивание события изменения счетчика -->
      @counter-changed="handleCounterChange"
    />
    
    <!-- 
      Второй экземпляр дочернего компонента с другими параметрами
      Демонстрирует возможность иметь несколько независимых экземпляров
    -->
    <ChildComponent
      <!-- Передача статической строки (без v-bind) -->
      :message-from-parent="'Статическое сообщение'"
      <!-- Передача того же счетчика родителя -->
      :parent-counter="parentCounter"
      <!-- Прослушивание только одного события -->
      @message-from-child="handleChildMessage"
    />
  </div>
</template>

<script>
// Импорт дочернего компонента для использования в шаблоне
import ChildComponent from './ChildComponent.vue';

export default {
  // Имя компонента для отладки и возможных рекурсивных ссылок
  name: 'ParentComponent',
  
  // 
  // Регистрация дочерних компонентов, которые используются в template
  // Зарегистрированные компоненты можно использовать как кастомные HTML-теги
  components: {
    ChildComponent
  },
  
  // 
  // Функция data возвращает объект с реактивными данными компонента
  // Каждое свойство становится реактивным - Vue отслеживает изменения
  data() {
    return {
      // Начальное сообщение для передачи ребенку
      parentMessage: 'Привет от родителя!',
      // Счетчик родителя, передается ребенку и отображается в кнопке
      parentCounter: 0,
      // Переменная для хранения сообщения от ребенка
      messageFromChild: '',
      // Объект для хранения сложных данных от ребенка
      childData: null,
      // Переменная для хранения счетчика от ребенка
      childCounter: 0
    }
  },
  
  // 
  // Методы компонента - функции, которые можно вызывать из template или других методов
  methods: {
    // 
    // Обработчик события message-from-child от дочернего компонента
    // Вызывается когда ребенок делает this.$emit('message-from-child', message)
    handleChildMessage(message) {
      // Сохраняем полученное сообщение в реактивные данные
      this.messageFromChild = message;
      // Логируем для отладки
      console.log('Получено сообщение от ребенка:', message);
    },
    
    // 
    // Обработчик сложного события с объектом данных
    // Вызывается когда ребенок делает this.$emit('child-event', dataObject)
    handleChildEvent(data) {
      // Сохраняем весь объект данных от ребенка
      this.childData = data;
      console.log('Получены данные от ребенка:', data);
    },
    
    // 
    // Обработчик изменения счетчика в дочернем компоненте
    handleCounterChange(newValue) {
      // Сохраняем новое значение счетчика от ребенка
      this.childCounter = newValue;
    },
    
    // 
    // Метод родителя для увеличения своего счетчика
    // Вызывается при клике на кнопку в template
    incrementParentCounter() {
      // Увеличиваем счетчик на 1 - Vue реактивно обновит все зависимые элементы
      this.parentCounter++;
    }
  }
}
</script>

<style scoped>
/* 
  Стили с модификатором scoped - применяются только к этому компоненту
  Vue добавляет уникальные data-атрибуты к элементам этого компонента
*/
.parent-component {
  border: 2px solid #3498db; /* Синяя рамка для визуального отделения */
  padding: 20px; /* Внутренние отступы */
  margin: 10px; /* Внешние отступы */
  border-radius: 8px; /* Скругление углов */
}

.controls {
  margin-bottom: 20px; /* Отступ снизу для визуального разделения */
}

.child-data {
  background-color: #f8f9fa; /* Светло-серый фон */
  padding: 10px; /* Внутренние отступы */
  border-radius: 4px; /* Скругление углов */
  margin-bottom: 20px; /* Отступ снизу */
}
</style>
```

## ChildComponent.vue - построчное объяснение

```vue
<!-- ChildComponent.vue -->
<template>
  <!-- Корневой элемент компонента -->
  <div class="child-component">
    <!-- Статический заголовок дочернего компонента -->
    <h3>Дочерний компонент</h3>
    
    <!-- 
      Отображение данных, полученных от родителя через props
      {{ messageFromParent }} - интерполяция значения пропса
      Значение автоматически обновляется когда родитель меняет parentMessage
    -->
    <p>Полученное сообщение: {{ messageFromParent }}</p>
    
    <!-- 
      Отображение локального состояния компонента
      {{ localCounter }} - значение из data()
    -->
    <p>Локальный счетчик: {{ localCounter }}</p>
    
    <!-- 
      Кнопка для отправки данных родителю
      @click="sendMessageToParent" - при клике вызывает метод sendMessageToParent
    -->
    <button @click="sendMessageToParent">
      Отправить сообщение родителю
    </button>
    
    <!-- 
      Кнопка для изменения локального состояния
      @click="incrementCounter" - при клике вызывает метод incrementCounter
    -->
    <button @click="incrementCounter">
      Увеличить счетчик
    </button>
  </div>
</template>

<script>
export default {
  // Имя компонента
  name: 'ChildComponent',
  
  // 
  // Определение пропсов - входных параметров от родительского компонента
  // Пропсы являются реактивными и автоматически обновляются при изменении у родителя
  props: {
    messageFromParent: {
      type: String,        // Ожидаемый тип данных
      default: 'Сообщение по умолчанию', // Значение по умолчанию если пропс не передан
      required: false      // Является ли пропс обязательным
    },
    parentCounter: {
      type: Number,       // Ожидаемый тип - число
      default: 0          // Значение по умолчанию
    }
  },
  
  // 
  // Локальное состояние компонента - данные, которые принадлежат только этому компоненту
  // Не влияют на родителя, пока не будут отправлены через события
  data() {
    return {
      localCounter: 0,     // Локальный счетчик, инициализируется 0
      childMessage: 'Привет от дочернего компонента!' // Сообщение для отправки родителю
    }
  },
  
  // 
  // Вычисляемые свойства - производные данные на основе props и data
  // Автоматически пересчитываются при изменении зависимостей
  computed: {
    totalCount() {
      // Сумма счетчика родителя и локального счетчика
      return this.parentCounter + this.localCounter;
      // При изменении parentCounter или localCounter totalCount автоматически обновится
    }
  },
  
  // 
  // Методы компонента - функции для обработки действий
  methods: {
    sendMessageToParent() {
      // 
      // Генерация кастомного события для родителя
      // this.$emit('имя-события', данные) - отправка события родителю
      // 'message-from-child' - имя события (в kebab-case)
      // this.childMessage - данные, передаваемые с событием
      this.$emit('message-from-child', this.childMessage);
      
      // 
      // Генерация второго события с объектом данных
      // Передача нескольких значений в виде объекта
      this.$emit('child-event', {
        message: this.childMessage,      // Текст сообщения
        counter: this.localCounter,      // Текущее значение счетчика
        timestamp: new Date()           // Текущая дата и время
      });
    },
    
    incrementCounter() {
      // Увеличение локального счетчика
      this.localCounter++;
      // 
      // Уведомление родителя об изменении счетчика
      // Отправка нового значения локального счетчика
      this.$emit('counter-changed', this.localCounter);
    }
  },
  
  // 
  // Хуки жизненного цикла - функции, вызываемые в определенные моменты жизни компонента
  mounted() {
    // Вызывается после того, как компонент добавлен в DOM
    console.log('Дочерний компонент смонтирован');
    // Можно использовать для инициализации данных, запросов к API и т.д.
  }
}
</script>

<style scoped>
/* Scoped стили только для этого компонента */
.child-component {
  border: 2px solid #42b983; /* Зеленая рамка для визуального отличия от родителя */
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
}
</style>
```

## Ключевые моменты взаимодействия:

### Поток данных "сверху вниз" (родитель → ребенок):
- Родитель передает данные через **props**: `:message-from-parent="parentMessage"`
- Ребенок объявляет props в своем определении
- Данные реактивны - при изменении у родителя автоматически обновляются у ребенка

### Поток данных "снизу вверх" (ребенок → родитель):
- Ребенок отправляет данные через **события**: `this.$emit('event-name', data)`
- Родитель слушает события через **v-on**: `@event-name="handlerMethod"`
- Обработчик в родителе получает данные как параметры

### Локальное состояние:
- Каждый компонент имеет собственное состояние в `data()`
- Локальное состояние изолировано до тех пор, пока не отправлено родителю

### Реактивность:
- Vue автоматически отслеживает изменения в data и props
- При изменении данных обновляются все зависимые элементы интерфейса
- Вычисляемые свойства (computed) автоматически пересчитываются

Этот пример демонстрирует фундаментальные принципы коммуникации между компонентами во Vue, которые являются основой для построения сложных приложений.

---

## 🎯 Специальные атрибуты и методы

### ref и $refs
```vue
<template>
  <div>
    <!-- ref - атрибут для получения ссылки на DOM элемент -->
    <input ref="emailInput" type="email" placeholder="Email">
    
    <!-- ref на компонент -->
    <user-profile ref="userComponent" />
    
    <button @click="focusInput">Фокус на input</button>
    <button @click="callComponentMethod">Вызвать метод компонента</button>
  </div>
</template>

<script>
import UserProfile from './UserProfile.vue'

export default {
  components: { UserProfile },
  methods: {
    focusInput() {
      // this.$refs - объект со ссылками на ref-элементы
      // .emailInput - ссылка на элемент с ref="emailInput"
      // .focus() - нативный метод DOM элемента
      this.$refs.emailInput.focus()
    },
    
    callComponentMethod() {
      // this.$refs.userComponent - ссылка на экземпляр компонента
      // .someMethod() - вызов метода дочернего компонента
      this.$refs.userComponent.someMethod()
    }
  },
  
  mounted() {
    // Доступ к refs возможен только после mounted
    console.log('Input элемент:', this.$refs.emailInput)
    console.log('UserProfile компонент:', this.$refs.userComponent)
  }
}
</script>
```

---

## 💡 Ключевые понятия для запоминания

### Основной синтаксис:
- **{{ }}** - интерполяция (вывод данных)
- **v-bind:** или **:** - привязка атрибутов
- **v-on:** или **@** - обработка событий
- **v-model** - двусторонняя привязка форм
- **v-if/v-show** - условное отображение
- **v-for** - отрисовка списков

### Структура компонента:
- **data()** - реактивные данные
- **computed** - вычисляемые свойства
- **methods** - методы
- **watch** - наблюдатели
- **props** - входящие параметры
- **emits** - исходящие события

### Жизненный цикл:
- **created** - данные готовы
- **mounted** - DOM готов
- **updated** - обновление завершено
- **unmounted** - компонент удален

Это руководство покрывает 95% синтаксиса Vue.js, который вам понадобится в повседневной разработке! 🚀