# Практика: Назначение обработчиков событий

## Инструкция для начинающих

### 📋 Что вам понадобится:
- Браузер (Chrome, Firefox, etc.)
- Текстовый редактор (VS Code, Notepad++)
- Базовые знания HTML/CSS

---

## 🎯 Упражнение 1: Первый обработчик события

### Задача:
Создать кнопку, которая показывает сообщение при клике.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Упражнение 1</title>
</head>
<body>
    <button id="myButton">Нажми меня!</button>
    <div id="message"></div>

    <script>
        // Шаг 1: Находим элементы на странице
        const button = document.getElementById('myButton');
        const messageDiv = document.getElementById('message');

        // Шаг 2: Создаем функцию-обработчик
        function showMessage() {
            // Эта функция выполнится при клике на кнопку
            messageDiv.textContent = 'Ура! Вы нажали кнопку! 🎉';
            messageDiv.style.color = 'green';
        }

        // Шаг 3: Назначаем обработчик события
        button.addEventListener('click', showMessage);

        /* 
        КОНТЕКСТ ИСПОЛНЕНИЯ:
        1. Браузер загружает страницу и выполняет скрипт
        2. Переменные button и messageDiv сохраняют ссылки на элементы
        3. Функция showMessage создается, но НЕ выполняется
        4. addEventListener говорит: "Когда на button будет клик, вызови showMessage"
        5. При клике браузер автоматически вызывает showMessage()
        */
    </script>
</body>
</html>
```

---

## 🎯 Упражнение 2: Обработчик с параметром события

### Задача:
Показать координаты клика мыши.

```html
<button id="coordButton">Кликни где угодно</button>
<div id="coordDisplay"></div>

<script>
    const coordButton = document.getElementById('coordButton');
    const coordDisplay = document.getElementById('coordDisplay');

    // Обработчик получает параметр event автоматически
    function showCoordinates(event) {
        /*
        КОГДА ПРОИСХОДИТ КЛИК:
        Браузер автоматически создает объект event и передает его в функцию
        В event содержится вся информация о событии
        */
        
        const x = event.clientX; // Координата X курсора
        const y = event.clientY; // Координата Y курсора
        
        coordDisplay.innerHTML = `
            Вы кликнули в позиции:<br>
            X: ${x}px<br>
            Y: ${y}px
        `;
    }

    coordButton.addEventListener('click', showCoordinates);

    /*
    ЧТО ПРОИСХОДИТ В КОНТЕКСТЕ:
    1. Пользователь кликает на кнопку
    2. Браузер генерирует объект события со всей информацией
    3. Автоматически вызывает showCoordinates(event)
    4. Мы используем данные из event для отображения
    */
</script>
```

---

## 🎯 Упражнение 3: Несколько обработчиков на одном элементе

### Задача:
Кнопка, которая меняет цвет и счетчик кликов.

```html
<button id="multiButton">Умная кнопка</button>
<div id="counter">Кликов: 0</div>

