import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ShowQuestionsComponent } from './show-questions/show-questions.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatInputModule } from '@angular/material/input';
import { RegisterUserComponent } from './register-user/register-user.component';
// import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule, MatDialogModule
    // HttpModule
    // MatPaginatorModule,
    // MatTableModule
  ],
  entryComponents: [SignInComponent, RegisterUserComponent],
  declarations: [AddQuestionsComponent, ShowQuestionsComponent, SignInComponent, RegisterUserComponent],
  exports: [AddQuestionsComponent]
})
export class ComponentsModule { }
