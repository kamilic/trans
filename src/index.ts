type Trans<B extends {} = {}> = {
  [key: string]: TransFn<B>;
};

interface TransFn<B extends {} = {}> {
  (value: B[keyof B], origin?: B): [string, any];
  __obj_trans?: boolean;
}

interface GeneratedTrans<B extends {} = {}> {
  (before: B): { [key: string]: any };
  (before: Array<B>): Array<{ [key: string]: any }>;
  __obj_trans: boolean;
}

/**
 * @description
 * @param {Trans} trans
 * @returns {function}
 * @tutorial
 * trans => { a: (value) => ['b', value] }
 * origin => { a: 2 }
 * result => { b: 2 }
 *
 * trans => { a: 'b' }
 * origin => [{a: 1}, {a: 2}, {a: 3}]
 * result => [{b: 1}, {b: 2}, {b: 3}]
 *
 * trans => { a: f({b: 'c'}) }
 * origin => {
 *     a: [{b: 1}, {b: 2}, {b: 3}]
 * }
 * result => {
 *     a: [{c: 1}, {c: 2}, {c: 3}]
 * }
 *
 */
function f<B = {}>(trans: Trans<B>): GeneratedTrans<B> {
  const handler = (input: any) => {
    if (input && typeof input === 'object') {
      if (Array.isArray(input)) {
        return input.map(handler);
      } else {
        return Object.entries(trans).reduce((o, [originKey, action]) => {
          // if (typeof action === 'string') {
          // o[action] = input[originKey];
          // } else if (typeof action === 'function') {
          if ('__obj_trans' in action) {
            // self
            o[originKey] = action(input[originKey]);
          } else {
            const [key, value] = action(input[originKey], input);
            o[key] = value;
          }
          // } else if (typeof action === 'object') {
          // if (action.__direct) {
          // if (typeof action.__value === 'function') {
          // o[originKey] = action.__value(input);
          // } else {
          // o[originKey] = action.__value;
          // }
          // }
          // }
          return o;
        }, {});
      }
    } else {
      return input;
    }
  };
  handler.__obj_trans = true;
  return handler;
}

// f.direct = value => {
// return {
// __direct: true,
// __value: value,
// };
// };

module.exports = f;
