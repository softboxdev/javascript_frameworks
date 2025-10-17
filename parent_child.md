# Родительские и дочерние компоненты во Vue: полное руководство

## 1. Основы взаимодействия компонентов


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

## 2. Продвинутые паттерны взаимодействия

### Слоты (Slots) для содержимого

```vue
<!-- ComponentWithSlot.vue -->
<template>
  <div class="container">
    <header class="header">
      <!-- Именованный слот для заголовка -->
      <slot name="header">
        <!-- Fallback контент, если слот не заполнен -->
        <h3>Заголовок по умолчанию</h3>
      </slot>
    </header>
    
    <main class="main">
      <!-- Слот по умолчанию для основного контента -->
      <slot>
        <p>Контент по умолчанию</p>
      </slot>
    </main>
    
    <footer class="footer">
      <!-- Scoped slot с передачей данных -->
      <slot name="footer" :user="user" :data="footerData">
        <p>Футер по умолчанию</p>
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ComponentWithSlot',
  data() {
    return {
      user: {
        name: 'Анна',
        role: 'Администратор'
      },
      footerData: {
        version: '1.0.0',
        year: 2024
      }
    }
  }
}
</script>
```

### Использование слотов

```vue
<!-- ParentUsingSlots.vue -->
<template>
  <ComponentWithSlot>
    <!-- Заполняем именованный слот header -->
    <template v-slot:header>
      <h1>Кастомный заголовок</h1>
      <p>Дополнительный контент в заголовке</p>
    </template>
    
    <!-- Заполняем слот по умолчанию -->
    <p>Это основной контент, переданный из родителя</p>
    <button @click="handleClick">Кнопка в слоте</button>
    
    <!-- Используем scoped slot -->
    <template v-slot:footer="slotProps">
      <div class="custom-footer">
        <p>Пользователь: {{ slotProps.user.name }}</p>
        <p>Роль: {{ slotProps.user.role }}</p>
        <p>Версия: {{ slotProps.data.version }}</p>
        <p>Год: {{ slotProps.data.year }}</p>
      </div>
    </template>
  </ComponentWithSlot>
</template>
```

### Provide/Inject для глубокой вложенности

```vue
<!-- AncestorComponent.vue -->
<template>
  <div>
    <h2>Компонент-предок</h2>
    <MiddleComponent />
  </div>
</template>

<script>
import MiddleComponent from './MiddleComponent.vue';

export default {
  name: 'AncestorComponent',
  components: { MiddleComponent },
  
  // Provide данных для всех потомков
  provide() {
    return {
      // Статические данные
      appName: 'My Vue App',
      
      // Реактивные данные через computed
      userData: () => ({
        name: this.user.name,
        role: this.user.role
      }),
      
      // Методы
      updateUser: this.updateUser
    }
  },
  
  data() {
    return {
      user: {
        name: 'Анна',
        role: 'Администратор'
      }
    }
  },
  
  methods: {
    updateUser(newUser) {
      this.user = { ...this.user, ...newUser };
    }
  }
}
</script>
```

```vue
<!-- DeepChildComponent.vue -->
<template>
  <div class="deep-child">
    <h4>Глубоко вложенный компонент</h4>
    <p>Имя приложения: {{ appName }}</p>
    <p>Пользователь: {{ userData.name }}</p>
    <button @click="changeUser">Изменить пользователя</button>
  </div>
</template>

<script>
export default {
  name: 'DeepChildComponent',
  
  // Inject данных от предка
  inject: ['appName', 'userData', 'updateUser'],
  
  methods: {
    changeUser() {
      this.updateUser({
        name: 'Новое имя',
        role: 'Пользователь'
      });
    }
  }
}
</script>
```

## 3. Двусторонняя связь с v-model

### Кастомный компонент с v-model

```vue
<!-- CustomInput.vue -->
<template>
  <div class="custom-input">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  
  // Определяем props для v-model
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  
  // Объявляем события для v-model
  emits: ['update:modelValue']
}
</script>
```

### Использование кастомного v-model

```vue
<!-- ParentWithModel.vue -->
<template>
  <div>
    <h2>Двусторонняя связь с v-model</h2>
    
    <!-- Используем кастомный компонент с v-model -->
    <CustomInput
      v-model="username"
      label="Имя пользователя"
      placeholder="Введите имя"
    />
    
    <CustomInput
      v-model="email"
      label="Email"
      type="email"
      placeholder="Введите email"
      :error="emailError"
    />
    
    <CustomInput
      v-model.number="age"
      label="Возраст"
      type="number"
      placeholder="Введите возраст"
    />
    
    <div class="values">
      <p>Имя: {{ username }}</p>
      <p>Email: {{ email }}</p>
      <p>Возраст: {{ age }}</p>
    </div>
  </div>
</template>

<script>
import CustomInput from './CustomInput.vue';

export default {
  components: { CustomInput },
  data() {
    return {
      username: '',
      email: '',
      age: null
    }
  },
  
  computed: {
    emailError() {
      if (!this.email) return '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email) ? '' : 'Неверный формат email';
    }
  }
}
</script>
```

