### Hexlet tests and linter status:
[![Actions Status](https://github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AleksandrZimin_qa-auto-engineer-javascript-project-87&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=AleksandrZimin_qa-auto-engineer-javascript-project-87)
![Coverage](https://sonarcloud.io/api/project_badges/measure?project=AleksandrZimin_qa-auto-engineer-javascript-project-87&metric=coverage)

## Gendiff — вычислитель отличий

Утилита сравнивает два конфигурационных файла и показывает разницу.  
Поддерживает форматы: **JSON**, **YAML**.

## Установка
npm ci

## Использование
make gendiff _<path to file1>_ _<path to file2>_

## Пример работы

```bash
$ node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}

$ node bin/gendiff.js --format plain __fixtures__/file1.json __fixtures__/file2.json
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```

## Запуск тестов
make test

## Запуск linter
make lint

## Ссылки
[![Hexlet](https://img.shields.io/badge/-Hexlet%20Code%20Review-brightgreen?style=flat-square)](https://ru.hexlet.io/reviews/github.com/AleksandrZimin/qa-auto-engineer-javascript-project-87/pulls)