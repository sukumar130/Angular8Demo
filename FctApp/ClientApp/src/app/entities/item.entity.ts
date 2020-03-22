import { Product } from './product.entity';

export interface Item {
  product: Product;
  quantity: number;
}
