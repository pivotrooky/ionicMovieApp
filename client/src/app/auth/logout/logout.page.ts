import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.page.html",
  styleUrls: ["./logout.page.scss"],
})
export class LogoutPage {
  constructor(private authService: AuthService, private router: Router) {}

  ionViewDidEnter() {
    this.authService
      .logout()
      .then(() => this.router.navigate(["/myList"]))
      .catch((error) => console.log(error));
  }
}
