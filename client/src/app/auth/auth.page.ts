import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  login(email, password) {
    this.authService
      .login(email, password)
      .then((response) => {
        console.log(response)
        this.authService.setUserInfo(response);
        this.router.navigate(["myList"]);
      })
      .catch(({error}) => this.showAlert(error));
  }

  signup(email, password) {
    this.authService
      .signup(email, password)
      .then((response) => {
        console.log(response)
      })
      .catch(({error}) => this.showAlert(error));
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;
    form.reset();
    if (this.isLogin) return this.login(email, password);
    return this.signup(email, password);
  }

  showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "Authentication failed",
        message,
        buttons: ["Okay"],
      })
      .then((alertEl) => alertEl.present());
  }
}
