import Calculator from '../Calculator';

const calculator = new Calculator();

test('success cases', () => {
  expect(calculator.calc({ distance: 1, time: 0 })).toBe(6);
});

test('distance expection cases', () => {
  expect(() => calculator.calc({ distance: null, time: 0 })).toThrow();
  expect(() => calculator.calc({ distance: undefined, time: 0 })).toThrow();
  expect(() => calculator.calc({ distance: 'x', time: 0 })).toThrow();
  expect(() => calculator.calc({ time: 0 })).toThrow();
  expect(() => calculator.calc({ distance: 0, time: 0 })).toThrow();
  expect(() => calculator.calc({ distance: -1, time: 0 })).toThrow();
});

test('time expection cases', () => {
  expect(() => calculator.calc({ distance: 1, time: null })).toThrow();
  expect(() => calculator.calc({ distance: 1, time: undefined })).toThrow();
  expect(() => calculator.calc({ distance: 1, time: 'x' })).toThrow();
  expect(() => calculator.calc({ distance: 1 })).toThrow();
  expect(() => calculator.calc({ distance: 1, time: -1 })).toThrow();
});
