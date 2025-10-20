# 🚀 Практическое руководство: Создание асинхронного генератора

## 📚 Теоретическая часть

### Что такое асинхронный генератор?
Асинхронный генератор - это функция, которая объединяет возможности:
- **Генераторов** (`function*`) - могут yield'ить значения по одному
- **Асинхронных функций** (`async`) - могут await'ить промисы

```javascript
async function* asyncGenerator() {
    yield await fetchData1();
    yield await fetchData2();
    yield await fetchData3();
}
```

## 🎯 Уровень 1: Основы асинхронных генераторов

### Задание 1.1: Простой асинхронный генератор

```javascript
// Создайте простой асинхронный генератор, который yield'ит числа с задержкой
async function* createNumberGenerator(limit, delay = 1000) {
    // Ваш код здесь
}

// Тест
const main = async () => {
    const generator = createNumberGenerator(5, 500);
    for await (const number of generator) {
        console.log(number);
    }
};
main();
```

<details>
<summary>📝 Решение задания 1.1</summary>

```javascript
async function* createNumberGenerator(limit, delay = 1000) {
    for (let i = 1; i <= limit; i++) {
        // Имитируем асинхронную операцию
        await new Promise(resolve => setTimeout(resolve, delay));
        yield i;
    }
}

// Альтернативная версия с более реалистичной асинхронностью
async function* createNumberGeneratorAdvanced(limit, delay = 1000) {
    let current = 1;
    
    while (current <= limit) {
        // Создаем промис с задержкой
        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve(current);
            }, delay);
        });
        
        // Ждем выполнения промиса и yield'им результат
        const result = await promise;
        yield result;
        current++;
    }
}

// Тестируем
const testGenerator = async () => {
    console.log("🔄 Запуск простого генератора:");
    const generator = createNumberGenerator(3, 1000);
    
    for await (const number of generator) {
        console.log(`Получено число: ${number}`);
    }
    
    console.log("✅ Генератор завершен!");
};

// testGenerator();
```
</details>

### Задание 1.2: Генератор с обработкой ошибок

```javascript
// Создайте генератор, который обрабатывает ошибки корректно
async function* createRobustGenerator(dataArray, delay = 500) {
    // Ваш код здесь
}

// Тест с ошибками
const testWithErrors = async () => {
    const data = ['item1', null, 'item3', 'error', 'item5'];
    const generator = createRobustGenerator(data, 300);
    
    for await (const item of generator) {
        console.log(item);
    }
};
```

<details>
<summary>📝 Решение задания 1.2</summary>

```javascript
async function* createRobustGenerator(dataArray, delay = 500) {
    for (const item of dataArray) {
        await new Promise(resolve => setTimeout(resolve, delay));
        
        try {
            // Имитируем возможные ошибки
            if (item === null || item === undefined) {
                throw new Error(`Получено недопустимое значение: ${item}`);
            }
            
            if (item === 'error') {
                throw new Error('Искусственная ошибка обработки');
            }
            
            yield { success: true, data: `Обработано: ${item}` };
            
        } catch (error) {
            yield { success: false, error: error.message };
        }
    }
}

// Улучшенная версия с логгированием
async function* createRobustGeneratorWithLogging(dataArray, delay = 500) {
    let index = 0;
    
    for (const item of dataArray) {
        console.log(`🔹 Обрабатываем элемент ${index + 1}/${dataArray.length}`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        try {
            // Валидация данных
            if (item == null) {
                throw new Error('Элемент не может быть null или undefined');
            }
            
            if (typeof item === 'string' && item.toLowerCase() === 'error') {
                throw new Error('Сгенерирована тестовая ошибка');
            }
            
            // Имитация успешной обработки
            const processed = `🎯 ${item.toUpperCase()}_PROCESSED`;
            yield { 
                success: true, 
                data: processed,
                index: index,
                timestamp: new Date().toISOString()
            };
            
        } catch (error) {
            console.warn(`⚠️ Ошибка при обработке элемента ${index}:`, error.message);
            yield { 
                success: false, 
                error: error.message,
                index: index,
                timestamp: new Date().toISOString()
            };
        }
        
        index++;
    }
}

// Тестируем
const testErrorHandling = async () => {
    console.log("🧪 Тестируем обработку ошибок:");
    
    const testData = ['apple', null, 'banana', 'error', 'cherry'];
    const generator = createRobustGeneratorWithLogging(testData, 800);
    
    let successCount = 0;
    let errorCount = 0;
    
    for await (const result of generator) {
        if (result.success) {
            successCount++;
            console.log(`✅ Успех: ${result.data}`);
        } else {
            errorCount++;
            console.log(`❌ Ошибка: ${result.error}`);
        }
    }
    
    console.log(`\n📊 Итоги: Успехов: ${successCount}, Ошибок: ${errorCount}`);
};

// testErrorHandling();
```
</details>

