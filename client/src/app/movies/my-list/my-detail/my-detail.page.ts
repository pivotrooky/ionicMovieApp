import { MyListService } from '../../../services/my-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-movie-details',
  templateUrl: './my-detail.page.html',
  styleUrls: ['./my-detail.page.scss'],
})
export class MyDetailPage implements OnInit {
 
  item = null;
  id = null;
  
  constructor(private activatedRoute: ActivatedRoute, private myListService: MyListService) { }
 
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
 
    this.myListService.getMyDetails(this.id).subscribe(result => {
      this.item = result;
    });
  }
 
  openWebsite() {
    window.open(this.item.Website, '_blank');
  }

  removeThisFromMyList() {
    return this.myListService.removeItem(this.id).subscribe(() => {
      console.log("deleted")})

  }
  
}