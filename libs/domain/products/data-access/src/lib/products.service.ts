import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '@proj/domain/products/model';

const STORAGE_KEY = 'proj_products';
const MAX_PRODUCTS = 10;

const SEED_PRODUCTS: Product[] = [
  { id: '1', name: 'Teclado mecánico', price: 45.99, stock: 12, active: true },
  { id: '2', name: 'Mouse inalámbrico', price: 19.5, stock: 0, active: false },
  { id: '3', name: 'Monitor 27"', price: 320.0, stock: 5, active: true },
  { id: '4', name: 'Auriculares Bluetooth', price: 89.99, stock: 0, active: false },
  { id: '5', name: 'Webcam HD', price: 45.0, stock: 8, active: true },
];

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
