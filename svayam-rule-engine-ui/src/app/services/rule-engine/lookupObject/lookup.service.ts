import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../app.service';
@Injectable({
  providedIn: 'root'
})
export class LookupService {

  httpUrl;
  ent_cd;
  constructor(private appService: AppService, private http: HttpClient) {
    this.httpUrl = this.appService.httpUrl + '/metainfo';
    this.ent_cd = this.appService.ent_cd;
  }

  // get valid columns
  async getColumnList(lookupObj) {
      const resp = await this.http.get<any>(this.httpUrl + '' + this.ent_cd ).toPromise().then( res => {
        return res;
      });
      if (!resp.error) {
        return resp.data;
      } else {
        return false;
      }
  }

  // get all lookup objects
  async getlookupObject() {
    const resp = await this.http.get<any>(this.httpUrl + '' + this.ent_cd ).toPromise().then(res => {
      return res;
    });
    if (!resp.error) {
      return resp.data;
    } else {
      return false;
    }
  }

}
