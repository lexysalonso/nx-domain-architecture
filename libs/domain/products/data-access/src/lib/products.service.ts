import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product, SEED_PRODUCTS } from '@proj/domain/products/model';

const STORAGE_KEY = 'proj_products';
const MAX_PRODUCTS = 10;

@Injectable({ providedIn: 'root' })
export class ProductsService {
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

  getProducts(): Observable<Product[]> {
    const products = this.ensureSeeded();
    return of(products).pipe(delay(500));
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const products = this.ensureSeeded();
    const newProduct: Product = { ...product, id: crypto.randomUUID() };
    const updated = [...products, newProduct].slice(-MAX_PRODUCTS);
    this.writeStorage(updated);
    return of(newProduct).pipe(delay(300));
  }
}
