import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _MOMAPIX_API_ENDPOINT: string = 'http://localhost:3000/'

  constructor() {
  }

  get MOMAPIX_API_ENDPOINT(): string {
    return this._MOMAPIX_API_ENDPOINT;
  }

}
