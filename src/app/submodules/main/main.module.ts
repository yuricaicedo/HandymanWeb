import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TypeaheadModule }  from 'ngx-bootstrap/typeahead';
import { ToastModule }  from 'primeng/toast';

import { MainRoutingModule } from './main.routes';
import { NewOperationComponent } from './components/new-operation/new-operation.component';

@NgModule({
  declarations: [
    NewOperationComponent
  ],
  imports: [
    TypeaheadModule.forRoot(),
    CommonModule,
    MainRoutingModule,
    OwlDateTimeModule, 
    ReactiveFormsModule,
    OwlNativeDateTimeModule,
    ToastModule
  ]
})
export class MainModule { }
