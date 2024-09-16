import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = 'http://localhost:5203/api/user';
  private userPayload: any;

  constructor(private httpClient: HttpClient) {
    this.userPayload = this.decodeToken();
  }

  signUp(userObj: any) {
    return this.httpClient.post<any>(`${this.API_URL}/register`, userObj);
  }
  login(loginObj: any) {
    return this.httpClient.post<any>(`${this.API_URL}/authenticate`, loginObj);
  }
  userData() {
    const userId = this.getUserIdFromToken();
    return this.httpClient.get<any>(`${this.API_URL}s/${userId}`)
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  updateUserInfo(info: any) {
    const userId = this.getUserIdFromToken();
    return this.httpClient.put<any>(`${this.API_URL}s/${userId}`, info);
  }
  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }
  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role

  }
  getUserIdFromToken() {
    this.userPayload = this.decodeToken();
    if (this.userPayload) return this.userPayload.nameid
  }
}
