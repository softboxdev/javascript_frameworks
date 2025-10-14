# Упражнения на Поток данных и Хранилище в Redux

## Упражнение 1: Трекер задач с полным циклом данных

### Шаг 1: Создание структуры хранилища

```javascript
// store/types/taskTypes.js
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const SET_FILTER = 'SET_FILTER';
export const FETCH_TASKS_START = 'FETCH_TASKS_START';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';
```

### Шаг 2: Action Creators

```javascript
// store/actions/taskActions.js
import * as types from '../types/taskTypes';

// Синхронные действия
export const addTask = (task) => ({
  type: types.ADD_TASK,
  payload: task // Объект задачи {id, text, completed}
});

export const deleteTask = (taskId) => ({
  type: types.DELETE_TASK,
  payload: taskId // ID задачи для удаления
});

export const toggleTask = (taskId) => ({
  type: types.TOGGLE_TASK,
  payload: taskId // ID задачи для переключения статуса
});

export const setFilter = (filter) => ({
  type: types.SET_FILTER,
  payload: filter // 'ALL', 'COMPLETED', 'ACTIVE'
});

// Асинхронные действия с Thunk
export const fetchTasks = () => {
  return async (dispatch) => {
    dispatch({ type: types.FETCH_TASKS_START });
    
    try {
      // Имитация API запроса
      setTimeout(() => {
        const mockTasks = [
          { id: 1, text: 'Изучить Redux', completed: true },
          { id: 2, text: 'Написать приложение', completed: false },
          { id: 3, text: 'Протестировать код', completed: false }
        ];
        dispatch({
          type: types.FETCH_TASKS_SUCCESS,
          payload: mockTasks
        });
      }, 1000);
      
    } catch (error) {
      dispatch({
        type: types.FETCH_TASKS_FAILURE,
        payload: error.message
      });
    }
  };
};

// Асинхронное добавление с имитацией API
export const addTaskAsync = (text) => {
  return async (dispatch) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    
    dispatch(addTask(newTask));
  };
};
```

### Шаг 3: Редюсер

```javascript
// store/reducers/taskReducer.js
import * as types from '../types/taskTypes';

const initialState = {
  tasks: [],
  filter: 'ALL',
  loading: false,
  error: null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TASKS_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };

    case types.FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case types.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };

    case types.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case types.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };

    case types.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
};

export default taskReducer;
```

### Шаг 4: Компонент TaskTracker

```jsx
// components/TaskTracker.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addTaskAsync, 
  deleteTask, 
  toggleTask, 
  setFilter,
  fetchTasks 
} from '../store/actions/taskActions';

const TaskTracker = () => {
  const dispatch = useDispatch();
  
  // Получаем данные из хранилища
  const { tasks, filter, loading, error } = useSelector(state => state.tasks);
  
  const [taskText, setTaskText] = useState('');

  // Загружаем задачи при монтировании
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Обработчик добавления задачи
  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      dispatch(addTaskAsync(taskText));
      setTaskText('');
    }
  };

  // Обработчик удаления задачи
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  // Обработчик переключения статуса
  const handleToggleTask = (taskId) => {
    dispatch(toggleTask(taskId));
  };

  // Обработчик изменения фильтра
  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  // Фильтрация задач
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'COMPLETED':
        return task.completed;
      case 'ACTIVE':
        return !task.completed;
      default:
        return true;
    }
  });

  // Статистика
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  if (loading) return <div>Загрузка задач...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="task-tracker">
      <h1>Трекер задач</h1>
      
      {/* Форма добавления */}
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Введите новую задачу..."
        />
        <button type="submit">Добавить</button>
      </form>

      {/* Статистика */}
      <div className="task-stats">
        <p>Всего задач: {totalTasks}</p>
        <p>Выполнено: {completedTasks}</p>
        <p>Осталось: {totalTasks - completedTasks}</p>
      </div>

      {/* Фильтры */}
      <div className="task-filters">
        <button 
          onClick={() => handleFilterChange('ALL')}
          className={filter === 'ALL' ? 'active' : ''}
        >
          Все
        </button>
        <button 
          onClick={() => handleFilterChange('ACTIVE')}
          className={filter === 'ACTIVE' ? 'active' : ''}
        >
          Активные
        </button>
        <button 
          onClick={() => handleFilterChange('COMPLETED')}
          className={filter === 'COMPLETED' ? 'active' : ''}
        >
          Выполненные
        </button>
      </div>

      {/* Список задач */}
      <div className="task-list">
        {filteredTasks.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button 
              onClick={() => handleDeleteTask(task.id)}
              className="delete-btn"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTracker;
```

## Упражнение 2: Система учета финансов

### Шаг 1: Типы действий

```javascript
// store/types/financeTypes.js
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const CALCULATE_STATS = 'CALCULATE_STATS';
```

### Шаг 2: Action Creators

