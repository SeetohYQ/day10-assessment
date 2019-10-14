import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Details } from './models';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiuri: string = 'https://cors-anywhere.herokuapp.com/http://ec2-13-229-233-153.ap-southeast-1.compute.amazonaws.com:3000/countries';
  formDetails: Details = new Details(null,'',null,'male',null,null,'Singapore','');

  constructor(private httpSvc: HttpClient) { }

  getCountries(): Promise<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('X-Requested-With', 'XMLHttpRequest');

    return this.httpSvc.get(this.apiuri).toPromise();
  }

  getCountryCode(countryName: string): Promise<any> {
    const uri = 'http://restcountries.eu/rest/v2/name/' + countryName;

    return this.httpSvc.get(uri).toPromise();
  }

  processForm(newForm: FormGroup){
    this.formDetails.email = newForm.get('email').value;
    this.formDetails.password = newForm.get('password').value;
    this.formDetails.name = newForm.get('name').value;
    this.formDetails.gender = newForm.get('gender').value;
    this.formDetails.dob = newForm.get('dob').value;
    this.formDetails.country = newForm.get('country').value;
    this.formDetails.address = newForm.get('address').value;
    const areaCode = newForm.get('contact.areaCode').value || '';
    if (areaCode === ''){
      this.formDetails.contact = '+' + newForm.get('contact.countryCode').value + '-' + newForm.get('contact.phone').value;
    }
    else{
      this.formDetails.contact = '+' + newForm.get('contact.countryCode').value + '-' + areaCode + '-' + newForm.get('contact.phone').value;
    }
  }

  getFormDetails(){
    return this.formDetails;
  }

}
