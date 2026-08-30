export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  active: boolean;
  category: string;
}

export interface ProductViewModel {
  id: string;
  name: string;
  priceFormatted: string;
  stock: number;
  statusLabel: 'Activo' | 'Inactivo';
  statusClass: string;
  category: string;
}

export interface ProductFormValue {
  name: string;
  price: number;
  stock: number;
  category: string;
}
