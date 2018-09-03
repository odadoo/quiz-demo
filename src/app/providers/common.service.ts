import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public url: string = "http://localhost:8000/api";
  public getData: any;
  constructor(private http: Http) { }

  getAllQuestions(getCountVal){
    return this.http.get(this.url + '/getQuestions/'+ getCountVal)
            .map((response: Response) => response.json())
            // .catch(this.errorHandler)
  }

  // errorHandler(error: HttpErrorResponse){
  //   return Observable.throw(error.message || "Server Error")
  // }

  saveQuestions(qstn){
    return this.http.post(this.url + '/saveQuestion', qstn)
            .map((response: Response) => response.json())
  }

  getQuestionsCategory(){
    return this.http.get(this.url + '/getCategory')
            .map((response: Response) => response.json())
  }

  registerUser(usr){
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/saveUser', usr)
        .subscribe(data=>{
          this.getData = data.json();
          resolve(this.getData);
        }, err=>{
          reject(err);
        })
    });
  }

  verifyUser(user){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+ '/authUser', user)
        .subscribe(data => {
          resolve(data.json());
        }, err => {
          reject(err);
        })
    })
  }

}









// import 'rxjs/add/operator/do';
  /*saveUser(user){
    return this.http.post(this.url + '/SaveUser', user)
            .map((response: Response) =>response.json())
  }

  GetUser(){
    return this.http.get(this.url + '/getUser')
            .map((response: Response) => response.json())
  }
  deleteUser(id){
    return this.http.post( this.url + '/deleteUser',{'id': id})
            .map((response: Response) =>response.json())
  }
*/
