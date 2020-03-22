import { Injectable, Inject } from '@angular/core';
import { Product } from '../entities/product.entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

  private products: Product[];

  //constructor() {
  //  this.products = [
  //    { id: 1, name: 'name 1', price: 100 },
  //    { id: 2, name: 'name 2', price: 200 },
  //    { id: 3, name: 'name 3', price: 300 }
  //  ];
  //}

  constructor(
      private http: HttpClient,
      @Inject('BASE_URL') private baseUrl: string)
  {
    let url = this.baseUrl + 'fct/products';
    console.log(url);
    http.get<Product[]>(url).subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }

  findAll(): Product[] {
    return this.products;
  }

  find(id: number): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: number) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }

}
