# Контекст выполнения в DOM и Дерево узлов в JavaScript

Давайте подробно разберем эти фундаментальные концепции веб-разработки.

## Дерево узлов (Node Tree)

### Что такое DOM?

**DOM (Document Object Model)** - это программный интерфейс для HTML и XML документов, который представляет структуру документа в виде дерева объектов.

### Структура дерева узлов

```html
<!DOCTYPE html>
<html>
<head>
    <title>Моя страница</title>
</head>
<body>
    <div id="container">
        <h1>Заголовок</h1>
        <p>Параграф текста</p>
        <ul>
            <li>Элемент 1</li>
            <li>Элемент 2</li>
        </ul>
    </div>
</body>
</html>
```

Соответствующее дерево узлов:

```
Document
├── html
    ├── head
    │   └── title
    │       └── "Моя страница"
    └── body
        └── div#container
            ├── h1
            │   └── "Заголовок"
            ├── p
            │   └── "Параграф текста"
            └── ul
                ├── li
                │   └── "Элемент 1"
                └── li
                    └── "Элемент 2"
```

### Типы узлов

```javascript
// Пример проверки типов узлов
const element = document.getElementById('container');
const textNode = element.firstChild;

console.log(element.nodeType); // 1 (ELEMENT_NODE)
console.log(textNode.nodeType); // 3 (TEXT_NODE)

// Основные типы узлов:
// 1 - ELEMENT_NODE
// 3 - TEXT_NODE  
// 8 - COMMENT_NODE
// 9 - DOCUMENT_NODE
// 10 - DOCUMENT_TYPE_NODE
// 11 - DOCUMENT_FRAGMENT_NODE
```

## Навигация по дереву узлов

### Основные свойства для навигации

```javascript
const container = document.getElementById('container');

// Родительские узлы
console.log(container.parentNode); // body
console.log(container.parentElement); // body

// Дочерние узлы
console.log(container.childNodes); // NodeList [h1, p, ul]
console.log(container.children); // HTMLCollection [h1, p, ul]
console.log(container.firstChild); // h1 (первый дочерний узел)
console.log(container.firstElementChild); // h1 (первый дочерний элемент)
console.log(container.lastChild); // ul
console.log(container.lastElementChild); // ul

// Соседние узлы
console.log(container.previousSibling); // предыдущий узел
console.log(container.previousElementSibling); // предыдущий элемент
console.log(container.nextSibling); // следующий узел
console.log(container.nextElementSibling); // следующий элемент
```

### Разница между childNodes и children

```javascript
const div = document.querySelector('div');

// childNodes включает ВСЕ узлы, включая текстовые
console.log(div.childNodes); // Может включать текстовые узлы

// children включает только элементы
console.log(div.children); // Только элементы (теги)
```

## Контекст выполнения в DOM

### Глобальный контекст выполнения

```javascript
// В браузере глобальный объект - window
console.log(this === window); // true в глобальной области видимости

// Глобальные переменные становятся свойствами window
var globalVar = "Я глобальная";
console.log(window.globalVar); // "Я глобальная"

// let/const не становятся свойствами window
let letVar = "Я не в window";
console.log(window.letVar); // undefined
```

### Контекст выполнения функций

```javascript
// Разный контекст в зависимости от вызова функции
function showContext() {
    console.log(this);
}

// 1. Простой вызов - this = window (в нестрогом режиме)
showContext(); // window

// 2. Вызов как метода объекта
const obj = {
    method: showContext
};
obj.method(); // obj

// 3. Вызов с call/apply
showContext.call(document); // document

// 4. Обработчики событий
button.addEventListener('click', function() {
    console.log(this); // button элемент
});
```

### Контекст в обработчиках событий

```javascript
const button = document.getElementById('myButton');

// Обычная функция - this указывает на элемент
button.addEventListener('click', function() {
    console.log(this); // button элемент
    console.log(this === button); // true
});

// Стрелочная функция - this берется из внешней области
button.addEventListener('click', () => {
    console.log(this); // window (если в глобальной области)
    console.log(this === button); // false
});

// Изменение контекста с bind
const handler = function() {
    console.log(this); // customContext
}.bind(customContext);
```