```javascript
// store/actions/financeActions.js
import * as types from '../types/financeTypes';

export const addTransaction = (transaction) => ({
  type: types.ADD_TRANSACTION,
  payload: transaction
});

export const deleteTransaction = (transactionId) => ({
  type: types.DELETE_TRANSACTION,
  payload: transactionId
});

export const setCategoryFilter = (category) => ({
  type: types.SET_CATEGORY_FILTER,
  payload: category
});

export const setDateRange = (dateRange) => ({
  type: types.SET_DATE_RANGE,
  payload: dateRange
});

// Сложное действие с вычислениями
export const addTransactionWithStats = (transaction) => {
  return (dispatch, getState) => {
    // Диспатчим добавление транзакции
    dispatch(addTransaction(transaction));
    
    // Получаем текущее состояние для вычислений
    const state = getState();
    const transactions = state.finance.transactions;
    
    // Вычисляем новую статистику
    const stats = calculateFinanceStats(transactions);
    
    // Диспатчим обновление статистики
    dispatch({
      type: types.CALCULATE_STATS,
      payload: stats
    });
  };
};

// Вспомогательная функция для вычислений
const calculateFinanceStats = (transactions) => {
  const income = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expenses = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = income - expenses;
  
  return { income, expenses, balance };
};
```

### Шаг 3: Редюсер финансов

```javascript
// store/reducers/financeReducer.js
import * as types from '../types/financeTypes';

const initialState = {
  transactions: [],
  filters: {
    category: 'ALL',
    dateRange: {
      startDate: null,
      endDate: null
    }
  },
  statistics: {
    income: 0,
    expenses: 0,
    balance: 0
  }
};

const financeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };

    case types.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          t => t.id !== action.payload
        )
      };

    case types.SET_CATEGORY_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          category: action.payload
        }
      };

    case types.SET_DATE_RANGE:
      return {
        ...state,
        filters: {
          ...state.filters,
          dateRange: action.payload
        }
      };

    case types.CALCULATE_STATS:
      return {
        ...state,
        statistics: action.payload
      };

    default:
      return state;
  }
};

export default financeReducer;
```

### Шаг 4: Компонент FinanceTracker

```jsx
// components/FinanceTracker.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addTransactionWithStats, 
  deleteTransaction,
  setCategoryFilter 
} from '../store/actions/financeActions';

const FinanceTracker = () => {
  const dispatch = useDispatch();
  const { transactions, filters, statistics } = useSelector(state => state.finance);
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'EXPENSE',
    category: 'FOOD'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.description && formData.amount) {
      const transaction = {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date().toISOString()
      };
      
      dispatch(addTransactionWithStats(transaction));
      
      // Сброс формы
      setFormData({
        description: '',
        amount: '',
        type: 'EXPENSE',
        category: 'FOOD'
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Фильтрация транзакций
  const filteredTransactions = transactions.filter(transaction => {
    if (filters.category !== 'ALL' && transaction.category !== filters.category) {
      return false;
    }
    return true;
  });

  return (
    <div className="finance-tracker">
      <h1>Учет финансов</h1>
      
      {/* Статистика */}
      <div className="finance-stats">
        <div className="stat-item income">
          <h3>Доходы</h3>
          <span>${statistics.income}</span>
        </div>
        <div className="stat-item expenses">
          <h3>Расходы</h3>
          <span>${statistics.expenses}</span>
        </div>
        <div className="stat-item balance">
          <h3>Баланс</h3>
          <span>${statistics.balance}</span>
        </div>
      </div>

      {/* Форма добавления */}
      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="text"
          placeholder="Описание"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
        <input
          type="number"
          placeholder="Сумма"
          value={formData.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
        />
        <select
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
        >
          <option value="EXPENSE">Расход</option>
          <option value="INCOME">Доход</option>
        </select>
        <select
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
        >
          <option value="FOOD">Еда</option>
          <option value="TRANSPORT">Транспорт</option>
          <option value="ENTERTAINMENT">Развлечения</option>
          <option value="BILLS">Счета</option>
          <option value="SALARY">Зарплата</option>
        </select>
        <button type="submit">Добавить</button>
      </form>

      {/* Фильтры */}
      <div className="finance-filters">
        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
        >
          <option value="ALL">Все категории</option>
          <option value="FOOD">Еда</option>
          <option value="TRANSPORT">Транспорт</option>
          <option value="ENTERTAINMENT">Развлечения</option>
          <option value="BILLS">Счета</option>
          <option value="SALARY">Зарплата</option>
        </select>
      </div>

      {/* Список транзакций */}
      <div className="transactions-list">
        <h2>История операций</h2>
        {filteredTransactions.map(transaction => (
          <div key={transaction.id} className={`transaction-item ${transaction.type.toLowerCase()}`}>
            <div className="transaction-info">
              <span className="description">{transaction.description}</span>
              <span className="category">{transaction.category}</span>
              <span className={`amount ${transaction.type.toLowerCase()}`}>
                {transaction.type === 'EXPENSE' ? '-' : '+'}${transaction.amount}
              </span>
            </div>
            <button
              onClick={() => dispatch(deleteTransaction(transaction.id))}
              className="delete-btn"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceTracker;
```

## Упражнение 3: Анализ потока данных

### Визуализация потока данных:

```
Компонент → Action → Dispatch → Middleware → Reducer → Store → Компонент

Пример для добавления задачи:
1. User clicks "Add" → handleAddTask()
2. dispatch(addTaskAsync(text)) → Action Creator
3. Thunk middleware processes async function
4. API call simulation (setTimeout)
5. dispatch(addTask(task)) → Sync Action
6. taskReducer updates state
7. Store notifies subscribers
8. Component re-renders with new tasks
```

### Практические задания:

**Задание 1:** Добавьте возможность редактирования существующих задач
**Задание 2:** Реализуйте сохранение состояния в localStorage
**Задание 3:** Добавьте категории для задач с отдельным редюсером
**Задание 4:** Создайте систему уведомлений при изменении состояния

Эти упражнения помогут глубоко понять поток данных в Redux и работу с хранилищем!