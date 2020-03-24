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
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService, _http, baseUrl) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this._http = _http;
        this.baseUrl = baseUrl;
        this.loading = false;
        this.submitted = false;
        //error = '';
        this.errors = [];
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        var userpwd = {};
        userpwd.name = this.f.username.value, userpwd.password = this.f.password.value;
        this.authenticationService.login(userpwd)
            .pipe(operators_1.first())
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            console.log(error);
            //this.error = 'Username or password is incorrect, try again please!';
            _this.loading = false;
            _this.errors = [];
            switch (error.status) {
                case 400:
                    // handle validation error
                    for (var errorArray in error.error.errors) {
                        if (error.error.errors.hasOwnProperty(errorArray)) {
                            var msgs = error.error.errors[errorArray];
                            for (var msg in msgs) {
                                _this.errors.push(msgs[msg]);
                                //console.log(msgs[msg]);
                            }
                        }
                    }
                    break;
                case 404:
                    _this.errors.push(error.error);
                    break;
                default:
                    _this.errors.push("something went wrong!");
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: 'login.component.html'
        }),
        __param(5, core_1.Inject('BASE_URL'))
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map