## 🎯 Уровень 2: Практические применения

### Задание 2.1: Генератор для пагинации API

```javascript
// Создайте генератор для постраничной загрузки данных из API
async function* createPaginatedAPIGenerator(baseURL, pageSize = 10) {
    // Ваш код здесь
}

// Тест с mock API
const mockAPI = {
    fetchPage: async (page, size) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const totalItems = 25;
        const start = (page - 1) * size;
        const end = Math.min(start + size, totalItems);
        
        return {
            data: Array.from({length: end - start}, (_, i) => `Item ${start + i + 1}`),
            hasMore: end < totalItems,
            total: totalItems
        };
    }
};
```

<details>
<summary>📝 Решение задания 2.1</summary>

```javascript
async function* createPaginatedAPIGenerator(baseURL, pageSize = 10) {
    let currentPage = 1;
    let hasMore = true;
    let totalProcessed = 0;
    
    console.log(`🚀 Запуск пагинации: ${baseURL}, размер страницы: ${pageSize}`);
    
    while (hasMore) {
        console.log(`📄 Загружаем страницу ${currentPage}...`);
        
        try {
            // Имитируем API запрос
            const response = await mockAPI.fetchPage(currentPage, pageSize);
            
            if (!response.data || response.data.length === 0) {
                console.log('ℹ️ Получена пустая страница, завершаем.');
                break;
            }
            
            // Yield'им каждый элемент текущей страницы
            for (const item of response.data) {
                totalProcessed++;
                yield {
                    item: item,
                    page: currentPage,
                    totalProcessed: totalProcessed,
                    isLastPage: !response.hasMore
                };
            }
            
            // Проверяем, есть ли еще данные
            hasMore = response.hasMore;
            currentPage++;
            
            if (!hasMore) {
                console.log(`✅ Все данные загружены. Всего элементов: ${totalProcessed}`);
            }
            
        } catch (error) {
            console.error(`❌ Ошибка при загрузке страницы ${currentPage}:`, error.message);
            yield {
                error: `Ошибка страницы ${currentPage}: ${error.message}`,
                page: currentPage
            };
            break;
        }
    }
}

// Улучшенная версия с конфигурацией
async function* createAdvancedPaginatedGenerator({
    baseURL,
    pageSize = 10,
    maxPages = 100,
    delayBetweenPages = 200
}) {
    let currentPage = 1;
    let hasMore = true;
    let totalYielded = 0;
    
    while (hasMore && currentPage <= maxPages) {
        console.log(`📥 Страница ${currentPage}...`);
        
        await new Promise(resolve => setTimeout(resolve, delayBetweenPages));
        
        try {
            const response = await mockAPI.fetchPage(currentPage, pageSize);
            
            if (!response.data || response.data.length === 0) {
                console.log('🏁 Нет данных на странице, завершаем.');
                break;
            }
            
            // Yield'им элементы страницы
            for (const item of response.data) {
                totalYielded++;
                yield {
                    data: item,
                    metadata: {
                        page: currentPage,
                        itemIndex: totalYielded,
                        totalPages: Math.ceil(response.total / pageSize),
                        isLastItem: totalYielded === response.total
                    }
                };
            }
            
            hasMore = response.hasMore;
            currentPage++;
            
        } catch (error) {
            console.error(`💥 Критическая ошибка: ${error.message}`);
            yield { 
                error: true, 
                message: `Страница ${currentPage}: ${error.message}`,
                fatal: true 
            };
            break;
        }
    }
    
    console.log(`🎉 Пагинация завершена. Обработано страниц: ${currentPage - 1}, элементов: ${totalYielded}`);
}

// Тестируем
const testPagination = async () => {
    console.log("🧪 Тестируем пагинацию API:");
    
    const generator = createPaginatedAPIGenerator('https://api.example.com/data', 5);
    
    for await (const result of generator) {
        if (result.error) {
            console.log(`⚠️ ${result.error}`);
        } else {
            console.log(`📦 ${result.item} (стр. ${result.page}, всего: ${result.totalProcessed})`);
        }
    }
};

// testPagination();
```
</details>

