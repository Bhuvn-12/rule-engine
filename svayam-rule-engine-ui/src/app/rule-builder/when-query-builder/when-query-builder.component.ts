import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { QueryBuilderComponent} from 'angular2-query-builder-test';

@Component({
  selector: 'app-when-query-builder',
  templateUrl: './when-query-builder.component.html',
  styleUrls: ['./when-query-builder.component.css']
})
export class WhenQueryBuilderComponent extends QueryBuilderComponent implements OnInit {

  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }

  lookups = [];
  ngOnInit() {
    console.log('inside child');
    this.lookups[0] = {name: 'rajan'};
    this.lookups[1] = {name: 'rajan1'};
    this.lookups[2] = {name: 'rajan2'};
    this.lookups[3] = {name: 'rajan3'};

  }
  getInputType(type) {
    return type;

  }
  getFieldTemplate() {
    return null;
    }
  findTemplateForRule(rule) {
    return null;
  }

}
