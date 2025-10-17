# Подробное объяснение роутинга во Vue с Vue Router

## 1. Установка и базовая настройка

### Установка Vue Router

```bash
npm install vue-router@4
```

### Базовая настройка маршрутизатора

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Импорт компонентов для маршрутов
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import UserProfile from '@/views/UserProfile.vue'

// Определение маршрутов
const routes = [
  {
    path: '/',           // URL путь
    name: 'home',        // Имя маршрута для навигации
    component: HomePage  // Компонент для отображения
  },
  {
    path: '/about',
    name: 'about', 
    component: AboutPage
  },
  {
    path: '/user/:id',   // Динамический сегмент (параметр)
    name: 'user-profile',
    component: UserProfile,
    props: true          // Передавать параметры маршрута как props
  }
]

// Создание экземпляра роутера
const router = createRouter({
  history: createWebHistory(), // Режим истории (чистые URL без #)
  routes                      // Передаем массив маршрутов
})

export default router
```

### Подключение к приложению

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Импорт роутера

const app = createApp(App)

app.use(router) // Подключаем роутер к приложению
app.mount('#app')
```

## 2. Компоненты роутинга

### RouterView и RouterLink

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <!-- Навигационная панель -->
    <nav class="navbar">
      <!-- 
        RouterLink - компонент для навигации
        to - целевой маршрут (может быть строкой или объектом)
      -->
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link :to="{ name: 'about' }" class="nav-link">О нас</router-link>
      <router-link :to="{ path: '/user/123' }" class="nav-link">Профиль</router-link>
      
      <!-- Навигация с параметрами -->
      <router-link 
        :to="{
          name: 'user-profile',
          params: { id: 456 }
        }" 
        class="nav-link"
      >
        Пользователь 456
      </router-link>
    </nav>

    <!-- 
      RouterView - место, где отображаются компоненты маршрутов
      Это "viewport" для отображения текущего маршрута
    -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
.navbar {
  background-color: #2c3e50;
  padding: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
}

/* Стиль для активной ссылки */
.router-link-active {
  background-color: #42b883;
  border-radius: 4px;
}

/* Стиль для точного совпадения */
.router-link-exact-active {
  font-weight: bold;
}
</style>
```

## 3. Динамические маршруты и параметры

### Компонент с параметрами маршрута

```vue
<!-- views/UserProfile.vue -->
<template>
  <div class="user-profile">
    <h2>Профиль пользователя</h2>
    
    <!-- 
      Получение параметра маршрута через $route 
      this.$route.params.id - доступ к динамическому параметру
    -->
    <div v-if="$route.params.id">
      <p>ID пользователя: {{ $route.params.id }}</p>
    </div>

    <!-- 
      Альтернатива: получение параметра через props 
      (требует props: true в конфигурации маршрута)
    -->
    <div v-if="id">
      <p>ID пользователя (через props): {{ id }}</p>
    </div>

    <!-- 
      Получение query-параметров 
      /user/123?section=info&tab=personal
    -->
    <div v-if="$route.query.section">
      <p>Раздел: {{ $route.query.section }}</p>
      <p>Вкладка: {{ $route.query.tab || 'default' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  
  // Получение параметров маршрута как props
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  
  // Composition API альтернатива
  setup() {
    import { useRoute } from 'vue-router'
    
    const route = useRoute()
    
    // Реактивные параметры маршрута
    const userId = route.params.id
    const queryParams = route.query
    
    return {
      userId,
      queryParams
    }
  },
  
  // Options API - наблюдение за изменениями маршрута
  watch: {
    '$route'(to, from) {
      // Реакция на изменение маршрута
      console.log('Маршрут изменился:', from.path, '→', to.path)
      this.loadUserData(to.params.id)
    }
  },
  
  methods: {
    loadUserData(userId) {
      // Загрузка данных пользователя по ID
      console.log('Загрузка данных для пользователя:', userId)
    }
  },
  
  mounted() {
    // Загрузка данных при монтировании
    this.loadUserData(this.id || this.$route.params.id)
  }
}
</script>
```

## 4. Вложенные маршруты (Nested Routes)

### Конфигурация вложенных маршрутов

```javascript
// router/index.js
const routes = [
  {
    path: '/user/:id',
    component: UserLayout,
    children: [
      {
        // /user/:id/profile
        path: 'profile',
        name: 'user-profile',
        component: UserProfile
      },
      {
        // /user/:id/settings
        path: 'settings',
        name: 'user-settings', 
        component: UserSettings,
        children: [
          {
            // /user/:id/settings/account
            path: 'account',
            component: AccountSettings
          },
          {
            // /user/:id/settings/privacy  
            path: 'privacy',
            component: PrivacySettings
          }
        ]
      }
    ]
  }
]
```

### Родительский компонент с вложенными маршрутами

```vue
<!-- views/UserLayout.vue -->
<template>
  <div class="user-layout">
    <header class="user-header">
      <h1>Пользователь {{ $route.params.id }}</h1>
      
      <!-- Навигация для вложенных маршрутов -->
      <nav class="user-nav">
        <router-link 
          :to="{ name: 'user-profile' }"
          class="nav-item"
        >
          Профиль
        </router-link>
        
        <router-link 
          :to="`/user/${$route.params.id}/settings`"
          class="nav-item"
        >
          Настройки
        </router-link>
      </nav>
    </header>

    <!-- 
      RouterView для вложенных компонентов 
      Здесь будут отображаться UserProfile, UserSettings и т.д.
    -->
    <section class="user-content">
      <router-view />
    </section>
  </div>
</template>
```

## 5. Навигационные хуки (Navigation Guards)

### Глобальные хуки

```javascript
// router/index.js
const router = createRouter({ ... })

// Глобальный хук перед каждым переходом
router.beforeEach((to, from, next) => {
  console.log('Переход от:', from.path, 'к:', to.path)
  
  // Проверка аутентификации
  const isAuthenticated = checkAuth()
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Перенаправление на страницу входа
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Перенаправление для аутентифицированных пользователей
    next({ name: 'home' })
  } else {
    // Разрешить переход
    next()
  }
})

