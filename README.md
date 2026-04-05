### Hexlet tests and linter status:
[![Actions Status](https://github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AleksandrZimin_qa-auto-engineer-javascript-project-87&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=AleksandrZimin_qa-auto-engineer-javascript-project-87)
![Coverage](https://sonarcloud.io/api/project_badges/measure?project=AleksandrZimin_qa-auto-engineer-javascript-project-87&metric=coverage)

## Описание

CLI-утилита для сравнения двух конфигурационных файлов.  
Показывает что было добавлено, удалено или изменено.

**Поддерживаемые форматы входных файлов:** JSON, YAML  
**Поддерживаемые форматы вывода:** `stylish` (по умолчанию), `plain`

---

## Установка

```bash
git clone https://github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87.git
cd qa-auto-engineer-javascript-project-87
make install
```

---

## Использование

### Через node (рекомендуется)

```bash
# Справка
node bin/gendiff.js -h

# Сравнение JSON файлов (формат stylish по умолчанию)
node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

# Сравнение YAML файлов
node bin/gendiff.js __fixtures__/file1.yml __fixtures__/file2.yml

# Вывод в формате plain
node bin/gendiff.js --format plain __fixtures__/file1.json __fixtures__/file2.json

# Вывод в формате json
node bin/gendiff.js --format json __fixtures__/file1.json __fixtures__/file2.json
```

### Через глобальную команду (после npm link)

```bash
# Установить глобально
npm link

# Windows PowerShell — использовать .cmd версию
gendiff.cmd __fixtures__/file1.json __fixtures__/file2.json
gendiff.cmd --format plain __fixtures__/file1.json __fixtures__/file2.json
gendiff.cmd --format json __fixtures__/file1.json __fixtures__/file2.json

# Linux / macOS / WSL
gendiff __fixtures__/file1.json __fixtures__/file2.json
gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json
gendiff --format json __fixtures__/file1.json __fixtures__/file2.json
```

## Форматы вывода

### stylish (по умолчанию)
```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
Условные обозначения:
- `+` — ключ добавлен или изменён (новое значение)
- `-` — ключ удалён или изменён (старое значение)
- ` ` (пробел) — ключ не изменился

### plain
```
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```

### json
```bash
[
  {
    "key": "follow",
    "type": "removed",
    "value": false
  },
  {
    "key": "timeout",
    "type": "changed",
    "oldValue": 50,
    "newValue": 20
  },
  ...
]
```

Формат `json` выводит внутреннее дерево различий в виде JSON-массива.  
Удобен для интеграции с другими инструментами.
---

## Использование как библиотека

```js
import genDiff from '@hexlet/code';

const diff = genDiff('file1.json', 'file2.json');          // stylish по умолчанию
const diffPlain = genDiff('file1.json', 'file2.json', 'plain');
console.log(diff);
```

---

## Команды разработки

```bash
make install    # установка зависимостей
make test       # запуск тестов
make lint       # проверка линтером
```

## Ссылки
[![Hexlet](https://img.shields.io/badge/-Hexlet%20Code%20Review-brightgreen?style=flat-square)](https://ru.hexlet.io/reviews/github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87/pulls)