import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders} from '@angular/common/http';
import {AppConstants} from "../app.constats";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const headers = this.getHeaders()

    const authRequest = request.clone({headers});
    return next.handle(authRequest);
  }

  private getHeaders() {
    let token: any = localStorage.getItem(AppConstants.KEY_BEARER_TOKEN) != null ? localStorage.getItem(AppConstants.KEY_BEARER_TOKEN) : null
    let headers: HttpHeaders

    if (token != null) {
      headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Apikey': AppConstants.MOMAPIX_API_KEY,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      })
    } else {
      headers = new HttpHeaders({
        'Apikey': AppConstants.MOMAPIX_API_KEY,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      })
    }

    return headers;
  }
}
