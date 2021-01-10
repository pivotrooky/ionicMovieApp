import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { BACKEND } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class MyListService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  addMovieFromOMDB(OMDBObject) {
    const data = this.OMDBObjectToLocalObject(OMDBObject);

    this.postMovie(data);
  }

  postMovie(data) {
    this.http
      .post(`${BACKEND}/movies/`, {
        ...data,
        userRating: 0,
        userId: this.authService.getUserId(),
      })
      .subscribe(
        (res: any) => {},
        (err) => {
          console.log(err);
        }
      );
  }

  putMovie(movieID, data) {
    this.http.put(`${BACKEND}/movies/${movieID}`, data).subscribe();
  }

  objectToArrayFromId(object) {
    let array = [];

    for (let id in object) {
      array.push(object[id]);
    }

    return array;
  }

  putRating(movieID, userRating) {
    this.http
      .put(`${BACKEND}/movies/${movieID}`, { userRating })
      .subscribe(
        (res: any) => {},
        (err) => {
          console.log(err);
        }
      );
  }

  getLocalID(imdbID, userId) {
    return this.http.post(`${BACKEND}/movies/local`, {
      imdbID,
      userId,
    });
  }

  getMyList(userId) {
    return this.http.get(`${BACKEND}/movies/of/${userId}`);
  }

  getMyDetails(id) {
    return this.http.get(`${BACKEND}/movies/${id}`);
  }

  removeMovie(id) {
    return this.http.delete(`${BACKEND}/movies/${id}`);
  }

  restoreDataFromOMDB(newData, movieID) {
    const data = this.OMDBObjectToLocalObject(newData);
    this.putMovie(movieID, data);
  }

  //-----------------------------------------HELPER FUNCTIONS----------------------------------------

  arrayToObjectFromId(array) {
    const obj = {};
    for (let item of array) {
      obj[item.id] = item;
    }
    return obj;
  }

  OMDBObjectToLocalObject(OMDBObject) {
    let userId = this.authService.getUserId();
    for (let key in OMDBObject) {
      if (OMDBObject[key] === "N/A") OMDBObject[key] = null;
      //the previous line is very important so don't mess with it!
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

  isSameMovieList(oldArray, newArray) {
    let oldIDs = [];
    let newIDs = [];

    oldArray.forEach((item) => oldIDs.push(item.id));
    newArray.forEach((item) => newIDs.push(item.id));

    oldIDs.sort();
    newIDs.sort();

    if (oldIDs.length !== newIDs.length) return false;

    for (let index in oldIDs) {
      if (oldIDs[index] !== newIDs[index]) return false;
    }

    return true;
  }

  sortByName(array) {
    array.sort((a, b) => {
      if (a?.title < b?.title) {
        return -1;
      }
      if (a?.title > b?.title) {
        return 1;
      }
      return 0;
    });
    //in the future, I will probably be sorting by other attributes, such as user rating

    return array;
  }
}
