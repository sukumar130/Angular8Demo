import { Injectable, Inject } from '@angular/core';
import { Product } from '../entities/product.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductService {

  private products: Product[];
  constructor(private http: HttpClient)
  {
    let url = environment.apiUrl + '/fct/products';
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
