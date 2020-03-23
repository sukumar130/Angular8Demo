"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var operators_1 = require("rxjs/operators");
var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
    }
    ProductService.prototype.getProducts = function () {
        var _this = this;
        var url = environment_1.environment.apiUrl + '/fct/products';
        return this.http.get(url).pipe(operators_1.map(function (result) {
            _this.products = result;
            return result;
        }));
    };
    ProductService.prototype.findAll = function () {
        return this.products;
    };
    ProductService.prototype.find = function (id) {
        return this.products[this.getSelectedIndex(id)];
    };
    ProductService.prototype.getSelectedIndex = function (id) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                return i;
            }
        }
        return -1;
    };
    ProductService.prototype.ngOnInit = function () {
        var _this = this;
        this.getProducts()
            .pipe(operators_1.first())
            .subscribe(function (res) {
            _this.products = res;
        }, function (error) {
            console.error(error);
        });
    };
    ProductService = __decorate([
        core_1.Injectable()
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map