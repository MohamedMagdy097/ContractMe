import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/login', data);
  }

  send(data: any): Observable<any> {
    console.log(JSON.stringify(data));
    return this.http.post('https://coexpert-backend-production.up.railway.app/chat', JSON.stringify(data));
  }

}
