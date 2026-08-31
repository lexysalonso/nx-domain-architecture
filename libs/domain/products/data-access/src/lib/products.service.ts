import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  Product,
  ProductFormValue,
  SEED_PRODUCTS,
} from '@proj/domain/products/model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@proj/core';

const STORAGE_KEY = 'proj_products';
const MAX_PRODUCTS = 10;

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = inject(API_URL);
  private readonly _baseUrl = `${this._apiUrl}/products4234234`;

  private readStorage(): Product[] {

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private writeStorage(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  private ensureSeeded(): Product[] {
    const stored = this.readStorage();
    if (stored.length === 0) {
      this.writeStorage(SEED_PRODUCTS);
      return SEED_PRODUCTS;
    }
    return stored;
  }

  getProducts(search?: string): Observable<Product[]> {
    let products = this.ensureSeeded();
    if (search?.trim()) {
      const term = search.toLowerCase().trim();
      // Ej llamda al backend
      this._http.get<Product[]>(this._baseUrl, {
        params: { search: term },
      });
      products = products.filter((p) => p.name.toLowerCase().includes(term));
    }

    return of(products).pipe(delay(500));
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const products = this.ensureSeeded();
    const newProduct: Product = { ...product, id: crypto.randomUUID() };
    const updated = [...products, newProduct].slice(-MAX_PRODUCTS);
    this.writeStorage(updated);
    // Ej post aback
    return this._http.post<Product>(this._baseUrl, newProduct);
    return of(newProduct).pipe(delay(300));
  }

  updateProduct(id: string, form: ProductFormValue): Observable<Product> {
    const products = this.ensureSeeded();
    const existing = products.find((p) => p.id === id);

    if (!existing) {
      return throwError(() => new Error(`Producto con id ${id} no encontrado`));
    }

    const updated: Product = { ...existing, ...form, id };
    const newList = products.map((p) => (p.id === id ? updated : p));
    this.writeStorage(newList);
    // Ej put aback
    this._http.put<Product>(`${this._baseUrl}/${id}`, updated);
    return of(updated).pipe(delay(300));
  }

  deleteProduct(id: string): Observable<Product[]> {
    const products = this.ensureSeeded();
    const existing = products.find((p) => p.id === id);

    if (!existing) {
      return throwError(() => new Error(`Producto con id ${id} no encontrado`));
    }
    const newProducts = products.filter((p) => p.id != id);
    this.writeStorage(newProducts);
    // Ej delete aback
    this._http.delete<Product>(`${this._baseUrl}/${id}`);
    return of(newProducts).pipe(delay(300));
  }
}
