import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

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
  url = "http://www.omdbapi.com/";
  apiKey = "20dac387";
  createdIds = [];

  constructor(private http: HttpClient) {}

  searchData(title: string, type: SearchType): Observable<any> {
    return this.http
      .get(
        `${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`
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
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
}
