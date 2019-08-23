import { Component, OnInit } from '@angular/core';
import { Helpers } from '../helpers';
declare var $: any;
@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Helpers.initLayout();
    $('body').addClass('fixed-layout');
    $('#sidebar-collapse').slimScroll({
       height: '100%',
       railOpacity: '0.9',
    });
  }

}