## Практические примеры работы с деревом узлов

### Создание и добавление узлов

```javascript
// Создание элементов
const newDiv = document.createElement('div');
const newText = document.createTextNode('Новый текст');

// Добавление в DOM
newDiv.appendChild(newText);
document.body.appendChild(newDiv);

// Альтернативные способы
newDiv.innerHTML = '<span>Текст в span</span>';
newDiv.textContent = 'Простой текст';

// Вставка в определенное место
const container = document.getElementById('container');
const firstChild = container.firstElementChild;
container.insertBefore(newDiv, firstChild); // Вставить перед первым ребенком
```

### Обход дерева узлов

```javascript
// Рекурсивный обход всего дерева
function traverseNodes(node, level = 0) {
    const indent = '  '.repeat(level);
    console.log(indent + node.nodeName + (node.nodeValue ? `: "${node.nodeValue}"` : ''));
    
    // Рекурсивно обходим детей
    for (let child of node.childNodes) {
        traverseNodes(child, level + 1);
    }
}

traverseNodes(document);

// Поиск элементов
const allParagraphs = document.getElementsByTagName('p'); // HTMLCollection
const containers = document.getElementsByClassName('container'); // HTMLCollection
const elementById = document.getElementById('myId'); // Element
const firstDiv = document.querySelector('div'); // Первый div
const allDivs = document.querySelectorAll('div'); // NodeList
```

### Манипуляции с узлами

```javascript
// Клонирование узлов
const original = document.getElementById('original');
const clone = original.cloneNode(true); // true - глубокое клонирование

// Удаление узлов
const elementToRemove = document.getElementById('removeMe');
elementToRemove.parentNode.removeChild(elementToRemove);
// Или современный способ:
elementToRemove.remove();

// Замена узлов
const oldElement = document.getElementById('old');
const newElement = document.createElement('div');
newElement.textContent = 'Новый элемент';
oldElement.parentNode.replaceChild(newElement, oldElement);
```

## Живые и статические коллекции

```javascript
// HTMLCollection - ЖИВАЯ коллекция
const liveCollection = document.getElementsByTagName('div');
console.log(liveCollection.length); // 3

// Добавляем новый div
const newDiv = document.createElement('div');
document.body.appendChild(newDiv);

console.log(liveCollection.length); // 4 (автоматически обновилась!)

// NodeList - может быть живой или статической
const staticNodeList = document.querySelectorAll('div');
console.log(staticNodeList.length); // 4

// Добавляем еще один div
const anotherDiv = document.createElement('div');
document.body.appendChild(anotherDiv);

console.log(staticNodeList.length); // 4 (НЕ изменилась!)
```

## Оптимизация работы с DOM

### Фрагменты документов

```javascript
// Использование DocumentFragment для эффективного добавления
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const li = document.createElement('li');
    li.textContent = `Элемент ${i}`;
    fragment.appendChild(li);
}

// Одна операция перерисовки вместо 1000
document.getElementById('list').appendChild(fragment);
```

### Понимание перерисовки и перекомпоновки

```javascript
// ПЛОХО: вызывает multiple reflows
const element = document.getElementById('myElement');
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';

// ХОРОШО: минимизирует reflows
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// ИЛИ используйте классы
element.classList.add('new-styles');
```

## Заключение

Понимание дерева узлов и контекста выполнения - это фундамент для эффективной работы с DOM в JavaScript. Ключевые моменты:

1. **DOM представляет документ как дерево узлов** разных типов
2. **Навигация** возможна через родительские, дочерние и соседние узлы
3. **Контекст выполнения (this)** зависит от способа вызова функции
4. **Различайте живые и статические коллекции**
5. **Оптимизируйте операции с DOM** для лучшей производительности

Эти знания помогут вам создавать более эффективные и поддерживаемые веб-приложения.