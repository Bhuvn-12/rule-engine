import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LookupService } from '../services/rule-engine/lookupObject/lookup.service';
declare var $: any;
@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {
  lookupForm: FormGroup;
  lookupObjectForm: FormGroup;
  submitted = false;
  submitted1 = false;
  selctedObject;
  constructor(private formBuilder: FormBuilder, private lookupService: LookupService) { }

  lookupObject = { host: 'localhost', port: '3306', schema: 'test', user_name: 'root', password: 'root', table: 'testTable' };
  lookupObjects = [];
  listArr = [];
  columnList = ['host', 'port', 'schema', 'user_name', 'table'];
  catList = [{ name: 'Dynamic', value: 'dynamic' }, { name: 'Static Data', value: 'static' }];
  subList = [];
  is_disabled = true;
  FormObj = {};
  async ngOnInit() {
    const respobj = await this.getLookupObjList();
    if (respobj) {
      this.getColList(this.lookupObjects[0]);
      // make array
      // this.makeArrayStruct();
    }

    // lookup Object Form
    this.lookupForm = this.formBuilder.group({
      lookupObjName: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required]
    });

    // lookup Details Form
    this.lookupObjectForm = this.formBuilder.group(this.FormObj);
  }

  // get lookup object list
  async getLookupObjList() {
    const resp = await this.lookupService.getlookupObject();
    if (resp) {
      this.lookupObjects = resp;
     /*  this.selctedObject = this.lookupObjects[0]; */
      return true;
    } else {
      return false;
    }
  }

  // get columns list
  async getColList(lookupobj) {
    const respList = await this.lookupService.getColumnList(lookupobj);
    if (respList) {
      this.FormObj = {};
      this.columnList = respList;
      return true;
    } else {
      return false;
    }
  }

  // new lookup
  newLookupObject() {
    this.is_disabled = false;
    $('#lookupObjModal').modal('show');
  }
  get fName() { return this.lookupForm.controls; }
  get fObj() { return this.lookupObjectForm.controls; }

  // save lookup Object and get columns from database
  saveLookupObject() {
    this.submitted1 = true;
    if (this.lookupForm.invalid) {
      console.log(this.lookupForm);
      return;
    } else {
      this.columnList = ['host', 'port', 'schema', 'user_name'];
      this.makeArrayStruct();
      $('#lookupObjModal').modal('hide');
    }

  }
  insertLookUp() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.lookupObjectForm.invalid) {
      return;
    } else {
      // send data to backend
    }
  }

  // check validation
  is_Invalid(name) {
    return this.fObj[name].errors;
  }

  // make array structure from given name
  makeArrayStruct() {
    this.FormObj = {};
    this.listArr = [];
    for (let i = 0; i < this.columnList.length;) {
      const b = [];
      this.FormObj[this.columnList[i]] = ['', Validators.required];
      b.push(this.columnList[i]);
      i = i + 1;
      if (i !== this.columnList.length) {
        this.FormObj[this.columnList[i]] = ['', Validators.required];
        b.push(this.columnList[i]);
        i = i + 1;
      }
      this.listArr.push(b);
    }
    // console.log(this.listArr);
  }
  catChange(event) {
    if (event.target.value === 'dynamic') {
      this.subList = ['hbase'];
    } else {
      this.subList = ['mysql', 'static_data'];
    }
  }
  editData() {
    this.is_disabled = false;
  }

}
