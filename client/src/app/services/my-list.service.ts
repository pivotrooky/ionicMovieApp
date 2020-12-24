import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MyListService {
  constructor(private http: HttpClient) {}

  createdIds = [];

  OMDBObjectToLocalObject(OMDBObject) {
    let userId = 1;
    for (let key in OMDBObject) {
      if (OMDBObject[key] === "N/A") OMDBObject[key] = null;
    }

    const {
      Title,
      Year,
      Type,
      Poster,
      Website,
      imdbID,
      imdbRating,
      Plot,
      Actors,
      Director,
      Genre,
    } = OMDBObject;
    const localObject = {
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
    };
    return localObject;
  }

  addMovieFromOMDB(OMDBObject) {
    const data = this.OMDBObjectToLocalObject(OMDBObject);

    this.http
      .post<any>("http://localhost:3001/movies/", data)
      .subscribe((data) => {
        this.createdIds.push(data.id);
      });
  }
  getMyList(userId = 1) {
    return this.http.get(
      "http://localhost:3001/movies/of/" + userId
    ); /*  .pipe(
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

  getLocalID(imdbID, userId = 1) {
    return this.http.post("http://localhost:3001/movies/local", {
      imdbID,
      userId,
    });
  }

  getMyDetails(id) {
    return this.http.get("http://localhost:3001/movies/" + id);
  }

  removeItem(id) {
    return this.http.delete("http://localhost:3001/movies/" + id);
  }

  restoreDataFromOMDB(newData, movieID) {
    console.log(newData, "soy New Data");
    const data = this.OMDBObjectToLocalObject(newData);
    this.http.put("http://localhost:3001/movies/" + movieID, data).subscribe();
  }
}
