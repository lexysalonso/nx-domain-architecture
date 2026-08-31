import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-products-placeholder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 text-center">
      <h2 class="text-2xl font-semibold text-gray-700">Products</h2>
      <p class="mt-2 text-gray-500">
        Este dominio está listo para implementar como ejercicio.
      </p>
      <p class="mt-1 text-sm text-gray-400">
        Estructura disponible: model · data-access · features · ui
      </p>
    </div>
  `,
})
export class ProductsPlaceholderComponent {}
