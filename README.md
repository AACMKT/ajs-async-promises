# Implementation of async code (built on promise --> .then chains) and its testing


### Описание

Предоставлены функции-заглушки, которые эмулируют чтение файла и преобразование прочитанного в json.

Модуль `parser.js`:
```javascript
export default function json(data) {
  return new Promise((resolve, reject) => {
    // эмуляция обработки ArrayBuffer
    setTimeout(() => {
      resolve(String.fromCharCode.apply(null, new Uint16Array(data)));
    }, 500);
  });
}
```

Модуль `reader.js`:
```javascript
export default function read() {
  return new Promise((resolve, reject) => {
    // эмуляция чтения файла
    setTimeout(() => {
      const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
      return (input => {
        const buffer = new ArrayBuffer(input.length * 2);
        const bufferView = new Uint16Array(buffer);
        for (let i = 0; i < input.length; i++) {
          bufferView[i] = input.charCodeAt(i);
        }
        resolve(buffer);
      })(data);
    }, 1000); 
  });
}
```

 Реализован класс `GameSavingLoader` с методом `load`, с использованием синтаксиса `Promise`,  который загружает данные (с помощью функции `read`), парсит их (с помощью функции `json()`) и возвращает строковое представление объект типа `GameSaving`.

```javascript
export default class GameSavingLoader {
  static load() {
    return read().then((data) => json(data)).catch((err) => { throw Error(err.message); });
  }
}
```

Спецификации объекта типа `GameSaving`:
```javascript
{
  "id": <number>, // id сохранения
  "created": <timestamp>, // timestamp создания
  "userInfo": {
    "id": <number>, // user id
    "name": <string>, // user name
    "level": <number>, // user level
    "points": <number> // user points
  }
}
```

Реализован модуль `app.js` с использованием `.then` и `try-catch`, который возвращает требуемый объект в формате JSON или выдает ошибку, при получении невалидных данных на вход:

```javascript
export default function gameSave() {
  return GameSavingLoader.load().then((saving) => JSON.parse(saving), (error) => {
    throw error;
  });
}
```

Для тестирования обработки ошибок реализованы тесты с исользованиеми mock для метода `read`.

---

Обеспечено покрытие тестами.
