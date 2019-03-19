import Attendee from './Attendee';

export default class Conference {
  attendees: Attendee[];
  constructor(){
    this.attendees = [];
  }
  contains(attendee: Attendee){
    return this.attendees.indexOf(attendee) > - 1;
  }
  add(attendee: Attendee){
    if(this.contains(attendee)) {
      this.attendees.push(attendee);
    }
  }
  remove(attendee: Attendee){
    const index = this.attendees.indexOf(attendee);
    if(index > -1) {
      this.attendees.splice(index, 1);
    }
  }
  iterate(callback: Function){
    // attendees의 각 attendee에 대해 콜백을 실행한다.
  }
}
