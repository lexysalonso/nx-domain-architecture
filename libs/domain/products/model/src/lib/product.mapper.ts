import { Product, ProductViewModel } from './product.model';

export function toProductViewModel(product: Product): ProductViewModel {
  return {
    id: product.id,
    name: product.name,
    priceFormatted: `$${product.price.toFixed(2)}`,
    stock: product.stock,
    statusLabel: product.active ? 'Activo' : 'Inactivo',
    statusClass: product.active ? 'badge-success' : 'badge-muted',
  };
}
