import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/login', data);
  }

  // send(data: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post('https://coexpert-backend-production.up.railway.app/chat', JSON.stringify(data), { headers});
  // }

  send(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('https://contractgptbackend-production.up.railway.app/chat', JSON.stringify(data), { headers});
  } 

  sign(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('https://contractgptbackend-production.up.railway.app/drop', JSON.stringify(data), { headers});
  }

  get_conversations(googleId: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get('https://contractgptbackend-production.up.railway.app/get_conversations/'+ googleId, { headers});
  }

  update(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('https://contractgptbackend-production.up.railway.app/update', JSON.stringify(data), { headers});
  }

  risk(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('https://contractgptbackend-production.up.railway.app/assessment', JSON.stringify(data), { headers});
  }

  spell(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('https://contractgptbackend-production.up.railway.app/spell', JSON.stringify(data), { headers});
  }

  internet(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('https://contractgptbackend-production.up.railway.app/chat-internet', JSON.stringify(data), { headers});
  }
}
