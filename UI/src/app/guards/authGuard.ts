import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const publicRoutes = ['login'];

  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  if (!isBrowser) return false;

  const currentRoute = route.routeConfig?.path || '';

  // Si es una ruta pública, permitir acceso
  if (publicRoutes.includes(currentRoute)) return true;

  // Función para leer cookies
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };

  const token = getCookie('token');

  if (token) {
    return true; // ✅ Token presente, permitir acceso
  }

  // ❌ No hay token, redirigir a login
  router.navigate(['/login']);
  return false;
};
