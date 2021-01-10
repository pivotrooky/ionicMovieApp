import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { URL, API_KEY } from "../../environments/environment";

// Typescript custom enum for search types (optional)
export enum SearchType {
  all = "",
  movie = "movie",
  series = "series",
}

@Injectable({
  providedIn: "root",
})
export class SearchService {
  createdIds = [];

  constructor(private http: HttpClient) {}

  searchData(title: string, type: SearchType): Observable<any> {
    return this.http
      .get(
        `${URL}?s=${encodeURI(title)}&type=${type}&apikey=${API_KEY}`
      )
      .pipe(
        map((results) => {
          const filteredResults = results["Search"].filter(
            (item) => item.Type !== "game"
          );
          //I think it's best for the purposes of this app to only include movies/series
          return filteredResults;
        })
      );
  }
  getDetails(id) {
    return this.http.get(`${URL}?i=${id}&plot=full&apikey=${API_KEY}`);
  }
}
