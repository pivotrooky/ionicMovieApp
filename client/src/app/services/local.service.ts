import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LocalService {
  constructor(private http: HttpClient) {}
  createdIds = [];
  moviesOfUser: Observable<any>;
  

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

    this.http.post<any>('http://localhost:3001/movies/', data).subscribe(data => {
        this.createdIds.push(data.id);
    })
  }
  getMoviesOfUser(userId) {
    return this.http.get('http://localhost:3001/movies/of/' + userId);
  }

  /* getLocalID(item) {
    const movies = this.getMoviesOfUser(1);
    const id = movies.find(m => m.imdbID === item.imdbID)?.id;
  } */
}
