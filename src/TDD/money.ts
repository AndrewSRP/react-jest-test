export interface IMoney {
  amount: number;
  currency: string;
  times(number: number): Money;
  getCurrency(): string;
}

export class Money implements IMoney {
  static dollar = function (amount: number) {
    return new Dollar(amount, 'USD');
  };
  static won = function (amount: number) {
    return new Won(amount, 'KRW');
  };
  public currency: string;
  public amount: number;
  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }
  times(number: number): Money {
    return new Money(number, this.currency);
  }
  getCurrency(): string {
    return this.currency;
  }
  equals(money: Money) {
    if(this.constructor.name !== money.constructor.name) {
      return false;
    }
    return money.amount === this.amount;
  }
}

export class Dollar extends Money {
  constructor(amount: number, currency: string){
    super(amount, currency);
  }
  times(number: number): Money {
    return Money.dollar(this.amount * number);
  }
  // equals(dollar: Money) {
  //   return dollar.amount === this.amount;
  // }
}

export class Won extends Money {
  constructor(amount: number, currency: string){
    super(amount, currency);
  }
  times(number: number): Money {
    return Money.won(this.amount * number);
  }
  // equals(won: Money) {
  //   return won.amount === this.amount;
  // }
}
