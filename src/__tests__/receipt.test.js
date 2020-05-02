import Receipt from '../Recept';

test('success cases', () => {
  const receipt = new Receipt('testData.txt');
  receipt.parse();
  expect(receipt.entries.length).toBe(4);
});

test('empty data case', () => {
  const receipt = new Receipt('emptyData.txt');
  expect(() => {
    receipt.parse();
  }).toThrow();
});

test('wrong data case', () => {
  const receipt = new Receipt('wrongData.txt');
  expect(() => {
    receipt.parse();
  }).toThrow();
});

test('file missing case', () => {
  const receipt = new Receipt('unknown.txt');
  expect(() => {
    receipt.parse();
  }).toThrow();
});
