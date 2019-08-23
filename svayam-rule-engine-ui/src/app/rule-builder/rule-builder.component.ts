import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueryBuilderConfig } from 'angular2-query-builder-test';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RuleDefinitionService } from '.././services/rule-engine/ruleDefinition/rule-definition.service';
import {Router} from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var $: any;
@Component({
  selector: 'app-rule-builder',
  templateUrl: './rule-builder.component.html',
  styleUrls: ['./rule-builder.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RuleBuilderComponent implements OnInit {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private ruleDefService: RuleDefinitionService,
    private router: Router) {
      if (this.ruleDefService.action === undefined) {
        this.router.navigate(['/rules']);
      }
  }
  // form control using get set value
  public ruleSet_Ctl = new FormControl();
  public iDataObj_ctl = new FormControl();
  public outDataObj_ctl = new FormControl();
  public ruleName_Ctl = new FormControl();
  public config: QueryBuilderConfig;
  public configthen: QueryBuilderConfig;
  ruleArr = [];
  iDataObjArr = ['MyTable', 'TestTable', 'TestTable2'];
  outputDataObject = ['Out1', 'Out2', 'Out3'];
  // view control varial
  showRuleSet = true;
  showRule = false;
  is_disabled = false;
  dataObj = {inputDataObj : '', rulesetName: '', ent_cd : '', rules: []};
  curr_ruleObj;
  current_thenObj = { action: '', ruleIndex: '', thenIndex: '' };
  current_whenObj = { action: '', ruleIndex: '' };
  dataModel;
  ent_cd;
  testObj ;
  public query = {
    condition: 'or',
    rules: [
    ]
  };
  public querythen = {
    rules: [
    ]
  };

  async ngOnInit() {
    this.setConfig('');
    this.setConfigthen('');
    this.dataModel = this.ruleDefService.dataModel;
    this.iDataObjArr = this.ruleDefService.dataObjArr;
    this.outputDataObject = this.ruleDefService.dataObjArr;
    if (this.ruleDefService.action === 'edit') {
        const rule_set_id = this.ruleDefService.clickedObj.rule_set_id;
        const respObj = await this.ruleDefService.getRuleSetStruct(rule_set_id);
        if (respObj) {
          console.log(respObj);
          this.dataObj = respObj;
          this.ruleSet_Ctl.setValue(this.dataObj.rulesetName);
          this.iDataObj_ctl.setValue(this.dataObj.inputDataObj);
          this.showRule = true;
          this.makeArrayStruct();
        }
    }
    if (this.ruleDefService.action === 'add') {
      this.dataObj = {inputDataObj : '', rulesetName: '', ent_cd : '', rules: []};
      this.ruleArr = [];
    }

  }

  setConfig(iDataObj) {
    let attributes = [];
    if (iDataObj === '' || iDataObj === undefined ) {
      attributes = [];
    } else {
      attributes = [];
      attributes = this.dataModel[iDataObj];
    }
    const when_fields = {};
    attributes.map((e) => {
      when_fields[e] = {
        name: e, type: 'category', options: attributes.map(a => {
          return { name: a, value: a };
        }), operators: ['=', '!=']
      };
    });
    this.config = { fields: when_fields };
  }

  setConfigthen(outDataObj) {
    let attributes = [];
    if (outDataObj === '' || outDataObj === undefined) {
      attributes = [];
    } else {
      attributes = this.dataModel[outDataObj];
    }
    const then_fields = {};
    attributes.map((e) => {
      then_fields[e] = {
        name: e, type: 'category', options: attributes.map(a => {
          return { name: a, value: a };
        }), operators: ['=', '!=']
      };
    });
    this.configthen = { fields: then_fields };
  }
  // open rule ame modal for input name
  createRule() {
    $('#RuleModal').modal('show');
  }

  saveRuleInfo() {
    if (!this.ruleName_Ctl.invalid) {
      $('#RuleModal').modal('hide');
      const is_valid = this.checkUniqueness(this.ruleName_Ctl.value);
      if (is_valid) {
        this.ruleArr.push({
          ruleName: this.ruleName_Ctl.value, inputDataObj: this.iDataObj_ctl.value,
          when: { condition: '', rules: [] }, then: []
        });
       this.is_disabled = true;
      } else {
        this._snackBar.open('Aready Exist', 'close', {
          duration: 2000
        });
      }
    }
  }

  createRuleSet() {
    this.showRuleSet = true;
  }
  RuleSetObj() {
    if (!this.ruleSet_Ctl.invalid && !this.iDataObj_ctl.invalid) {
      this.dataObj['rulesetName'] = this.ruleSet_Ctl.value;
      this.dataObj['inputDataObj'] = this.iDataObj_ctl.value;
      this.showRule = true;
    }
  }

  // selection change of input Data Object
  selectIDataObj(event) {
    if (this.ruleArr.length !== 0) {
      this._snackBar.open('You can not Change inputDataObject', 'close', {
        duration: 2000
      });
      this.iDataObj_ctl.setValue(this.iDataObj_ctl.value);
    } else {
      this.dataObj['inputDataObj'] = event.value;
      this.setConfig(event.value);
    }
  }

  // call when edit and add
  callWhen(ruleObj, ruleIndex) {
    this.setConfig(this.iDataObj_ctl.value);
    this.query = {
      condition: '',
      rules: [],
    };
    this.curr_ruleObj = ruleObj;
    this.current_whenObj = { action: 'add', ruleIndex: ruleIndex };
    $('#whenModal').modal('show');
  }

  // call then add and edit
  callThen(ruleObj, ruleIndex) {
    this.setConfigthen(this.outputDataObject[0]);
    this.outDataObj_ctl.setValue(this.outputDataObject[0]);
    this.querythen = {
      rules: [],
    };
    this.curr_ruleObj = ruleObj;
    this.current_thenObj['action'] = 'add';
    this.current_thenObj['ruleIndex'] = ruleIndex;
    $('#thenModal').modal('show');
  }

  // save when add and edit
  saveWhen() {
    const ruleIndex = this.current_whenObj.ruleIndex;
    const localwhenq = this.query;
    this.ruleArr[ruleIndex].when = localwhenq;
  }

  // save then add and edit
  saveThen() {
    const outObj = this.outDataObj_ctl.value;
    const ruleIndex = this.current_thenObj['ruleIndex'];
    const thenIndex = this.current_thenObj['thenIndex'];
    if (this.current_thenObj['action'] === 'add') {
      this.ruleArr[ruleIndex].then.push({ outputDataObject: outObj, assignments: this.querythen.rules });
    } else {
      this.ruleArr[ruleIndex].then.splice(thenIndex, 1, { outputDataObject: outObj, assignments: this.querythen.rules });
    }
  }

  // check rule name is valid or not
  checkUniqueness(ruleName) {
    let check = true;
    for (let i = 0; i < this.ruleArr.length; i++) {
      if (this.ruleArr[i].ruleName === ruleName) {
        check = false;
        break;
      }
    }
    return check;
  }

  // Edit when if Exist otherwise create when
  editWhen(ruleObj, ruleIndex) {
    this.setConfig(this.ruleArr[ruleIndex].inputDataObj);
    this.query = {
      condition: '',
      rules: [],
    };
    this.current_whenObj = { action: 'edit', ruleIndex: ruleIndex };
    let condition = '';
    if (this.ruleArr[ruleIndex].when.condition !== undefined) {
      condition = this.ruleArr[ruleIndex].when.condition;
    }
    this.query['condition'] = condition;
    this.query['rules'] = this.ruleArr[ruleIndex].when.rules;
    $('#whenModal').modal('show');
  }

  // edit then perticular condition
  editThen(ruleIndex, thenIndex) {
    this.setConfigthen(this.ruleArr[ruleIndex].then[thenIndex].outputDataObject);
    this.current_thenObj = { action: 'edit', ruleIndex: ruleIndex, thenIndex: thenIndex };
    this.querythen = {
      rules: []
    };
    this.querythen.rules = this.ruleArr[ruleIndex].then[thenIndex].assignments;
    $('#thenModal').modal('show');
    this.outDataObj_ctl.setValue(this.ruleArr[ruleIndex].then[thenIndex].outputDataObject);
  }

  deleteRule(index) {
    this.ruleArr.splice(index, 1);
  }
  deletethen(ruleIndex, thenIndex) {
    this.ruleArr[ruleIndex].then.splice(thenIndex, 1);
  }


  makeArrayStruct() {
    this.ruleArr = [];
    const arr = Array.from(this.dataObj.rules);
    this.ruleArr = arr;
  }

  // selection change output Data Object
  selectOutDataObj(event) {
    const obj = event.value;
    this.setConfigthen(obj);
  }

   // save in DataBase
   async saveRuleSet() {
     const resp = await this.makeValidJson();
     if (resp) {
       const str = JSON.stringify(resp);
       const obj = new Object();
       obj['ent_cd'] = 'F101';
       obj['rulesetName'] = this.dataObj.rulesetName;
       obj['value'] = str;
       console.log(obj);
       const resSave =  await this.ruleDefService.createDrl(obj);
     }

  }
  makeValidJson() {
    const testArr = JSON.parse(JSON.stringify(this.ruleArr)); // Array.from(this.ruleArr);
    for (let i = 0; i <  testArr.length; i++) {
        for (let j = 0; j <  testArr[i].when.rules.length; j++) {
            const regex = /"/g;
            if (testArr[i].when.rules[j].value !== undefined) {
            const str = testArr[i].when.rules[j].value.replace(regex, '\\\\\"');
            testArr[i].when.rules[j].value = str;
            }
        }
        for (let k = 0; k < testArr[i].then.length; k++) {
          for (let l = 0; l < testArr[i].then[k].assignments.length ; l ++) {
              const regex = /"/g;
              if (testArr[i].then[k].assignments[l].value !== undefined) {
                const str1 = testArr[i].then[k].assignments[l].value.replace(regex,  '\\\\\"');
                testArr[i].then[k].assignments[l].value = str1;
              }
          }
        }
    }
    return testArr;
  }
}
