export default class Attendee {
  constructor(
    public firstName: string,
    public lastName: string,
    public checkedIn: boolean = false
  ) {
  }
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  isCheckedIn() {
    return this.checkedIn
  }
  checkIn() {
    this.checkedIn = true;
  }
}
