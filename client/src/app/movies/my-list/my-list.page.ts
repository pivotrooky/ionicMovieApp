import { MyListService } from '../../services/my-list.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './my-list.page.html',
  styleUrls: ['./my-list.page.scss'],
})
export class MyListPage implements OnInit {

  myListItems: Observable<any>;
 
  constructor(private myListService: MyListService) { }
 
  ngOnInit() {
    this.handleLocalSearch();
  }
 
  handleLocalSearch() {
    this.myListService.getMyList().subscribe(
      userData => {
        this.myListItems = userData[0].movies;
        /* console.log(this.myListItems); */
      }
    );
  }
}