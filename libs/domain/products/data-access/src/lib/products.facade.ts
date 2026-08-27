import {
  Injectable,
  signal,
  computed,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Product, ProductFormValue } from '@proj/domain/products/model';
import { ProductsService } from './products.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  private readonly service = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal<boolean>(false);

  readonly loading = this._loading.asReadonly();
  readonly search = signal<string>('');

  readonly products = this._products.asReadonly();

  private readonly search$ = toObservable(this.search).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) => this.service.getProducts(term)),
    takeUntilDestroyed(this.destroyRef),
  );

  init(): void {
    this.loadProducts();
    this.search$.subscribe({
      next: (products) => this._products.set(products),
    });
  }

  private loadProducts(): void {
    this._loading.set(true);
    this.service.getProducts().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
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

  setSearch(value: string): void {
    this.search.set(value);
  }
}
