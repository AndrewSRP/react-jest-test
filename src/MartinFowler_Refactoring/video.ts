export class Movie {
    static readonly CHILDRENS = 2;
    static readonly REGULAR = 0;
    static readonly NEW_RELEASE = 1;
    private _title: string;
    private _priceCode: number;

    constructor(title: string, priceCode: number) {
        this._title = title;
        this._priceCode = priceCode;
    }
    getPriceCode(): number {
        return this._priceCode;
    }
    setPriceCode(arg: number): void {
        this._priceCode = arg;
    }
    getTitle(): string {
        return this._title;
    }
}

export class Rental {
    private _movie: Movie;
    private _daysRented: number;
    constructor(movie: Movie, daysRented: number) {
        this._movie = movie;
        this._daysRented = daysRented;
    }
    getDaysRented(): number {
        return this._daysRented;
    }
    getMovie(): Movie {
        return this._movie;
    }
}

export class Customer {
    private _name: string;
    private _rentals: Rental[];
    constructor(name: string) {
        this._name = name;
        this._rentals = [];
    }
    addRental(arg: Rental) {
        this._rentals.push(arg);
    }
    getName(): string {
        return this._name;
    }
    statement(): string {
        let totalAmount = 0;
        let frequentRenterPoints = 0;
        const rentals: Rental[] = [...this._rentals];
        let result = this.getName() + ' 고객님의 대여 기록';
        while(rentals.length) {
            let thisAmount = 0;
            const each: Rental = rentals.pop() || new Rental(new Movie('', 0), 0);
            switch (each.getMovie().getPriceCode()) {
                case Movie.REGULAR:
                    thisAmount += 2;
                    if (each.getDaysRented() > 2) {
                        thisAmount += (each.getDaysRented() - 2) * 1.5;
                    }
                    break;
                case Movie.NEW_RELEASE:
                    thisAmount += each.getDaysRented() * 3;
                    break;
                case Movie.CHILDRENS:
                    thisAmount += 1.5;
                    if (each.getDaysRented() > 3) {
                        thisAmount += (each.getDaysRented() - 3) * 1.5;
                    }
                    break;
            }
            // 적립 포인트를 1 포인트 증가
            frequentRenterPoints++;
            // 최신물을 이틀 이상 대여하면 보너스 포인트 지급
            if((each.getMovie().getPriceCode() == Movie.NEW_RELEASE) && each.getDaysRented() > 1) {
                frequentRenterPoints++;
            }
            // 이번에 대여하는 비디오 정보와 대여료를 출력
            result += `${each.getMovie().getTitle()} ${thisAmount}`;
            // 현재까지 누적된 총 대여료
            totalAmount += thisAmount;
        }
        result += `누적 대여료: ${totalAmount}`;
        result += `적립 포인트: ${frequentRenterPoints}`;
        return result;
    }
}
