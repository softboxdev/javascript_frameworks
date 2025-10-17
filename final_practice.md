# Практическая работа (заключительный этап): Работа с компонентами Vue и передачей данных

## Задание: Создание интерактивного списка покупок

### Цели упражнения:
- Создание родительских и дочерних компонентов
- Передача данных через props
- Отправка событий через $emit
- Работа с локальным состоянием
- Практика двустороннего связывания

---

## Шаг 1: Базовая структура приложения

### MainApp.vue (Корневой компонент)
```vue
<!-- MainApp.vue -->
<!-- Корневой компонент приложения -->
<template>
  <div id="app">
    <header class="app-header">
      <h1>🛒 Мой список покупок</h1>
      <p>Общее количество товаров: {{ totalItems }}</p>
    </header>

    <!-- 
      УПРАЖНЕНИЕ 1: Добавьте здесь отображение общей суммы покупок
      Подсказка: создайте computed свойство totalPrice
    -->

    <main class="app-main">
      <!-- Компонент для добавления новых товаров -->
      <AddItemForm @add-item="handleAddItem" />
      
      <!-- Компонент для отображения списка товаров -->
      <ShoppingList 
        :items="shoppingItems"
        @remove-item="handleRemoveItem"
        @update-item="handleUpdateItem"
      />
    </main>

    <!-- 
      УПРАЖНЕНИЕ 2: Создайте компонент Statistics 
      и добавьте его здесь. Он должен показывать:
      - Количество купленных товаров
      - Количество некупленных товаров
      - Процент completion rate
    -->
  </div>
</template>

<script>
// Импортируем дочерние компоненты
import AddItemForm from './components/AddItemForm.vue'
import ShoppingList from './components/ShoppingList.vue'

export default {
  name: 'MainApp',
  
  // Регистрируем дочерние компоненты
  components: {
    AddItemForm,
    ShoppingList
  },
  
  // Данные приложения - массив товаров
  data() {
    return {
      shoppingItems: [
        { id: 1, name: 'Молоко', quantity: 1, price: 80, completed: false },
        { id: 2, name: 'Хлеб', quantity: 2, price: 40, completed: true },
        { id: 3, name: 'Яблоки', quantity: 5, price: 60, completed: false }
      ]
    }
  },
  
  // Вычисляемые свойства
  computed: {
    totalItems() {
      return this.shoppingItems.length
    },
    
    // УПРАЖНЕНИЕ 1: Реализуйте это вычисляемое свойство
    totalPrice() {
      // Верните общую сумму всех товаров
      // Подсказка: используйте reduce
      return 0 // Замените эту строку
    }
  },
  
  // Методы для обработки событий от дочерних компонентов
  methods: {
    // Обработчик добавления нового товара
    handleAddItem(newItem) {
      // Создаем новый товар с уникальным ID
      const item = {
        id: Date.now(), // Простой способ генерации ID
        ...newItem,
        completed: false
      }
      
      // Добавляем товар в массив
      this.shoppingItems.push(item)
      
      console.log('Добавлен новый товар:', item)
    },
    
    // Обработчик удаления товара
    handleRemoveItem(itemId) {
      // Находим индекс товара по ID
      const index = this.shoppingItems.findIndex(item => item.id === itemId)
      
      if (index !== -1) {
        // Удаляем товар из массива
        const removedItem = this.shoppingItems.splice(index, 1)[0]
        console.log('Удален товар:', removedItem)
      }
    },
    
    // Обработчик обновления товара
    handleUpdateItem(updatedItem) {
      // Находим индекс товара по ID
      const index = this.shoppingItems.findIndex(item => item.id === updatedItem.id)
      
      if (index !== -1) {
        // Обновляем товар в массиве
        this.shoppingItems.splice(index, 1, updatedItem)
        console.log('Обновлен товар:', updatedItem)
      }
    }
  },
  
  // Хук жизненного цикла
  mounted() {
    console.log('Приложение загружено! Товаров в списке:', this.totalItems)
  }
}
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.app-main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
```

---

## Шаг 2: Компонент добавления товара

