
---

# **Практическая работа: Управление состоянием и UI в React**

**Время выполнения:** 2-2.5 часа  
**Уровень:** Начинающий  
**Цели:** Освоить useReducer, управление модальными окнами и работу со списками

---

## **РАЗДЕЛ 1: Реализация модального окна**

### **Пример реализации**

```jsx
// components/ModalExample.js
import { useState } from 'react';
import './Modal.css';

// Компонент модального окна
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Пример использования
const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Открыть модальное окно
      </button>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Пример модального окна"
      >
        <p>Это содержимое модального окна!</p>
        <button onClick={() => setIsModalOpen(false)}>Закрыть</button>
      </Modal>
    </div>
  );
};
```

```css
/* Modal.css */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 400px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
```

### **Задание 1: Улучшенное модальное окно** (30 минут)

Создайте компонент `ProductModal.js` для отображения детальной информации о товаре:

**Требования:**
1. Модалка должна открываться по кнопке "Подробнее"
2. В модалке отображать: название, цену, описание, изображение товара
3. Добавить кнопки "Добавить в корзину" и "Закрыть"
4. Реализовать закрытие по клику на оверлей и по ESC
5. Добавить анимацию появления/исчезновения

```jsx
// components/ProductModal.js
const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  // TODO: Реализовать модальное окно для товара
  // TODO: Добавить обработчик клавиши ESC
  // TODO: Реализовать плавное появление через CSS-анимацию
};
```

---

## **РАЗДЕЛ 2: Отображение товаров в каталоге**

### **Пример реализации**

```jsx
// components/ProductCatalogExample.js
import { useState } from 'react';

const productsData = [
  { id: 1, name: 'Ноутбук', price: 50000, category: 'electronics', image: '/laptop.jpg' },
  { id: 2, name: 'Смартфон', price: 30000, category: 'electronics', image: '/phone.jpg' },
  { id: 3, name: 'Книга', price: 500, category: 'books', image: '/book.jpg' },
];

const ProductCard = ({ product, onShowDetails }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Цена: {product.price} руб.</p>
      <button onClick={() => onShowDetails(product)}>
        Подробнее
      </button>
    </div>
  );
};

const ProductCatalogExample = () => {
  const [products] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div>
      <div className="filters">
        <button onClick={() => setSelectedCategory('all')}>Все</button>
        <button onClick={() => setSelectedCategory('electronics')}>Электроника</button>
        <button onClick={() => setSelectedCategory('books')}>Книги</button>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            onShowDetails={(product) => console.log('Show details:', product)}
          />
        ))}
      </div>
    </div>
  );
};
```

### **Задание 2: Интерактивный каталог** (40 минут)

Создайте компонент `ProductCatalog.js` с расширенной функциональностью:

**Требования:**
1. Отображение товаров в сетке
2. Фильтрация по категориям
3. Поиск по названию товара
4. Сортировка по цене (возрастание/убывание)
5. Пагинация или "Load More"

```jsx
// components/ProductCatalog.js
const ProductCatalog = () => {
  const [products] = useState([
    // TODO: Добавить 10-15 товаров разных категорий
  ]);
  
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // TODO: Реализовать функции для фильтрации, поиска и сортировки
  // TODO: Реализовать пагинацию
  // TODO: Связать с модальным окном из Задания 1
};
```

---

## **РАЗДЕЛ 3: useReducer для управления состоянием**

### **Пример реализации**

```jsx
// components/CartExample.js
import { useReducer } from 'react';

// Начальное состояние
const initialState = {
  items: [],
  total: 0,
  isOpen: false
};

// Редуктор (редьюсер)
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Увеличиваем количество
        const updatedItems = state.items.map(item =>
          item.id === newItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total + newItem.price
        };
      } else {
        // Добавляем новый товар
        return {
          ...state,
          items: [...state.items, { ...newItem, quantity: 1 }],
          total: state.total + newItem.price
        };
      }

    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };

    case 'CLEAR_CART':
      return initialState;

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    default:
      return state;
  }
};

const CartExample = () => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  return (
    <div>
      <button onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
        Корзина ({cartState.items.length})
      </button>

      {cartState.isOpen && (
        <div className="cart">
          <h3>Корзина</h3>
          {cartState.items.map(item => (
            <div key={item.id}>
              {item.name} - {item.quantity} × {item.price} руб.
              <button onClick={() => removeItem(item.id)}>Удалить</button>
            </div>
          ))}
          <p>Итого: {cartState.total} руб.</p>
          <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
            Очистить корзину
          </button>
        </div>
      )}
    </div>
  );
};
```

