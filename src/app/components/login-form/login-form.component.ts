import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @Output() userLoggedEvent = new EventEmitter<string>();

  form: FormGroup | undefined

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.form = new FormGroup({
      'username': new FormControl('pietropetrone', Validators.required),
      'password': new FormControl('pietropetrone', Validators.required),
    });
  }

  submit() {
    if (this.form) {
      const username = this.form?.get('username')?.value;
      const password = this.form?.get('password')?.value;

      this.authService.login(username, password).subscribe(
        (response) => {
          this.authService.isLogged = response.attributes.LoggedIn
          this.authService.name = response.attributes.Name

          this.userLoggedEvent.emit()

        },
        (error) => {
        }
      );
    }
  }

}