<script>
    const multiButton = document.getElementById('multiButton');
    const counter = document.getElementById('counter');
    let clickCount = 0;

    // Первый обработчик - меняет цвет
    function changeColor() {
        const colors = ['red', 'blue', 'green', 'purple', 'orange'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        multiButton.style.backgroundColor = randomColor;
    }

    // Второй обработчик - счетчик
    function updateCounter() {
        clickCount++;
        counter.textContent = `Кликов: ${clickCount}`;
        
        if (clickCount >= 5) {
            counter.style.fontWeight = 'bold';
            counter.style.color = 'red';
        }
    }

    // Третий обработчик - показывает alert после 3 кликов
    function showAlert() {
        if (clickCount === 3) {
            alert('Вы достигли 3 кликов! 🏆');
        }
    }

    // Назначаем ВСЕ три обработчика на одну кнопку
    multiButton.addEventListener('click', changeColor);
    multiButton.addEventListener('click', updateCounter);
    multiButton.addEventListener('click', showAlert);

    /*
    КОНТЕКСТ ИСПОЛНЕНИЯ:
    1. При клике ВСЕ три функции выполняются ПО ОЧЕРЕДИ
    2. Порядок выполнения: changeColor → updateCounter → showAlert
    3. Каждая функция работает независимо
    4. Все они получают один и тот же объект event
    */
</script>
```

---

## 🎯 Упражнение 4: Удаление обработчиков

### Задача:
Кнопка, которая работает только 3 раза.

```html
<button id="limitedButton">Работает 3 раза (осталось: 3)</button>

<script>
    const limitedButton = document.getElementById('limitedButton');
    let attempts = 3;

    function limitedAction() {
        attempts--;
        limitedButton.textContent = `Работает 3 раза (осталось: ${attempts})`;
        
        if (attempts <= 0) {
            // Удаляем обработчик после 3 использований
            limitedButton.removeEventListener('click', limitedAction);
            limitedButton.textContent = 'Кнопка больше не работает';
            limitedButton.style.backgroundColor = 'gray';
            limitedButton.style.cursor = 'not-allowed';
        }
    }

    // Назначаем обработчик
    limitedButton.addEventListener('click', limitedAction);

    /*
    ВАЖНЫЕ МОМЕНТЫ КОНТЕКСТА:
    1. Функция limitedAction должна быть объявлена ДО addEventListener
    2. Для removeEventListener нужно передать ТУ ЖЕ САМУЮ функцию
    3. Переменная attempts сохраняет свое значение между вызовами
    */
</script>
```

---

## 🎯 Упражнение 5: Разные типы событий

### Задача:
Элемент, реагирующий на разные действия.

```html
<div id="sensitiveArea" style="width: 200px; height: 100px; border: 2px solid black; padding: 20px;">
    Эта область чувствительна к событиям
</div>
<div id="eventLog" style="margin-top: 10px;"></div>

<script>
    const area = document.getElementById('sensitiveArea');
    const log = document.getElementById('eventLog');

    function addLog(message) {
        log.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
    }

    // Разные типы событий на одном элементе
    area.addEventListener('mouseenter', function() {
        addLog('Мышь над областью 🖱️');
        area.style.backgroundColor = 'lightyellow';
    });

    area.addEventListener('mouseleave', function() {
        addLog('Мышь покинула область 🚪');
        area.style.backgroundColor = 'white';
    });

    area.addEventListener('mousedown', function() {
        addLog('Нажата кнопка мыши 👇');
    });

    area.addEventListener('mouseup', function() {
        addLog('Отпущена кнопка мыши 👆');
    });

    area.addEventListener('click', function() {
        addLog('Клик! ✅');
    });

    /*
    ПОСЛЕДОВАТЕЛЬНОСТЬ СОБЫТИЙ ПРИ КЛИКЕ:
    1. mouseenter (если мышь только что вошла)
    2. mousedown (нажатие)
    3. mouseup (отпускание)
    4. click (полный клик)
    5. mouseleave (если мышь ушла)
    */
</script>
```

---

## 🏆 Итоговое упражнение: Мини-проект

### Задача:
Создать интерактивную панель управления.

```html
<div class="control-panel">
    <button id="startBtn">Старт</button>
    <button id="stopBtn">Стоп</button>
    <button id="resetBtn">Сброс</button>
    <div id="status">Статус: Остановлен</div>
    <div id="timer">Время: 0с</div>
</div>

<script>
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const status = document.getElementById('status');
    const timer = document.getElementById('timer');
    
    let seconds = 0;
    let timerId = null;

    function startTimer() {
        if (timerId) return; // Уже запущен
        
        status.textContent = 'Статус: Запущен';
        status.style.color = 'green';
        
        timerId = setInterval(() => {
            seconds++;
            timer.textContent = `Время: ${seconds}с`;
        }, 1000);
    }

    function stopTimer() {
        if (!timerId) return; // Не запущен
        
        clearInterval(timerId);
        timerId = null;
        status.textContent = 'Статус: Остановлен';
        status.style.color = 'red';
    }

    function resetTimer() {
        stopTimer();
        seconds = 0;
        timer.textContent = 'Время: 0с';
        status.textContent = 'Статус: Сброшен';
        status.style.color = 'blue';
    }

    // Назначаем обработчики
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);

    /*
    КОНТЕКСТ ВЗАИМОДЕЙСТВИЯ:
    1. Пользователь кликает кнопки в любом порядке
    2. Каждая кнопка вызывает свою функцию
    3. Функции меняют общее состояние (seconds, timerId)
    4. Интерфейс автоматически обновляется
    */
</script>
```

---

