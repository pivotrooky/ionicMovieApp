import { MyListService } from "../../services/my-list.service";
import { Component, Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-search",
  templateUrl: "./my-list.page.html",
  styleUrls: ["./my-list.page.scss"],
})
export class MyListPage {
  //I keep myListItem separated from filteredItems in order to be able to quickly filter items
  //and at the same time being able to keep previously fetched items from my list
  //and compare them to new items, so that checkIfLocalListNeedsUpdating can work as intended, calling updateLocalList only when necessary

  myListItems = [];
  filteredItems = [];
  filterValue = "";

  /* @ViewChild("filterValue") filterValue; */

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
    //this keeps filteredItems updated
    this.filteredItems = [...this.myListItems];
  }

  ionViewDidEnter() {
    this.handleLocalSearch();
    this.filterValue = "";

    const keepListFiltered = this.keepListFiltered.bind(this);
    setInterval(keepListFiltered, 300);
    //a more scalable solution would surely require a filterValue update being triggered only in the event that the user changes the value of the input
    //but it didn't work for me here, it was too buggy
    //so I used setInterval, which is not the most elegant piece of code but it gets the work done, 
    //and in light short array comparisons probably doesn't affect performance all that much
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
      //number of items in list has changed, so update list. no need to go into loop!
      return this.updateLocalList(newList);
    }

    for (let i = 0; i < newList.length; i++) {
      for (let prop in newList[i]) {
        if (newList[i][prop] !== this.myListItems[i][prop]) {
          //there's at least one difference, so, update list!
          return this.updateLocalList(newList);
        }
      }
    }
  }

  keepListFiltered() {
    const filterValue = this.filterValue;
    //get filterValue;

    //check if all items are showing.
    const isShowingAllItems = this.myListService.isSameMovieList(
      this.filteredItems,
      this.myListItems
    );

    if (!filterValue && !isShowingAllItems)
      return (this.filteredItems = this.myListItems);
    //if filter input is empty and not all items are showing, then it means that user was using a filter but not anymore
    //so, I should show all items!

    const newFilteredItems = this.filterList(filterValue);
    //only now do I apply the new filter. I still don't know if it's necessary to replace the current list.

    const listStillTheSame = this.myListService.isSameMovieList(
      this.filteredItems,
      newFilteredItems
    );
    //Here I check if it's necessary to alter this.filteredItems or not

    if (listStillTheSame) return;

    //only here do I update 'filteredItems'
    return (this.filteredItems = newFilteredItems);
  }

  filterList(filterValue) {
    //for now this only works for the item's title and year.
    //it may be a good idea to have different criteria for each attribute
    //for instance, I may be satisfied by a partial match when comparing user input to item's title
    // but feel it's best to require a complete match for the item's year
    
    return this.myListItems.filter((item) => {
      if (item.title.toLowerCase().includes(filterValue.toLowerCase()))
        return item;
      if (item.year == filterValue) return item;
      return null;
    });
  }

  updateLocalList(newList) {
    this.myListItems = newList;

    //this keeps filteredItems updated
    this.filteredItems = [...this.myListItems];

    //this keeps localStorage updated
    let newLocalStorageList = this.myListService.arrayToObjectFromId(newList);
    localStorage.setItem("myList", JSON.stringify(newLocalStorageList));
  }
}
