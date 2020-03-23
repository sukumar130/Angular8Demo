import { Injectable, Inject, OnInit } from '@angular/core';
import { Product } from '../entities/product.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, first } from 'rxjs/operators';

@Injectable()
export class ProductService implements OnInit{

  private products: Product[];

  constructor(private http: HttpClient) {  }

  getProducts() {
    let url = environment.apiUrl + '/fct/products';
    return this.http.get<Product[]>(url).pipe(map(result => {
      this.products = result;
      return result;
    }));
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

  ngOnInit() {
    this.getProducts()
        .pipe(first())
        .subscribe(res => {
          this.products = res;
        },
        error => {
          console.error(error);
        });
  }

}
