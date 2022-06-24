import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { RegisterOperationComponent } from '../components/register-operation/register-operation.component';
import { MainRoutingModule } from './main.routes';

@NgModule({
  declarations: [
    RegisterOperationComponent
  ],
  imports: [
    FormsModule,
    NgbModule,
    CommonModule,
    MainRoutingModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ]
})
export class MainModule { }