### AddItemForm.vue
```vue
<!-- components/AddItemForm.vue -->
<!-- Компонент формы для добавления новых товаров -->
<template>
  <div class="add-item-form">
    <h2>➕ Добавить новый товар</h2>
    
    <form @submit.prevent="handleSubmit" class="item-form">
      <div class="form-group">
        <label for="itemName">Название товара:</label>
        <input
          id="itemName"
          type="text"
          v-model="newItem.name"
          placeholder="Например: Бананы"
          required
          class="form-input"
        >
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="itemQuantity">Количество:</label>
          <input
            id="itemQuantity"
            type="number"
            v-model.number="newItem.quantity"
            min="1"
            placeholder="1"
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label for="itemPrice">Цена (₽):</label>
          <input
            id="itemPrice"
            type="number"
            v-model.number="newItem.price"
            min="0"
            placeholder="100"
            class="form-input"
          >
        </div>
      </div>

      <!-- 
        УПРАЖНЕНИЕ 3: Добавьте поле для выбора категории товара
        Создайте select с options: "Продукты", "Напитки", "Хозтовары", "Другое"
      -->

      <button type="submit" class="submit-btn">
        Добавить в список
      </button>
    </form>

    <!-- Предпросмотр добавляемого товара -->
    <div v-if="newItem.name" class="item-preview">
      <h3>Предпросмотр:</h3>
      <p><strong>Название:</strong> {{ newItem.name }}</p>
      <p><strong>Количество:</strong> {{ newItem.quantity }}</p>
      <p><strong>Цена:</strong> {{ newItem.price }} ₽</p>
      <p><strong>Итого:</strong> {{ itemTotal }} ₽</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddItemForm',
  
  // Локальное состояние формы
  data() {
    return {
      newItem: {
        name: '',
        quantity: 1,
        price: 0
        // УПРАЖНЕНИЕ 3: Добавьте свойство category с default значением
      }
    }
  },
  
  // Вычисляемые свойства
  computed: {
    itemTotal() {
      return this.newItem.quantity * this.newItem.price
    }
  },
  
  methods: {
    // Обработчик отправки формы
    handleSubmit() {
      // Проверяем, что все обязательные поля заполнены
      if (!this.newItem.name.trim()) {
        alert('Пожалуйста, введите название товара')
        return
      }

      // Отправляем событие родителю с данными нового товара
      this.$emit('add-item', { ...this.newItem })
      
      // Сбрасываем форму после добавления
      this.resetForm()
      
      // Фокус на поле ввода названия
      this.$nextTick(() => {
        document.getElementById('itemName').focus()
      })
    },
    
    // Сброс формы к初始льным значениям
    resetForm() {
      this.newItem = {
        name: '',
        quantity: 1,
        price: 0
        // УПРАЖНЕНИЕ 3: Не забудьте добавить category здесь
      }
    }
  },
  
  // Хук жизненного цикла
  mounted() {
    console.log('Компонент AddItemForm загружен')
  }
}
</script>

<style scoped>
.add-item-form {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  border-left: 4px solid #667eea;
}

.item-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-input {
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.submit-btn {
  background: #667eea;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #5a6fd8;
}

.item-preview {
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 5px;
  border: 1px solid #dee2e6;
}
</style>
```

---

## Шаг 3: Компонент списка покупок