## 4. Динамические компоненты

```vue
<!-- DynamicParent.vue -->
<template>
  <div class="dynamic-parent">
    <h2>Динамические компоненты</h2>
    
    <!-- Кнопки для переключения компонентов -->
    <div class="controls">
      <button 
        v-for="tab in tabs" 
        :key="tab.name"
        @click="currentTab = tab.name"
        :class="{ active: currentTab === tab.name }"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <!-- Динамический компонент -->
    <component 
      :is="currentComponent" 
      :message="`Активная вкладка: ${currentTab}`"
      @tab-event="handleTabEvent"
    />
  </div>
</template>

<script>
import Tab1 from './Tab1.vue';
import Tab2 from './Tab2.vue';
import Tab3 from './Tab3.vue';

export default {
  name: 'DynamicParent',
  components: { Tab1, Tab2, Tab3 },
  
  data() {
    return {
      currentTab: 'tab1',
      tabs: [
        { name: 'tab1', label: 'Вкладка 1', component: 'Tab1' },
        { name: 'tab2', label: 'Вкладка 2', component: 'Tab2' },
        { name: 'tab3', label: 'Вкладка 3', component: 'Tab3' }
      ]
    }
  },
  
  computed: {
    currentComponent() {
      const tab = this.tabs.find(t => t.name === this.currentTab);
      return tab ? tab.component : 'Tab1';
    }
  },
  
  methods: {
    handleTabEvent(data) {
      console.log('Событие от динамического компонента:', data);
    }
  }
}
</script>
```

## 5. Практические упражнения

### Упражнение 1: Создайте модальное окно

```vue
<!-- Modal.vue -->
<template>
  <div v-if="show" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <slot name="header">
          <h3>Заголовок модального окна</h3>
        </slot>
        <button class="close-btn" @click="close">×</button>
      </div>
      
      <div class="modal-body">
        <slot></slot>
      </div>
      
      <div class="modal-footer">
        <slot name="footer">
          <button @click="close">Закрыть</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:show'],
  methods: {
    close() {
      this.$emit('update:show', false);
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 400px;
  max-width: 600px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
```

### Упражнение 2: Компонент списка с элементами

```vue
<!-- TodoList.vue -->
<template>
  <div class="todo-list">
    <div class="add-form">
      <input 
        v-model="newItemText" 
        @keyup.enter="addItem"
        placeholder="Добавить новую задачу"
      >
      <button @click="addItem">Добавить</button>
    </div>
    
    <ul class="todo-items">
      <TodoItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @update="updateItem"
        @delete="deleteItem"
      />
    </ul>
    
    <div class="stats">
      Всего: {{ totalItems }} | Выполнено: {{ completedItems }}
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  components: { TodoItem },
  data() {
    return {
      newItemText: '',
      items: [
        { id: 1, text: 'Изучить Vue', completed: true },
        { id: 2, text: 'Создать компонент', completed: false }
      ]
    }
  },
  
  computed: {
    totalItems() {
      return this.items.length;
    },
    completedItems() {
      return this.items.filter(item => item.completed).length;
    }
  },
  
  methods: {
    addItem() {
      if (this.newItemText.trim()) {
        this.items.push({
          id: Date.now(),
          text: this.newItemText,
          completed: false
        });
        this.newItemText = '';
      }
    },
    
    updateItem(updatedItem) {
      const index = this.items.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        this.items.splice(index, 1, updatedItem);
      }
    },
    
    deleteItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
    }
  }
}
</script>
```

## Ключевые концепции:

1. **Props** - данные сверху вниз (родитель → ребенок)
2. **Events** - коммуникация снизу вверх (ребенок → родитель)
3. **Slots** - передача контента и шаблонов
4. **Provide/Inject** - данные для глубоко вложенных компонентов
5. **v-model** - двусторонняя связь
6. **Динамические компоненты** - переключение между компонентами
7. **Жизненный цикл** - управление состоянием компонента

Это руководство охватывает все основные аспекты взаимодействия родительских и дочерних компонентов во Vue.