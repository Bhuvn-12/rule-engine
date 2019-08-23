import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../../app.service';
@Injectable({
  providedIn: 'root'
})
export class RuleDefinitionService {

  httpUrl;
  ent_cd;
  clickedObj;
  action;
  dataObjArr;
  dataModel;
  constructor(private appService: AppService, private http: HttpClient) {
    this.httpUrl = this.appService.httpUrl + '/ruleinfo';
    this.ent_cd = this.appService.ent_cd;
  }

  // get all rule set for entity
  async getRuleSet(ent_cd) {
    const resp = await this.http.get<any>(this.httpUrl + '/getrulesetinfo' + this.ent_cd).toPromise().then(res => {
      console.log(res);
      return res;
    });
    if (!resp.error) {
      return resp.data;
    } else {
      return false;
    }
  }

  // get all input dataObject for entity
  async getmodels(ent_cd) {
    const resp = await this.http.get<any>(this.httpUrl + '/getmodels' + this.ent_cd).toPromise().then(res => {
      return res;
    });
    if (!resp.error) {
      return resp.data;
    } else {
      return false;
    }
  }

  // get a selected ruleObject
  async getRuleSetStruct(ruleset_id) {
    const resp = await this.http.get<any>(this.httpUrl + '/getrulesetstructure' + ruleset_id).toPromise().then(res => {
      return res;
    });
    if (!resp.error) {
      return resp.data;
    } else {
      return false;
    }
  }
  async createDrl(Obj) {
    Obj['ent_cd'] = this.ent_cd;
    const resp  = await this.http.post<any>(this.httpUrl + '/createdrl', Obj).toPromise().then(res => {
      return res;
    });
    if (!resp.error) {
      return resp;
    } else {
      return false;
    }
  }
}
