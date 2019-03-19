import {Bank, Expression, Money, Sum} from './money';

test('Dollar를 곱셈을 할 수 있다.', () => {
  const dollar: Money = Money.dollar(5);
  expect(dollar.times(2)).toEqual(Money.dollar(10));
  expect(dollar.times(3)).toEqual(Money.dollar(15));
});

test('Dollar를 같은지 비교 할 수 있다.', () => {
  const dollar: Money = Money.dollar(5);
  // 삼각측량
  const bool1 = dollar.equals(Money.dollar(5));
  expect(bool1).toBe(true);
  const bool2 = dollar.equals(Money.dollar(6));
  expect(bool2).toBe(false);
});

test('Won 을 곱셈 할 수 있다.', () => {
  const won: Money = Money.won(5);
  expect(won.times(2)).toEqual(Money.won(10));
  expect(won.times(3)).toEqual(Money.won(15));
});

test('같은지 비교할 수 있다,', () => {
  const dollar: Money = Money.dollar(5);
  expect(dollar.times(2)).toEqual(Money.dollar(10));
  expect(dollar.times(3)).toEqual(Money.dollar(15));
  const won: Money = Money.won(5);
  expect(won.times(2)).toEqual(Money.won(10));
  expect(won.times(3)).toEqual(Money.won(15));

  expect(dollar.equals(won)).toBe(false);
});

test('Money 에서 Dallar를 반환할 수 있다.', () => {
  const dollar: Money = Money.dollar(5);
  expect(dollar.times(2)).toEqual(Money.dollar(10));
});

test('통화를 처리할 수 있다.', () => {
  expect(Money.dollar(1).getCurrency()).toBe('USD');
  expect(Money.won(1).getCurrency()).toBe('KRW');
});

test('통화를 더할 수 있다', () => {
  const five = Money.dollar(5);
  const sum: Expression = new Sum(five, Money.dollar(1));
  const bank: Bank = new Bank();
  const reduced: Money = bank.reduce(sum, 'USD');
  expect(Money.dollar(6)).toEqual(reduced)
});

test('은행을 통해서 Money 의 통화 번환을 할 수 있다.', () => {
  const bank: Bank = new Bank();
  const reduced: Money = bank.reduce(Money.dollar(1), 'USD');
  expect(Money.dollar(1)).toEqual(reduced)
});

test('은행을 통해서 Money 의 다른 통화로 번환을 할 수 있다.', () => {
  const bank: Bank = new Bank();
  bank.addRate('USD', 'WON', 1.125);
  bank.addRate('WON', 'USD', 1125);
  // const reduced: Money = bank.reduce(Money.won(1125), 'USD');
  const reduced: Money = bank.reduce(Money.dollar(1), 'USD');
  expect(Money.dollar(1)).toEqual(reduced)
});

test('은행을 통해서 Money 의 다른 통화를 더 할 수 있다.', () => {
  const bank: Bank = new Bank();
  const dollar: Expression = Money.dollar(1);
  const won: Expression = Money.won(1);
  bank.addRate('USD', 'WON', 1);
  bank.addRate('WON', 'USD', 1);
  const reduced: Money = bank.reduce(dollar.plus(won), 'USD');
  expect(Money.dollar(2)).toEqual(reduced)
});
