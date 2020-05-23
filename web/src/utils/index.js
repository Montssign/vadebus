export function sanitizeNumber(value = '') {
  const testMath = value.match(/\w+/g) || [];

  return testMath.join('');
}

export function maskValues(value = '', mask = '') {
  const numbers = mask.match(/\w+/g);
  let reg = '';

  value =
    sanitizeNumber(value).length > sanitizeNumber(mask).length
      ? value.slice(0, -1)
      : value;

  for (let i = 0; i < numbers.length; i++) {
    mask = mask.replace(new RegExp(numbers[i]), `$${i + 1}`);
    reg += `(\\w{0,${numbers[i].length}})`;
  }

  reg = new RegExp(reg, 'g');

  value = value.replace(reg, mask);
  value = value.replace(/\W{1,}$/g, '');

  return value;
}
