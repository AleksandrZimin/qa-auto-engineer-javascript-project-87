import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fileNameJson1 = 'file3.json';
const fileNameJson2 = 'file4.json';
const fileNameYaml1 = 'file3.yml';
const fileNameYaml2 = 'file4.yml';

const expectedStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
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
}`;

const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const expectedJson = `[
  {
    "key": "common",
    "type": "nested",
    "children": [
      {
        "key": "follow",
        "type": "added",
        "value": false
      },
      {
        "key": "setting1",
        "type": "unchanged",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "type": "removed",
        "value": 200
      },
      {
        "key": "setting3",
        "type": "changed",
        "oldValue": true,
        "newValue": {
          "key": "value"
        }
      },
      {
        "key": "setting4",
        "type": "added",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "type": "added",
        "value": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "type": "nested",
        "children": [
          {
            "key": "doge",
            "type": "nested",
            "children": [
              {
                "key": "wow",
                "type": "changed",
                "oldValue": "",
                "newValue": "so much"
              }
            ]
          },
          {
            "key": "key",
            "type": "unchanged",
            "value": "value"
          },
          {
            "key": "ops",
            "type": "added",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "type": "nested",
    "children": [
      {
        "key": "baz",
        "type": "changed",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "key": "foo",
        "type": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "type": "changed",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  {
    "key": "group2",
    "type": "removed",
    "value": {
      "abc": "12345",
      "deep": {
        "id": 45
      }
    }
  },
  {
    "key": "group3",
    "type": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": "100500"
    }
  }
]`;

// --- stylish ---
test('diff for nested JSON files (stylish)', () => {
  expect(genDiff(getFixturePath(fileNameJson1), getFixturePath(fileNameJson2))).toBe(expectedStylish);
});

test('diff for nested YAML files (stylish)', () => {
  expect(genDiff(getFixturePath(fileNameYaml1), getFixturePath(fileNameYaml2))).toBe(expectedStylish);
});

// --- plain ---
test('diff for nested JSON files (plain)', () => {
  expect(genDiff(getFixturePath(fileNameJson1), getFixturePath(fileNameJson2), 'plain')).toBe(expectedPlain);
});

test('diff for nested YAML files (plain)', () => {
  expect(genDiff(getFixturePath(fileNameYaml1), getFixturePath(fileNameYaml2), 'plain')).toBe(expectedPlain);
});

// --- json ---
test('diff for nested JSON files (json format)', () => {
  expect(genDiff(getFixturePath(fileNameJson1), getFixturePath(fileNameJson2), 'json')).toBe(expectedJson);
});

test('diff for nested YAML files (json format)', () => {
  expect(genDiff(getFixturePath(fileNameYaml1), getFixturePath(fileNameYaml2), 'json')).toBe(expectedJson);
});

// --- edge cases ---
test('diff for mixed JSON and YAML files', () => {
  expect(genDiff(getFixturePath(fileNameJson1), getFixturePath(fileNameYaml2))).toBe(expectedStylish);
});

test('throws on unknown format', () => {
  expect(() => genDiff(getFixturePath(fileNameJson1), getFixturePath(fileNameJson2), 'xml'))
    .toThrow("Unknown format: 'xml'");
});