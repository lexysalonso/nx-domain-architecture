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
  /* {
    path: 'clientes',
    loadChildren: () =>
      import('@proj/domain/clientes/features').then((m) => m.CLIENTES_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('@proj/domain/products/features').then((m) => m.PRODUCTS_ROUTES),
  }, */
];
