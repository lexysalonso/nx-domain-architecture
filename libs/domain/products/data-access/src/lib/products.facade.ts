import { Injectable, signal, computed, inject } from '@angular/core';
import { Product, ProductFormValue } from '@proj/domain/products/model';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  private readonly service = inject(ProductsService);

  private readonly _allProducts = signal<Product[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _search = signal<string>('');

  readonly loading = this._loading.asReadonly();
  readonly search = this._search.asReadonly();

  readonly products = computed(() => {
    const query = this._search().toLowerCase().trim();
    const list = this._allProducts();
    if (!query) return list;
    return list.filter((p) => p.name.toLowerCase().includes(query));
  });

  loadProducts(): void {
    this._loading.set(true);
    this.service.getProducts().subscribe({
      next: (products) => {
        this._allProducts.set(products);
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

  setSearch(value: string): void {
    this._search.set(value);
  }
}
