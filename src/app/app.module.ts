import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { CommonService } from './providers/common.service';
// import { UserService } from './providers/user/user.service';

import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './directives/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule, HttpModule, FormsModule, /*RouterModule,*/
    ComponentsModule, PagesModule,
    MatDialogModule,
    AppRoutingModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