### Задание 2.2: Генератор для стриминга файлов

```javascript
// Создайте генератор для чтения большого файла по частям
async function* createFileStreamGenerator(filePath, chunkSize = 1024) {
    // Ваш код здесь
}

// Mock файловой системы для тестирования
const mockFileSystem = {
    readFileChunk: async (path, offset, size) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const content = "Lorem ipsum dolor sit amet ".repeat(100);
        return content.slice(offset, offset + size);
    },
    
    getFileSize: async (path) => {
        return 2560; // 2.5KB для теста
    }
};
```

<details>
<summary>📝 Решение задания 2.2</summary>

```javascript
async function* createFileStreamGenerator(filePath, chunkSize = 1024) {
    console.log(`📁 Открываем файл: ${filePath}`);
    console.log(`📊 Размер чанка: ${chunkSize} байт`);
    
    try {
        // Получаем размер файла
        const fileSize = await mockFileSystem.getFileSize(filePath);
        console.log(`📏 Размер файла: ${fileSize} байт`);
        
        let offset = 0;
        let chunkNumber = 1;
        const totalChunks = Math.ceil(fileSize / chunkSize);
        
        while (offset < fileSize) {
            const currentChunkSize = Math.min(chunkSize, fileSize - offset);
            
            console.log(`📖 Читаем чанк ${chunkNumber}/${totalChunks} (смещение: ${offset}, размер: ${currentChunkSize})`);
            
            // Читаем чанк файла
            const chunk = await mockFileSystem.readFileChunk(filePath, offset, currentChunkSize);
            
            yield {
                chunk: chunk,
                chunkNumber: chunkNumber,
                offset: offset,
                size: currentChunkSize,
                progress: ((offset + currentChunkSize) / fileSize * 100).toFixed(1),
                isLast: offset + currentChunkSize >= fileSize
            };
            
            offset += currentChunkSize;
            chunkNumber++;
            
            // Небольшая задержка для имитации реального чтения
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        console.log(`✅ Файл полностью прочитан. Всего чанков: ${chunkNumber - 1}`);
        
    } catch (error) {
        console.error(`❌ Ошибка чтения файла: ${error.message}`);
        yield { 
            error: true, 
            message: `Ошибка файла: ${error.message}` 
        };
    }
}

// Генератор с обработкой разных типов данных
async function* createUniversalStreamGenerator(source, options = {}) {
    const {
        chunkSize = 1024,
        encoding = 'utf-8',
        onProgress = null
    } = options;
    
    console.log(`🎯 Создаем стрим для: ${source.type || 'unknown'}`);
    
    let processedBytes = 0;
    let chunkIndex = 1;
    
    // Имитируем разные источники данных
    if (source.type === 'file') {
        const fileSize = await mockFileSystem.getFileSize(source.path);
        
        while (processedBytes < fileSize) {
            const chunk = await mockFileSystem.readFileChunk(
                source.path, 
                processedBytes, 
                chunkSize
            );
            
            const result = {
                type: 'chunk',
                data: chunk,
                metadata: {
                    index: chunkIndex,
                    offset: processedBytes,
                    size: chunk.length,
                    total: fileSize,
                    progress: (processedBytes / fileSize * 100).toFixed(1)
                }
            };
            
            // Вызываем callback прогресса если предоставлен
            if (onProgress) {
                onProgress(result.metadata);
            }
            
            yield result;
            
            processedBytes += chunk.length;
            chunkIndex++;
            await new Promise(resolve => setTimeout(resolve, 30));
        }
        
    } else if (source.type === 'array') {
        // Стриминг из массива
        const items = source.data;
        const totalItems = items.length;
        
        for (let i = 0; i < items.length; i += chunkSize) {
            const chunk = items.slice(i, i + chunkSize);
            
            yield {
                type: 'array_chunk',
                data: chunk,
                metadata: {
                    chunkIndex: chunkIndex,
                    startIndex: i,
                    endIndex: i + chunk.length,
                    totalItems: totalItems,
                    progress: ((i + chunk.length) / totalItems * 100).toFixed(1)
                }
            };
            
            chunkIndex++;
            await new Promise(resolve => setTimeout(resolve, 20));
        }
    }
    
    yield { type: 'complete', message: 'Stream finished successfully' };
}

// Тестируем
const testFileStream = async () => {
    console.log("🧪 Тестируем стриминг файлов:");
    
    const fileStream = createFileStreamGenerator('/path/to/large/file.txt', 512);
    
    for await (const chunk of fileStream) {
        if (chunk.error) {
            console.log(`💥 ${chunk.message}`);
            break;
        }
        
        console.log(`📦 Чанк ${chunk.chunkNumber}: ${chunk.chunk.length} байт (${chunk.progress}%)`);
        
        // Здесь можно обрабатывать чанк
        // Например, отправлять по сети, парсить и т.д.
    }
};

// testFileStream();
```
</details>

