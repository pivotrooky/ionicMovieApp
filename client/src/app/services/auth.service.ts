import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BACKEND } from "../../environments/environment";

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
    localStorage.clear();
  }

  getUserId() {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    if (!userData) return null;
    return userData.id;
  }

  signup(email, password) {
    return this.http
      .post(`${BACKEND}/users`, { email, password })
      .toPromise();
  }

  login(email, password) {
    return this.http
      .post(`${BACKEND}/auth/login`, { email, password })
      .toPromise();
  }

  logout() {
    this.deleteUserInfo();
    return this.http.get(`${BACKEND}/auth/logout`).toPromise();
  }
}
