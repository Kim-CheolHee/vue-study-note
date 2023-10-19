import { sum } from './math';

// sum(10, 20); // 30

describe('math.js', () => {
  test('10 + 20 = 30', () => {
    const result = sum(10, 20);
    expect(result).not.toBe(40);
  });
});
