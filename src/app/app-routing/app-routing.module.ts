import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../auth.guard';

import { AddQuestionsComponent } from './../components/add-questions/add-questions.component';
import { ShowQuestionsComponent } from './../components/show-questions/show-questions.component';
import { HomeComponent } from './../pages/home/home.component';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';


const route: Routes =  [
  { path: 'home', component: HomeComponent },
  { path: 'add-qns', component: AddQuestionsComponent, canActivate: [AuthGuard] },
  { path: 'show-qns', component: ShowQuestionsComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
  //   children: [
  //     { path: 'add-qns', component: AddQuestionsComponent },
  //     { path: 'show-qns', component: ShowQuestionsComponent },
  //     { path: '', redirectTo: 'add-qns', pathMatch: 'full'},
  //   ]
  // },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot( route )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
