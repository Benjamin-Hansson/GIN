import { Component } from '@angular/core';
import { CampushallenService } from "./campushallen.service";
import { Time, NumberSymbol } from '@angular/common';

export interface Hall {
  id: Number;
  name: string;
}

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  availableSlots: number;
  availableHalls: Array<Hall>;
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
      for(let entry of response){
        const start = new Date(entry.duration.start);
        const end = new Date(entry.duration.end);
        const availableSlots = entry.availableSlots
        let availableHalls = new Array<Hall>();

        for (let hall of entry.selectableResources){
          availableHalls.push({id: hall.id, name: hall.name})
        }
        this.timeSlots.push({startTime: start, endTime: end, availableSlots: availableSlots, availableHalls: availableHalls})
      }
    });
  }

}
