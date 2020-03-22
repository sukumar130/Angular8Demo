import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  templateUrl: 'logout.component.html'
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }


}
