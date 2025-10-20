# 🌳 Document Object Model (DOM) в JavaScript: Полное руководство

## 📚 Что такое DOM?

**DOM (Document Object Model)** - это программный интерфейс для HTML и XML документов, который представляет структуру документа как дерева объектов, которые можно изменять с помощью JavaScript.

```html
<!-- HTML структура -->
<html>
  <head>
    <title>Моя страница</title>
  </head>
  <body>
    <h1>Заголовок</h1>
    <p>Параграф</p>
  </body>
</html>
```

```javascript
// Соответствующая DOM структура
document
├── html
    ├── head
    │   └── title
    │       └── "Моя страница"
    └── body
        ├── h1
        │   └── "Заголовок"
        └── p
            └── "Параграф"
```

## 🎯 Основные концепции DOM

### 1. **Дерево узлов (Node Tree)**
```javascript
// Типы узлов в DOM
class Node {
  // Базовый класс для всех узлов
}

class Element extends Node {
  // HTML элементы: <div>, <p>, <span> и т.д.
}

class Text extends Node {
  // Текстовые узлы: "Hello World"
}

class Comment extends Node {
  // Комментарии: <!-- comment -->
}

class Document extends Node {
  // Корневой узел документа
}
```

## 🔍 Поиск элементов в DOM

### Основные методы поиска:

```javascript
// 1. Поиск по ID (возвращает один элемент)
const header = document.getElementById('header');

// 2. Поиск по классу (возвращает коллекцию)
const buttons = document.getElementsByClassName('btn');

// 3. Поиск по тегу (возвращает коллекцию)
const paragraphs = document.getElementsByTagName('p');

// 4. Современные методы (возвращают первый элемент)
const element = document.querySelector('.container');
const allElements = document.querySelectorAll('.item');

// Примеры использования:
<div id="main" class="container">
  <p class="text">Первый параграф</p>
  <p class="text">Второй параграф</p>
  <button class="btn">Кнопка</button>
</div>

<script>
// Поиск элементов
const mainDiv = document.getElementById('main');
const firstParagraph = document.querySelector('.text');
const allParagraphs = document.querySelectorAll('.text');
const buttons = document.getElementsByClassName('btn');

console.log(mainDiv);        // <div id="main">...
console.log(firstParagraph); // <p class="text">Первый...
console.log(allParagraphs);  // NodeList [p.text, p.text]
console.log(buttons);        // HTMLCollection [button.btn]
</script>
```

## ✏️ Создание и изменение элементов

### Создание элементов:

```javascript
// 1. Создание нового элемента
const newDiv = document.createElement('div');
const newParagraph = document.createElement('p');

// 2. Создание текстового узла
const textNode = document.createTextNode('Привет, мир!');

// 3. Добавление содержимого
newDiv.innerHTML = '<span>HTML содержимое</span>';
newDiv.textContent = 'Только текст'; // Безопаснее чем innerHTML

// 4. Установка атрибутов
newDiv.setAttribute('id', 'my-div');
newDiv.setAttribute('class', 'container active');

// 5. Добавление классов
newDiv.classList.add('highlight', 'animated');
newDiv.classList.remove('active');
newDiv.classList.toggle('visible');

// 6. Установка стилей
newDiv.style.backgroundColor = 'blue';
newDiv.style.fontSize = '16px';
newDiv.style.display = 'flex';
```

### Добавление элементов в DOM:

```javascript
// HTML структура для примеров
<div id="container">
  <p>Существующий параграф</p>
</div>

<script>
const container = document.getElementById('container');
const newElement = document.createElement('div');
newElement.textContent = 'Новый элемент';

// 1. append - добавляет в конец
container.append(newElement);
// Результат: <p>Существующий параграф</p><div>Новый элемент</div>

// 2. prepend - добавляет в начало
container.prepend(newElement);
// Результат: <div>Новый элемент</div><p>Существующий параграф</p>

// 3. before - добавляет перед элементом
container.before(newElement);
// Результат: <div>Новый элемент</div><div id="container">...

// 4. after - добавляет после элемента
container.after(newElement);
// Результат: <div id="container">...</div><div>Новый элемент</div>

// 5. replaceWith - заменяет элемент
const oldElement = document.querySelector('p');
oldElement.replaceWith(newElement);
// Результат: <div>Новый элемент</div> вместо <p>
</script>
```

## 🎨 Работа с атрибутами и классами

