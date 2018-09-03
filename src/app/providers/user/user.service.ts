import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userIsLoggedIn: any;
  constructor() {
    this.userIsLoggedIn = false;
  }

  setLoggedInUser(){
    this.userIsLoggedIn = true;
  }

  updateLoggeinUser(){
    this.userIsLoggedIn = false;
  }

  getLoggedInUser(){
    return this.userIsLoggedIn;
  }
}
