import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { NewOperationComponent } from './components/new-operation/new-operation.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
        { path: '', redirectTo:'new-operation', pathMatch: 'full' },
        { path: 'new-operation', component: NewOperationComponent },
        { path: '**', redirectTo: 'new-operation' }
    ]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }