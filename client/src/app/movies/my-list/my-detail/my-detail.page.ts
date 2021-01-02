import { MyListService } from "../../../services/my-list.service";
import { AuthService } from "../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-movie-details",
  templateUrl: "./my-detail.page.html",
  styleUrls: ["./my-detail.page.scss"],
})
export class MyDetailPage implements OnInit {
  isOwner = false;
  item = null;
  originalItem = null;
  id = null;
  imdbID = null;
  localStorageList = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private myListService: MyListService,
    public navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.myListService.getMyDetails(this.id).subscribe((originalDetail) => {
      this.originalItem = originalDetail;
    });
  }

  ionViewWillEnter() {
    this.isOwner = false;
    this.getLocalDetails();
    this.getRemoteDetails();
    this.checkOwnership();
  }

  ionViewDidEnter() {
    console.log("item", this.item);
  }

  checkOwnership() {
    //En este momento, si llegamos a ejecutar este método es porque this.item no tiene un valor falsy. Pero eso puede cambiar, así que mejor usar un condicional.
    if (!this.item) return;

    let userId = this.authService.getUserId();
    if (this.item.userId !== userId) return this.router.navigate(["/myList"]);

    //esta última es solo una precaución extra para evitar el renderizado en caso de que no se compruebe que el usuario sea el propietario.
    return (this.isOwner = true);
  }

  getLocalDetails() {
    this.localStorageList = JSON.parse(localStorage.getItem("myList"));
    if (!this.localStorageList) return;

    //si existe mi lista local, me fijo a ver si tiene el item que busco, en base al ID.
    let localStorageDetail = this.localStorageList[this.id];
    if (!localStorageDetail) return;

    //si ese item está, lo paso a this.item
    if (localStorageDetail) this.item = localStorageDetail;

    //acá hay varios returns porque no es tan fácil manejarme con el operador "?." y prefiero ser más cuidadoso aunque implique que, en este caso, cueste leer más el código
  }

  getRemoteDetails() {
    this.myListService.getMyDetails(this.id).subscribe((newDetail) => {
      console.log("llegué a getMyDetails");

      //me fijo a ver si mis datos locales están desactualizados
      this.handleDetailRender(newDetail);
    });
  }

  handleDetailRender(newDetail) {
    if (!newDetail.title) return this.router.navigate(["/myList"]);
    //esto pasa si entré poniendo un ID que no se corresponde con un item válido

    if (!this.item) return this.updateLocalDetail(newDetail);
    //si no tengo guardado ningún detalle en this.item, no es necesario entrar al loop para saber que tengo que actualizar

    for (let prop in newDetail) {
      if (newDetail[prop] !== this.item[prop]) {
        //con que alguna propiedad sea diferente, alcanza para necesitar cambiar los datos y renderizar de nuevo
        return this.updateLocalDetail(newDetail);
      }
    }
  }

  openWebsite() {
    window.open(this.item.Website, "_blank");
  }

  updateLocalDetail(newDetail) {
    let thisItemBeforeUpdate = this.item;
    //guardo referencia de lo que tenía antes de hacer la actualización

    //acá actualizo el item dentro del componente para ser renderizado, y dentro de mi lista en localStorage
    this.item = newDetail;
    this.localStorageList = { ...this.localStorageList, [this.id]: newDetail };
    localStorage.setItem("myList", JSON.stringify(this.localStorageList));

    if (!thisItemBeforeUpdate) window.location.reload();
    //esto último puede pasar si voy por URL directamente a un item y mi lista no estaba actualizada
    return;
  }

  removeThisAndGetOut() {
    this.removeThisFromMyList();
    this.router.navigate(["/myList"]);
  }

  removeThisFromMyList() {
    return this.myListService.removeItem(this.id).subscribe();
  }

  restoreDataFromOMDB() {
    this.myListService.restoreDataFromOMDB(this.originalItem, this.id);
    this.router.navigate(["/myList"]);
  }

  setRating(rating) {
    console.log("changed rating: ", rating);
    this.myListService.putRating(this.id, rating);
  }
}
