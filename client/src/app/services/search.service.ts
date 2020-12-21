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
          console.log(results, "results");
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

  addMovieFromOMDB(OMDBObject) {
    
    for (let key in OMDBObject) {
      if (OMDBObject[key] === "N/A") OMDBObject[key] = null;
    }
    
    const {Title, Year, Type, Poster, Website, imdbID, imdbRating, Plot, Actors, Director, Genre} = OMDBObject;
    let userId = 1;
    //later we'll get this from local/sessionstorage...?
    const data = {
      title: Title,
      year: parseInt(Year),
      imdbID,
      imdbRating: parseInt(imdbRating),
      type: Type,
      image: Poster,
      website: Website,
      plot: Plot,
      actors: Actors,
      director: Director,
      userId,
      genre: Genre,
    }

    console.log(data, "movie");

    this.http.post<any>('http://localhost:3001/movies/', data).subscribe(data => {
        this.createdIds.push(data.id);
    })
  }
}
