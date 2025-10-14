// Импорт React и хука useState из библиотеки React
import React, { useState } from 'react';

// Объявление функционального компонента LoginForm
function LoginForm() {
  // Создание состояния для хранения имени пользователя с начальным значением пустой строки
  const [username, setUsername] = useState('');
  // Создание состояния для хранения пароля с начальным значением пустой строки
  const [password, setPassword] = useState('');
  // Создание состояния для хранения сообщения с начальным значением пустой строки
  const [message, setMessage] = useState('');

  // Функция-обработчик отправки формы
  const handleSubmit = (e) => {
    // Предотвращаем стандартное поведение формы (перезагрузку страницы)
    e.preventDefault();
    // Проверяем, заполнены ли оба поля: имя пользователя и пароль
    if (username && password) {
      // Если оба поля заполнены, устанавливаем приветственное сообщение
      setMessage(`Добро пожаловать, ${username}!`);
    } else {
      // Если какое-то поле не заполнено, устанавливаем сообщение об ошибке
      setMessage('Пожалуйста, заполните все поля!');
    }
  };

  // Возвращаем JSX разметку компонента
  return (
    // Основной контейнер формы с стилями
    <div style={{ border: '2px solid brown', padding: '15px', margin: '10px' }}>
      {/* Заголовок формы */}
      <h2>🔐 Форма входа</h2>
      {/* Форма с обработчиком отправки */}
      <form onSubmit={handleSubmit}>
        {/* Контейнер для поля ввода имени пользователя */}
        <div style={{ marginBottom: '10px' }}>
          {/* Поле ввода для имени пользователя */}
          <input
            type="text"                    // Тип input - текстовое поле
            placeholder="Имя пользователя" // Подсказка внутри поля
            value={username}               // Привязка значения к состоянию username
            onChange={(e) => setUsername(e.target.value)} // Обработчик изменения: обновляем состояние при вводе
            style={{ padding: '5px', width: '200px' }} // Стили поля ввода
          />
        </div>
        {/* Контейнер для поля ввода пароля */}
        <div style={{ marginBottom: '10px' }}>
          {/* Поле ввода для пароля */}
          <input
            type="password"           // Тип input - поле для пароля (скрывает символы)
            placeholder="Пароль"      // Подсказка внутри поля
            value={password}          // Привязка значения к состоянию password
            onChange={(e) => setPassword(e.target.value)} // Обработчик изменения: обновляем состояние при вводе
            style={{ padding: '5px', width: '200px' }} // Стили поля ввода
          />
        </div>
        {/* Кнопка отправки формы */}
        <button type="submit">Войти</button>
      </form>
      {/* Условный рендеринг: показываем сообщение только если оно не пустое */}
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
}

// Экспорт компонента для использования в других файлах
export default LoginForm;


// src/App.jsx
import React from 'react';
import EffectDemo from './components/EffectComponents/EffectDemo';
import Counter from './components/StateComponents/Counter';
import ToggleSwitch from './components/StateComponents/ToggleSwitch';
import LoginForm from './components/EventComponents/LoginForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>⚛️ React Components Demo</h1>
        <p>Различные примеры React компонентов и хуков</p>
      </header>
      
      <div className="components-grid">
        <section className="component-section">
          <h2>🎯 useEffect Демо</h2>
          <p>Демонстрация побочных эффектов</p>
          <EffectDemo />
        </section>
        
        <section className="component-section">
          <h2>🧮 Базовые компоненты</h2>
          <Counter />
          <ToggleSwitch />
          <LoginForm />
        </section>
      </div>
    </div>
  );
}

export default App;


// 📁 App.jsx
import React from 'react';
import ClassComponentWithState from './components/ClassComponents/ClassComponentWithState';

function App() {
  return (
   <div className="App">
      <header className="App-header">
        <h1>📗 Демо классовых компонентов</h1>
        <p>Разные примеры с передачей props</p>
      </header>
      
      <div className="components-grid">
        {/* 🎯 Компонент с минимальными props */}
        <ClassComponentWithState />
        
        {/* 🎯 Компонент с кастомными настройками */}
        <ClassComponentWithState 
          title="Счетчик с большим шагом"
          initialCount={50}
          step={10}
          backgroundColor="#E3F2FD"
          userName="Администратор"
        />
        
        {/* 🎯 Компонент с автоприращением */}
        <ClassComponentWithState 
          title="Авто-счетчик"
          initialCount={0}
          step={1}
          autoIncrement={true}
          backgroundColor="#E8F5E8"
          description="Этот счетчик увеличивается автоматически каждую секунду"
        />
      </div>
    </div>
  );
}