import { MyListService } from "../../../services/my-list.service";
import { AuthService } from "../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { SearchService } from "../../../services/search.service";

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
  localStorageList = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private myListService: MyListService,
    public navCtrl: NavController,
    private authService: AuthService,
    private searchService: SearchService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  ionViewWillEnter() {
    this.isOwner = false;
    this.getLocalDetails();
    this.getRemoteDetails();
    this.checkOwnership();
    if (!this.originalItem) this.getOriginalItem();
  }

  ionViewDidEnter() {
  }

  checkOwnership() {
    //there's actually no need to check if this.item is truthy as of yet, because if it's falsy then checkOwnership wouldn't even run.
    //but we include it anyway just for doublechecking

    if (!this.item) return;

    let userId = this.authService.getUserId();
    if (this.item.userId !== userId) return this.router.navigate(["/myList"]);

    //setting this.isOwner to true is also just an extra precaution
    return (this.isOwner = true);
  }

  getLocalDetails() {
    this.localStorageList = JSON.parse(localStorage.getItem("myList"));
    if (!this.localStorageList) return;

    //if I have a local list, check whether there's an item with an ID that matches my item's ID
    let localStorageDetail = this.localStorageList[this.id];
    if (!localStorageDetail) return;

    //if there is such an item, then set this.item to it
    if (localStorageDetail) this.item = localStorageDetail;

    //in this method one could've used optional chaining operators in order to have less "return" statements
    //but I think the code is more readable this way and that's more important
  }

  getOriginalItem() {
    this.searchService
      .getDetails(this.item.imdbID)
      .subscribe((originalDetail) => {
        this.originalItem = originalDetail;
      });
  }

  getRemoteDetails() {
    this.myListService.getMyDetails(this.id).subscribe((newDetail) => {

      //check if local data needs updating
      this.handleDetailRender(newDetail);
    });
  }

  handleDetailRender(newDetail) {
    if (!newDetail) return this.router.navigate(["/myList"]);
    //for when I enter a URL with an ID corresponding to an invalid item

    if (!this.item) return this.updateLocalDetail(newDetail);
    //if there's no 'this.item' in the component, we're gonna have to update it, so no need to enter the loop

    for (let prop in newDetail) {
      if (newDetail[prop] !== this.item[prop]) {
        //if a property is different then we have to update the whole thing
        return this.updateLocalDetail(newDetail);
      }
    }
  }

  openWebsite() {
    window.open(this.item.Website, "_blank");
  }

  updateLocalDetail(newDetail) {
    let thisItemBeforeUpdate = this.item;
    //save a reference before actually making the update

    //here I update the item inside the component before renderization, and in localStorage
     this.item = newDetail;
    this.localStorageList = { ...this.localStorageList, [this.id]: newDetail };
    localStorage.setItem("myList", JSON.stringify(this.localStorageList));

    if (!thisItemBeforeUpdate) window.location.reload();
    //this is a safeguard meant for when I access directly a movie detail by URL and my list wasn't up to date
    return;
  }

  removeThisAndGetOut() {
    this.alertCtrl
      .create({
        header: "Confirm!",
        message: "Are you sure you want to delete this item?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Okay",
            handler: () => {
              this.removeThisFromMyList();
              this.router.navigate(["/myList"]);
            },
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }

  removeThisFromMyList() {
    return this.myListService.removeMovie(this.id).subscribe();
  }

  restoreDataFromOMDB() {
    this.alertCtrl
      .create({
        header: "Confirm!",
        message:
          "Are you sure you want to restore the original data for this item?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Okay",
            handler: () => {
              this.myListService.restoreDataFromOMDB(
                this.originalItem,
                this.id
              );
              this.router.navigate(["/myList"]);
            },
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }

  setRating(rating) {
    this.myListService.putRating(this.id, rating);
  }
}
