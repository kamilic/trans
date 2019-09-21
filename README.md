# trans

Transforming your structures in declarative way.

## Usage

### a basic usage

```javascript
const f = require('@kamilic/trans');
const before = {
  a: 1,
};

const beforeArray = [{ a: 1 }, { a: 2 }];

const t = f({
  a: value => ['b', value],
});

t(before); // { b: 1 }
t(beforeArray); // [{ b: 1 }, { b: 2 }]
```

### nested usage

```javascript
const f = require('@kamilic/trans');
const before = {
  a: [
    1,
    {
      b: 2,
    },
    { b: 3, c: 4 },
    { b: 6, d: 1 },
    null,
    undefined,
  ],
};

const t = f({
  a: f({ b: value => ['c', value] }),
});
```
