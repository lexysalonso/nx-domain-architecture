import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full',
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('@proj/domain/appointments/features').then(
        (m) => m.APPOINTMENTS_ROUTES,
      ),
  },
  {
    path: '**',
    redirectTo: 'appointments',
  },
  // ✅ En espera de dominio 2 (clientes) - pendiente estructura
  // ✅ En espera de dominio 3 (productos) - pendiente placeholder
];