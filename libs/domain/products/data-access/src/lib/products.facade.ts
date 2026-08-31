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
  Observable,
  tap,
  catchError,
  map,
  EMPTY,
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  private readonly service = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly search = signal<string>('');
  readonly statusFilter = signal<'all' | 'active' | 'inactive'>('all');

  readonly products = computed(() => {
    const list = this._products();
    const query = this.search().toLowerCase().trim();
    const status = this.statusFilter();

    return list
      .filter((p) => {
        if (status === 'active') return p.active;
        if (status === 'inactive') return !p.active;
        return true;
      })
      .filter((p) => !query || p.name.toLowerCase().includes(query));
  });

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

  loadProducts(): void {
    this._loading.set(true);
    this.service
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this._products.set(products);
          this._loading.set(false);
        },
        error: () => {
          this._error.set('Error al cargar los productos');
          this._loading.set(false);
        },
      });
  }

  delete(id: string): void {
    this.service
      .deleteProduct(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() =>
          this._products.update((list) => list.filter((el) => el.id !== id)),
        ),
      )
      .subscribe({
        next: () => this.loadProducts(),
      });
  }

  updateProduct(id: string, form: ProductFormValue): Observable<void> {
    return this.service.updateProduct(id, form).pipe(
      tap((updated) =>
        this._products.update((list) =>
          list.map((p) => (p.id === id ? updated : p)),
        ),
      ),
      map(() => void 0),
      catchError((err) => {
        this._error.set(err.message);
        return EMPTY; // o throwError si querés que el container también reaccione
      }),
    );
  }

  addProduct(form: ProductFormValue): Observable<Product> | void {
    this._error.set(null);

    if (this._products().some((prd) => prd.name === form.name)) {
      this._error.set(
        'El producto no se puede agregar porque ya existe un producto con el mismo nombre.',
      );
      return;
    }
    const payload = { ...form, active: true };
    console.log('Adding product with payload:', payload);
    return this.service
      .addProduct(payload)
      .pipe(tap(() => this.loadProducts()));
  }

  setSearch(value: string): void {
    this.search.set(value);
  }

  setStatusFilter(filter: 'all' | 'active' | 'inactive'): void {
    this.statusFilter.set(filter);
  }
}
