import { Component, OnInit } from '@angular/core';
import { CampushallenService } from "./campushallen.service";
import { Time, NumberSymbol } from '@angular/common';

export interface Hall {
  id: Number;
  name: string;
  availableUntil: Date;
}

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  availableSlots: number;
  availableHalls: Array<Hall>;
  expanded: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'gym-time-finder';
  timeSlots: Array<TimeSlot> = new Array<TimeSlot>();
  offsetFromToday: number;
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  requestCompleted: boolean;
  constructor(campushallen: CampushallenService){
    this.requestCompleted = false;
    campushallen.getFreeTimes().subscribe((response: any) => {
      this.requestCompleted = true;
      console.log("recieved data");
      console.log(response);
      for(let i: number = 0; i < response.length; i++){
        let entry = response[i];
        const start = new Date(entry.duration.start);
        const end = new Date(entry.duration.end);
        const availableSlots = entry.availableSlots
        let availableHalls = new Array<Hall>();
        for (let hall of entry.selectableResources){
          let hallEndTime: Date;
          let offset: number = 1;
          if(response[i+offset]){
            let next = response[i+offset]
            while(next &&  next.selectableResources.findIndex(x => x.id == hall.id) !== -1 && this.dayIsSame(entry.duration.start, next.duration.start)){
              offset += 1;
              next = response[i+offset];
            }
            hallEndTime = new Date(response[i+offset-1].duration.end);
          }else {
            hallEndTime = new Date(end);
          }
          availableHalls.push({id: hall.id, name: hall.name, availableUntil: hallEndTime})
        }
        this.timeSlots.push({startTime: start,
                              endTime: end,
                              availableSlots: availableSlots,
                              availableHalls: availableHalls,
                              expanded: false})
      }
    });
  }

  ngOnInit(){
    this.offsetFromToday = 1;
  }

  nextDay(){
    if ( this.offsetFromToday < 7) this.offsetFromToday ++;

  }
  previousDay(){
    if (this.offsetFromToday > 0) this.offsetFromToday --;

  }

  getDate(){
    let activeDay: string = "Today";
    switch (this.offsetFromToday) {

      case 0:
        activeDay = "Today";
        break;
      case 1:
        activeDay="Tomorrow";
        break;
      default:
        let date= new Date();
        date.setDate(date.getDate() + this.offsetFromToday);
        activeDay = this.days[date.getDay()];
    }
    return activeDay;
  }

  /**
   * Gets all timeslots for a given day
   */
  getSlotsForADay() {
    let chosenDate: Date = new Date();
    chosenDate.setDate(chosenDate.getDate() + this.offsetFromToday);
    let slots:TimeSlot[] = [];
    for(let entry of this.timeSlots){
      if(this.dayIsSame(chosenDate, entry.startTime)) {
        slots.push(entry);
      }

    }
    return slots;
  }


  /**
   * Checks if two dates have the same day
   * @param first first date
   * @param second other date
   */
  dayIsSame(first: Date, second: Date){
    let firstCopy = new Date(first);
    let secondCopy = new Date(second);
    if(firstCopy.setHours(0,0,0,0) === secondCopy.setHours(0,0,0,0)){
      return true;
    }else {
      return false;
    }
  }

  toReadableTime(date: Date){
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  }
  getBackgroundColor(availableSlots: number){
    let colorsFromRedToGreen:string[] = ["#EB471D", "#EC5C20", "#F19E2B",
     "#F5C133","#FBEA3B", "#EFFE3F", "#D7FD3E", "#BEFC3C", "#A4FB3B",
     "#93FB3A", "#82FA39", "#78FA39" ];

    let h = (120/12)* availableSlots-1;
    let s = 100;
    let l = 60;
    let l2 = 90;

    if (availableSlots <= 12){
      return "linear-gradient(155deg, hsl("+h+", "+s+"%, "+l+
            "%) 0%, hsl("+h+", "+s+"%, "+l2+"%) 100%)";
    }else{
      return colorsFromRedToGreen[12];
    }
  }

  toggleExpanded(entry: TimeSlot){
    entry.expanded = !entry.expanded;
  }

}
