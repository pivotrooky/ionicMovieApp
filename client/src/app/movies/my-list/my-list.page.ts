import { MyListService } from "../../services/my-list.service";
import { Component, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-search",
  templateUrl: "./my-list.page.html",
  styleUrls: ["./my-list.page.scss"],
})
export class MyListPage {
  myListItems = [];

  constructor(private myListService: MyListService) {}

  ionViewDidEnter() {
    this.handleLocalSearch();
  }

  handleLocalSearch() {
    this.myListService.getMyList().subscribe(
      (userData) => {
        const currentList = userData[0].movies;

        if (currentList.length !== this.myListItems.length) {
          //number of items changed, re-render list, no need to go inside loop
          this.myListItems = currentList;
          return;
        }

        for (let i = 0; i < currentList.length; i++) {
          for (let prop in currentList[i]) {
            if (currentList[i][prop] !== this.myListItems[i][prop]) {
              //some data is different, so list should be re-rendered
              this.myListItems = currentList;
              return;
            }
          }
        }
        //avoid unnecessary re-rendering
      }
    );
  }
}
