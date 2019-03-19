export interface Expression {
  reduce(bank: Bank, to: string): Money;
  plus(money: Expression): Expression;
  times(number: number): Expression;
}

export class HashTable {
  constructor() { }
  put(pair: any, rate: any) { }
  get(pair: any) {
    return 1;
  }
}

export class Bank {
  rates: HashTable = new HashTable();
  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to);
  }
  rate(from: Money | string, to: Money | string) {
    if ((<Money>from).equals && (<Money>from).equals(<Money>to)) return 1;
    const rate: number = this.rates.get(new Pair(<string>from, <string>to));
    return rate;
  }
  addRate(from: string, to: string, rate: number) {
    this.rates.put(new Pair(from, to), rate);
  }
}

export interface IMoney {
  amount: number;
  currency: string;
  times(number: number): Money;
  getCurrency(): string;
}

export class Money implements IMoney, Expression {
  static dollar = function (amount: number) {
    return new Money(amount, 'USD');
  };
  static won = function (amount: number) {
    return new Money(amount, 'KRW');
  };
  public currency: string;
  public amount: number;
  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }
  reduce(bank: Bank, to: string): Money {
    const rate = bank.rate(this.currency, to);
    return new Money(this.amount / rate, to);
  }
  plus(money: Expression): Expression {
    // return new Money(money.amount + this.amount, this.currency);
    return new Sum(this, money);
  }
  times(number: number): Expression {
    return new Money(this.amount * number, this.currency);
    // TODO return new Sum(this, <Expression>number);
  }
  getCurrency(): string {
    return this.currency;
  }
  equals(money: Money) {
    // if(this.constructor.name != money.constructor.name) {
    //   return false;
    // }
    if(this.currency != money.currency) {
      return false;
    }
    return money.amount === this.amount;
  }
  toString(): string {
    return this.amount + ' ' + this.currency;
  }
}

export class Sum implements Expression {
  constructor(public augend: Expression, public addend: Expression) {
  }
  reduce(bank: Bank, to: string) {
    const amount = this.augend.amount + this.addend.amount;
    return new Money(
      amount,
      to
    )
  }
  times(number: number): Expression {
    return new Sum(this.augend.times(number), this.addend.times(number));
  }
  plus(money: Expression): Expression {
    return null;
  }
}

export class Pair {
  constructor(
    private from: string,
    private to: string
  ) {}
  equals(obj: any): boolean {
    const pair: Pair = <Pair>obj;
    return (this.from === pair.from) && (this.to === pair.to);
  }
  hashCode() {
    return 0;
  }
}
