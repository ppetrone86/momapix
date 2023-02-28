import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from "./api.service";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
  }

  get(itemId: number) {
    return this.http.get<any>(this.apiService.MOMAPIX_API_ENDPOINT + 'items/' + Number.parseInt(itemId + '')).pipe(map(response => response['data']))
  }

  prepareDownload(itemId: number) {
    const data: any = {
      "data": {
        "type": "download",
        "relationships": {
          "items": {
            "data": [
              {
                "type":"item",
                "id":  Number.parseInt(itemId + '')
              }
            ]
          }
        }
      }
    }

    return this.http.post<any>(this.apiService.MOMAPIX_API_ENDPOINT + 'download', data).pipe(map(response => response['data']))
  }

  download(id: any) {
    return this.http.get<any>(this.apiService.MOMAPIX_API_ENDPOINT + 'download?h=' + id).pipe(map(response => response['data']))
  }
}