### **Задание 3: Управление состоянием приложения** (50 минут)

Создайте главный компонент приложения `App.js`, который объединяет все части:

**Требования:**
1. Используйте useReducer для управления всем состоянием приложения
2. Реализуйте действия для:
   - Добавления/удаления товаров из корзины
   - Открытия/закрытия модальных окон
   - Управления фильтрами каталога

```jsx
// App.js
const initialState = {
  products: [],
  cart: {
    items: [],
    total: 0,
    isOpen: false
  },
  modals: {
    productModal: {
      isOpen: false,
      product: null
    }
  },
  filters: {
    category: 'all',
    search: '',
    sortBy: 'name'
  }
};

function appReducer(state, action) {
  switch (action.type) {
    // TODO: Реализовать обработчики для:
    // ADD_TO_CART, REMOVE_FROM_CART, OPEN_PRODUCT_MODAL, 
    // CLOSE_PRODUCT_MODAL, SET_FILTER, CLEAR_CART
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // TODO: Создать actions для dispatch
  // TODO: Объединить все компоненты
  // TODO: Передать нужные данные и функции через props/context
};
```

---

## **Финальное задание: Интеграция** (30 минут)

Объедините все компоненты в работающее приложение:

1. **ProductCatalog** показывает товары с фильтрами
2. При клике на "Подробнее" открывается **ProductModal**
3. Из модалки можно добавить товар в корзину
4. **Cart** показывает добавленные товары и общую сумму
5. Все состояние управляется через **useReducer**

### **Пример структуры компонентов:**

```jsx
const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <div className="app">
      <Header 
        cartItemsCount={state.cart.items.length}
        onCartClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />
      
      <ProductCatalog
        products={state.products}
        filters={state.filters}
        onFilterChange={(filter) => dispatch({ type: 'SET_FILTER', payload: filter })}
        onProductClick={(product) => dispatch({ type: 'OPEN_PRODUCT_MODAL', payload: product })}
      />

      <ProductModal
        isOpen={state.modals.productModal.isOpen}
        product={state.modals.productModal.product}
        onClose={() => dispatch({ type: 'CLOSE_PRODUCT_MODAL' })}
        onAddToCart={(product) => dispatch({ type: 'ADD_TO_CART', payload: product })}
      />

      <Cart
        isOpen={state.cart.isOpen}
        items={state.cart.items}
        total={state.cart.total}
        onClose={() => dispatch({ type: 'TOGGLE_CART' })}
        onRemoveItem={(id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })}
        onClearCart={() => dispatch({ type: 'CLEAR_CART' })}
      />
    </div>
  );
};
```

---

## **Критерии оценки**

| **Компонент** | **Баллы** | **Критерии** |
|---------------|-----------|--------------|
| Модальное окно | 25 | Анимации, закрытие по ESC/оверлею, доступность |
| Каталог товаров | 30 | Фильтрация, поиск, сортировка, адаптивность |
| useReducer | 35 | Корректный редьюсер, иммутабельные обновления |
| Интеграция | 10 | Все компоненты работают вместе |
| **Итого** | **100** | |

**Бонусные задачи:**
- +10 баллов: Добавить localStorage для сохранения корзины
- +10 баллов: Реализовать кастомный хук useModal
- +5 баллов: Добавить тесты для редьюсера

Эта практическая работа охватывает ключевые аспекты современной React-разработки и даст solid foundation для реальных проектов! 💪