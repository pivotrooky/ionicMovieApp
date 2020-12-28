import { Component, ElementRef, ViewChild } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MyListService } from "../../../services/my-list.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"],
})
export class AddPage{
  @ViewChild("imageControl") imageControl: ElementRef;
  constructor(private router: Router, private myListService: MyListService) {}

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

  @ViewChild("f") movieForm: NgForm;

  onCancel() {
    this.router.navigate(["/myList"]);
  }

  onClear() {
    this.movieForm.reset();
  }

  addMovieToList() {
    const { title, genre, year, image, plot, type } = this.form;

    
    console.log("Title is : " + title);
    console.log("Year is : " + year);
    console.log("Image is : " + image);
    console.log("Genre is : " + genre);
    console.log("Plot is : " + plot);
    console.log("Type is:" + type);

    const userId = 1;
    const newMovie = {
      title,
      genre,
      year,
      image,
      plot,
      type,
      userId,
    };
    console.log(newMovie);
    return this.myListService.postItem(newMovie);
  }

  getBackToMyList() {
    this.router.navigate(["/myList"]);
    return;
  }

  onSubmit() {
    if (!this.types.includes(this.form.type)) return console.log("error de type");
    if (this.form.image !== "" && !this.urlRegex.test(this.form.image)) {
      this.form.image = "Image URL must be valid"!;
      console.log(this.imageControl)
      this.imageControl?.nativeElement?.focus();
      //bug
      return console.log("error de image");
    }
    //arreglar esto!
    this.addMovieToList();
    this.getBackToMyList();
  }
}
