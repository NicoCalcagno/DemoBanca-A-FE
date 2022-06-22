import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../account/account.component';

import { ClientComponent } from '../client/client.component';
import { MovementComponent } from '../movement/movement.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'account', component: AccountComponent },
  { path: 'movement', component: MovementComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
