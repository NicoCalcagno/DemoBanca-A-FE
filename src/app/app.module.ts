import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { MovementComponent } from './movement/movement.component';
import { AccountService } from './account/account.service';
import { MovementService } from './movement/movement.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ClientComponent } from './client/client.component';
import { ClientService } from './client/client.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    MovementComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ClientService, AccountService, MovementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
