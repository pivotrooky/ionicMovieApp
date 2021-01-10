import { SearchService, SearchType } from "../../services/search.service";
import { Component} from "@angular/core";
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
  ) {}
  

  handleSearch() {
    this.results = this.searchService.searchData(this.searchTerm, this.type);
  }
}
