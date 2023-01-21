import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { ContactComponent } from './contact/contact.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [


  {
    path: '',
    component: BootstrapComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
      },
      {
        path: 'beta',
        component: ContactComponent,
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanderRoutingModule { }
