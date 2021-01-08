import { NgForm} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {}

  signup(email, password) {
    this.authService
      .signup(email, password)
      .then((response) => {
        console.log(response)
      })
      .catch(({error}) => this.showAlertAuth(error));
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;
    form.reset();
    this.signup(email, password);
    return this.router.navigate(["/login"]);
  }

  showAlertAuth(message: string) {
    this.alertCtrl
      .create({
        header: "Authentication failed",
        message,
        buttons: ["Okay"],
      })
      .then((alertEl) => alertEl.present());
  }
}
