import { NgForm} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
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

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;
    form.reset();
    return this.login(email, password);
    //return this.signup(email, password);
  }

  showAlert(message: string) {
    if (typeof message !== "string") message = "Unknown error";
    this.alertCtrl
      .create({
        header: "Authentication failed",
        message,
        buttons: ["Okay"],
      })
      .then((alertEl) => alertEl.present());
  }
}
