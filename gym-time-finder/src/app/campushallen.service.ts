import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CampushallenService {
  url: string ="";
  localUrl: string = "";
  constructor(private http: HttpClient) {

    this.url = "https://europe-west3-gym-time-finder.cloudfunctions.net/campushallenSchedule"
    this.localUrl = "http://localhost:5000/gym-time-finder/europe-west3/campushallenSchedule"
  }

  getFreeTimes(){

    return this.http.get(this.localUrl,{responseType: 'json'});

  }

}
