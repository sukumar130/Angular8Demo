"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(http, productService) {
        this.http = http;
        this.productService = productService;
        this.totalProducts = 0;
        this.pageStatus = "Loading...";
        this.isPriceAsc = true;
        this.sortedCssClass = "arrow-up";
    }
    ProductsComponent.prototype.sortby = function (colmun) {
        var array = this.products;
        this.products = this.isPriceAsc ?
            array.sort(function (a, b) { return 0 - (a.price > b.price ? 1 : -1); }) //desc
            :
                array.sort(function (a, b) { return 0 - (a.price > b.price ? -1 : 1); }); //asc
        this.isPriceAsc = !this.isPriceAsc;
        this.getSortedCssClass();
        //console.log(this.isPriceAsc);
    };
    ;
    ProductsComponent.prototype.getSortedCssClass = function () {
        this.sortedCssClass = this.isPriceAsc ? "arrow-up" : "arrow-down";
    };
    ;
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productService
            .getProducts()
            .pipe(operators_1.first())
            .subscribe(function (res) {
            _this.products = res;
            _this.totalProducts = _this.products.length;
        }, function (error) {
            _this.pageStatus = "There might have an API or Database not responding. Please contact to Application Admin.";
            console.error(error);
        });
    };
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'app-products',
            templateUrl: './products.component.html'
        }),
        core_1.Injectable()
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=Products.component.js.map