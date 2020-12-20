import { SearchService } from '../../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-movie-details',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
 
  information = null;
  
  constructor(private activatedRoute: ActivatedRoute, private movieService: SearchService) { }
 
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
 
    this.movieService.getDetails(id).subscribe(result => {
      this.information = result;
    });
  }
 
  openWebsite() {
    window.open(this.information.Website, '_blank');
  }
}