### ShoppingList.vue
```vue
<!-- components/ShoppingList.vue -->
<!-- Компонент для отображения списка товаров -->
<template>
  <div class="shopping-list">
    <h2>📋 Список покупок ({{ filteredItems.length }})</h2>
    
    <!-- Фильтры для списка -->
    <div class="filters">
      <button 
        @click="currentFilter = 'all'"
        :class="{ active: currentFilter === 'all' }"
        class="filter-btn"
      >
        Все ({{ items.length }})
      </button>
      <button 
        @click="currentFilter = 'active'"
        :class="{ active: currentFilter === 'active' }"
        class="filter-btn"
      >
        Активные ({{ activeItemsCount }})
      </button>
      <button 
        @click="currentFilter = 'completed'"
        :class="{ active: currentFilter === 'completed' }"
        class="filter-btn"
      >
        Купленные ({{ completedItemsCount }})
      </button>
    </div>

    <!-- Сообщение если список пуст -->
    <div v-if="filteredItems.length === 0" class="empty-state">
      <p>🎉 Список покупок пуст!</p>
      <p>Добавьте товары с помощью формы выше.</p>
    </div>

    <!-- Список товаров -->
    <div v-else class="items-container">
      <!-- 
        УПРАЖНЕНИЕ 4: Добавьте сортировку товаров
        Создайте кнопки для сортировки по имени, цене, количеству
      -->
      
      <!-- Отображаем каждый товар через компонент ShoppingItem -->
      <ShoppingItem
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        @remove="handleRemoveItem"
        @update="handleUpdateItem"
      />
    </div>

    <!-- 
      УПРАЖНЕНИЕ 5: Добавьте кнопку "Отметить все как купленные"
      и "Удалить все купленные"
    -->
  </div>
</template>

<script>
import ShoppingItem from './ShoppingItem.vue'

export default {
  name: 'ShoppingList',
  
  components: {
    ShoppingItem
  },
  
  // Получаем массив товаров от родителя
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  
  data() {
    return {
      currentFilter: 'all' // all, active, completed
      // УПРАЖНЕНИЕ 4: Добавьте свойство для хранения текущей сортировки
    }
  },
  
  computed: {
    // Фильтрация товаров по выбранному фильтру
    filteredItems() {
      switch (this.currentFilter) {
        case 'active':
          return this.items.filter(item => !item.completed)
        case 'completed':
          return this.items.filter(item => item.completed)
        default:
          return this.items
      }
    },
    
    // Количество активных товаров
    activeItemsCount() {
      return this.items.filter(item => !item.completed).length
    },
    
    // Количество купленных товаров
    completedItemsCount() {
      return this.items.filter(item => item.completed).length
    },
    
    // УПРАЖНЕНИЕ 4: Добавьте computed свойство для сортировки товаров
    sortedItems() {
      // Верните отсортированный filteredItems
      return this.filteredItems
    }
  },
  
  methods: {
    // Обработчик удаления товара - передаем событие родителю
    handleRemoveItem(itemId) {
      this.$emit('remove-item', itemId)
    },
    
    // Обработчик обновления товара - передаем событие родителю
    handleUpdateItem(updatedItem) {
      this.$emit('update-item', updatedItem)
    }
    
    // УПРАЖНЕНИЕ 5: Добавьте методы для отметки всех и удаления купленных
  }
}
</script>

<style scoped>
.shopping-list {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  border-color: #667eea;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.empty-state p {
  margin: 0.5rem 0;
}

.items-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
```

---

## Шаг 4: Компонент элемента списка

