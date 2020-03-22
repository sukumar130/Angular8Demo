import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit {
  public totalProducts: number = 0;
  public products: Product[];
  public error: string ;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private productService: ProductService
  ) {
    let url = this.baseUrl + 'fct/products';
    //console.log(url);
    http.get<Product[]>(url).subscribe(
      result => {
      this.products = result;
      this.totalProducts = this.products.length;
      },
      error => {
        this.error = "There might have API or Database not responding. Please contact to Application Admin.";
        console.error(error);
      });

  }

  public isPriceAsc: boolean = true;
  public sortedCssClass: string = "arrow-up";

  sortby(colmun): void {
    let array = this.products;

    this.products = this.isPriceAsc ?
      array.sort((a, b) => 0 - (a.price > b.price ? 1 : -1))  //desc
      :
      array.sort((a, b) => 0 - (a.price > b.price ? -1 : 1)); //asc

    this.isPriceAsc = !this.isPriceAsc;
    this.getSortedCssClass();
    //console.log(this.isPriceAsc);
  };

  getSortedCssClass(): void {
    this.sortedCssClass = this.isPriceAsc ? "arrow-up" : "arrow-down";
  };

  ngOnInit() {

  }
}
