import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { QueryBuilderModule } from 'angular2-query-builder-test';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatIconModule,
  MatCardModule,
  MatExpansionModule,
  MatSnackBarModule,
} from '@angular/material';
import { WhenQueryBuilderComponent } from './rule-builder/when-query-builder/when-query-builder.component';
import { ThenQueryBuilderComponent } from './rule-builder/then-query-builder/then-query-builder.component';
import { HttpClientModule } from '@angular/common/http';
import { DataobjectComponent } from './dataobject/dataobject.component';
import { RuleBuilderComponent } from './rule-builder/rule-builder.component';
import { AppRoutingModule } from './/app-routing.module';
import { LookupComponent } from './lookup/lookup.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { AppHeader } from './layouts//app-header/app-header.component';
import { AppSidebar } from './layouts/app-sidebar/app-sidebar.component';
import { AppFooter } from './layouts//app-footer/app-footer.component';
import { RuleSetListComponent } from './rule-set-list/rule-set-list.component';
import { RuleTestComponent } from './rule-test/rule-test.component';
import { RuleOpsComponent } from './rule-ops/rule-ops.component';
import { DataErrorComponent } from './data-error/data-error.component';
import { ProcessFlowComponent } from './process-flow/process-flow.component';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    QueryBuilderModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    HttpClientModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    WhenQueryBuilderComponent,
    ThenQueryBuilderComponent,
    DataobjectComponent,
    RuleBuilderComponent,
    LookupComponent,
    LayoutsComponent,
    AppHeader,
    AppSidebar,
    AppFooter,
    RuleSetListComponent,
    RuleTestComponent,
    RuleOpsComponent,
    DataErrorComponent,
    ProcessFlowComponent
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
