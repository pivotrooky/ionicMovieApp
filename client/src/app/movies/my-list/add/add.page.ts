import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"],
})
export class AddPage implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  types = ["movie", "series"];
  type = {};
  //para que no dé error add.page.html

  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

  ngOnInit() {}

  @ViewChild("f") movieForm: NgForm;

  onCancel() {
    this.router.navigate(["/myList"]);
  }

  onClear() {
    this.movieForm.reset();
  }

  addMovieToList(form: NgForm) {
    console.log("Title is : " + form.value.title);
    console.log("Year is : " + form.value.year);
    console.log("Image is : " + form.value.image);
    console.log("Genre is : " + form.value.genre);
    console.log("Plot is : " + form.value.plot);
    console.log("Type is:" + form.value.type);

    const { title, genre, year, image, plot, type } = form.value;

    if (!this.types.includes(type)) return console.log("error de type");
    if (image !== "" && !this.urlRegex.test(image))
      return console.log("error de image");

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
    return this.http
      .post("http://localhost:3001/movies/", newMovie)
      .subscribe();
  }

  getBackToMyList() {
    this.router.navigate(["/myList"]);
    return;
  }

  onSubmit(f) {
    this.addMovieToList(f);
    this.getBackToMyList();
  }
}
