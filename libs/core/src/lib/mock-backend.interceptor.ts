import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';

// ── Mock data (solo para desarrollo sin backend) ──
// Por qué inline: core no puede importar de ningún dominio.
// Cuando tengas el backend real, eliminá este archivo.
interface ClienteApiMock {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  activo: boolean;
  fechaCreacion: string;
}

const MOCK_CLIENTES: ClienteApiMock[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@email.com',
    activo: true,
    fechaCreacion: '2024-01-15',
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'García',
    email: 'maria.garcia@email.com',
    activo: true,
    fechaCreacion: '2024-03-22',
  },
  {
    id: 3,
    nombre: 'Carlos',
    apellido: 'López',
    email: 'carlos.lopez@email.com',
    activo: false,
    fechaCreacion: '2024-06-10',
  },
  {
    id: 4,
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana.martinez@email.com',
    activo: true,
    fechaCreacion: '2025-01-05',
  },
  {
    id: 5,
    nombre: 'Pedro',
    apellido: 'Sánchez',
    email: 'pedro.sanchez@email.com',
    activo: false,
    fechaCreacion: '2025-02-18',
  },
];

// ── Interceptor functional (Angular 15+) ──
export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url === '/api/clientes') {
    return of(new HttpResponse({ status: 200, body: MOCK_CLIENTES })).pipe(
      delay(800)
    );
  }
  return next(req);
};
