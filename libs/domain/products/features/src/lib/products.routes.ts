import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list-products/list-products-container').then(
        (m) => m.ListProductsContainer,
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./add-product/add-product-container').then(
        (m) => m.AddProductContainer,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./edit-product/edit-product-container').then(
        (m) => m.EditProductContainer,
      ),
  }, // NUEVO
];
