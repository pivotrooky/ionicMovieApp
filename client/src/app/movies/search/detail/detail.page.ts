import { SearchService } from '../../../services/search.service';
import { MyListService } from '../../../services/my-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-movie-details',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
 
  information = null;
  id = null;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchService: SearchService, private myListService: MyListService) { }
 
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
 
    this.searchService.getDetails(this.id).subscribe(result => {
      this.information = result;
    });
  }
 
  openWebsite() {
    window.open(this.information.Website, '_blank');
  }

  addMovieToList() {
    this.myListService.addMovieFromOMDB(this.information);
    this.router.navigate(['/myList/', this.myListService.getLocalID(this.id) || 1]);
  }

  
}