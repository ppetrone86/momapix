import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {

  constructor(public authService: AuthService) {
  }

  logout() {
    this.authService.logout().subscribe(
      (response) => {
        this.authService.isLogged = response.attributes.LoggedIn
        this.authService.name = response.attributes.name
      }
    );

  }

}
