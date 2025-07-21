import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private apiUrl = 'http://localhost:8084/api/publication'; 
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }

 likePublication(publicationId: number, likes: number): Observable<void> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<void>(
      `${this.apiUrl}/like`,
      { publicationId, likes },
      { headers }
    );
  }

  createPublication(publication: any): Observable<void> {
    const token = this.cookieService.get('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<void>('http://localhost:8084/api/publication/register', publication, { headers });
  }

}
