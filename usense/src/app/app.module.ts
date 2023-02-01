import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PasswordComponent],
})
export class AppModule {}
