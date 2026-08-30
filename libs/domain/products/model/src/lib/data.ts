import { Product } from './product.model';

export const SEED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Teclado mecánico',
    price: 45.99,
    stock: 12,
    active: true,
    category: 'Periféricos',
  },
  {
    id: '2',
    name: 'Mouse inalámbrico',
    price: 19.5,
    stock: 0,
    active: false,
    category: 'Periféricos',
  },
  {
    id: '3',
    name: 'Monitor 27"',
    price: 320.0,
    stock: 5,
    active: true,
    category: 'Monitores',
  },
  {
    id: '4',
    name: 'Auriculares Bluetooth',
    price: 89.99,
    stock: 0,
    active: false,
    category: 'Audio',
  },
  {
    id: '5',
    name: 'Webcam HD',
    price: 45.0,
    stock: 8,
    active: true,
    category: 'Periféricos',
  },
];
