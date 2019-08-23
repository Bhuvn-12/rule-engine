import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-error',
  templateUrl: './data-error.component.html',
  styleUrls: ['./data-error.component.css']
})
export class DataErrorComponent implements OnInit {

  constructor() { }
  errors=[];
  ngOnInit() {
    this.errors[0]={id: '1',data: 'col1,col2,col3',reason: 'Not exact columns'}
  }

}
