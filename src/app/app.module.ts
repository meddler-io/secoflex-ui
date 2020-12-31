import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NbThemeModule, NbLayoutModule, NbMenuModule, NbAccordionModule, NbSidebarModule } from '@nebular/theme';
// import { NbEvaIconsModule } from '@nebular/eva-icons';
// import { ReusableComponentsModule } from './reusable-components/reusable-components.module';
// import { CKEditorModule } from 'ngx-ckeditor';
// import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
// import { CommonDirectivesModule } from './common-directives/common-directives.module';

import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from './loading/loading.module';

import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { HeadbarComponent } from './temp/headbar/headbar.component';
import { SpinnerModule } from './spinner/spinner/spinner.module';

import { NbEvaIconsModule } from '@nebular/eva-icons';




@NgModule({
  declarations: [
    AppComponent,



  ],
  imports: [
    // SpinnerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingModule,
    // HttpClientModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
