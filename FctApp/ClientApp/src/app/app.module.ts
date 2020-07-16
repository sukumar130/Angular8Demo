import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { ReactiveFormsModule }  from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule }         from '@angular/router';

import { AppComponent }       from './app.component';
import { NavMenuComponent }   from './nav-menu/nav-menu.component';
import { HomeComponent }      from './home/home.component';
import { ProductsComponent }  from './Products/Products.component';
import { CartComponent }      from './Cart/Cart.component';
import { LoginComponent }     from './login/login.component'
import { LogoutComponent }    from './logout/logout.component'

import { ProductService }     from './services/product.service';
import { AuthGuard }          from './services/auth.guard';
import { JwtInterceptor }     from './services/jwt.interceptor';
import { ErrorInterceptor }   from './services/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
      { path: 'cart', component: CartComponent },
      //{ path: 'cart/:id', component: CartComponent },
      { path: 'logout', component: LogoutComponent },
      { path: '**', component: HomeComponent } //not found, go home
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
