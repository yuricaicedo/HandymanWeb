import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterOperationComponent } from '../components/register-operation/register-operation.component';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
        { path: '', redirectTo:'register-operation', pathMatch: 'full' },
        { path: 'register-operation', component: RegisterOperationComponent },
        { path: '**', redirectTo: 'register-operation' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }