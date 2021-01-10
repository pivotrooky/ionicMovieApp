import { SearchService } from "../../../services/search.service";
import { MyListService } from "../../../services/my-list.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-movie-details",
  templateUrl: "./detail.page.html",
  styleUrls: ["./detail.page.scss"],
})
export class DetailPage implements OnInit {
  information = null;
  id = null;
  local = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private myListService: MyListService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.getLocalID();

    this.searchService.getDetails(this.id).subscribe((result) => {
      this.information = result;
    }, err => console.log(err));
  }

  ionViewDidEnter() {
    this.getLocalID();
    this.goToLocalItem();
  }

  getLocalID() {
    this.myListService.getLocalID(this.id, this.authService.getUserId()).subscribe((data) => {
      this.local = data;
      this.goToLocalItem();
    }, err => console.log(err));
  }

  openWebsite() {
    window.open(this.information.Website, "_blank");
  }

  goToLocalItem(localID = this.local?.localID) {
    if (typeof localID !== "number") return;
    this.router.navigateByUrl("/myList/" + localID, { replaceUrl: true });
  }

  goToMyList() {
    this.router.navigate(["/myList"]);
  }

  addMovieToList() {
    this.myListService.addMovieFromOMDB(this.information);
    this.goToMyList();
  }
}
