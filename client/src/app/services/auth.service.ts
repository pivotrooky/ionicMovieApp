import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
      .post(`http://localhost:3001/users`, { email, password })
      .toPromise();
  }

  login(email, password) {
    return this.http
      .post(`http://localhost:3001/auth/login`, { email, password })
      .toPromise();
  }

  logout() {
    this.deleteUserInfo();
    return this.http.get(`http://localhost:3001/auth/logout`).toPromise();
  }
}
