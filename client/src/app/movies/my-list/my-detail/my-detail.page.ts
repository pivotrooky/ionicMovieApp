import { MyListService } from '../../../services/my-list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-movie-details',
  templateUrl: './my-detail.page.html',
  styleUrls: ['./my-detail.page.scss'],
})
export class MyDetailPage implements OnInit {
 
  item = null;
  id = null;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private myListService: MyListService) { }
 
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
 
    this.myListService.getMyDetails(this.id).subscribe(result => {
      this.item = result;
    });
  }
 
  openWebsite() {
    window.open(this.item.Website, '_blank');
  }

  removeThisAndGetOut() {
    this.removeThisFromMyList();
    this.router.navigate(['/myList']);
  }

  removeThisFromMyList() {
    return this.myListService.removeItem(this.id).subscribe();
  }
  
}