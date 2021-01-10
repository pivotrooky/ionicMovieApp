import { Component, ElementRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { MyListService } from "../../../services/my-list.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"],
})
export class AddPage {
  @ViewChild("imageControl") imageControl: ElementRef;
  constructor(
    private router: Router,
    private myListService: MyListService,
    private alertCtrl: AlertController
  ) {}

  form = {
    title: null,
    genre: null,
    year: null,
    image: null,
    plot: null,
    type: null,
  };
  types = ["movie", "series"];

  //important for add.page.html to show form correctly
  type = {};

  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

  addMovieToList() {
    const { title, genre, year, image, plot, type } = this.form;

    const newMovie = {
      title,
      genre,
      year,
      image,
      plot,
      type,
    };
    return this.myListService.postMovie(newMovie);
  }

  onCancel() {
    this.router.navigate(["/myList"]);
  }

  onClear(form: NgForm) {
    this.alertCtrl
      .create({
        header: "Confirm!",
        message: "Are you sure you want to reset this form?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Okay",
            handler: () => {
              form.reset();
            },
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }

  onSubmit() {
    if (this.form.year > 2030) this.form.year = 2030;
    if (!this.types.includes(this.form.type))
      return;
    if (this.form.image === "" || !this.urlRegex.test(this.form.image)) {
      this.form.image = "https://simpleicon.com/wp-content/uploads/movie-3.png";
      //may this be a local resource? would sequelize allow it?
    }
    this.addMovieToList();
    this.getBackToMyList();
  }

  getBackToMyList() {
    this.router.navigate(["/myList"]);
    return;
  }

  validateYear() {
    if (this.form.year > 2030) return (this.form.year = 2030);
  }
}
