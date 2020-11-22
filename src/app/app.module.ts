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



@NgModule({
  declarations: [
    AppComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingModule,
    // NbThemeModule.forRoot({ name: 'dark' }),

    HttpClientModule,

    // CKEditorModule,
    // NbMenuModule.forRoot(),
    // ScrollToModule.forRoot(),
    // CommonDirectivesModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
