// products-features: containers (smart) + rutas lazy del dominio.
// Reglas:
//   - Containers inyectan el facade y mapean a ViewModels.
//   - UI abajo (inputs/outputs). UI NUNCA importa data-access.
//   - Las rutas se exportan como `PRODUCTS_ROUTES` para lazy load.
import { Route } from '@angular/router';
import { ProductsPlaceholderComponent } from './lib/products-placeholder.component';

export const PRODUCTS_ROUTES: Route[] = [
  {
    path: '',
    component: ProductsPlaceholderComponent,
  },
];
