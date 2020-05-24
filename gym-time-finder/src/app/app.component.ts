import { Component } from '@angular/core';
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

export class AppComponent {

  title = 'gym-time-finder';
  timeSlots: Array<TimeSlot> = new Array<TimeSlot>();


  constructor(campushallen: CampushallenService){
    campushallen.getFreeTimes().subscribe((response: any) => {
      console.log("recieved data");
      console.log(response)
      for(let i: number = 0; i < response.length; i++){

        let entry = response[i];
        if(!this.dateIsToday(entry.duration.start)){
          break;
        }
        const start = new Date(entry.duration.start);
        const end = new Date(entry.duration.end);
        const availableSlots = entry.availableSlots
        let availableHalls = new Array<Hall>();
        for (let hall of entry.selectableResources){
          let hallEndTime: Date;
          let offset: number = 1;
          if(response[i+offset]){
            let next = response[i+offset]
            while(next &&  next.selectableResources.findIndex(x => x.id == hall.id) !== -1 && this.dateIsToday(next.duration.start)){
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

  dateIsToday(inputDate: Date){
    let today: Date = new Date();
    today.setDate(new Date().getDate()+1);
    today.setHours(0,0,0,0);
    let dateCopy = new Date(inputDate);
    if(dateCopy.setHours(0,0,0,0) === today.setHours(0,0,0,0)){
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
    if (availableSlots <= 12){
      return "linear-gradient(155deg, " + colorsFromRedToGreen[availableSlots-1] +
            " 0%, rgba(255,255,255,1) 100%)";
    }else{
      return colorsFromRedToGreen[12];
    }
  }

  toggleExpanded(entry: TimeSlot){
    entry.expanded = !entry.expanded;
  }

}
