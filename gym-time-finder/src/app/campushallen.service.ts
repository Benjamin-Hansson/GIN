import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CampushallenService {
  proxyUrl = "https://cors-anywhere.herokuapp.com/";
  url: string ="";

  constructor(private http: HttpClient) {
    let today = new Date();
    let todayPlus7 = new Date();
    todayPlus7.setDate(today.getDate()+ 6)
    today.setHours(0,0,0,0);
    todayPlus7.setHours(21,59,59,999)

    this.url = "https://brponline.campushallen.se/grails/api/ver3/products/services/68/suggestions?businessUnit=1&period="+today.toISOString()+"%7C" + todayPlus7.toISOString()

  }

  getFreeTimes(){
    let headers = new HttpHeaders();
    headers = headers.append("authority", "brponline.campushallen.se");
    headers = headers.append("pragma", "no-cache");
    headers = headers.append("cache-control", "no-cache");
    headers = headers.append("accept", "application/json, text/plain, */*");
    headers = headers.append("x-request-source", "brpweb");
    headers = headers.append("accept-language", "en-US");

    return this.http.get(this.proxyUrl + this.url, {headers: headers, responseType: 'json'});


  }

}