// Глобальный хук после перехода
router.afterEach((to, from) => {
  // Отправка аналитики
  analytics.trackPageView(to.path)
  
  // Прокрутка к верху страницы
  window.scrollTo(0, 0)
})

// Глобальный хук при ошибках навигации
router.onError((error) => {
  console.error('Ошибка навигации:', error)
})
```

### Хуки в компонентах

```vue
<!-- views/ProtectedPage.vue -->
<script>
export default {
  name: 'ProtectedPage',
  
  // Хук перед входом в маршрут
  beforeRouteEnter(to, from, next) {
    // НЕТ доступа к `this` - компонент еще не создан
    console.log('beforeRouteEnter: вход в защищенную страницу')
    
    // Асинхронная проверка прав
    checkPermissions(to.params.id).then(hasAccess => {
      if (hasAccess) {
        next(vm => {
          // Теперь есть доступ к экземпляру компонента через `vm`
          vm.loadProtectedData()
        })
      } else {
        next({ name: 'access-denied' })
      }
    })
  },
  
  // Хук при изменении параметров маршрута (тот же компонент)
  beforeRouteUpdate(to, from, next) {
    // ЕСТЬ доступ к `this`
    console.log('beforeRouteUpdate: параметры маршрута изменились')
    
    // Реакция на изменение параметров
    this.userId = to.params.id
    this.loadData()
    
    next()
  },
  
  // Хук перед выходом из маршрута
  beforeRouteLeave(to, from, next) {
    // ЕСТЬ доступ к `this`
    if (this.hasUnsavedChanges) {
      const answer = window.confirm(
        'У вас есть несохраненные изменения. Вы уверены, что хотите уйти?'
      )
      if (answer) {
        next()
      } else {
        next(false) // Отмена навигации
      }
    } else {
      next()
    }
  },
  
  data() {
    return {
      hasUnsavedChanges: false,
      userId: null
    }
  },
  
  methods: {
    loadProtectedData() {
      // Загрузка защищенных данных
    },
    
    loadData() {
      // Загрузка данных при изменении параметров
    }
  }
}
</script>
```

## 6. Мета-поля и сложная навигация

### Конфигурация с meta-полями

```javascript
// router/index.js
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      requiresAuth: false,    // Не требует аутентификации
      title: 'Главная страница',
      breadcrumb: 'Главная'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard', 
    component: Dashboard,
    meta: {
      requiresAuth: true,     // Требует аутентификации
      requiresRole: 'admin',  // Требует определенной роли
      title: 'Панель управления',
      breadcrumb: 'Дашборд'
    }
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      requiresRole: 'admin'
    },
    children: [
      {
        path: 'users',
        component: UserManagement,
        meta: {
          title: 'Управление пользователями',
          breadcrumb: 'Пользователи'
        }
      }
    ]
  }
]

