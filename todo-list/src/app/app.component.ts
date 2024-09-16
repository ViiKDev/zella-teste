import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private authService: AuthService) { }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    localStorage.removeItem("token");
  }
}
