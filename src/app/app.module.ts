import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EzFormModule} from '@gordon_freeman/ez-form';
import {PlosService} from './plos.service';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EzFormModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [
    PlosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
