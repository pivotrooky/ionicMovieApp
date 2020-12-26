import { Component, OnInit, ViewChild } from "@angular/core";
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

  @ViewChild("f") movieForm: NgForm;

  onCancel() {
    this.router.navigate(["/myList"]);
  }

  onClear() {
    this.movieForm.reset();
  }

  onSubmit(form: NgForm) {
    console.log("Title is : " + form.value.title);
    console.log("Year is : " + form.value.year);
    console.log("Image is : " + form.value.image);
    console.log("Genre is : " + form.value.genre);
    console.log("Plot is : " + form.value.plot);
  }
}
