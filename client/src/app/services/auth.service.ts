import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated(): Boolean {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData?.id && userData?.email) {
      return true;
    }
    return false;
  }

  setUserInfo(user) {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }

  deleteUserInfo() {
    localStorage.removeItem("userInfo");
  }

  getUserId() {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    if (!userData) return null;
    return userData.id;
  }

  signup(email, password) {
    console.log("signup auth service");
    return this.http
      .post(`http://localhost:3001/users`, { email, password })
      .toPromise();
  }

  login(email, password) {
    console.log("login auth service");
    return this.http
      .post(`http://localhost:3001/auth/login`, { email, password })
      .toPromise();
  }

  logout() {
    console.log("logout auth service");
    this.deleteUserInfo();
    return this.http.get(`http://localhost:3001/auth/logout`).toPromise();
  }
}
