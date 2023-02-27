const formatter = require('../cjs');


function timeZoneConverter(date, timeZone) {
  const oldDate = new Date(date);
  const newDate = new Date();
  const stamp = oldDate.getTime();
  if (!timeZone) return oldDate;
  return (isNaN(timeZone) && !timeZone)
    ? oldDate :
    new Date(stamp + (newDate.getTimezoneOffset() * 60 * 1000) + (timeZone * 60 * 60 * 1000));
}
// timeZoneConverter(new Date(1434701732*1000), 8)


test('should return the default formatter.utc', () => {
  const date = new Date();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const str = `${date.getUTCFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  expect(formatter.utc()).toBe(str);
});

test('should return the default formatter', () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const str = `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  expect(formatter()).toBe(str);
  expect(/^\d{4}-\d{2}-\d{2}$/.test(formatter())).toBeTruthy();
  expect(/^\d{4}-\d{2}-\d{2}$/.test(formatter.utc())).toBeTruthy();
});

test('should return a fixed time format:', () => {
  expect(formatter('YYYY年MM月DD日', new Date(2019, 3, 7))).toEqual('2019年04月07日');
  expect(formatter('YYYY年MM月DD日 16:30:29', new Date(2019, 3, 7, 16, 30, 29))).toEqual('2019年04月07日 16:30:29');
  expect(formatter('YYYY年MM月DD日 HH:mm-ss', new Date(2019, 3, 7, 16, 30, 29))).toEqual('2019年04月07日 16:30-29');
  expect(formatter('YYYY/MM/DD HH:mm:ss', new Date(2019, 3, 7, 16, 30, 29))).toEqual('2019/04/07 16:30:29');
});

test('should work with delimiters', () => {
  expect(/^\[\d{4}\]/.test(formatter('[YYYY]'))).toBeTruthy();
  expect(/^\[\d{4}\d{2}\]/.test(formatter('[YYYYMM]'))).toBeTruthy();
  expect(/^\[\d{4}:\d{2}\]/.test(formatter('[YYYY:MM]'))).toBeTruthy();
});

test('should work with no separators', () => {
  expect(/^\d{4}\d{2}$/.test(formatter('YYYYMM'))).toBeTruthy();
  expect(/^\d{4}\d{2}\d{2}$/.test(formatter('YYYYMMDD'))).toBeTruthy();
  expect(/^\d{4}\d{2}\d{2}\d{2}$/.test(formatter('YYYYMMDDss'))).toBeTruthy();
  expect(/^\d{4}\d{2}\d{2}$/.test(formatter('YYYYMMss'))).toBeTruthy();
});


test('should return the year:', () => {
  expect(/^\d{4}$/.test(formatter('YYYY'))).toBeTruthy();
  expect(/^\d{4}$/.test(formatter.utc('YYYY'))).toBeTruthy();
});

test('should return the month:', () => {
  expect(/^\d{2}$/.test(formatter('MM'))).toBeTruthy();
  expect(/^\d{2}$/.test(formatter.utc('MM'))).toBeTruthy();
});

test('should return the day:', () => {
  expect(/^\d{2}$/.test(formatter('DD'))).toBeTruthy();
  expect(/^\d{2}$/.test(formatter.utc('DD'))).toBeTruthy();
});

test('should return hours:', () => {
  expect(/^\d{2}$/.test(formatter('HH'))).toBeTruthy();
  expect(/^\d{2}$/.test(formatter.utc('HH'))).toBeTruthy();
});

test('should return minutes:', () => {
  expect(/^\d{2}$/.test(formatter('mm'))).toBeTruthy();
  expect(/^\d{2}$/.test(formatter.utc('mm'))).toBeTruthy();
});

test('should return seconds:', () => {
  expect(/^\d{2}$/.test(formatter('ss'))).toBeTruthy();
  expect(/^\d{2}$/.test(formatter.utc('ss'))).toBeTruthy();
});

test('should return miliseconds:', () => {
  expect(/^\d{3}$/.test(formatter('ms'))).toBeTruthy();
  expect(/^\d{3}$/.test(formatter.utc('ms'))).toBeTruthy();
});

test('should increment zero-based month:', () => {
  let expected = String(new Date().getUTCMonth() + 1);
  expected = expected < 10 ? `0${expected}` : expected;
  expect(formatter('MM')).toEqual(expected);
});

test('should not increment one-based methods:', () => {
  var expected = String(new Date().getUTCFullYear());
  expect(formatter('YYYY')).toEqual(expected);
});