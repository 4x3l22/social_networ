import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../service/publication/publication.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publications',
  imports: [CommonModule, FormsModule],
  templateUrl: './publications.html',
  styleUrls: ['./publications.css'],
  standalone: true,
})
export class PublicationsComponent implements OnInit {
  publications: Publication[] = [];

  newPublication = {
    title: '',
    content: '',
    likes: 0,
    authorId: 0
  };

  likeProcessing: { [key: number]: boolean } = {};


  constructor(
    private publicationService: PublicationService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications() {
    this.publicationService.getPublications().subscribe({
      next: (response: Publication[]) => {
        this.publications = response;
      },
      error: (error: any) => {
        console.error('Error al cargar publicaciones:', error);
      }
    });
  }

  like(pub: Publication): void {
    if (this.likeProcessing[pub.id]) return;

    this.likeProcessing[pub.id] = true;

    const originalLikes = pub.likes || 0;
    pub.likes = originalLikes + 1; // 👈 Actualiza en la UI de inmediato

    this.publicationService.likePublication(pub.id, pub.likes).subscribe({
      next: () => {
        this.likeProcessing[pub.id] = false;
      },
      error: (error: any) => {
        console.error('Error al actualizar la publicación:', error);
        pub.likes = originalLikes; // 👈 Revierte si falla
        this.likeProcessing[pub.id] = false;
      }
    });
  }



  submitPublication() {
    const token = this.cookieService.get('token');

    if (!token) {
      console.error('Token no encontrado en cookies');
      return;
    }

    let payload: any;
    try {
      payload = JSON.parse(atob(token.split('.')[1]));

      if (!payload?.id) {
        console.error('ID de usuario no encontrado en el token');
        return;
      }

      this.newPublication.authorId = payload.id;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return;
    }

    this.publicationService.createPublication(this.newPublication).subscribe({
      next: () => {
        // Cierra el modal si Bootstrap está disponible
        const modalEl = document.getElementById('createPublicationModal');
        if (modalEl && (window as any).bootstrap?.Modal) {
          const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
          modalInstance?.hide();
        }

        this.newPublication = { title: '', content: '', likes: 0, authorId: 0 };

        // Espera unos milisegundos para que se cierre el modal visualmente antes de recargar
        setTimeout(() => this.loadPublications(), 300);
      },
      error: (err) => {
        console.error('Error al crear publicación:', err);
      }
    });

  }

}
