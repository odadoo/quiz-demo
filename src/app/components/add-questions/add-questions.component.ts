import { Component, OnInit } from '@angular/core';
import { CreateQuestions } from './question';
import { CommonService } from './../../providers/common.service';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  questionary = new CreateQuestions();
  errorMessage: string;
  public qstCatgeory: any;
  public catSelect: any;
  public categoryCode;

  constructor( private newService: CommonService) { }

  ngOnInit() {
    this.getQstnCategory();
  }

  getQstnCategory(){
    this.newService.getQuestionsCategory().subscribe(data => {
      this.qstCatgeory = data;
    }, error => {
      console.log("Error occured while fetching questions category");
    })
  }

  // categorySelected(ev){
  //   this.categoryCode = ev.value;
  // }

  onSubmit(){
    var qstnData = {
      questions: this.questionary.question,
      choices: [ this.questionary.option1, this.questionary.option2, this.questionary.option3, this.questionary.option4 ],
      catCode: this.questionary.catCode
    };
    this.newService.saveQuestions(qstnData).subscribe( data => {
      // form.reset();
      alert(data);
    })
        // error => this.errorMessage = error)
  }

}