```javascript
// Элемент для примеров
<img id="logo" src="old.jpg" class="image" data-info="custom">

<script>
const logo = document.getElementById('logo');

// Работа с атрибутами
console.log(logo.getAttribute('src')); // 'old.jpg'
logo.setAttribute('src', 'new.jpg');   // Изменяем src
logo.removeAttribute('data-info');     // Удаляем атрибут
console.log(logo.hasAttribute('class')); // true

// data-атрибуты
logo.dataset.info = 'new value';       // data-info="new value"
console.log(logo.dataset.info);        // 'new value'

// Работа с классами
logo.classList.add('large', 'centered');    // Добавляем классы
logo.classList.remove('image');             // Удаляем класс
logo.classList.toggle('active');            // Переключаем класс
console.log(logo.classList.contains('large')); // true

// Перебор классов
logo.classList.forEach(className => {
  console.log(className); // 'large', 'centered', 'active'
});
</script>
```

## 📊 Навигация по DOM дереву

```html
<!-- Пример структуры для навигации -->
<div id="family-tree">
  <ul class="parents">
    <li class="parent">Родитель 1
      <ul class="children">
        <li class="child">Ребенок 1</li>
        <li class="child">Ребенок 2</li>
      </ul>
    </li>
    <li class="parent">Родитель 2</li>
  </ul>
</div>

<script>
const parent1 = document.querySelector('.parent');

// Навигация вниз по дереву
console.log(parent1.children);         // HTMLCollection [ul.children]
console.log(parent1.firstElementChild); // <ul class="children">
console.log(parent1.lastElementChild);  // <ul class="children">
console.log(parent1.querySelector('.child')); // <li class="child">

// Навигация вверх по дереву
const child1 = document.querySelector('.child');
console.log(child1.parentElement);     // <ul class="children">
console.log(child1.closest('.parents')); // <ul class="parents">

// Навигация вбок по дереву
const parent2 = document.querySelectorAll('.parent')[1];
console.log(parent2.previousElementSibling); // <li class="parent">
console.log(parent2.nextElementSibling);     // null

// Все узлы (включая текстовые и комментарии)
console.log(parent1.childNodes);       // NodeList [text, ul, text]
</script>
```

## 🖱️ Обработка событий

### Основы событий:

```javascript
// HTML: <button id="myBtn">Нажми меня</button>

const button = document.getElementById('myBtn');

// 1. Добавление обработчика события
button.addEventListener('click', function(event) {
  console.log('Кнопка нажата!');
  console.log('Тип события:', event.type);
  console.log('Целевой элемент:', event.target);
  console.log('Координаты:', event.clientX, event.clientY);
});

// 2. Несколько обработчиков на одном элементе
button.addEventListener('mouseover', () => {
  button.style.backgroundColor = 'yellow';
});

button.addEventListener('mouseout', () => {
  button.style.backgroundColor = '';
});

// 3. Удаление обработчика
const handleClick = () => console.log('Клик!');
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick); // Удаляем

// 4. Предотвращение стандартного поведения
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Отменяем отправку формы
  console.log('Форма не отправлена');
});

// 5. Остановка всплытия события
const child = document.querySelector('.child');
const parent = document.querySelector('.parent');

child.addEventListener('click', (event) => {
  event.stopPropagation(); // Событие не всплывет к parent
  console.log('Клик по ребенку');
});

parent.addEventListener('click', () => {
  console.log('Это не выполнится из-за stopPropagation');
});
```

### Делегирование событий:

```html
<ul id="todo-list">
  <li data-id="1">Задача 1 <button class="delete">×</button></li>
  <li data-id="2">Задача 2 <button class="delete">×</button></li>
  <li data-id="3">Задача 3 <button class="delete">×</button></li>
</ul>

<script>
// Вместо добавления обработчика на каждую кнопку
// Добавляем один обработчик на родителя
const todoList = document.getElementById('todo-list');

todoList.addEventListener('click', (event) => {
  // Проверяем, была ли нажата кнопка удаления
  if (event.target.classList.contains('delete')) {
    const listItem = event.target.closest('li');
    const taskId = listItem.dataset.id;
    
    console.log(`Удаляем задачу ${taskId}`);
    listItem.remove();
  }
  
  // Обработка клика по задаче
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('completed');
  }
});
</script>
```

## 🔄 Динамическое обновление контента

```javascript
// Создание динамического интерфейса
function createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <img src="${user.avatar}" alt="${user.name}" class="avatar">
    <h3>${user.name}</h3>
    <p>Email: ${user.email}</p>
    <button class="edit-btn" data-id="${user.id}">Редактировать</button>
  `;
  
  return card;
}

// Добавление нескольких карточек
const users = [
  { id: 1, name: 'Анна', email: 'anna@example.com', avatar: 'anna.jpg' },
  { id: 2, name: 'Иван', email: 'ivan@example.com', avatar: 'ivan.jpg' },
  { id: 3, name: 'Мария', email: 'maria@example.com', avatar: 'maria.jpg' }
];

const container = document.getElementById('users-container');

// Способ 1: Постепенное добавление (может вызвать перерисовку)
users.forEach(user => {
  const card = createUserCard(user);
  container.append(card);
});

