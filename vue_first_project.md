# Полная инструкция по созданию первого проекта Vue.js

## 📋 Содержание
1. [Способы создания проекта](#способы-создания-проекта)
2. [Быстрый старт (CDN)](#быстрый-старт-cdn)
3. [Создание проекта через Vue CLI](#создание-проекта-через-vue-cli)
4. [Создание проекта через Vite](#создание-проекта-через-vite)
5. [Структура проекта](#структура-проекта)
6. [Первый компонент](#первый-компонент)
7. [Запуск и сборка](#запуск-и-сборка)

## 🚀 Способы создания проекта

### Вариант 1: CDN (для быстрого старта)
### Вариант 2: Vue CLI (традиционный способ)
### Вариант 3: Vite (современный быстрый способ)

---

## ⚡ Быстрый старт (CDN)

### Шаг 1: Создайте HTML файл
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой первый Vue проект</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .app {
            text-align: center;
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 5px;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="app">
            <h1>{{ title }}</h1>
            <p>Счетчик: {{ counter }}</p>
            <button @click="increment">+1</button>
            <button @click="decrement">-1</button>
            <button @click="reset">Сброс</button>
            
            <div style="margin-top: 20px;">
                <input v-model="message" placeholder="Введите сообщение">
                <p>Ваше сообщение: {{ message }}</p>
            </div>
            
            <div v-if="showList" style="margin-top: 20px;">
                <h3>Список задач:</h3>
                <ul>
                    <li v-for="(item, index) in items" :key="index">
                        {{ item }}
                        <button @click="removeItem(index)">×</button>
                    </li>
                </ul>
                <input v-model="newItem" @keyup.enter="addItem" placeholder="Добавить задачу">
                <button @click="addItem">Добавить</button>
            </div>
        </div>
    </div>

    <script>
        const { createApp } = Vue;
        
        createApp({
            data() {
                return {
                    title: 'Мое первое Vue приложение!',
                    counter: 0,
                    message: 'Привет Vue!',
                    showList: true,
                    items: ['Изучить Vue', 'Создать приложение', 'Изучить компоненты'],
                    newItem: ''
                }
            },
            methods: {
                increment() {
                    this.counter++;
                },
                decrement() {
                    this.counter--;
                },
                reset() {
                    this.counter = 0;
                },
                addItem() {
                    if (this.newItem.trim()) {
                        this.items.push(this.newItem.trim());
                        this.newItem = '';
                    }
                },
                removeItem(index) {
                    this.items.splice(index, 1);
                }
            },
            mounted() {
                console.log('Приложение запущено!');
            }
        }).mount('#app');
    </script>
</body>
</html>
```

### Шаг 2: Запустите проект
Просто откройте HTML файл в браузере!

---

## 🛠 Создание проекта через Vue CLI

### Шаг 1: Установка Node.js
Скачайте и установите Node.js с [официального сайта](https://nodejs.org/)

### Шаг 2: Установка Vue CLI
```bash
# Установка Vue CLI глобально
npm install -g @vue/cli

# Проверка установки
vue --version
```

### Шаг 3: Создание проекта
```bash
# Создание нового проекта
vue create my-first-vue-app

# Выберите опции:
# ❯ Default ([Vue 3] babel, eslint)
```

### Шаг 4: Запуск проекта
```bash
# Переход в папку проекта
cd my-first-vue-app

# Запуск development сервера
npm run serve
```

### Шаг 5: Откройте в браузере
Перейдите по адресу: `http://localhost:8080`

---

## ⚡ Создание проекта через Vite (Рекомендуется)

### Шаг 1: Создание проекта
```bash
# Создание проекта с Vite
npm create vue@latest

# Ответьте на вопросы:
# ✔ Project name: … my-first-vue-app
# ✔ Add TypeScript? … No
# ✔ Add JSX Support? … No
# ✔ Add Vue Router for Single Page Application development? … No
# ✔ Add Pinia for state management? … No
# ✔ Add Vitest for Unit testing? … No
# ✔ Add an End-to-End Testing Solution? › No
# ✔ Add ESLint for code quality? … Yes
# ✔ Add Prettier for code formatting? … No
```

### Шаг 2: Установка зависимостей
```bash
cd my-first-vue-app
npm install
```

### Шаг 3: Запуск проекта
```bash
npm run dev
```

### Шаг 4: Откройте в браузере
Перейдите по адресу: `http://localhost:5173`

---

## 📁 Структура проекта (Vite)

```
my-first-vue-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── vue.svg
│   ├── components/
│   │   └── HelloWorld.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎯 Первый компонент

### Измените `src/App.vue`:
```vue
<template>
  <div id="app">
    <header class="app-header">
      <h1>{{ appTitle }}</h1>
      <p>Добро пожаловать в ваше первое Vue приложение! 🎉</p>
    </header>

    <main class="app-main">
      <!-- Секция счетчика -->
      <section class="counter-section">
        <h2>Счетчик</h2>
        <div class="counter-display">
          <span class="counter-value">{{ counter }}</span>
        </div>
        <div class="counter-controls">
          <button @click="decrement" class="btn btn-danger">-</button>
          <button @click="reset" class="btn btn-secondary">Сброс</button>
          <button @click="increment" class="btn btn-success">+</button>
        </div>
      </section>

      <!-- Секция сообщений -->
      <section class="message-section">
        <h2>Работа с формами</h2>
        <input 
          v-model="message" 
          placeholder="Введите ваше сообщение..."
          class="message-input"
        >
        <p class="message-preview">Предпросмотр: <strong>{{ message }}</strong></p>
      </section>

      <!-- Секция списка задач -->
      <section class="todo-section">
        <h2>Менеджер задач</h2>
        <div class="todo-form">
          <input 
            v-model="newTodo" 
            @keyup.enter="addTodo"
            placeholder="Что нужно сделать?"
            class="todo-input"
          >
          <button @click="addTodo" class="btn btn-primary">Добавить</button>
        </div>
        
        <div v-if="todos.length > 0" class="todo-list">
          <div 
            v-for="(todo, index) in todos" 
            :key="index"
            class="todo-item"
            :class="{ 'completed': todo.completed }"
          >
            <span @click="toggleTodo(index)" class="todo-text">
              {{ todo.text }}
            </span>
            <button @click="removeTodo(index)" class="btn btn-sm btn-danger">
              Удалить
            </button>
          </div>
        </div>
        <p v-else class="empty-state">Задач пока нет. Добавьте первую!</p>

        <div class="todo-stats">
          <p>Всего задач: {{ totalTodos }}, Выполнено: {{ completedTodos }}</p>
        </div>
      </section>
    </main>

    <footer class="app-footer">
      <p>Создано с ❤️ и Vue.js</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      appTitle: 'Мое Первое Vue Приложение',
      counter: 0,
      message: 'Привет, Vue!',
      newTodo: '',
      todos: [
        { text: 'Изучить основы Vue', completed: true },
        { text: 'Создать первое приложение', completed: false },
        { text: 'Изучить компоненты', completed: false }
      ]
    }
  },
  computed: {
    totalTodos() {
      return this.todos.length;
    },
    completedTodos() {
      return this.todos.filter(todo => todo.completed).length;
    }
  },
  methods: {
    increment() {
      this.counter++;
    },
    decrement() {
      this.counter--;
    },
    reset() {
      this.counter = 0;
    },
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          text: this.newTodo.trim(),
          completed: false
        });
        this.newTodo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  },
  mounted() {
    console.log('🚀 Приложение успешно запущено!');
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.app-main {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

section {
  margin-bottom: 40px;
  padding: 20px;
  border: 2px solid #e9ecef;
  border-radius: 10px;
}

h2 {
  color: #495057;
  margin-bottom: 20px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

/* Стили для счетчика */
.counter-section {
  text-align: center;
}

.counter-display {
  margin: 20px 0;
}

.counter-value {
  font-size: 3rem;
  font-weight: bold;
  color: #667eea;
}

.counter-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* Стили для форм */
.message-input,
.todo-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 10px;
}

.message-preview {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
  margin-top: 10px;
}

/* Стили для списка задач */
.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-list {
  space-y: 10px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.todo-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #6c757d;
}

.todo-text {
  cursor: pointer;
  flex-grow: 1;
  font-size: 16px;
}

.todo-stats {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background: #e7f3ff;
  border-radius: 5px;
}

.empty-state {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 20px;
}

/* Кнопки */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}

.app-footer {
  text-align: center;
  color: white;
  margin-top: 40px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  #app {
    padding: 10px;
  }
  
  .app-main {
    padding: 20px;
  }
  
  .todo-form {
    flex-direction: column;
  }
  
  .counter-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
```

---

## 🚀 Запуск и сборка

### Команды разработки:
```bash
# Запуск development сервера
npm run dev

# Сборка для production
npm run build

# Просмотр собранной версии локально
npm run preview

# Линтинг кода
npm run lint
```

### Структура package.json:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
  }
}
```

---

## 📝 Дальнейшие шаги

### Что изучать дальше:
1. **Компоненты** - создание переиспользуемых компонентов
2. **Vue Router** - для многостраничных приложений
3. **Pinia/Vuex** - управление состоянием
4. **Composition API** - современный синтаксис Vue
5. **API запросы** - работа с бэкендом

### Полезные ресурсы:
- [Официальная документация Vue.js](https://vuejs.org/)
- [Vue.js на русском](https://ru.vuejs.org/)
- [Vue School](https://vueschool.io/)
- [Vue Mastery](https://www.vuemastery.com/)

---

## 🎉 Поздравляем!

Вы успешно создали свое первое Vue.js приложение! Теперь вы можете:
- ✅ Запускать Vue приложения разными способами
- ✅ Работать с данными и методами
- ✅ Использовать директивы (v-if, v-for, v-model)
- ✅ Создавать интерактивные интерфейсы
- ✅ Собирать проект для production

Продолжайте экспериментировать и добавлять новый функционал! 🚀