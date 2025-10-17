# Родительские и дочерние компоненты во Vue: полное руководство

## 1. Основы взаимодействия компонентов

### Создание дочернего компонента

```vue
<!-- ChildComponent.vue -->
<template>
  <div class="child-component">
    <h3>Дочерний компонент</h3>
    
    <!-- Отображаем данные, полученные от родителя -->
    <p>Полученное сообщение: {{ messageFromParent }}</p>
    
    <!-- Локальное состояние компонента -->
    <p>Локальный счетчик: {{ localCounter }}</p>
    
    <!-- Кнопка для отправки данных родителю -->
    <button @click="sendMessageToParent">
      Отправить сообщение родителю
    </button>
    
    <!-- Кнопка для изменения локального состояния -->
    <button @click="incrementCounter">
      Увеличить счетчик
    </button>
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  
  // Props - данные, передаваемые от родителя
  props: {
    messageFromParent: {
      type: String,        // Тип данных
      default: 'Сообщение по умолчанию', // Значение по умолчанию
      required: false      // Обязательность передачи
    },
    parentCounter: {
      type: Number,
      default: 0
    }
  },
  
  // Локальное состояние компонента
  data() {
    return {
      localCounter: 0,
      childMessage: 'Привет от дочернего компонента!'
    }
  },
  
  // Вычисляемые свойства (на основе props и data)
  computed: {
    totalCount() {
      return this.parentCounter + this.localCounter;
    }
  },
  
  // Методы компонента
  methods: {
    sendMessageToParent() {
      // Генерируем кастомное событие для родителя
      this.$emit('message-from-child', this.childMessage);
      
      // Можно передавать несколько параметров
      this.$emit('child-event', {
        message: this.childMessage,
        counter: this.localCounter,
        timestamp: new Date()
      });
    },
    
    incrementCounter() {
      this.localCounter++;
      // Уведомляем родителя об изменении
      this.$emit('counter-changed', this.localCounter);
    }
  },
  
  // Хуки жизненного цикла
  mounted() {
    console.log('Дочерний компонент смонтирован');
  }
}
</script>

<style scoped>
.child-component {
  border: 2px solid #42b983;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
}
</style>
```

### Родительский компонент

```vue
<!-- ParentComponent.vue -->
<template>
  <div class="parent-component">
    <h2>Родительский компонент</h2>
    
    <!-- Управление состоянием родителя -->
    <div class="controls">
      <input 
        v-model="parentMessage" 
        placeholder="Введите сообщение для ребенка"
      >
      <button @click="incrementParentCounter">
        Родительский счетчик: {{ parentCounter }}
      </button>
    </div>
    
    <!-- Отображение данных от дочернего компонента -->
    <div class="child-data">
      <p>Сообщение от ребенка: {{ messageFromChild }}</p>
      <p>Данные от ребенка: {{ childData ? childData.message : 'нет' }}</p>
      <p>Счетчик ребенка: {{ childCounter }}</p>
    </div>
    
    <!-- Использование дочернего компонента -->
    <!-- Передаем props и слушаем события -->
    <ChildComponent
      :message-from-parent="parentMessage"
      :parent-counter="parentCounter"
      @message-from-child="handleChildMessage"
      @child-event="handleChildEvent"
      @counter-changed="handleCounterChange"
    />
    
    <!-- Несколько дочерних компонентов -->
    <ChildComponent
      :message-from-parent="'Статическое сообщение'"
      :parent-counter="parentCounter"
      @message-from-child="handleChildMessage"
    />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  name: 'ParentComponent',
  
  // Регистрируем дочерние компоненты
  components: {
    ChildComponent
  },
  
  // Состояние родительского компонента
  data() {
    return {
      parentMessage: 'Привет от родителя!',
      parentCounter: 0,
      messageFromChild: '',
      childData: null,
      childCounter: 0
    }
  },
  
  methods: {
    // Обработчик сообщений от дочернего компонента
    handleChildMessage(message) {
      this.messageFromChild = message;
      console.log('Получено сообщение от ребенка:', message);
    },
    
    // Обработчик сложного события
    handleChildEvent(data) {
      this.childData = data;
      console.log('Получены данные от ребенка:', data);
    },
    
    // Обработчик изменения счетчика
    handleCounterChange(newValue) {
      this.childCounter = newValue;
    },
    
    // Метод родителя
    incrementParentCounter() {
      this.parentCounter++;
    }
  }
}
</script>

<style scoped>
.parent-component {
  border: 2px solid #3498db;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
}

.controls {
  margin-bottom: 20px;
}

.child-data {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
```

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