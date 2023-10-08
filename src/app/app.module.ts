import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import {HttpClientModule} from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-gvwq43ibwq0wpst5.us.auth0.com',
      clientId: 'EEUezQ1Ca1XxSRLnZDinWisPNxpwkyQZ',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    FormsModule,
    MatIconModule,
    ClipboardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