### ShoppingItem.vue
```vue
<!-- components/ShoppingItem.vue -->
<!-- Компонент для отображения одного товара в списке -->
<template>
  <div 
    class="shopping-item" 
    :class="{ completed: item.completed }"
    @dblclick="toggleEdit"
  >
    <!-- Режим просмотра -->
    <div v-if="!isEditing" class="item-view">
      <!-- Чекбокс для отметки выполнения -->
      <input
        type="checkbox"
        :checked="item.completed"
        @change="toggleCompleted"
        class="item-checkbox"
      >

      <!-- Информация о товаре -->
      <div class="item-info">
        <span class="item-name">{{ item.name }}</span>
        <div class="item-details">
          <span class="item-quantity">×{{ item.quantity }}</span>
          <span class="item-price">{{ item.price }} ₽/шт</span>
          <span class="item-total">= {{ itemTotal }} ₽</span>
        </div>
        
        <!-- 
          УПРАЖНЕНИЕ 6: Отображайте категорию товара, если она есть
          Используйте разные цвета для разных категорий
        -->
      </div>

      <!-- Кнопки действий -->
      <div class="item-actions">
        <button @click="toggleEdit" class="action-btn edit-btn" title="Редактировать">
          ✏️
        </button>
        <button @click="removeItem" class="action-btn delete-btn" title="Удалить">
          🗑️
        </button>
      </div>
    </div>

    <!-- Режим редактирования -->
    <div v-else class="item-edit">
      <input
        type="text"
        v-model="editedItem.name"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        class="edit-input"
        ref="nameInput"
      >
      
      <div class="edit-controls">
        <input
          type="number"
          v-model.number="editedItem.quantity"
          min="1"
          class="edit-number"
        >
        <input
          type="number"
          v-model.number="editedItem.price"
          min="0"
          class="edit-number"
        >
        
        <button @click="saveEdit" class="save-btn">✅</button>
        <button @click="cancelEdit" class="cancel-btn">❌</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingItem',
  
  // Получаем объект товара от родителя
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  
  data() {
    return {
      isEditing: false,
      editedItem: { ...this.item } // Копия товара для редактирования
    }
  },
  
  computed: {
    // Общая стоимость товара (цена × количество)
    itemTotal() {
      return this.item.quantity * this.item.price
    }
  },
  
  methods: {
    // Переключение статуса выполнения
    toggleCompleted() {
      const updatedItem = {
        ...this.item,
        completed: !this.item.completed
      }
      this.$emit('update', updatedItem)
    },
    
    // Удаление товара
    removeItem() {
      if (confirm(`Удалить "${this.item.name}" из списка?`)) {
        this.$emit('remove', this.item.id)
      }
    },
    
    // Включение режима редактирования
    toggleEdit() {
      this.isEditing = !this.isEditing
      if (this.isEditing) {
        // Сохраняем копию товара для редактирования
        this.editedItem = { ...this.item }
        
        // Фокус на поле ввода после обновления DOM
        this.$nextTick(() => {
          this.$refs.nameInput.focus()
        })
      }
    },
    
    // Сохранение изменений
    saveEdit() {
      if (this.editedItem.name.trim()) {
        this.$emit('update', this.editedItem)
        this.isEditing = false
      } else {
        alert('Название товара не может быть пустым')
      }
    },
    
    // Отмена редактирования
    cancelEdit() {
      this.isEditing = false
      this.editedItem = { ...this.item } // Сбрасываем изменения
    }
  },
  
  // Наблюдатель за изменением пропса item
  watch: {
    item: {
      handler(newItem) {
        // Обновляем editedItem при изменении исходного товара
        this.editedItem = { ...newItem }
      },
      deep: true // Глубокое наблюдение за объектом
    }
  }
}
</script>

<style scoped>
.shopping-item {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s;
}

.shopping-item:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.shopping-item.completed {
  opacity: 0.7;
  background: #f8f9fa;
}

.shopping-item.completed .item-name {
  text-decoration: line-through;
  color: #6c757d;
}

.item-view {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: bold;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 0.25rem;
}

.item-details {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #6c757d;
}

.item-total {
  font-weight: bold;
  color: #28a745;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #f8f9fa;
}

.delete-btn:hover {
  background: #f8d7da;
}

/* Стили для режима редактирования */
.item-edit {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-input {
  padding: 0.5rem;
  border: 2px solid #667eea;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
}

.edit-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.edit-number {
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  width: 80px;
}

.save-btn, .cancel-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.save-btn:hover {
  background: #d4edda;
}

.cancel-btn:hover {
  background: #f8d7da;
}
</style>
```

---

## Упражнения для самостоятельного выполнения:

### Упражнение 1: Общая сумма покупок
**Задача:** В `MainApp.vue` реализуйте вычисляемое свойство `totalPrice`, которое возвращает общую сумму всех товаров.

**Подсказка:**
```javascript
totalPrice() {
  return this.shoppingItems.reduce((total, item) => {
    return total + (item.quantity * item.price)
  }, 0)
}
```

### Упражнение 2: Компонент статистики
**Задача:** Создайте компонент `Statistics.vue` и добавьте его в `MainApp.vue`. Компонент должен показывать:
- Количество купленных товаров
- Количество некупленных товаров  
- Процент completion rate

### Упражнение 3: Категории товаров
**Задача:** В `AddItemForm.vue` добавьте поле выбора категории с options: "Продукты", "Напитки", "Хозтовары", "Другое".

### Упражнение 4: Сортировка списка
**Задача:** В `ShoppingList.vue` добавьте кнопки для сортировки товаров по имени, цене и количеству.

### Упражнение 5: Групповые операции
**Задача:** Добавьте кнопки "Отметить все как купленные" и "Удалить все купленные".

### Упражнение 6: Отображение категорий
**Задача:** В `ShoppingItem.vue` отображайте категорию товара с разными цветами для разных категорий.

---

## Проверка работы:

1. Запустите приложение
2. Добавьте несколько товаров через форму
3. Проверьте, что товары появляются в списке
4. Отметьте некоторые товары как купленные
5. Используйте фильтры для просмотра разных состояний
6. Редактируйте товары двойным кликом
7. Удаляйте товары

Эта практическая работа охватывает все основные аспекты работы с компонентами Vue и передачей данных между ними.