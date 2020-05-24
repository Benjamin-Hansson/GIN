import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CampushallenService {
  proxyUrl = "https://cors-anywhere.herokuapp.com/";
  url ="https://brponline.campushallen.se/grails/api/ver3/products/services/68/suggestions?businessUnit=1&period=2020-05-22T22:00:00.000Z%7C2020-05-29T21:59:59.999Z";

  constructor(private http: HttpClient) { }

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
