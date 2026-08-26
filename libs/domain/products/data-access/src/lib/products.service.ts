import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '@proj/domain/products/model';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Teclado mecánico', price: 45.99, stock: 12, active: true },
  { id: '2', name: 'Mouse inalámbrico', price: 19.5, stock: 0, active: false },
  { id: '3', name: 'Monitor 27"', price: 320.0, stock: 5, active: true },
  { id: '4', name: 'Auriculares Bluetooth', price: 89.99, stock: 0, active: false },
  { id: '5', name: 'Webcam HD', price: 45.0, stock: 8, active: true },
];

@Injectable({ providedIn: 'root' })
export class ProductsService {
  getProducts(): Observable<Product[]> {
    return of(MOCK_PRODUCTS).pipe(delay(500));
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newProduct: Product = { ...product, id: crypto.randomUUID() };
    return of(newProduct).pipe(delay(300));
  }
}
