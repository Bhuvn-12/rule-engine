import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { QueryBuilderComponent} from 'angular2-query-builder-test';

@Component({
  selector: 'app-then-query-builder',
  templateUrl: './then-query-builder.component.html',
  styleUrls: ['./then-query-builder.component.css']
})
export class ThenQueryBuilderComponent extends QueryBuilderComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef) {
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

  getOperators() {
    return ['='];
  }
}