// Способ 2: Пакетное добавление (более эффективно)
const fragment = document.createDocumentFragment();
users.forEach(user => {
  fragment.append(createUserCard(user));
});
container.append(fragment);
```

## 📱 Практический пример: Todo App

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <style>
    .completed { text-decoration: line-through; opacity: 0.6; }
    .todo-item { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
  </style>
</head>
<body>
  <div id="app">
    <h1>Мои задачи</h1>
    <form id="todo-form">
      <input type="text" id="todo-input" placeholder="Новая задача..." required>
      <button type="submit">Добавить</button>
    </form>
    <ul id="todo-list"></ul>
    <div id="stats">
      Всего: <span id="total">0</span> |
      Выполнено: <span id="completed">0</span>
    </div>
  </div>

  <script>
    class TodoApp {
      constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('todo-input');
        this.list = document.getElementById('todo-list');
        this.totalSpan = document.getElementById('total');
        this.completedSpan = document.getElementById('completed');
        
        this.init();
      }
      
      init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
      }
      
      addTodo(event) {
        event.preventDefault();
        
        const text = this.input.value.trim();
        if (!text) return;
        
        const todo = {
          id: Date.now(),
          text: text,
          completed: false,
          createdAt: new Date().toISOString()
        };
        
        this.todos.push(todo);
        this.saveToStorage();
        this.render();
        this.input.value = '';
      }
      
      toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
          todo.completed = !todo.completed;
          this.saveToStorage();
          this.render();
        }
      }
      
      deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveToStorage();
        this.render();
      }
      
      render() {
        // Очищаем список
        this.list.innerHTML = '';
        
        // Создаем элементы задач
        this.todos.forEach(todo => {
          const li = document.createElement('li');
          li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
          li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
            <button class="delete-btn" data-id="${todo.id}">Удалить</button>
            <small>${new Date(todo.createdAt).toLocaleDateString()}</small>
          `;
          
          // Добавляем обработчики
          const checkbox = li.querySelector('input[type="checkbox"]');
          const deleteBtn = li.querySelector('.delete-btn');
          
          checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
          deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
          
          this.list.appendChild(li);
        });
        
        // Обновляем статистику
        this.updateStats();
      }
      
      updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        
        this.totalSpan.textContent = total;
        this.completedSpan.textContent = completed;
      }
      
      saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    }
    
    // Инициализация приложения
    document.addEventListener('DOMContentLoaded', () => {
      new TodoApp();
    });
  </script>
</body>
</html>
```

## 🚀 Современные техники и лучшие практики

### 1. **Эффективное обновление DOM**

```javascript
// ПЛОХО: Множественные перерисовки
const list = document.getElementById('list');
for (let i = 0; i < 100; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  list.appendChild(item); // 100 перерисовок!
}

// ХОРОШО: Одна перерисовка
const list = document.getElementById('list');
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  fragment.appendChild(item);
}
list.appendChild(fragment); // Одна перерисовка
```

### 2. **Оптимизация производительности**

```javascript
// Использование requestAnimationFrame для анимаций
function animateElement(element) {
  let position = 0;
  
  function step() {
    position += 2;
    element.style.transform = `translateX(${position}px)`;
    
    if (position < 200) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}

// Отложенные вычисления с Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.lazy-load').forEach(element => {
  observer.observe(element);
});
```

### 3. **Безопасная работа с innerHTML**

```javascript
// ОПАСНО: Уязвимость XSS
const userInput = "<script>alert('XSS')</script>";
element.innerHTML = userInput; // Выполнит скрипт!

// БЕЗОПАСНО: Использование textContent
element.textContent = userInput; // Отобразит как текст

// Или санитизация
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

element.innerHTML = sanitizeHTML(userInput); // Безопасно
```

## 📋 Шпаргалка по DOM методам

| Метод | Назначение | Возвращает |
|-------|------------|------------|
| `getElementById()` | Поиск по ID | Один элемент |
| `getElementsByClassName()` | Поиск по классу | Коллекцию |
| `getElementsByTagName()` | Поиск по тегу | Коллекцию |
| `querySelector()` | CSS селектор | Первый элемент |
| `querySelectorAll()` | CSS селектор | NodeList |
| `createElement()` | Создание элемента | Элемент |
| `createTextNode()` | Создание текста | Текстовый узел |
| `appendChild()` | Добавление ребенка | Добавленный элемент |
| `removeChild()` | Удаление ребенка | Удаленный элемент |
| `addEventListener()` | Обработчик события | - |
| `removeEventListener()` | Удаление обработчика | - |

DOM - это мощный инструмент, который позволяет создавать интерактивные и динамические веб-приложения. Освоив эти основы, вы сможете создавать сложные пользовательские интерфейсы! 🎉