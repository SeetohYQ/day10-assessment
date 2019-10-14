import { Component, OnInit } from '@angular/core';
import { Details } from '../models';
import { FormService } from '../form.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  formDetails: Details;
  submitted = false;

  constructor(private formSvc: FormService) { }

  ngOnInit() {
    this.formDetails = this.formSvc.getFormDetails();
  }

}
