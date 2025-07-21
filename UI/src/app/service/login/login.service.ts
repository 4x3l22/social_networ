import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:8083/api/user/login';

  constructor(private http: HttpClient) { }

  login(alias: string, password: string): Observable<any> {
    let headers = {
      'Content-Type': 'application/json'
    };
    return this.http.post(this.url, { alias, password }, { headers });
  }

}
