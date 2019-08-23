import { Component, OnInit } from '@angular/core';
import {RuleDefinitionService} from '../services/rule-engine/ruleDefinition/rule-definition.service';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-rule-set-list',
  templateUrl: './rule-set-list.component.html',
  styleUrls: ['./rule-set-list.component.css']
})
export class RuleSetListComponent implements OnInit {

  constructor(private appService: AppService, private ruleDefService: RuleDefinitionService, private router: Router) { }

  ent_cd;
  ruleSetList = [];
  columnList = [];
  DataObjArr = [];

  async ngOnInit() {
    const respModal = await this.ruleDefService.getmodels(this.ent_cd);
    if (respModal) {
      this.ruleDefService.dataModel =  respModal;
      this.DataObjArr = Object.keys(respModal);
      this.ruleDefService.dataObjArr = this.DataObjArr;
      this.getRuleList(this.ent_cd);
    }
  }

  async getRuleList(ent_cd) {
    const resp = await this.ruleDefService.getRuleSet(ent_cd);
    if (resp) {
      this.ruleSetList = resp;
      // this.makeArrayStruct();
      return true;
    } else {
      return false;
    }

  }

  // send on rule definition page
  routeOn(action, obj) {
    if (action === 'add') {
      this.ruleDefService.clickedObj = {};
      this.ruleDefService.action = 'add';
    } else {
      this.ruleDefService.clickedObj = obj;
      this.ruleDefService.action = 'edit';
    }
    this.router.navigate(['/ruledef']);
  }

  // make array
/*   makeArrayStruct() {
    this.ruleSetList = [];
    for (let i = 0; i < this.columnList.length;) {
      const b = [];
      b.push(this.columnList[i]);
      i = i + 1;
      if (i !== this.columnList.length) {
        b.push(this.columnList[i]);
        i = i + 1;
      }
      this.ruleSetList.push(b);
    }
    console.log(this.ruleSetList);
  }*/
}
