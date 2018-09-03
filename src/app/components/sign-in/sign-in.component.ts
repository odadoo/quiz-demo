import { Component, OnInit } from '@angular/core';
import { LoginUser } from './login-user';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RegisterUserComponent } from './../register-user/register-user.component';
import { CommonService } from './../../providers/common.service';
import { UserService } from './../../providers/user/user.service';
import { AlertService } from './../../providers/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  logUser = new LoginUser();
  res:any;

  constructor( public dialog: MatDialog,
               public commonService: CommonService,
               public userService: UserService,
               public alertService: AlertService,
               public router: Router,
               public signInDialogRef: MatDialogRef<SignInComponent> ) { }

  ngOnInit() { }

  onSubmit(){
    this.commonService.verifyUser(this.logUser).then(res=>{
      if(res.accessToken){
        // localStorage.setItem('currentUser', JSON.stringify(res.userDetail));
        this.userService.setLoggedInUser();
        this.router.navigate(['/add-qns']);
        this.alertService.success('Logged in successfully', true);
        this.signInDialogRef.close();
      }else{
        this.alertService.error('User not found', true);
        this.signInDialogRef.close();
      }
    }, err=>{
      console.log("this is the err");
    })
  }

  // login(username: string, password: string) {
  //   return this.http.post<any>(`/users/authenticate`, { username, password })
  //     .pipe(map(user => {
  //       if (user && user.token) {
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //       }
  //       return user;
  //     }));
  //   }

  OpenSignUpPopup(){
    this.signInDialogRef.close();
    let signUpDialogRef = this.dialog.open(RegisterUserComponent);
    signUpDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
