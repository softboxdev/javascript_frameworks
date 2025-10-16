# 🎯 Практические задания Vue.js для начинающих

## 📋 Содержание упражнений

1. [Упражнение 1: Счетчик](#упражнение-1-счетчик)
2. [Упражнение 2: Список задач](#упражнение-2-список-задач)
3. [Упражнение 3: Форма обратной связи](#упражнение-3-форма-обратной-связи)
4. [Упражнение 4: Компонент пользователя](#упражнение-4-компонент-пользователя)
5. [Упражнение 5: Поиск и фильтрация](#упражнение-5-поиск-и-фильтрация)

---

## 🛠 Настройка проекта

### Создаем новый проект:
```bash
# Создаем новый Vue проект
npm create vue@latest

# Выбираем настройки:
# ✔ Project name: … vue-exercises
# ✔ Add TypeScript? … No
# ✔ Add JSX Support? … No
# ✔ Add Vue Router for Single Page Application development? … No
# ✔ Add Pinia for state management? … No
# ✔ Add Vitest for Unit testing? … No
# ✔ Add an End-to-End Testing Solution? › No
# ✔ Add ESLint for code quality? … Yes
# ✔ Add Prettier for code formatting? … No

# Переходим в папку и устанавливаем зависимости
cd vue-exercises
npm install

# Запускаем сервер разработки
npm run dev
```

---

## 🎯 Упражнение 1: Счетчик

### Задача:
Создать компонент счетчика с кнопками "+", "-" и "Сброс"

### Код решения:
```vue
<!-- src/components/Exercise1_Counter.vue -->
<!-- template - секция шаблона компонента -->
<template>
  <!-- div - основной контейнер компонента -->
  <div class="counter-exercise">
    <!-- h2 - заголовок второго уровня -->
    <h2>🎯 Упражнение 1: Счетчик</h2>
    
    <!-- p - параграф для отображения значения счетчика -->
    <!-- {{ count }} - интерполяция, выводит значение count -->
    <p class="counter-value">Текущее значение: {{ count }}</p>
    
    <!-- div - контейнер для кнопок -->
    <div class="button-group">
      <!-- button - кнопка для уменьшения -->
      <!-- @click - директива обработки события клика -->
      <!-- decrement - метод, который будет вызван -->
      <!-- :disabled - привязка атрибута disabled -->
      <!-- count === 0 - условие, когда кнопка disabled -->
      <button 
        @click="decrement" 
        :disabled="count === 0"
        class="btn btn-danger"
      >
        <!-- - - текст на кнопке -->
        -
      </button>
      
      <!-- button - кнопка сброса -->
      <button @click="reset" class="btn btn-secondary">
        Сброс
      </button>
      
      <!-- button - кнопка увеличения -->
      <button @click="increment" class="btn btn-success">
        +
      </button>
    </div>

    <!-- div - дополнительная информация -->
    <!-- v-if - условный рендеринг -->
    <div v-if="count > 10" class="warning">
      🚀 Отличный результат! Продолжайте в том же духе!
    </div>
  </div>
</template>

<!-- script - секция логики компонента -->
<script>
// export default - экспорт компонента по умолчанию
export default {
  // name - имя компонента для отладки
  name: 'Exercise1Counter',
  
  // data - функция, возвращающая начальное состояние
  data() {
    // return - возвращает объект с данными
    return {
      // count - реактивное свойство, начальное значение 0
      count: 0
    }
  },
  
  // computed - вычисляемые свойства (автоматически обновляются)
  computed: {
    // isZero - вычисляемое свойство, проверяет равен ли count нулю
    isZero() {
      // this.count - доступ к реактивному свойству
      // === - строгое равенство
      return this.count === 0
    }
  },
  
  // methods - объект методов компонента
  methods: {
    // increment - метод увеличения счетчика
    increment() {
      // this.count++ - увеличение count на 1
      this.count++
      // console.log - вывод в консоль для отладки
      console.log('Счетчик увеличен:', this.count)
    },
    
    // decrement - метод уменьшения счетчика
    decrement() {
      // this.count-- - уменьшение count на 1
      this.count--
      console.log('Счетчик уменьшен:', this.count)
    },
    
    // reset - метод сброса счетчика
    reset() {
      // this.count = 0 - установка count в 0
      this.count = 0
      console.log('Счетчик сброшен')
    }
  },
  
  // mounted - хук жизненного цикла (вызывается после монтирования в DOM)
  mounted() {
    console.log('✅ Компонент счетчика загружен')
  }
}
</script>

<!-- style - секция стилей компонента -->
<!-- scoped - стили применяются только к этому компоненту -->
<style scoped>
/* .counter-exercise - класс основного контейнера */
.counter-exercise {
  /* border - граница элемента */
  border: 2px solid #e0e0e0;
  /* border-radius - скругление углов */
  border-radius: 10px;
  /* padding - внутренние отступы */
  padding: 20px;
  /* margin - внешние отступы */
  margin: 20px 0;
  /* text-align - выравнивание текста по центру */
  text-align: center;
}

/* .counter-value - класс для значения счетчика */
.counter-value {
  /* font-size - размер шрифта */
  font-size: 24px;
  /* font-weight - насыщенность шрифта */
  font-weight: bold;
  /* color - цвет текста */
  color: #2c3e50;
  /* margin - отступы */
  margin: 20px 0;
}

/* .button-group - контейнер для кнопок */
.button-group {
  /* display: flex - flex-контейнер */
  display: flex;
  /* gap - расстояние между элементами */
  gap: 10px;
  /* justify-content - выравнивание по главной оси */
  justify-content: center;
  /* margin - отступы */
  margin: 20px 0;
}

/* .btn - базовый класс для всех кнопок */
.btn {
  /* padding - внутренние отступы */
  padding: 10px 20px;
  /* border - граница */
  border: none;
  /* border-radius - скругление углов */
  border-radius: 5px;
  /* font-size - размер шрифта */
  font-size: 18px;
  /* cursor - вид курсора */
  cursor: pointer;
  /* transition - плавный переход */
  transition: all 0.3s ease;
}

/* .btn:hover - стили при наведении на кнопку */
.btn:hover {
  /* transform - трансформация элемента */
  transform: translateY(-2px);
  /* box-shadow - тень элемента */
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* .btn:disabled - стили для disabled кнопки */
.btn:disabled {
  /* opacity - прозрачность */
  opacity: 0.5;
  /* cursor - курсор "недоступно" */
  cursor: not-allowed;
  /* transform: none - отмена трансформации */
  transform: none;
}

/* .btn-success - класс для зеленой кнопки */
.btn-success {
  /* background-color - цвет фона */
  background-color: #28a745;
  /* color - цвет текста */
  color: white;
}

/* .btn-danger - класс для красной кнопки */
.btn-danger {
  background-color: #dc3545;
  color: white;
}

/* .btn-secondary - класс для серой кнопки */
.btn-secondary {
  background-color: #6c757d;
  color: white;
}

/* .warning - класс для предупреждения */
.warning {
  /* background-color - цвет фона */
  background-color: #fff3cd;
  /* border - граница */
  border: 1px solid #ffeaa7;
  /* border-radius - скругление углов */
  border-radius: 5px;
  /* padding - внутренние отступы */
  padding: 10px;
  /* margin-top - верхний отступ */
  margin-top: 15px;
  /* color - цвет текста */
  color: #856404;
}
</style>
```

---

## 📝 Упражнение 2: Список задач

### Задача:
Создать менеджер задач с возможностью добавления, удаления и отметки выполнения

### Код решения:
```vue
<!-- src/components/Exercise2_TodoList.vue -->
<template>
  <div class="todo-exercise">
    <h2>📝 Упражнение 2: Список задач</h2>
    
    <!-- form - форма для добавления новых задач -->
    <!-- @submit.prevent - обработка отправки формы с предотвращением перезагрузки -->
    <form @submit.prevent="addTodo" class="todo-form">
      <!-- input - поле ввода для новой задачи -->
      <!-- v-model - двусторонняя привязка с newTodo -->
      <!-- placeholder - текст-подсказка -->
      <!-- :disabled - привязка атрибута disabled -->
      <input
        v-model="newTodo"
        type="text"
        placeholder="Введите новую задачу..."
        class="todo-input"
        :disabled="isLoading"
      >
      
      <!-- button - кнопка добавления -->
      <!-- type="submit" - кнопка отправки формы -->
      <!-- :disabled - кнопка disabled если поле пустое или загрузка -->
      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="!newTodo.trim() || isLoading"
      >
        <!-- v-if - условный рендеринг текста кнопки -->
        <span v-if="!isLoading">Добавить</span>
        <span v-else>Добавляем...</span>
      </button>
    </form>

    <!-- div - контейнер списка задач -->
    <!-- v-if - показываем если есть задачи -->
    <div v-if="todos.length > 0" class="todo-list">
      
      <!-- div - элемент задачи -->
      <!-- v-for - цикл по массиву todos -->
      <!-- :key - уникальный ключ для каждого элемента -->
      <!-- :class - динамические классы -->
      <div
        v-for="(todo, index) in todos"
        :key="todo.id"
        class="todo-item"
        :class="{ 'completed': todo.completed }"
      >
        
        <!-- input - чекбокс для отметки выполнения -->
        <!-- type="checkbox" - тип input -->
        <!-- v-model - привязка к todo.completed -->
        <input
          type="checkbox"
          v-model="todo.completed"
          class="todo-checkbox"
        >
        
        <!-- span - текст задачи -->
        <!-- @click - обработчик клика по тексту -->
        <span 
          @click="toggleTodo(index)"
          class="todo-text"
        >
          {{ todo.text }}
        </span>
        
        <!-- button - кнопка удаления -->
        <!-- @click.stop - обработчик с остановкой всплытия -->
        <button
          @click.stop="removeTodo(index)"
          class="btn btn-sm btn-danger"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- p - сообщение когда список пуст -->
    <!-- v-else - условие "в противном случае" -->
    <p v-else class="empty-message">
      📭 Список задач пуст. Добавьте первую задачу!
    </p>

    <!-- div - статистика -->
    <div class="todo-stats">
      <p>📊 Всего задач: {{ totalTodos }}, Выполнено: {{ completedTodos }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exercise2TodoList',
  
  data() {
    return {
      // newTodo - строка для новой задачи
      newTodo: '',
      // isLoading - флаг загрузки
      isLoading: false,
      // todos - массив задач
      todos: [
        // { id, text, completed } - структура объекта задачи
        { id: 1, text: 'Изучить основы Vue.js', completed: true },
        { id: 2, text: 'Создать первый компонент', completed: false },
        { id: 3, text: 'Разобраться с директивами', completed: false }
      ]
    }
  },
  
  computed: {
    // totalTodos - общее количество задач
    totalTodos() {
      // .length - свойство массива, возвращает количество элементов
      return this.todos.length
    },
    
    // completedTodos - количество выполненных задач
    completedTodos() {
      // .filter - метод массива, фильтрует элементы
      // todo => todo.completed - стрелочная функция
      return this.todos.filter(todo => todo.completed).length
    }
  },
  
  methods: {
    // addTodo - метод добавления новой задачи
    addTodo() {
      // if - проверка что строка не пустая
      if (this.newTodo.trim()) {
        // this.isLoading = true - установка флага загрузки
        this.isLoading = true
        
        // setTimeout - имитация асинхронной операции
        setTimeout(() => {
          // this.todos.push - добавление элемента в массив
          this.todos.push({
            // id - уникальный идентификатор (текущее время)
            id: Date.now(),
            // text - текст задачи (без пробелов по краям)
            text: this.newTodo.trim(),
            // completed - начальное состояние (не выполнено)
            completed: false
          })
          
          // this.newTodo = '' - очистка поля ввода
          this.newTodo = ''
          // this.isLoading = false - сброс флага загрузки
          this.isLoading = false
          
          console.log('Задача добавлена:', this.todos)
        }, 500) // задержка 500ms
      }
    },
    
    // removeTodo - метод удаления задачи
    removeTodo(index) {
      // confirm - диалоговое окно подтверждения
      if (confirm('Удалить эту задачу?')) {
        // .splice - метод массива, удаляет элемент по индексу
        // (index, 1) - удалить 1 элемент начиная с index
        this.todos.splice(index, 1)
        console.log('Задача удалена')
      }
    },
    
    // toggleTodo - метод переключения состояния задачи
    toggleTodo(index) {
      // ! - логическое НЕ, инвертирует значение
      this.todos[index].completed = !this.todos[index].completed
      console.log('Статус задачи изменен:', this.todos[index])
    }
  },
  
  mounted() {
    console.log('✅ Компонент списка задач загружен')
  }
}
</script>

<style scoped>
.todo-exercise {
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.todo-input:focus {
  border-color: #007bff;
  outline: none;
}

.todo-list {
  space-y: 10px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
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

.todo-item.completed {
  background: #d4edda;
  opacity: 0.8;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  cursor: pointer;
  font-size: 16px;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #6c757d;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}

.empty-message {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 20px;
}

.todo-stats {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background: #e7f3ff;
  border-radius: 5px;
  color: #0056b3;
}
</style>
```

---

## 📧 Упражнение 3: Форма обратной связи

### Задача:
Создать форму с валидацией и обработкой данных

### Код решения:
```vue
<!-- src/components/Exercise3_ContactForm.vue -->
<template>
  <div class="form-exercise">
    <h2>📧 Упражнение 3: Форма обратной связи</h2>
    
    <!-- form - основная форма -->
    <!-- @submit.prevent - обработка отправки -->
    <form @submit.prevent="submitForm" class="contact-form">
      
      <!-- div - группа полей формы -->
      <div class="form-group">
        <!-- label - метка для поля -->
        <label for="name">Имя:</label>
        <!-- input - поле ввода имени -->
        <!-- v-model - привязка к formData.name -->
        <!-- :class - динамические классы для валидации -->
        <!-- @blur - событие при потере фокуса -->
        <input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="Введите ваше имя"
          :class="{ 'error': errors.name }"
          @blur="validateField('name')"
        >
        <!-- span - сообщение об ошибке -->
        <!-- v-if - показываем если есть ошибка -->
        <span v-if="errors.name" class="error-message">
          {{ errors.name }}
        </span>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="example@mail.com"
          :class="{ 'error': errors.email }"
          @blur="validateField('email')"
        >
        <span v-if="errors.email" class="error-message">
          {{ errors.email }}
        </span>
      </div>

      <div class="form-group">
        <label for="message">Сообщение:</label>
        <!-- textarea - многострочное текстовое поле -->
        <textarea
          id="message"
          v-model="formData.message"
          placeholder="Введите ваше сообщение..."
          rows="4"
          :class="{ 'error': errors.message }"
          @blur="validateField('message')"
        ></textarea>
        <span v-if="errors.message" class="error-message">
          {{ errors.message }}
        </span>
      </div>

      <div class="form-group">
        <label>
          <!-- checkbox - флажок -->
          <input
            type="checkbox"
            v-model="formData.agree"
            class="checkbox"
          >
          Я согласен с условиями обработки данных
        </label>
        <span v-if="errors.agree" class="error-message">
          {{ errors.agree }}
        </span>
      </div>

      <!-- button - кнопка отправки -->
      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="!isFormValid || isSubmitting"
      >
        <span v-if="!isSubmitting">Отправить</span>
        <span v-else>Отправка...</span>
      </button>
    </form>

    <!-- div - превью данных формы -->
    <!-- v-if - показываем если форма заполнена -->
    <div v-if="isFormFilled" class="form-preview">
      <h3>📋 Превью данных:</h3>
      <p><strong>Имя:</strong> {{ formData.name }}</p>
      <p><strong>Email:</strong> {{ formData.email }}</p>
      <p><strong>Сообщение:</strong> {{ formData.message }}</p>
      <p><strong>Согласие:</strong> {{ formData.agree ? 'Да' : 'Нет' }}</p>
    </div>

    <!-- div - сообщение об успешной отправке -->
    <!-- v-if - показываем после отправки -->
    <div v-if="isSubmitted" class="success-message">
      ✅ Форма успешно отправлена!
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exercise3ContactForm',
  
  data() {
    return {
      // formData - объект с данными формы
      formData: {
        name: '',
        email: '',
        message: '',
        agree: false
      },
      // errors - объект с ошибками валидации
      errors: {
        name: '',
        email: '',
        message: '',
        agree: ''
      },
      // isSubmitting - флаг отправки формы
      isSubmitting: false,
      // isSubmitted - флаг успешной отправки
      isSubmitted: false
    }
  },
  
  computed: {
    // isFormValid - проверка валидности всей формы
    isFormValid() {
      return (
        this.formData.name &&
        this.formData.email &&
        this.formData.message &&
        this.formData.agree &&
        !this.errors.name &&
        !this.errors.email &&
        !this.errors.message
      )
    },
    
    // isFormFilled - проверка что форма хотя бы частично заполнена
    isFormFilled() {
      return (
        this.formData.name ||
        this.formData.email ||
        this.formData.message
      )
    }
  },
  
  methods: {
    // validateField - метод валидации конкретного поля
    validateField(fieldName) {
      // switch - оператор множественного выбора
      switch (fieldName) {
        case 'name':
          // if - проверка условия
          if (!this.formData.name.trim()) {
            this.errors.name = 'Имя обязательно для заполнения'
          } else if (this.formData.name.length < 2) {
            this.errors.name = 'Имя должно содержать минимум 2 символа'
          } else {
            this.errors.name = ''
          }
          break
          
        case 'email':
          // regex - регулярное выражение для email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!this.formData.email) {
            this.errors.email = 'Email обязателен для заполнения'
          } else if (!emailRegex.test(this.formData.email)) {
            this.errors.email = 'Введите корректный email'
          } else {
            this.errors.email = ''
          }
          break
          
        case 'message':
          if (!this.formData.message.trim()) {
            this.errors.message = 'Сообщение обязательно для заполнения'
          } else if (this.formData.message.length < 10) {
            this.errors.message = 'Сообщение должно содержать минимум 10 символов'
          } else {
            this.errors.message = ''
          }
          break
          
        case 'agree':
          if (!this.formData.agree) {
            this.errors.agree = 'Необходимо согласие'
          } else {
            this.errors.agree = ''
          }
          break
      }
    },
    
    // validateForm - валидация всей формы
    validateForm() {
      // Object.keys - получаем массив ключей объекта
      Object.keys(this.formData).forEach(key => {
        this.validateField(key)
      })
    },
    
    // submitForm - отправка формы
    async submitForm() {
      // Вызываем валидацию всех полей
      this.validateForm()
      
      // Если форма невалидна - выходим
      if (!this.isFormValid) {
        alert('Пожалуйста, исправьте ошибки в форме')
        return
      }
      
      // Устанавливаем флаг отправки
      this.isSubmitting = true
      
      try {
        // Имитация отправки на сервер
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Логируем данные формы
        console.log('Данные формы:', this.formData)
        
        // Устанавливаем флаг успешной отправки
        this.isSubmitted = true
        
        // Сбрасываем форму через 3 секунды
        setTimeout(() => {
          this.resetForm()
          this.isSubmitted = false
        }, 3000)
        
      } catch (error) {
        console.error('Ошибка отправки:', error)
        alert('Произошла ошибка при отправке формы')
      } finally {
        // Сбрасываем флаг отправки в любом случае
        this.isSubmitting = false
      }
    },
    
    // resetForm - сброс формы
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        message: '',
        agree: false
      }
      this.errors = {
        name: '',
        email: '',
        message: '',
        agree: ''
      }
    }
  },
  
  mounted() {
    console.log('✅ Компонент формы загружен')
  }
}
</script>

<style scoped>
.form-exercise {
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}

.contact-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
}

input.error,
textarea.error {
  border-color: #dc3545;
}

.error-message {
  display: block;
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}

.checkbox {
  margin-right: 8px;
}

.form-preview {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  border-left: 4px solid #007bff;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
  border: 1px solid #c3e6cb;
}
</style>
```

---

## 🧩 Упражнение 4: Компонент пользователя

### Задача:
Создать переиспользуемый компонент карточки пользователя

### Код решения:
```vue
<!-- src/components/Exercise4_UserCard.vue -->
<template>
  <div class="user-card-exercise">
    <h2>👤 Упражнение 4: Компонент пользователя</h2>
    
    <!-- div - контейнер для карточек пользователей -->
    <div class="users-container">
      
      <!-- UserCard - наш кастомный компонент -->
      <!-- v-for - цикл по массиву users -->
      <!-- :key - уникальный ключ -->
      <!-- :user - передача prop user -->
      <!-- :is-online - передача prop isOnline -->
      <!-- @user-click - обработка события -->
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        :is-online="user.isOnline"
        @user-click="handleUserClick"
        @send-message="handleSendMessage"
      />
    </div>

    <!-- div - выбранный пользователь -->
    <div v-if="selectedUser" class="selected-user">
      <h3>🎯 Выбранный пользователь:</h3>
      <p><strong>Имя:</strong> {{ selectedUser.name }}</p>
      <p><strong>Email:</strong> {{ selectedUser.email }}</p>
      <p><strong>Роль:</strong> {{ selectedUser.role }}</p>
      <button @click="selectedUser = null" class="btn btn-secondary">
        Сбросить выбор
      </button>
    </div>
  </div>
</template>

<script>
// import - импорт дочернего компонента
import UserCard from './UserCard.vue'

export default {
  name: 'Exercise4UserCard',
  
  // components - регистрация локальных компонентов
  components: {
    UserCard
  },
  
  data() {
    return {
      // selectedUser - выбранный пользователь
      selectedUser: null,
      // users - массив пользователей
      users: [
        {
          id: 1,
          name: 'Анна Иванова',
          email: 'anna@example.com',
          role: 'Администратор',
          avatar: '👩‍💼',
          isOnline: true
        },
        {
          id: 2,
          name: 'Петр Сидоров',
          email: 'petr@example.com',
          role: 'Модератор',
          avatar: '👨‍💻',
          isOnline: false
        },
        {
          id: 3,
          name: 'Мария Козлова',
          email: 'maria@example.com',
          role: 'Пользователь',
          avatar: '👩‍🎨',
          isOnline: true
        }
      ]
    }
  },
  
  methods: {
    // handleUserClick - обработчик клика по пользователю
    handleUserClick(user) {
      this.selectedUser = user
      console.log('Пользователь выбран:', user.name)
    },
    
    // handleSendMessage - обработчик отправки сообщения
    handleSendMessage(user) {
      alert(`Отправка сообщения пользователю: ${user.name}`)
      console.log('Сообщение отправлено:', user.email)
    }
  },
  
  mounted() {
    console.log('✅ Компонент карточек пользователей загружен')
  }
}
</script>

<style scoped>
.user-card-exercise {
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}

.users-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.selected-user {
  background: #e7f3ff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  border-left: 4px solid #007bff;
}
</style>
```

### Дочерний компонент UserCard:
```vue
<!-- src/components/UserCard.vue -->
<template>
  <!-- div - карточка пользователя -->
  <!-- :class - динамические классы -->
  <!-- @click - обработчик клика по карточке -->
  <div 
    class="user-card"
    :class="{ 'online': isOnline, 'offline': !isOnline }"
    @click="handleClick"
  >
    <!-- div - аватар пользователя -->
    <div class="user-avatar">
      {{ user.avatar }}
    </div>
    
    <!-- div - информация о пользователе -->
    <div class="user-info">
      <!-- h3 - имя пользователя -->
      <h3>{{ user.name }}</h3>
      <!-- p - email пользователя -->
      <p class="user-email">{{ user.email }}</p>
      <!-- span - роль пользователя -->
      <span class="user-role">{{ user.role }}</span>
      
      <!-- div - статус онлайн -->
      <!-- v-if - условный рендеринг -->
      <div v-if="isOnline" class="online-status">
        ● Онлайн
      </div>
      <div v-else class="offline-status">
        ○ Оффлайн
      </div>
    </div>
    
    <!-- div - кнопки действий -->
    <div class="user-actions">
      <!-- button - кнопка сообщения -->
      <!-- @click.stop - остановка всплытия события -->
      <button 
        @click.stop="sendMessage"
        class="btn btn-primary btn-sm"
      >
        💬 Написать
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  
  // props - входящие параметры компонента
  props: {
    // user - объект пользователя
    user: {
      type: Object,
      required: true,
      // default - значение по умолчанию
      default: () => ({
        name: 'Неизвестный пользователь',
        email: '',
        role: 'Пользователь',
        avatar: '👤'
      })
    },
    
    // isOnline - булево значение онлайн статуса
    isOnline: {
      type: Boolean,
      default: false
    }
  },
  
  // emits - объявление пользовательских событий
  emits: ['user-click', 'send-message'],
  
  methods: {
    // handleClick - обработчик клика по карточке
    handleClick() {
      // $emit - генерация пользовательского события
      // 'user-click' - имя события
      // this.user - данные (payload)
      this.$emit('user-click', this.user)
    },
    
    // sendMessage - обработчик отправки сообщения
    sendMessage() {
      this.$emit('send-message', this.user)
    }
  }
}
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.user-card.online {
  border-left: 4px solid #28a745;
}

.user-card.offline {
  border-left: 4px solid #6c757d;
}

.user-avatar {
  font-size: 40px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 50%;
}

.user-info {
  flex: 1;
}

.user-info h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.user-email {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
}

.user-role {
  display: inline-block;
  background: #e9ecef;
  color: #495057;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.online-status {
  color: #28a745;
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
}

.offline-status {
  color: #6c757d;
  font-size: 12px;
  margin-top: 5px;
}

.user-actions {
  display: flex;
  gap: 10px;
}
</style>
```

---

## 🔍 Упражнение 5: Поиск и фильтрация

### Задача:
Создать компонент поиска и фильтрации списка продуктов

### Код решения:
```vue
<!-- src/components/Exercise5_SearchFilter.vue -->
<template>
  <div class="search-exercise">
    <h2>🔍 Упражнение 5: Поиск и фильтрация</h2>
    
    <!-- div - панель поиска и фильтров -->
    <div class="search-panel">
      
      <!-- input - поле поиска -->
      <div class="search-group">
        <label>🔎 Поиск товаров:</label>
        <!-- v-model - привязка к searchQuery -->
        <!-- @input - событие при вводе -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Введите название товара..."
          class="search-input"
          @input="handleSearch"
        >
      </div>

      <!-- select - фильтр по категории -->
      <div class="filter-group">
        <label>📂 Категория:</label>
        <!-- v-model - привязка к selectedCategory -->
        <select v-model="selectedCategory" class="filter-select">
          <!-- option - варианты выбора -->
          <option value="">Все категории</option>
          <option 
            v-for="category in categories" 
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <!-- div - фильтр по цене -->
      <div class="filter-group">
        <label>💰 Цена до: {{ maxPrice }} руб.</label>
        <!-- input range - ползунок -->
        <input
          v-model="maxPrice"
          type="range"
          min="0"
          max="1000"
          step="50"
          class="price-slider"
        >
      </div>

      <!-- button - сброс фильтров -->
      <button @click="resetFilters" class="btn btn-secondary">
        🗑️ Сбросить фильтры
      </button>
    </div>

    <!-- div - статистика -->
    <div class="stats">
      <p>
        Найдено товаров: {{ filteredProducts.length }} 
        из {{ products.length }}
      </p>
    </div>

    <!-- div - список товаров -->
    <!-- v-if - если есть отфильтрованные товары -->
    <div v-if="filteredProducts.length > 0" class="products-grid">
      
      <!-- div - карточка товара -->
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image">
          {{ product.emoji }}
        </div>
        
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="product-category">{{ product.category }}</p>
          <p class="product-price">{{ product.price }} руб.</p>
          <p class="product-stock" :class="{
            'in-stock': product.inStock,
            'out-of-stock': !product.inStock
          }">
            {{ product.inStock ? '✓ В наличии' : '✗ Нет в наличии' }}
          </p>
        </div>
        
        <div class="product-actions">
          <button 
            @click="addToCart(product)"
            :disabled="!product.inStock"
            class="btn btn-primary btn-sm"
          >
            🛒 В корзину
          </button>
        </div>
      </div>
    </div>

    <!-- div - сообщение если ничего не найдено -->
    <div v-else class="no-results">
      <p>😔 Товары по вашему запросу не найдены</p>
      <button @click="resetFilters" class="btn btn-primary">
        Показать все товары
      </button>
    </div>

    <!-- div - корзина -->
    <div v-if="cart.length > 0" class="cart">
      <h3>🛒 Корзина ({{ cart.length }})</h3>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} - {{ item.price }} руб.
        </li>
      </ul>
      <p><strong>Итого: {{ cartTotal }} руб.</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exercise5SearchFilter',
  
  data() {
    return {
      // searchQuery - строка поиска
      searchQuery: '',
      // selectedCategory - выбранная категория
      selectedCategory: '',
      // maxPrice - максимальная цена
      maxPrice: 1000,
      // cart - массив товаров в корзине
      cart: [],
      // products - массив всех товаров
      products: [
        {
          id: 1,
          name: 'Смартфон',
          category: 'Электроника',
          price: 29990,
          emoji: '📱',
          inStock: true
        },
        {
          id: 2,
          name: 'Ноутбук',
          category: 'Электроника',
          price: 59990,
          emoji: '💻',
          inStock: true
        },
        {
          id: 3,
          name: 'Футболка',
          category: 'Одежда',
          price: 1990,
          emoji: '👕',
          inStock: true
        },
        {
          id: 4,
          name: 'Джинсы',
          category: 'Одежда',
          price: 3990,
          emoji: '👖',
          inStock: false
        },
        {
          id: 5,
          name: 'Кофе',
          category: 'Продукты',
          price: 490,
          emoji: '☕',
          inStock: true
        },
        {
          id: 6,
          name: 'Книга',
          category: 'Книги',
          price: 790,
          emoji: '📚',
          inStock: true
        }
      ]
    }
  },
  
  computed: {
    // categories - уникальные категории из товаров
    categories() {
      // Set - коллекция уникальных значений
      // .map - преобразование массива
      return [...new Set(this.products.map(product => product.category))]
    },
    
    // filteredProducts - отфильтрованные товары
    filteredProducts() {
      return this.products.filter(product => {
        // Проверка поискового запроса
        const matchesSearch = product.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
        
        // Проверка категории
        const matchesCategory = !this.selectedCategory || 
          product.category === this.selectedCategory
        
        // Проверка цены
        const matchesPrice = product.price <= this.maxPrice
        
        // Все условия должны быть true
        return matchesSearch && matchesCategory && matchesPrice
      })
    },
    
    // cartTotal - общая стоимость корзины
    cartTotal() {
      // .reduce - метод для аккумуляции значений
      return this.cart.reduce((total, item) => total + item.price, 0)
    }
  },
  
  methods: {
    // handleSearch - обработчик поиска
    handleSearch() {
      console.log('Поисковый запрос:', this.searchQuery)
    },
    
    // resetFilters - сброс всех фильтров
    resetFilters() {
      this.searchQuery = ''
      this.selectedCategory = ''
      this.maxPrice = 1000
      console.log('Фильтры сброшены')
    },
    
    // addToCart - добавление товара в корзину
    addToCart(product) {
      this.cart.push(product)
      console.log('Товар добавлен в корзину:', product.name)
      
      // Уведомление об успешном добавлении
      alert(`Товар "${product.name}" добавлен в корзину!`)
    }
  },
  
  // watch - наблюдатели за изменениями
  watch: {
    // Наблюдатель за selectedCategory
    selectedCategory(newCategory) {
      console.log('Выбрана категория:', newCategory)
    },
    
    // Наблюдатель за maxPrice
    maxPrice(newPrice) {
      console.log('Максимальная цена установлена:', newPrice)
    },
    
    // Наблюдатель за cart
    cart: {
      handler(newCart) {
        console.log('Корзина обновлена:', newCart)
      },
      deep: true // глубокая проверка изменений
    }
  },
  
  mounted() {
    console.log('✅ Компонент поиска и фильтрации загружен')
  }
}
</script>

<style scoped>
.search-exercise {
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}

.search-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

.search-group,
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-input,
.filter-select {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.price-slider {
  width: 100%;
}

.stats {
  text-align: center;
  margin: 20px 0;
  padding: 10px;
  background: #e7f3ff;
  border-radius: 5px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-image {
  font-size: 50px;
  margin-bottom: 15px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.product-category {
  color: #666;
  font-size: 14px;
  margin: 5px 0;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #28a745;
  margin: 10px 0;
}

.product-stock.in-stock {
  color: #28a745;
  font-weight: bold;
}

.product-stock.out-of-stock {
  color: #dc3545;
  font-weight: bold;
}

.product-actions {
  margin-top: 15px;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}

.cart {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
  border-left: 4px solid #28a745;
}

.cart ul {
  list-style: none;
  padding: 0;
}

.cart li {
  padding: 5px 0;
  border-bottom: 1px solid #dee2e6;
}
</style>
```

---

## 🏗 Главный компонент приложения

### App.vue для объединения всех упражнений:
```vue
<!-- src/App.vue -->
<template>
  <!-- div - корневой элемент приложения -->
  <div id="app">
    <!-- header - шапка приложения -->
    <header class="app-header">
      <h1>🎓 Vue.js Практические Упражнения</h1>
      <p>Изучаем Vue.js на практике с подробными комментариями</p>
    </header>

    <!-- main - основное содержимое -->
    <main class="app-main">
      <!-- Exercise1_Counter - компонент счетчика -->
      <Exercise1_Counter />
      
      <!-- Exercise2_TodoList - компонент списка задач -->
      <Exercise2_TodoList />
      
      <!-- Exercise3_ContactForm - компонент формы -->
      <Exercise3_ContactForm />
      
      <!-- Exercise4_UserCard - компонент карточек пользователей -->
      <Exercise4_UserCard />
      
      <!-- Exercise5_SearchFilter - компонент поиска и фильтрации -->
      <Exercise5_SearchFilter />
    </main>

    <!-- footer - подвал приложения -->
    <footer class="app-footer">
      <p>✅ Все упражнения выполнены! Продолжайте изучать Vue.js! 🚀</p>
    </footer>
  </div>
</template>

<script>
// import - импорт всех компонентов упражнений
import Exercise1_Counter from './components/Exercise1_Counter.vue'
import Exercise2_TodoList from './components/Exercise2_TodoList.vue'
import Exercise3_ContactForm from './components/Exercise3_ContactForm.vue'
import Exercise4_UserCard from './components/Exercise4_UserCard.vue'
import Exercise5_SearchFilter from './components/Exercise5_SearchFilter.vue'

export default {
  name: 'App',
  
  // components - регистрация всех компонентов
  components: {
    Exercise1_Counter,
    Exercise2_TodoList,
    Exercise3_ContactForm,
    Exercise4_UserCard,
    Exercise5_SearchFilter
  },
  
  // mounted - хук жизненного цикла
  mounted() {
    console.log('🎉 Приложение Vue.js успешно запущено!')
    console.log('📚 Изучайте код каждого компонента с комментариями')
  }
}
</script>

<style>
/* Глобальные стили */
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.app-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.app-main {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.app-footer {
  text-align: center;
  color: white;
  margin-top: 40px;
  opacity: 0.8;
}

/* Адаптивность */
@media (max-width: 768px) {
  #app {
    padding: 10px;
  }
  
  .app-main {
    padding: 20px;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
}
</style>
```

---

## 🚀 Запуск проекта

После создания всех файлов:

```bash
# Запуск сервера разработки
npm run dev

# Откройте в браузере:
# http://localhost:5173
```

## 📚 Что вы изучили:

✅ **Реактивные данные** - data(), computed
✅ **Методы** - methods, обработчики событий  
✅ **Директивы** - v-if, v-for, v-model, v-bind
✅ **Жизненный цикл** - mounted, created
✅ **Компоненты** - props, emits, дочерние компоненты
✅ **Формы** - валидация, обработка, v-model модификаторы
✅ **Фильтрация** - computed свойства для поиска
✅ **Стили** - scoped CSS, адаптивный дизайн
