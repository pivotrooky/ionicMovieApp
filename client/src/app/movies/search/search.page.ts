import { SearchService, SearchType } from '../../services/search.service';
import { MyListService } from '../../services/my-list.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;
 
  constructor(private searchService: SearchService, private myListService: MyListService) { }
 
  ngOnInit() { }
 
  handleSearch() {
    this.results = this.searchService.searchData(this.searchTerm, this.type);
  }

  getCorrectRoute(item) {
    const localID = null;
    if (typeof localID === "number") return "/my-list/" + localID;
    return "/search/" + item.imdbID;
  };
}