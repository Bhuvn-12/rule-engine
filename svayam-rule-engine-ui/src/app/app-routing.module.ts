import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutsComponent } from './layouts/layouts.component';
import { AppHeader } from './layouts//app-header/app-header.component';
import { AppSidebar } from './layouts/app-sidebar/app-sidebar.component';
import { AppFooter } from './layouts//app-footer/app-footer.component';

import { DataobjectComponent } from './dataobject/dataobject.component';
import { RuleBuilderComponent } from './rule-builder/rule-builder.component';
import { LookupComponent } from './lookup/lookup.component';
import { RuleSetListComponent } from './rule-set-list/rule-set-list.component';
import {RuleTestComponent} from './rule-test/rule-test.component';
import {RuleOpsComponent} from './rule-ops/rule-ops.component';
import {DataErrorComponent} from './data-error/data-error.component';
import {ProcessFlowComponent} from './process-flow/process-flow.component';
const routes: Routes = [
  {
    path: '', component: LayoutsComponent,
    children: [
      { path: 'processflow', component: ProcessFlowComponent },

      { path: 'ruledef', component: RuleBuilderComponent },
      { path: 'rules', component: RuleSetListComponent },
      { path: 'dataobj', component: DataobjectComponent },
      { path: 'lookup', component: LookupComponent },
      { path: 'ruletest', component: RuleTestComponent },
      { path: 'ruleops', component: RuleOpsComponent },
      { path: 'dataerror', component: DataErrorComponent },
      { path: '', redirectTo: 'dataobj', pathMatch: 'full' }]
  }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
  ]
})

export class AppRoutingModule { }
