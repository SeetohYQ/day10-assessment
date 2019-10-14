import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitFormComponent } from './components/submit-form.component';
import { ConfirmationComponent } from './components/confirmation.component';


const routes: Routes = [
  { path: '', component: SubmitFormComponent },
  { path: 'form', component: SubmitFormComponent },
  { path: 'form/confirm', component: ConfirmationComponent },
  { path: '**', redirectTo: 'form' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