## 🎯 Уровень 3: Продвинутые техники

### Задание 3.1: Генератор с управлением потоком

```javascript
// Создайте генератор, который можно приостанавливать, возобновлять и отменять
function createControllableAsyncGenerator(dataSource, options = {}) {
    // Ваш код здесь
}

// Интерфейс управления:
// generator.pause()
// generator.resume() 
// generator.stop()
// generator.getState()
```

<details>
<summary>📝 Решение задания 3.1</summary>

```javascript
function createControllableAsyncGenerator(dataSource, options = {}) {
    const {
        chunkSize = 1,
        delay = 100,
        onStateChange = null
    } = options;
    
    let currentState = 'ready'; // ready, running, paused, stopped, completed
    let currentIndex = 0;
    let controller = null;
    
    const updateState = (newState) => {
        currentState = newState;
        if (onStateChange) {
            onStateChange(newState, currentIndex);
        }
    };
    
    const asyncGenerator = async function* () {
        updateState('running');
        controller = new AbortController();
        
        try {
            while (currentState !== 'stopped' && currentIndex < dataSource.length) {
                // Проверяем не приостановлен ли генератор
                if (currentState === 'paused') {
                    console.log('⏸️ Генератор приостановлен...');
                    await new Promise(resolve => {
                        const checkInterval = setInterval(() => {
                            if (currentState !== 'paused') {
                                clearInterval(checkInterval);
                                resolve();
                            }
                            
                            if (controller.signal.aborted) {
                                clearInterval(checkInterval);
                                resolve();
                            }
                        }, 100);
                    });
                    
                    if (controller.signal.aborted) {
                        break;
                    }
                }
                
                if (currentState === 'stopped') {
                    break;
                }
                
                // Yield'им данные
                const chunk = dataSource.slice(
                    currentIndex, 
                    currentIndex + chunkSize
                );
                
                for (const item of chunk) {
                    yield {
                        data: item,
                        index: currentIndex,
                        state: currentState,
                        timestamp: new Date().toISOString()
                    };
                    currentIndex++;
                }
                
                // Задержка между итерациями
                await new Promise((resolve, reject) => {
                    const timeout = setTimeout(resolve, delay);
                    
                    controller.signal.addEventListener('abort', () => {
                        clearTimeout(timeout);
                        reject(new Error('Generator stopped'));
                    });
                });
            }
            
            if (currentIndex >= dataSource.length) {
                updateState('completed');
                yield { type: 'complete', message: 'All data processed' };
            } else {
                updateState('stopped');
                yield { type: 'stopped', message: 'Generator stopped by user' };
            }
            
        } catch (error) {
            if (error.message !== 'Generator stopped') {
                console.error('Generator error:', error);
                updateState('error');
                yield { type: 'error', message: error.message };
            }
        }
    };
    
    // Методы управления
    const methods = {
        pause: () => {
            if (currentState === 'running') {
                updateState('paused');
                console.log('⏸️ Генератор приостановлен');
            }
        },
        
        resume: () => {
            if (currentState === 'paused') {
                updateState('running');
                console.log('▶️ Генератор возобновлен');
            }
        },
        
        stop: () => {
            updateState('stopped');
            if (controller) {
                controller.abort();
            }
            console.log('🛑 Генератор остановлен');
        },
        
        getState: () => ({
            state: currentState,
            index: currentIndex,
            total: dataSource.length,
            progress: ((currentIndex / dataSource.length) * 100).toFixed(1)
        }),
        
        restart: () => {
            methods.stop();
            currentIndex = 0;
            updateState('ready');
            console.log('🔄 Генератор перезапущен');
        }
    };
    
    return {
        generator: asyncGenerator(),
        ...methods
    };
}

// Тестируем управляемый генератор
const testControllableGenerator = async () => {
    console.log("🎮 Тестируем управляемый генератор:");
    
    const testData = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
    const { generator, pause, resume, stop, getState } = 
        createControllableAsyncGenerator(testData, {
            chunkSize: 2,
            delay: 500,
            onStateChange: (state, index) => {
                console.log(`🔸 Состояние: ${state}, индекс: ${index}`);
            }
        });
    
    // Запускаем потребление генератора
    const consumeGenerator = async () => {
        for await (const item of generator) {
            console.log(`📦 Получено: ${item.data} (${item.state})`);
            
            // Автоматически останавливаемся на 5-м элементе для демонстрации
            if (item.index === 5) {
                console.log('⏸️ Автопауза на элементе 5');
                pause();
                
                // Возобновляем через 3 секунды
                setTimeout(() => {
                    console.log('▶️ Автовозобновление');
                    resume();
                }, 3000);
            }
            
            // Останавливаем на 15-м элементе
            if (item.index === 15) {
                console.log('🛑 Автостоп на элементе 15');
                stop();
                break;
            }
        }
    };
    
    // Запускаем потребление
    consumeGenerator();
    
    // Периодически выводим состояние
    const stateInterval = setInterval(() => {
        const state = getState();
        console.log(`📊 Состояние: ${state.state}, прогресс: ${state.progress}%`);
        
        if (state.state === 'stopped' || state.state === 'completed') {
            clearInterval(stateInterval);
        }
    }, 1000);
};

// testControllableGenerator();
```
</details>

