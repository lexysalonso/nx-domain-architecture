import { Component, ChangeDetectionStrategy, inject, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsFacade } from '@proj/domain/products/data-access';
import { toProductViewModel } from '@proj/domain/products/model';
import { ProductTableComponent } from '@proj/domain/products/ui';

@Component({
  selector: 'app-list-products-container',
  standalone: true,
  imports: [ProductTableComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Productos</h2>
      <a
        routerLink="/products/add"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        + Agregar Producto
      </a>
    </div>
    <app-product-table
      [products]="viewModels()"
      [loading]="facade.loading()"
    />
  `,
})
export class ListProductsContainer implements OnInit {
  protected readonly facade = inject(ProductsFacade);

  protected readonly viewModels = computed(() =>
    this.facade.products().map(toProductViewModel)
  );

  ngOnInit(): void {
    this.facade.loadProducts();
  }
}
