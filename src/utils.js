export const isDate = (val) =>
  Object.prototype.toString.call(val) === '[object Date]' &&
  !Number.isNaN((val).getTime());

export const extend = Object.assign;

export function padZero(num, targetLength = 2) {
  let str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}

export const clamp = (num, min, max) =>
  Math.min(Math.max(num, min), max);

export const makeStringProp = (defaultVal) => ({
  type: String,
  default: defaultVal,
});

export const makeNumericProp = (defaultVal) => ({
  type: Number,
  default: defaultVal,
});

// export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export const pick =(
  obj,
  keys,
  ignoreUndefined
) => {
  console.log('dddddd',obj,keys)
  return keys.reduce((ret, key) => {
    console.log(8888,obj[key])
    if (!ignoreUndefined || obj[key] !== undefined) {
      ret[key] = obj[key];
    }
    return ret;
  });
}