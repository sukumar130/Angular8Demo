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
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(http, baseUrl, productService) {
        var _this = this;
        this.http = http;
        this.baseUrl = baseUrl;
        this.productService = productService;
        this.totalProducts = 0;
        this.isPriceAsc = true;
        this.sortedCssClass = "arrow-up";
        var url = this.baseUrl + 'fct/products';
        //console.log(url);
        http.get(url).subscribe(function (result) {
            _this.products = result;
            _this.totalProducts = _this.products.length;
        }, function (error) {
            _this.error = "There might have API or Database not responding. Please contact to Application Admin.";
            console.error(error);
        });
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
    };
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'app-products',
            templateUrl: './products.component.html'
        }),
        __param(1, core_1.Inject('BASE_URL'))
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=Products.component.js.map