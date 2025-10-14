import React, { useState, useEffect } from 'react';

function EffectDemo() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 1. useEffect БЕЗ зависимостей - выполняется при КАЖДОМ рендере
  useEffect(() => {
    console.log('🎯 Компонент обновился! Текущий счет:', count);
  }); // Нет массива зависимостей

  // 🔹 2. useEffect с ПУСТЫМ массивом - выполняется ОДИН раз (при монтировании)
  useEffect(() => {
    console.log('🚀 Компонент смонтирован!');
    
    // Cleanup функция - выполняется при размонтировании
    return () => {
      console.log('🧹 Компонент будет размонтирован!');
    };
  }, []); // Пустой массив зависимостей

  // 🔹 3. useEffect с ЗАВИСИМОСТЯМИ - выполняется когда меняется count
  useEffect(() => {
    console.log('🔔 Count изменился:', count);
    
    if (count > 0) {
      setMessage(`Счетчик увеличился до: ${count}`);
    }
    
    // Таймер для автоматической очистки сообщения
    const timer = setTimeout(() => {
      setMessage('');
    }, 2000);

    // Cleanup функция - очищает таймер при каждом новом вызове useEffect
    return () => {
      console.log('🕒 Очищаем предыдущий таймер');
      clearTimeout(timer);
    };
  }, [count]); // Зависимость от count

  // 🔹 4. useEffect для отслеживания размера окна
  useEffect(() => {
    console.log('📏 Начинаем отслеживать размер окна');
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      console.log('🔄 Размер окна изменился:', window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup - удаляем обработчик при размонтировании
    return () => {
      console.log('📏 Удаляем обработчик resize');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Пустой массив - только при монтировании/размонтировании

  // 🔹 5. NEW: Отслеживание онлайн-статуса
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('🌐 Статус: онлайн');
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      console.log('❌ Статус: оффлайн');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 🔹 6. NEW: Отслеживание позиции мыши
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 🔹 7. NEW: Имитация загрузки данных с API
  useEffect(() => {
    if (count > 5) {
      console.log('📡 Загружаем данные...');
      setLoading(true);
      
      // Имитация запроса к API
      const timer = setTimeout(() => {
        setData(`Данные для счетчика: ${count}`);
        setLoading(false);
        console.log('✅ Данные загружены');
      }, 1000);

      return () => {
        clearTimeout(timer);
        setLoading(false);
      };
    }
  }, [count]); // Загружаем данные когда count > 5

  return (
    <div style={{ border: '2px solid #FF5722', padding: '20px', margin: '10px', borderRadius: '8px', maxWidth: '600px' }}>
      <h2>⚡ Расширенная Демо useEffect</h2>
      
      {/* Счетчик */}
      <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>🧮 Управление счетчиком</h3>
        <p>Счетчик: <strong style={{ fontSize: '24px' }}>{count}</strong></p>
        <div>
          <button onClick={() => setCount(count + 1)}>+1</button>
          <button onClick={() => setCount(count - 1)} style={{ margin: '0 10px' }}>-1</button>
          <button onClick={() => setCount(0)}>Сброс</button>
        </div>
      </div>

      {/* Сообщение от useEffect */}
      {message && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#E3F2FD', 
          border: '1px solid #2196F3',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          🎯 {message}
        </div>
      )}

      {/* Размер окна */}
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#FFF3E0', 
        border: '1px solid #FF9800',
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        <h3>📏 Размер окна</h3>
        <p>Ширина окна: <strong>{windowWidth}px</strong></p>
        <small>Попробуйте изменить размер окна браузера</small>
      </div>

      {/* Онлайн статус */}
      <div style={{ 
        padding: '15px', 
        backgroundColor: isOnline ? '#E8F5E8' : '#FFEBEE', 
        border: `2px solid ${isOnline ? '#4CAF50' : '#F44336'}`,
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        <h3>🌐 Сетевое подключение</h3>
        <p>Статус: <strong>{isOnline ? '✅ Онлайн' : '❌ Оффлайн'}</strong></p>
        <small>Попробуйте отключить интернет (F12 → Network → Offline)</small>
      </div>

      {/* Позиция мыши */}
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#F3E5F5', 
        border: '1px solid #9C27B0',
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        <h3>🖱️ Позиция мыши</h3>
        <p>X: <strong>{mousePosition.x}</strong>px, Y: <strong>{mousePosition.y}</strong>px</p>
        <small>Двигайте мышкой по странице</small>
      </div>

      {/* Загруженные данные */}
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#E1F5FE', 
        border: '1px solid #03A9F4',
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        <h3>📊 Данные с API</h3>
        {loading ? (
          <p>⏳ Загрузка данных...</p>
        ) : data ? (
          <p>✅ {data}</p>
        ) : (
          <p>ℹ️ Увеличьте счетчик больше 5 для загрузки данных</p>
        )}
      </div>

      {/* Информация для разработчика */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#212121', color: '#fff', borderRadius: '4px' }}>
        <h4>👨‍💻 Для разработчика:</h4>
        <p style={{ fontSize: '12px', margin: '5px 0' }}>📖 Откройте Console в DevTools (F12)</p>
        <p style={{ fontSize: '12px', margin: '5px 0' }}>🔍 Смотрите логи useEffect в реальном времени</p>
        <p style={{ fontSize: '12px', margin: '5px 0' }}>🎯 Попробуйте изменить счетчик, размер окна, отключить интернет</p>
      </div>
    </div>
  );
}

export default EffectDemo;