import { Route } from '@angular/router';

// ── Rutas del dominio clientes ──
// Por qué: cada dominio owns sus rutas.
// El router raíz usa loadChildren para lazy-load.
// Uso: { path: 'clientes', loadChildren: () => import('@proj/domain/clientes/features').then(m => m.CLIENTES_ROUTES) }
export const CLIENTES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./clientes-list-container.component').then(
        (m) => m.ClientesListContainerComponent
      ),
  },
];
