import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full',
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('@proj/domain/clientes/features').then((m) => m.CLIENTES_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('@proj/domain/products/features').then((m) => m.PRODUCTS_ROUTES),
  },
];
