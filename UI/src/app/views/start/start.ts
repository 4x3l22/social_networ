import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './start.html',
  styleUrls: ['./start.css']
})
export class StartComponent {
  
  constructor(private router: Router){}

  user: { name: string; lastName: string; alias: string; id: number } | null = null;

  logout(): void {
    
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    const token = this.getCookie('token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        this.user = {
          name: decoded.name,
          lastName: decoded.lastName,
          alias: decoded.alias,
          id: decoded.id,
        };
      } catch (error) {
        console.error('Error al decodificar token:', error);
      }
    } else {
      console.warn('Token no encontrado en cookies');
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
}
