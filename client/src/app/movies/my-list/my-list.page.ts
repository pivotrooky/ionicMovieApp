import { MyListService } from "../../services/my-list.service";
import { Component, Injectable, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
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
  //separo myListItems de filteredItems para poder filtrar rápidamente
  //y al mismo tiempo seguir teniendo la ventaja de guardar los items fetcheados previamente
  //de mi lista y compararlos con lo nuevo para ver si es necesario re-renderizar o no

  myListItems = [];
  filteredItems = [];

  @ViewChild("filterValue") filterValue;

  constructor(
    private myListService: MyListService,
    private authService: AuthService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    let localStorageList = JSON.parse(localStorage.getItem("myList"));
    if (localStorageList) {
      let unsortedList = this.myListService.objectToArrayFromId(
        localStorageList
      );
      this.myListItems = this.myListService.sortByName(unsortedList);
    } else this.myListItems = [];
    //mantengo actualizado filteredItems
    this.filteredItems = [...this.myListItems];
  }

  ionViewDidEnter() {
    this.handleLocalSearch();
    this.filterValue = "";
  }

  handleLocalSearch() {
    let userId = this.authService.getUserId();
    this.myListService.getMyList(userId).subscribe((userData) => {
      if (!userData[0]) return this.router.navigate(["/logout"]);
      const newList = userData[0].movies;

      this.checkIfLocalListNeedsUpdating(
        this.myListService.sortByName(newList)
      );
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
          console.log("HAY DIFERENCIAS");
          //hay diferencias, hay que re-renderizar la lista!
          return this.updateLocalList(newList);
        }
      }
    }
  }

  filterList() {
    let filterValue = this.filterValue?.control?.value;

    if (filterValue === "") return this.filteredItems = this.myListItems;

    console.log(filterValue, "soyFilterValue")

    this.filteredItems = this.filteredItems.filter((item) => {
      if (item.title.includes(filterValue)) return item;
      return null;
    });

    return;
  }

  updateLocalList(newList) {
    this.myListItems = newList;

    //mantengo actualizado filteredItems
    this.filteredItems = [...this.myListItems];

    //actualizo localStorage de myList

    let newLocalStorageList = this.myListService.arrayToObjectFromId(newList);
    localStorage.setItem("myList", JSON.stringify(newLocalStorageList));
  }
}
