import { Component} from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MyListService } from "../../../services/my-list.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"],
})
export class EditPage {
  constructor(
    private router: Router,
    private myListService: MyListService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  form = {
    title: null,
    genre: null,
    year: null,
    image: null,
    plot: null,
    type: null,
  };

  submitted = false;
  movieId = null;
  item = null;
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;

  ionViewDidEnter() {
    this.movieId = this.activatedRoute.snapshot.paramMap.get("id");

    this.myListService.getMyDetails(this.movieId).subscribe((result) => {
      this.item = result;
      this.checkOwnership();
      this.onReset();
    }, err => console.log(err));
  }

  checkOwnership() {
    let userId = this.authService.getUserId();
    if (!this.item || this.item.userId !== userId)
      return this.router.navigate(["/myList"]);

    return;
  }

  editMovie() {
    const { title, genre, year, image, plot, type } = this.form;

    const newData = {
      title,
      genre,
      year,
      image,
      plot,
      type,
    };
    return this.myListService.putMovie(this.movieId, newData);
  }

  getBackToMyList() {
    this.router.navigate(["/myList"]);
    return;
  }

  onCancel() {
    this.router.navigate(["/myList"]);
  }

  onSubmit() {
    if (this.form.year > 2030) this.form.year = 2030;
    if (this.form.image === "" || !this.urlRegex.test(this.form.image)) {
      this.form.image = "https://simpleicon.com/wp-content/uploads/movie-3.png";
    }

    this.editMovie();
    this.getBackToMyList();
  }

  onReset() {
    if (!this.item) return;
    const { title, genre, year, image, plot, type } = this.item;
    this.form = { title, genre, year, image, plot, type };
  }

  validateYear() {
    if (this.form.year > 2030) return (this.form.year = 2030);
  }
}