// Расширенная обработка meta-полей
router.beforeEach((to, from, next) => {
  // Установка заголовка страницы
  if (to.meta.title) {
    document.title = `${to.meta.title} - Мое Приложение`
  }
  
  // Проверка ролей
  const userRole = getUserRole()
  if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
    next({ name: 'access-denied' })
    return
  }
  
  next()
})
```

## 7. Программная навигация

### Методы навигации в компонентах

```vue
<!-- views/NavigationExample.vue -->
<template>
  <div class="navigation-example">
    <h2>Программная навигация</h2>
    
    <button @click="goToHome">На главную</button>
    <button @click="goBack">Назад</button>
    <button @click="goForward">Вперед</button>
    <button @click="replaceRoute">Заменить текущий маршрут</button>
    
    <input v-model="userId" placeholder="ID пользователя">
    <button @click="goToUser">Перейти к пользователю</button>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'NavigationExample',
  
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userId = ref('')
    
    const goToHome = () => {
      // Переход по имени маршрута
      router.push({ name: 'home' })
    }
    
    const goBack = () => {
      // Назад по истории
      router.go(-1)
    }
    
    const goForward = () => {
      // Вперед по истории  
      router.go(1)
    }
    
    const replaceRoute = () => {
      // Замена текущего маршрута (без добавления в историю)
      router.replace({ name: 'about' })
    }
    
    const goToUser = () => {
      // Переход с параметрами
      if (userId.value) {
        router.push({
          name: 'user-profile',
          params: { id: userId.value }
        })
      }
    }
    
    return {
      userId,
      goToHome,
      goBack, 
      goForward,
      replaceRoute,
      goToUser
    }
  },
  
  // Options API альтернатива
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    
    goBack() {
      this.$router.back()
    },
    
    goToUser() {
      if (this.userId) {
        this.$router.push({
          path: `/user/${this.userId}`
        })
      }
    }
  },
  
  data() {
    return {
      userId: ''
    }
  }
}
</script>
```

## 8. Ленивая загрузка (Code Splitting)

### Динамический импорт для оптимизации

```javascript
// router/index.js
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/about',
    name: 'about',
    // Ленивая загрузка с webpackChunkName
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutPage.vue')
  },
  {
    path: '/user/:id',
    name: 'user-profile',
    component: () => import('@/views/UserProfile.vue'),
    // Ленивая загрузка с условием
    beforeEnter: (to, from, next) => {
      // Предзагрузка данных перед входом в маршрут
      preloadUserData(to.params.id).then(() => {
        next()
      })
    }
  }
]
```

## 9. Обработка ошибок и 404 страница

### Маршрут для ненайденных страниц

```javascript
// router/index.js
const routes = [
  // ... другие маршруты
  
  // Маршрут для 404 - должен быть последним
  {
    path: '/:pathMatch(.*)*', // Регулярное выражение для любого пути
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: 'Страница не найдена'
    }
  }
]
```

### Компонент 404 страницы

```vue
<!-- views/NotFound.vue -->
<template>
  <div class="not-found">
    <h1>404 - Страница не найдена</h1>
    <p>Запрошенный путь "{{ $route.path }}" не существует</p>
    <button @click="goHome">Вернуться на главную</button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>
```

## 10. Продвинутые техники

### Композиция с использованием useRouter и useRoute

```vue
<script>
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref, watch } from 'vue'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const searchQuery = ref(route.query.q || '')
    
    // Реакция на изменения query-параметров
    watch(() => route.query.q, (newQuery) => {
      searchQuery.value = newQuery || ''
    })
    
    // Хук перед обновлением маршрута
    onBeforeRouteUpdate((to, from, next) => {
      console.log('Маршрут обновлен')
      next()
    })
    
    // Хук перед уходом с маршрута
    onBeforeRouteLeave((to, from, next) => {
      if (hasUnsavedChanges.value) {
        if (confirm('Есть несохраненные изменения. Уйти?')) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    })
    
    const performSearch = () => {
      // Обновление query-параметров без перезагрузки компонента
      router.push({
        query: { 
          ...route.query,
          q: searchQuery.value 
        }
      })
    }
    
    return {
      searchQuery,
      performSearch
    }
  }
}
</script>
```

## Ключевые концепции роутинга во Vue:

1. **Маршруты** - связывают URL с компонентами
2. **RouterView** - отображает текущий компонент маршрута  
3. **RouterLink** - навигационные ссылки
4. **Динамические сегменты** - параметры в URL (`/user/:id`)
5. **Вложенные маршруты** - иерархическая структура URL
6. **Навигационные хуки** - контроль над переходами
7. **Программная навигация** - управление через JavaScript
8. **Мета-поля** - дополнительная информация о маршрутах
9. **Ленивая загрузка** - оптимизация загрузки кода
10. **Режимы истории** - HTML5 History vs Hash

Это полное руководство охватывает все основные аспекты роутинга во Vue приложениях