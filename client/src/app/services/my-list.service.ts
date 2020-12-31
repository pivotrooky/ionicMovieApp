import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class MyListService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  OMDBObjectToLocalObject(OMDBObject) {
    let userId = this.authService.getUserId();
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

    this.postItem(data);
  }

  postItem(data) {
    this.http
      .post("http://localhost:3001/movies/", {...data, userId: this.authService.getUserId()})
      .subscribe();
  }

  putItem(movieID, data) {
    this.http.put("http://localhost:3001/movies/" + movieID, data).subscribe();
  }
  
  getMyList(userId) {
    return this.http.get(
      "http://localhost:3001/movies/of/" + userId
    );
  }

  getLocalID(imdbID, userId) {
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
    this.putItem(movieID, data);
  }
}
