export function sanitizeNumber(value = '') {
  const testMath = value.match(/\d+/g) || [];

  return testMath.join('');
}

export function maskValues(value = '', mask = '') {
  const numbers = mask.match(/\d+/g);
  let reg = '';

  value =
    sanitizeNumber(value).length > sanitizeNumber(mask).length
      ? value.slice(0, -1)
      : value;

  for (let i = 0; i < numbers.length; i++) {
    mask = mask.replace(new RegExp(numbers[i]), `$${i + 1}`);
    reg += `(\\d{0,${numbers[i].length}})`;
  }

  reg = new RegExp(reg, 'g');

  value = value.replace(reg, mask);
  value = value.replace(/\D{1,}$/g, '');

  return value;
}
