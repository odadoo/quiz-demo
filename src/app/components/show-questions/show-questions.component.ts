import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../providers/common.service';

@Component({
  selector: 'app-show-questions',
  templateUrl: './show-questions.component.html',
  styleUrls: ['./show-questions.component.css']
})
export class ShowQuestionsComponent implements OnInit {
  questions;
  public errorMessage;
  public catShowSelect;
  public qstCatgeory;
  public categoryCode;

  constructor(public newService: CommonService) { }

  ngOnInit() {
    // this.newService.getAllQuestions()
    // .subscribe( data => this.questions = data,
    //             error => this.errorMessage = error);

    this.getQstnCategory();
  }

  categorySelected(ev){
    this.categoryCode = ev.value;
    var res = this.qstCatgeory.filter(obj => {
      return obj.code === this.categoryCode;
    })
    this.getCatBasedQuestions(res[0].code);
  }

  getCatBasedQuestions(getCode) {
    this.newService.getAllQuestions(getCode)
    .subscribe( data => {
      this.questions = data;
    }, error => {
      this.errorMessage = error
    });
  }

  getQstnCategory(){
    this.newService.getQuestionsCategory().subscribe(data => {
      this.qstCatgeory = data;
    }, error => {
      console.log("Error occured while fetching questions category");
    })
  }


}
