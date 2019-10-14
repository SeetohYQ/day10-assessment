import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, Form } from '@angular/forms';
import { FormService } from '../form.service';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {

  newForm: FormGroup;
  countries: string[] = [];
  callingCodes: string[] = [];
  code: string = '65';

  constructor(private formSvc: FormService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.newForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@#$]).{8,}$')]),
      'name': new FormControl(null, Validators.required),
      'gender': new FormControl('male', Validators.required),
      'dob': new FormControl(null, [Validators.required, this.verifyDob.bind(this)] ),
      'address': new FormControl(null, Validators.required),
      'country': new FormControl('Singapore', Validators.required),
      'contact': new FormGroup({
        'countryCode': new FormControl(this.code, [Validators.required, Validators.pattern('^[0-9]+$')]),
        'areaCode': new FormControl(null, [Validators.pattern('^[0-9]+$')]),
        'phone': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')])
      })
    })
    this.countries = this.getCountryList();
  }

  getCountryList() {
    this.formSvc.getCountries().then((result) => {
      const countries = [];
      for (let i = 0; i < result.length; i++) {
        this.countries.push(result[i].name);
      }
    }).catch((error) => {
      console.log(error);
    });
    return this.countries;
  }

  getCountryCode(countryName: string){
    this.formSvc.getCountryCode(countryName).then((result)=>{
      this.code = result[0].callingCodes;
    })
    .catch((error)=>{
      console.log(error);
      this.code = '';
    });
    return this.code;
  }

  populateCountryCode(event: any){
    this.code = this.getCountryCode(this.newForm.get('country').value);
  }

  processForm() {
    this.formSvc.processForm(this.newForm);
    this.router.navigate(['form','confirm'])
  }

  verifyDob(control: FormControl): ValidationErrors {
    const dateOfBirth = control.value;
    const currentAge = moment().diff(dateOfBirth, 'years');
    if (currentAge < 18) {
      return {ageRequirement : 'Must be at least 18 years old'};
    }
    return null;
  }

  public hasError(controlName: string, errorName: string){
    return this.newForm.controls[controlName].hasError(errorName);
  }
}
