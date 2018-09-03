import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Users } from './user';
import { CommonService } from './../../providers/common.service';
import { AlertService } from './../../providers/alert.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerUser = new Users();

  constructor(public commonService: CommonService,
              public alertService: AlertService,
              public signUpDialogRef: MatDialogRef<RegisterUserComponent>) { }

  ngOnInit() { }

  onSubmit(){
    this.commonService.registerUser(this.registerUser).then(res=>{
      this.alertService.success('Registration successful', true);
      this.signUpDialogRef.close();
    }, err=>{
      this.alertService.error(err);
    });
  }

}
