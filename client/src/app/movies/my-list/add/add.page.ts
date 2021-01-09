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
  type = {};
  //para que no dé error add.page.html

  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

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

  addMovieToList() {
    const { title, genre, year, image, plot, type } = this.form;

    console.log("Title is : " + title);
    console.log("Year is : " + year);
    console.log("Image is : " + image);
    console.log("Genre is : " + genre);
    console.log("Plot is : " + plot);
    console.log("Type is:" + type);

    const newMovie = {
      title,
      genre,
      year,
      image,
      plot,
      type,
    };
    console.log(newMovie);
    return this.myListService.postItem(newMovie);
  }

  getBackToMyList() {
    this.router.navigate(["/myList"]);
    return;
  }

  onSubmit() {
    if (!this.types.includes(this.form.type))
      return console.log("error de type");
    if (this.form.image === "" || !this.urlRegex.test(this.form.image)) {
      this.form.image = "https://simpleicon.com/wp-content/uploads/movie-3.png";
    }
    this.addMovieToList();
    this.getBackToMyList();
  }
}
