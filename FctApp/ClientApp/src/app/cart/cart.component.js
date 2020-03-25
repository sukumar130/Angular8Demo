"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var CartComponent = /** @class */ (function () {
    function CartComponent(activatedRoute, productService, http, router, baseUrl, authenticationService) {
        this.activatedRoute = activatedRoute;
        this.productService = productService;
        this.http = http;
        this.router = router;
        this.baseUrl = baseUrl;
        this.authenticationService = authenticationService;
        this.isanyitemincart = false;
        this.items = [];
        this.total = 0;
    }
    CartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var id = params['id'];
            if (id) {
                var item = {
                    product: _this.productService.find(id),
                    quantity: 1
                };
                if (localStorage.getItem('cart') == null) {
                    var cart = [];
                    cart.push(JSON.stringify(item));
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
                else {
                    var cart = JSON.parse(localStorage.getItem('cart'));
                    var index = -1;
                    for (var i = 0; i < cart.length; i++) {
                        var item_1 = JSON.parse(cart[i]);
                        if (item_1.product.id == id) {
                            index = i;
                            break;
                        }
                    }
                    if (index == -1) {
                        cart.push(JSON.stringify(item));
                        localStorage.setItem('cart', JSON.stringify(cart));
                    }
                    else {
                        var item_2 = JSON.parse(cart[index]);
                        item_2.quantity += 1;
                        cart[index] = JSON.stringify(item_2);
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                }
                _this.loadCart();
            }
            else {
                _this.loadCart();
            }
        });
    };
    CartComponent.prototype.loadCart = function () {
        this.total = 0;
        this.items = [];
        var cart = JSON.parse(localStorage.getItem('cart'));
        for (var i = 0; i < cart.length; i++) {
            var item = JSON.parse(cart[i]);
            this.items.push({
                product: item.product,
                quantity: item.quantity
            });
            this.total += item.product.price * item.quantity;
        }
        this.isanyitemincart = this.items.length > 0;
    };
    CartComponent.prototype.remove = function (id) {
        var cart = JSON.parse(localStorage.getItem('cart'));
        var index = -1;
        for (var i = 0; i < cart.length; i++) {
            var item = JSON.parse(cart[i]);
            if (item.product.id == id) {
                cart.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        this.loadCart();
    };
    CartComponent.prototype.PurchaseItems = function () {
        var _this = this;
        this.total = 0;
        var purchaseitems = [];
        var cart = JSON.parse(localStorage.getItem('cart'));
        var userid = this.authenticationService.currentUserValue.id;
        for (var i = 0; i < cart.length; i++) {
            var item = JSON.parse(cart[i]);
            purchaseitems.push({
                id: 0,
                productid: item.product.id,
                quantity: item.quantity,
                userid: userid
            });
        }
        var url = environment_1.environment.apiUrl + '/fct/purchaseitems';
        this.http.post(url, purchaseitems)
            .subscribe(function (result) {
            if (result) {
                localStorage.removeItem('cart');
                _this.router.navigate(['/products']);
            }
            else {
                _this.loadCart();
            }
            ;
            //console.log('Posted ' + result);
        }, function (error) { return console.error(error); });
    };
    CartComponent.prototype.BackToProducts = function () {
        this.router.navigate(['/products']);
    };
    CartComponent = __decorate([
        core_1.Component({
            templateUrl: 'cart.component.html'
        }),
        __param(4, core_1.Inject('BASE_URL'))
    ], CartComponent);
    return CartComponent;
}());
exports.CartComponent = CartComponent;
//# sourceMappingURL=cart.component.js.map