import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../entities/product.entity';
import { Item } from '../entities/item.entity';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Purchase } from '../entities/purchase.entity';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {
  public isanyitemincart: boolean = false;

  private items: Item[] = [];
  private total: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        var item: Item = {
          product: this.productService.find(id),
          quantity: 1
        };
        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
          for (var i = 0; i < cart.length; i++) {
            let item: Item = JSON.parse(cart[i]);
            if (item.product.id == id) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let item: Item = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        }
        this.loadCart();
      } else {
        this.loadCart();
      }
    });
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
    this.isanyitemincart = this.items.length > 0;
  }

  remove(id: number): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

  PurchaseItems(): void {
    this.total = 0;
    let purchaseitems: Purchase[] = [];

    let cart = JSON.parse(localStorage.getItem('cart'));
    let userid = this.authenticationService.currentUserValue.id;

    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);

      purchaseitems.push({
        id:0,
        productid: item.product.id,
        quantity: item.quantity,
        userid: userid
      });
    }

    let url = environment.apiUrl + '/fct/purchaseitems';
    this.http.post<Purchase[]>(url, purchaseitems)
      .subscribe(result => {
        if (result) {
          localStorage.removeItem('cart');
          this.router.navigate(['/products']);
        } else {
          this.loadCart();
        };
        //console.log('Posted ' + result);
      }, error => console.error(error));
  }

  //PurchaseItems(): void {
  //  this.total = 0;
  //  this.items = [];
  //  let cart = JSON.parse(localStorage.getItem('cart'));

  //  for (var i = 0; i < cart.length; i++) {
  //    let item = JSON.parse(cart[i]);
  //    this.items.push({
  //      product: item.product,
  //      quantity: item.quantity
  //    });
  //  }

  //  //console.log(this.items);
  //  let url = this.baseUrl + 'fct/purchaseproduct';
  //  this.http.post<Item[]>(url, this.items)
  //    .subscribe(result => {
  //      if (result) {
  //        localStorage.clear();
  //        this.router.navigate(['/products']);
  //      };
  //      //console.log('Posted ' + result);
  //    }, error => console.error(error));
  //}

}
