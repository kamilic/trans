const assert = require('power-assert');
const f = require('../dist/index');

describe('basic test', () => {
  test('it simply works', () => {
    const before = {
      a: 1,
    };

    const t = f({
      a: value => ['b', value],
    });

    assert.deepStrictEqual(t(before), {
      b: 1,
    });
  });

  test('it simply works with array', () => {
    const arrayBefore = [
      {
        a: 1,
      },
      {
        a: 2,
      },
      {
        a: 3,
      },
    ];

    const t = f({
      a: value => ['b', value],
    });

    assert.deepStrictEqual(t(arrayBefore), [
      {
        b: 1,
      },
      {
        b: 2,
      },
      {
        b: 3,
      },
    ]);
  });

  test('it return self when pass illegal value', () => {
    const t = f({
      a: value => ['b', value],
    });

    assert.equal(t(null), null);
    assert.equal(t(undefined), undefined);
    assert.equal(t(1), 1);
  });

  test('nested trans', () => {
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
      a: f({
        b: value => ['c', value],
      }),
    });

    assert.deepStrictEqual(t(before), {
      a: [1, { c: 2 }, { c: 3 }, { c: 6 }, null, undefined],
    });
  });
});
