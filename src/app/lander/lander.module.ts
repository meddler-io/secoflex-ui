import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanderRoutingModule } from './lander-routing.module';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [BootstrapComponent, NavbarComponent, LandingPageComponent, ContactComponent],
  imports: [
    CommonModule,
    LanderRoutingModule
  ]
})
export class LanderModule { }