### Задание 3.2: Композиция асинхронных генераторов

```javascript
// Создайте утилиты для работы с несколькими асинхронными генераторами
class AsyncGeneratorUtils {
    // Объединение нескольких генераторов
    static merge(...generators) {}
    
    // Фильтрация асинхронного генератора
    static filter(generator, predicate) {}
    
    // Преобразование асинхронного генератора
    static map(generator, transform) {}
    
    // Ограничение по времени
    static withTimeout(generator, timeout) {}
}
```

<details>
<summary>📝 Решение задания 3.2</summary>

```javascript
class AsyncGeneratorUtils {
    /**
     * Объединяет несколько асинхронных генераторов в один
     */
    static async *merge(...generators) {
        const promises = generators.map(async function* (gen) {
            for await (const value of gen) {
                yield { source: gen, value };
            }
        }());
        
        // Используем Promise.race для получения значений по мере готовности
        const nextPromises = promises.map(async (iterator, index) => ({
            index,
            value: await iterator.next()
        }));
        
        while (nextPromises.length > 0) {
            const { index, value } = await Promise.race(nextPromises);
            
            if (value.done) {
                nextPromises.splice(index, 1);
            } else {
                yield value.value;
                nextPromises[index] = promises[index].next().then(value => ({ index, value }));
            }
        }
    }
    
    /**
     * Простая версия merge для учебных целей
     */
    static async *mergeSimple(...generators) {
        let activeGenerators = generators.map(async function* (gen, index) {
            for await (const value of gen) {
                yield { source: index, value };
            }
        }());
        
        while (activeGenerators.length > 0) {
            for (let i = 0; i < activeGenerators.length; i++) {
                try {
                    const result = await activeGenerators[i].next();
                    if (!result.done) {
                        yield result.value;
                    } else {
                        activeGenerators.splice(i, 1);
                        i--;
                    }
                } catch (error) {
                    console.error(`Ошибка в генераторе ${i}:`, error);
                    activeGenerators.splice(i, 1);
                    i--;
                }
            }
        }
    }
    
    /**
     * Фильтрует значения асинхронного генератора
     */
    static async *filter(generator, predicate) {
        for await (const value of generator) {
            if (await predicate(value)) {
                yield value;
            }
        }
    }
    
    /**
     * Преобразует значения асинхронного генератора
     */
    static async *map(generator, transform) {
        for await (const value of generator) {
            yield await transform(value);
        }
    }
    
    /**
     * Ограничивает выполнение генератора по времени
     */
    static async *withTimeout(generator, timeoutMs) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, timeoutMs);
        
        try {
            for await (const value of generator) {
                if (controller.signal.aborted) {
                    throw new Error('Generator timeout');
                }
                yield value;
            }
        } catch (error) {
            if (error.message === 'Generator timeout') {
                console.log(`⏰ Генератор остановлен по таймауту (${timeoutMs}ms)`);
                yield { error: 'timeout', message: `Timeout after ${timeoutMs}ms` };
            } else {
                throw error;
            }
        } finally {
            clearTimeout(timeoutId);
        }
    }
    
    /**
     * Ограничивает количество элементов генератора
     */
    static async *take(generator, limit) {
        let count = 0;
        for await (const value of generator) {
            if (count >= limit) break;
            yield value;
            count++;
        }
    }
    
    /**
     * Собирает все значения генератора в массив
     */
    static async collect(generator) {
        const results = [];
        for await (const value of generator) {
            results.push(value);
        }
        return results;
    }
    
    /**
     * Создает генератор из массива с асинхронной задержкой
     */
    static async *fromArray(array, delayMs = 0) {
        for (const item of array) {
            if (delayMs > 0) {
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
            yield item;
        }
    }
}

// Демонстрация композиции генераторов
const demonstrateComposition = async () => {
    console.log("🎨 Демонстрация композиции генераторов:");
    
    // Создаем тестовые генераторы
    const numberGenerator = AsyncGeneratorUtils.fromArray(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
        200
    );
    
    const stringGenerator = AsyncGeneratorUtils.fromArray(
        ['a', 'b', 'c', 'd', 'e'], 
        300
    );
    
    // Объединяем генераторы
    const mergedGenerator = AsyncGeneratorUtils.mergeSimple(
        numberGenerator,
        stringGenerator
    );
    
    // Применяем фильтр и преобразование
    const processedGenerator = AsyncGeneratorUtils.map(
        AsyncGeneratorUtils.filter(
            mergedGenerator,
            async (item) => {
                if (typeof item.value === 'number') {
                    return item.value % 2 === 0; // Только четные числа
                }
                return true; // Все строки
            }
        ),
        async (item) => {
            if (typeof item.value === 'number') {
                return `Число: ${item.value * 10}`;
            }
            return `Строка: ${item.value.toUpperCase()}`;
        }
    );
    
    // Берем только первые 8 элементов
    const limitedGenerator = AsyncGeneratorUtils.take(processedGenerator, 8);
    
    console.log("Результаты композиции:");
    for await (const value of limitedGenerator) {
        console.log(`📦 ${value}`);
    }
};

// demonstrateComposition();

// Практический пример: обработка данных из нескольких источников
const practicalExample = async () => {
    console.log("🏭 Практический пример: обработка данных из нескольких API");
    
    // Имитация API генераторов
    const userGenerator = AsyncGeneratorUtils.fromArray(
        ['user1', 'user2', 'user3', 'user4'], 
        400
    );
    
    const orderGenerator = AsyncGeneratorUtils.fromArray(
        ['orderA', 'orderB', 'orderC'], 
        500
    );
    
    const notificationGenerator = AsyncGeneratorUtils.fromArray(
        ['notifX', 'notifY', 'notifZ'], 
        350
    );
    
    // Объединяем все источники данных
    const allDataStream = AsyncGeneratorUtils.mergeSimple(
        AsyncGeneratorUtils.map(userGenerator, async user => ({ type: 'user', data: user })),
        AsyncGeneratorUtils.map(orderGenerator, async order => ({ type: 'order', data: order })),
        AsyncGeneratorUtils.map(notificationGenerator, async notif => ({ type: 'notification', data: notif }))
    );
    
    // Обрабатываем с таймаутом
    const processedStream = AsyncGeneratorUtils.withTimeout(allDataStream, 5000);
    
    try {
        for await (const item of processedStream) {
            console.log(`📊 ${item.type}: ${item.data}`);
        }
    } catch (error) {
        console.log('Поток завершен:', error.message);
    }
};

// practicalExample();
```
</details>

