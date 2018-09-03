import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from './providers/user/user.service';
import { AlertService } from './providers/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dialog: MatDialog,
              public userService: UserService,
              public alertService: AlertService,
              public router: Router) {   }

  ngOnInit() {
    var dat = new Date();
    debugger
  }

  isLoggedIn(): boolean {
    return this.userService.getLoggedInUser();
  }

  signIn() {
    var signInDialogRef = this.dialog.open( SignInComponent );

    signInDialogRef.afterClosed().subscribe(result=>{
      console.log("Dialog Result: ${result}");
    });
  }

  signOut(){
    debugger
    this.userService.updateLoggeinUser();
    this.router.navigate(['/home']);
    this.alertService.success('LoggedOut Successfully', true);
  }

}


















// import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
  // this.newService.GetUser().subscribe(data =>  this.Repdata = data)

  // onSave = function(user,isValid: boolean) {
  //   user.mode= this.valbutton;
  //     this.newService.saveUser(user)
  //     .subscribe(data =>  {  alert(data.data);

  //       this.ngOnInit();
  //     }
  //     , error => this.errorMessage = error )
  // }

  // edit = function(kk) {
  //   this.id = kk._id;
  //   this.name= kk.name;
  //   this.address= kk.address;
  //   this.valbutton ="Update";
  // }

  // delete = function(id) {
  //   this.newService.deleteUser(id)
  //     .subscribe(data =>   { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error )
  // }
