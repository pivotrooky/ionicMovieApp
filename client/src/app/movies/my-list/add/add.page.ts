import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"],
})
export class AddPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onCancel() {
    this.router.navigate(["/myList"]);
  }

  onAddItem() {
    return;
  }
}
