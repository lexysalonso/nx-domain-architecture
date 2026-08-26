import { Injectable, signal, computed, inject } from '@angular/core';
import { Product, ProductFormValue } from '@proj/domain/products/model';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  private readonly service = inject(ProductsService);

  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _statusFilter = signal<'all' | 'active' | 'inactive'>('all');

  readonly loading = this._loading.asReadonly();
  readonly statusFilter = this._statusFilter.asReadonly();

  readonly products = computed(() => {
    const filter = this._statusFilter();
    const list = this._products();
    if (filter === 'active') return list.filter((p) => p.active);
    if (filter === 'inactive') return list.filter((p) => !p.active);
    return list;
  });

  loadProducts(): void {
    this._loading.set(true);
    this.service.getProducts().subscribe({
      next: (products) => {
        this._products.set(products);
        this._loading.set(false);
      },
      error: () => this._loading.set(false),
    });
  }

  addProduct(form: ProductFormValue): void {
    const payload = { ...form, active: true };
    this.service.addProduct(payload).subscribe(() => {
      this.loadProducts();
    });
  }

  setStatusFilter(filter: 'all' | 'active' | 'inactive'): void {
    this._statusFilter.set(filter);
  }
}
