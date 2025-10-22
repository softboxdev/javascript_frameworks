# События в JavaScript

## Что такое события и зачем они нужны?

**События** - это действия или происшествия, которые происходят в системе (браузере), о которых JavaScript может быть уведомлен и реагировать на них.

### Зачем нужны события:
- **Интерактивность** - позволяют странице реагировать на действия пользователя
- **Обработка пользовательского ввода** - клики, нажатия клавиш, перемещение мыши
- **Реакция на изменения** - загрузка страницы, изменение размера окна
- **Асинхронное программирование** - обработка завершения операций

### Основные типы событий:
- **События мыши** - click, dblclick, mousedown, mouseup, mousemove
- **События клавиатуры** - keydown, keyup, keypress
- **События формы** - submit, change, focus, blur
- **События окна** - load, resize, scroll

## Модели событий

### 1. Traditional Model (HTML-атрибуты)

```html
<button onclick="handleClick()">Нажми меня</button>

<script>
function handleClick() {
    alert('Кнопка нажата!');
}
</script>
```

### 2. Traditional DOM Level 0

```html
<button id="myButton">Нажми меня</button>

<script>
const button = document.getElementById('myButton');

// Назначение обработчика
button.onclick = function() {
    alert('Кнопка нажата!');
};

// Удаление обработчика
button.onclick = null;
</script>
```

### 3. DOM Level 2 Event Model

```html
<button id="myButton">Нажми меня</button>

<script>
const button = document.getElementById('myButton');

// Добавление обработчика
button.addEventListener('click', function(event) {
    alert('Кнопка нажата!');
    console.log(event); // Объект события
});

// Удаление обработчика (нужно сохранить ссылку на функцию)
function handleClick(event) {
    alert('Кнопка нажата!');
}

button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
</script>
```

## Практический пример

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Демонстрация событий</title>
    <style>
        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            border: 2px solid #333;
            border-radius: 10px;
            text-align: center;
        }
        
        .button {
            padding: 10px 20px;
            margin: 10px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .button:hover {
            background-color: #0056b3;
        }
        
        .event-log {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            height: 200px;
            overflow-y: auto;
            text-align: left;
            background-color: #f8f9fa;
        }
        
        .log-entry {
            margin: 5px 0;
            padding: 5px;
            border-bottom: 1px solid #eee;
        }
        
        .color-box {
            width: 100px;
            height: 100px;
            margin: 20px auto;
            border: 2px solid #333;
            transition: background-color 0.3s;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Демонстрация работы с событиями</h1>
        
        <div class="color-box" id="colorBox"></div>
        
        <button class="button" id="clickButton">Нажми меня</button>
        <button class="button" id="doubleClickButton">Двойной клик</button>
        <button class="button" id="removeHandlers">Удалить обработчики</button>
        
        <div>
            <input type="text" id="textInput" placeholder="Введите текст...">
            <p>Текст: <span id="textOutput"></span></p>
        </div>
        
        <div class="event-log" id="eventLog">
            <div class="log-entry">Журнал событий:</div>
        </div>
    </div>

    <script>
        // Элементы DOM
        const colorBox = document.getElementById('colorBox');
        const clickButton = document.getElementById('clickButton');
        const doubleClickButton = document.getElementById('doubleClickButton');
        const removeHandlers = document.getElementById('removeHandlers');
        const textInput = document.getElementById('textInput');
        const textOutput = document.getElementById('textOutput');
        const eventLog = document.getElementById('eventLog');
        
        // Функция для логирования событий
        function logEvent(message) {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
            eventLog.appendChild(logEntry);
            eventLog.scrollTop = eventLog.scrollHeight;
        }
        
        // Обработчики для colorBox
        colorBox.addEventListener('mouseenter', function() {
            this.style.backgroundColor = getRandomColor();
            logEvent('Мышь над цветным блоком');
        });
        
        colorBox.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            logEvent('Мышь покинула цветной блок');
        });
        
        // Обработчики для кнопок
        function handleClick() {
            logEvent('Одиночный клик на кнопке');
            alert('Вы нажали кнопку!');
        }
        
        function handleDoubleClick() {
            logEvent('Двойной клик на кнопке');
            alert('Вы дважды нажали кнопку!');
        }
        
        clickButton.addEventListener('click', handleClick);
        doubleClickButton.addEventListener('dblclick', handleDoubleClick);
        
        // Обработчик для удаления обработчиков
        removeHandlers.addEventListener('click', function() {
            clickButton.removeEventListener('click', handleClick);
            doubleClickButton.removeEventListener('dblclick', handleDoubleClick);
            logEvent('Обработчики событий удалены');
            alert('Обработчики событий удалены!');
        });
        
        // Обработчики для текстового поля
        textInput.addEventListener('focus', function() {
            logEvent('Текстовое поле получило фокус');
        });
        
        textInput.addEventListener('blur', function() {
            logEvent('Текстовое поле потеряло фокус');
        });
        
        textInput.addEventListener('input', function() {
            textOutput.textContent = this.value;
            logEvent(`Введен текст: ${this.value}`);
        });
        
        textInput.addEventListener('keydown', function(event) {
            logEvent(`Нажата клавиша: ${event.key}`);
        });
        
        // Обработчики для документа
        document.addEventListener('mousemove', function(event) {
            // Логируем только каждое 10-е событие для производительности
            if (Math.random() < 0.1) {
                logEvent(`Движение мыши: X=${event.clientX}, Y=${event.clientY}`);
            }
        });
        
        // Вспомогательная функция для генерации случайного цвета
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        
        // Логируем загрузку страницы
        window.addEventListener('load', function() {
            logEvent('Страница полностью загружена');
        });
        
        window.addEventListener('resize', function() {
            logEvent(`Размер окна изменен: ${window.innerWidth}x${window.innerHeight}`);
        });
    </script>
</body>
</html>
```

## Ключевые особенности моделей событий

### DOM Level 2 vs Traditional:
- **Несколько обработчиков** - addEventListener позволяет добавить несколько обработчиков для одного события
- **Больше контроля** - возможность использовать фазы захвата и всплытия
- **Лучшая совместимость** - более современный и стандартизированный подход
- **Объект события** - автоматически передается в обработчик

### Фазы событий:
1. **Capture phase** - событие идет от window к целевому элементу
2. **Target phase** - событие достигло целевого элемента
3. **Bubble phase** - событие всплывает от целевого элемента к window

```javascript
// Обработчик на фазе захвата (третий параметр - true)
element.addEventListener('click', handler, true);

// Обработчик на фазе всплытия (третий параметр - false или отсутствует)
element.addEventListener('click', handler, false);
```

Этот код демонстрирует различные типы событий и способы их обработки, показывая преимущества современной модели событий DOM Level 2.