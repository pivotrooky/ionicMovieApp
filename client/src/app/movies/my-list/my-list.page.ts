import { MyListService } from "../../services/my-list.service";
import { Component, Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-search",
  templateUrl: "./my-list.page.html",
  styleUrls: ["./my-list.page.scss"],
})
export class MyListPage {
  //separo myListItems de filteredItems para poder filtrar rápidamente
  //y al mismo tiempo seguir teniendo la ventaja de guardar los items fetcheados previamente
  //de mi lista y compararlos con lo nuevo para que checkIfLocalListNeedsUpdating pueda funcionar como debe, sin llamar a updateLocalList todo el tiempo

  myListItems = [];
  filteredItems = [];
  filterValue = "";

  /* @ViewChild("filterValue") filterValue; */

  constructor(
    private myListService: MyListService,
    private authService: AuthService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    let localStorageList = JSON.parse(localStorage.getItem("myList"));
    if (localStorageList) {
      let unsortedList = this.myListService.objectToArrayFromId(
        localStorageList
      );
      this.myListItems = this.myListService.sortByName(unsortedList);
    } else this.myListItems = [];
    //mantengo actualizado filteredItems
    this.filteredItems = [...this.myListItems];
  }

  ionViewDidEnter() {
    this.handleLocalSearch();
    this.filterValue = "";

    const keepListFiltered = this.keepListFiltered.bind(this);
    setInterval(keepListFiltered, 300);
    //intentar bindear el cambio de valor al input en función del evento de cambio traía errores
    //y no me parece que lastime mucho la performance hacer comparaciones entre arrays de listas chicas.
    //aunque seguramente esta solución de usar setInterval no sea escalable
  }

  handleLocalSearch() {
    let userId = this.authService.getUserId();
    this.myListService.getMyList(userId).subscribe((userData) => {
      if (!userData[0]) return this.router.navigate(["/logout"]);
      const newList = userData[0].movies;

      this.checkIfLocalListNeedsUpdating(
        this.myListService.sortByName(newList)
      );
    });
  }

  checkIfLocalListNeedsUpdating(newList) {
    if (newList.length !== this.myListItems.length) {
      //cambió el número de items, no es necesario entrar al loop, hay que renderizar la lista
      return this.updateLocalList(newList);
    }

    for (let i = 0; i < newList.length; i++) {
      for (let prop in newList[i]) {
        if (newList[i][prop] !== this.myListItems[i][prop]) {
          //hay diferencias, hay que re-renderizar la lista!
          return this.updateLocalList(newList);
        }
      }
    }
  }

  keepListFiltered() {
    const filterValue = this.filterValue;
    //agarro el valor de filtro actual

    //me fijo si se están mostrando todos los items
    const isShowingAllItems = this.myListService.isSameMovieList(
      this.filteredItems,
      this.myListItems
    );

    if (!filterValue && !isShowingAllItems)
      return (this.filteredItems = this.myListItems);
      //si el input está vacío y no se están mostrando todos los items, tengo que hacer la actualización y mostrar todo
      //en este caso, significa que el usuario estaba filtrando y dejó de filtrar

    const newFilteredItems = this.filterList(filterValue);
    //acá recién aplico el nuevo filtro. Todavía no sé si debo reemplazar la lista actual.

    const listStillTheSame = this.myListService.isSameMovieList(
      this.filteredItems,
      newFilteredItems
    );
    //me fijo a ver si sería necesario actualizar la lista filtrada

    if (listStillTheSame) return;

    //recién acá hago la actualización
    return (this.filteredItems = newFilteredItems);
  }

  filterList(filterValue) {
    //por ahora solo filtro en base a un par de atributos, después podría filtrar en base a otros atributos de la película
    //podría ser una buena idea tener criterios distintos para cada atributo
    //por ej como pasa con título vs año, que para el primero alcance con que haya una coincidencia parcial mientras que el primero necesita una total
    return this.myListItems.filter((item) => {
      if (item.title.toLowerCase().includes(filterValue.toLowerCase()))
        return item;
      if (item.year == filterValue) return item;
      return null;
    });
  }

  updateLocalList(newList) {
    this.myListItems = newList;

    //mantengo actualizado filteredItems
    this.filteredItems = [...this.myListItems];

    //actualizo localStorage de myList

    let newLocalStorageList = this.myListService.arrayToObjectFromId(newList);
    localStorage.setItem("myList", JSON.stringify(newLocalStorageList));
  }
}
