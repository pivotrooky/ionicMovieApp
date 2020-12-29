import { MyListService } from "../../../services/my-list.service";
import { SearchService } from "../../../services/search.service";
import { AuthService } from "../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-movie-details",
  templateUrl: "./my-detail.page.html",
  styleUrls: ["./my-detail.page.scss"],
})
export class MyDetailPage implements OnInit {
  isOwner = false;
  item = null;
  originalItem = null;
  id = null;
  imdbID = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private myListService: MyListService,
    private searchService: SearchService,
    public navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    //mejorar con caché pero tener cuidado de no renderizar información desactualizada?
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.myListService.getMyDetails(this.id).subscribe((result) => {
      this.item = result;
      this.checkOwnership();
      this.searchService.getDetails(this.item?.imdbID).subscribe((result) => {
        this.originalItem = result;
      });
    });
  }

  checkOwnership() {
    if (this.item !== null) {
      let userId = this.authService.getUserId();
      if (this.item.userId !== userId) return this.router.navigate(["/myList"]);
      return this.isOwner = true;
    }
  }

  ionViewWillEnter() {
    this.isOwner = false;
    this.checkOwnership();
  }

  ionViewDidEnter() {
    if (!this.item?.title) return this.router.navigate(["/myList"]);
  }

  openWebsite() {
    window.open(this.item.Website, "_blank");
  }

  removeThisAndGetOut() {
    this.removeThisFromMyList();
    this.router.navigate(["/myList"]);
  }

  removeThisFromMyList() {
    return this.myListService.removeItem(this.id).subscribe();
  }

  restoreDataFromOMDB() {
    this.myListService.restoreDataFromOMDB(this.originalItem, this.id);
    this.router.navigate(["/myList"]);
  }
}
