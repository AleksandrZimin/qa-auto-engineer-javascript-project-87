### Hexlet tests and linter status:
[![Actions Status](https://github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AleksandrZimin_qa-auto-engineer-javascript-project-87&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=AleksandrZimin_qa-auto-engineer-javascript-project-87)
![Coverage](https://sonarcloud.io/api/project_badges/measure?project=AleksandrZimin_qa-auto-engineer-javascript-project-87&metric=coverage)

## Описание

CLI-утилита для сравнения двух конфигурационных файлов.  
Показывает что было добавлено, удалено или изменено.

**Поддерживаемые форматы входных файлов:** JSON, YAML  
**Поддерживаемые форматы вывода:** `stylish` (по умолчанию), `plain`, `json`

---

## Установка

Клонируем репозиторий
```bash
git clone https://github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87.git
```
Переходим в папку проекта
```bash
cd qa-auto-engineer-javascript-project-87
```
Устанавливаем зависимости
```bash
make install
```

---

## Использование

### Через node (рекомендуется)

Справка
```bash
node bin/gendiff.js -h
```
Сравнение JSON файлов (формат stylish по умолчанию)
```bash
node bin/gendiff.js __fixtures__/file3.json __fixtures__/file4.json
```
Сравнение YAML файлов
```bash
node bin/gendiff.js __fixtures__/file3.yml __fixtures__/file4.yml
```
Вывод в формате plain
```bash
node bin/gendiff.js --format plain __fixtures__/file3.json __fixtures__/file4.json
```
Вывод в формате json
```bash
node bin/gendiff.js --format json __fixtures__/file3.json __fixtures__/file4.json
```

### Через глобальную команду (после npm link)

```bash
# Установить глобально
npm link

# Windows PowerShell — использовать .cmd версию
gendiff.cmd __fixtures__/file3.json __fixtures__/file4.json
gendiff.cmd --format plain __fixtures__/file3.json __fixtures__/file4.json
gendiff.cmd --format json __fixtures__/file3.json __fixtures__/file4.json

# Linux / macOS / WSL
gendiff __fixtures__/file3.json __fixtures__/file4.json
gendiff --format plain __fixtures__/file3.json __fixtures__/4.json
gendiff --format json __fixtures__/file3.json __fixtures__/file4.json
```
---

## Форматы вывода

### stylish (по умолчанию)
```bash
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

### plain
```bash
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

### json
```bash
[
  {
    "key": "common",
    "type": "nested",
    "children": [...]
  },
  ...
]
```

Формат `json` выводит внутреннее дерево различий в виде JSON-массива.  
Удобен для интеграции с другими инструментами.

---

## Использование библиотеки

```js
import genDiff from '@hexlet/code';

const diff = genDiff('file1.json', 'file2.json');          // stylish по умолчанию
const diffPlain = genDiff('file1.json', 'file2.json', 'plain');
console.log(diff);
```

---

## Команды разработки

Установка зависимостей:
```bash
npm install
```

Запуск тестов:
```bash
npm run test
```

Запуск линтера:
```bash
npm run lint
```
---

## Примеры сравнения вложенных файлов

### формат stylish
[![asciicast](https://asciinema.org/a/921279.svg)](https://asciinema.org/a/921279)

### Формат plain
[![asciicast](https://asciinema.org/a/921281.svg)](https://asciinema.org/a/921281)

### Формат JSON
[![asciicast](https://asciinema.org/a/921282.svg)](https://asciinema.org/a/921282)

---

## Ссылки
[![Hexlet](https://img.shields.io/badge/-Hexlet%20Code%20Review-brightgreen?style=flat-square)](https://ru.hexlet.io/reviews/github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87/pulls)