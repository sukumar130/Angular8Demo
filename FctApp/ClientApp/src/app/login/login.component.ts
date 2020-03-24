import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

//import { AuthenticationService } from '@app/services';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../entities/username.entity';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  //error = '';
  errors = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let userpwd = {} as User;
    userpwd.name = this.f.username.value, userpwd.password = this.f.password.value;

    this.authenticationService.login(userpwd)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          //this.error = 'Username or password is incorrect, try again please!';
          this.loading = false;
          this.errors = [];

          switch (error.status) {
            case 400:
              // handle validation error
              for (var errorArray in error.error.errors) {
                if (error.error.errors.hasOwnProperty(errorArray)) {
                  let msgs = error.error.errors[errorArray];
                  for (var msg in msgs) {
                    this.errors.push(msgs[msg]);
                    //console.log(msgs[msg]);
                  }
                }
              }
              break;
            case 404:
              this.errors.push(error.error);
              break;
            default:
              this.errors.push("something went wrong!");
          }

        });

  }
}
