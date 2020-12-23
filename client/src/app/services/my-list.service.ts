import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class MyListService {
  constructor(private http: HttpClient) {}
  createdIds = [];
  

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
  getMyList(userId = 1) {
    return this.http.get('http://localhost:3001/movies/of/' + userId)/*  .pipe(
      map(responseData => {
        const moviesArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            moviesArray.push({ ...responseData[key], id: key });
          }
        }
        return moviesArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    ); */
}

  /* getLocalID(item) {
    const movies = this.getMoviesOfUser(1);
    const id = movies.find(m => m.imdbID === item.imdbID)?.id;
  } */
}
