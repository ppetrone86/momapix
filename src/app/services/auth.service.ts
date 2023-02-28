import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from "./api.service";
import {AppConstants} from "../app.constats";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string = ''
  private _name: string = ''
  private _isLogged: boolean = false

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value
    localStorage.setItem(AppConstants.KEY_BEARER_TOKEN, this._token)
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get isLogged(): boolean {
    return this._isLogged;
  }

  set isLogged(value: boolean) {
    this._isLogged = value;
  }

  session() {
    return this.http.get<any>(this.apiService.MOMAPIX_API_ENDPOINT + 'session').pipe(map(response => response['data']));
  }

  // Endpoint per effettuare il login
  login(username: string, password: string) {
    const data: any = {
      "data": {
        "id": this._token,
        "type": "session",
        "attributes": {
          "username": username,
          "password": password
        }
      }
    }

    return this.http.patch<any>(this.apiService.MOMAPIX_API_ENDPOINT + 'login', data).pipe(map(response => response['data']))
  }

  // Endpoint per effettuare il logout
  logout() {
    const data: any = {
      "data": {
        "id": this._token,
        "type": "session",
        "attributes": {}
      }
    }

    return this.http.patch<any>(this.apiService.MOMAPIX_API_ENDPOINT + 'logout', data).pipe(map(response => response['data']))
  }
}
