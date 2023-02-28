import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'momapix-demo';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.initSession()
  }

  initSession() {
    this.authService.session().subscribe(response => {
        this.authService.token = response.id
      })
  }

}