## 🎯 Финальный проект: Асинхронный генератор для ETL процесса

```javascript
// Создайте полный ETL (Extract, Transform, Load) процесс используя асинхронные генераторы
async function* createETLPipeline(config) {
    // Extract: получение данных из источника
    // Transform: преобразование данных
    // Load: сохранение результатов
}

// Конфигурация:
const etlConfig = {
    extract: {
        source: 'api', // или 'file', 'database'
        endpoint: 'https://api.example.com/data',
        batchSize: 50
    },
    transform: {
        validators: [/* функции валидации */],
        transformers: [/* функции преобразования */]
    },
    load: {
        destination: 'database', // или 'file', 'api'
        batchSize: 100
    }
};
```

## 📊 Критерии оценки

| Уровень | Задание | Максимальный балл | Критерии |
|---------|---------|------------------|----------|
| 1 | 1.1 Базовый генератор | 1 балл | Корректный async/await + yield |
| 1 | 1.2 Обработка ошибок | 1 балл | Надежная обработка исключений |
| 2 | 2.1 Пагинация API | 2 балла | Полный цикл пагинации с метаданными |
| 2 | 2.2 Стриминг файлов | 2 балла | Чтение по чанкам с прогрессом |
| 3 | 3.1 Управляемый генератор | 2 балла | Полный контроль (пауза/стоп/ресюм) |
| 3 | 3.2 Композиция | 2 балла | Рабочие утилиты merge/filter/map |
| **Итого** | | **10 баллов** | |

## 🚀 Запуск и тестирование

Создайте файл `main.js` и последовательно тестируйте каждое задание:

```javascript
// main.js
async function main() {
    console.log("🚀 Запуск практической работы по асинхронным генераторам\n");
    
    // Раскомментируйте для тестирования:
    // await testGenerator();
    // await testErrorHandling();
    // await testPagination();
    // await testFileStream();
    // await testControllableGenerator();
    // await demonstrateComposition();
    // await practicalExample();
}

main().catch(console.error);
```

Удачи в создании мощных асинхронных генераторов! 🎉