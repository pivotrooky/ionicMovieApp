import { SearchService, SearchType } from "../../services/search.service";
import { MyListService } from "../../services/my-list.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage {
  results: Observable<any>;
  searchTerm: string = "";
  type: SearchType = SearchType.all;

  constructor(
    private searchService: SearchService,
    private myListService: MyListService,
  ) {}
  

  handleSearch() {
    this.results = this.searchService.searchData(this.searchTerm, this.type);
  }
}


const names = ["Luis", "Juan", "Gonzalo"];

function isNameInArray(name) {
  for (let i = 0; i < names.length; i++) {
    if (names[i] === name) return true;
    else return false;
  }
}
