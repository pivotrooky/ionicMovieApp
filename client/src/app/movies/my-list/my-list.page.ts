import { MyListService } from "../../services/my-list.service";
import { Component, Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
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

  constructor(
    private myListService: MyListService,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
    let localStorageList = JSON.parse(localStorage.getItem("myList"));
    if (localStorageList) {
      let unsortedList = this.myListService.objectToArrayFromId(
        localStorageList
      );
      this.myListItems = this.myListService.sortByName(unsortedList);
      }
    else this.myListItems = [];
  }

  ionViewDidEnter() {
    this.handleLocalSearch();
  }

  handleLocalSearch() {
    let userId = this.authService.getUserId();
    this.myListService.getMyList(userId).subscribe((userData) => {
      const newList = userData[0].movies;

      this.checkIfLocalListNeedsUpdating(this.myListService.sortByName(newList));
    });
  }

  checkIfLocalListNeedsUpdating(newList) {
    if (newList.length !== this.myListItems.length) {
      //cambió el número de items, no es necesario entrar al loop, hay que renderizar la lista
      return this.updateLocalList(newList);
    }


    for (let i = 0; i < newList.length; i++) {
      for (let prop in newList[i]) {
        if (newList[i][prop] !== this.myListItems[i][prop]) {
          console.log("HAY DIFERENCIAS")
          //hay diferencias, hay que re-renderizar la lista!
          return this.updateLocalList(newList);
        }
      }
    }
  }

  updateLocalList(newList) {
    this.myListItems = newList;

    //actualizo localStorage de myList

    let newLocalStorageList = this.myListService.arrayToObjectFromId(newList);
    localStorage.setItem("myList", JSON.stringify(newLocalStorageList));
  }
}
