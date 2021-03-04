import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetManagementRoutingModule } from './asset-management-routing.module';
import { AssetHomeComponent } from './asset-home/asset-home.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbLayoutModule, NbListModule, NbSidebarModule, NbTabsetModule, NbThemeModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';

import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NavbarListItemComponent } from './navbar-list-item/navbar-list-item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DelayInterceptor } from '../reusable-components/common/services/DelayHttpInterceptor';
import { AssetApiService } from './asset-api.service';



@NgModule({
  declarations: [AssetHomeComponent, AssetConfigurationComponent, NavbarListItemComponent,

  ],
  imports: [
    NbLayoutModule,
    FlexLayoutModule,
    CommonModule,
    AssetManagementRoutingModule,
    NbIconModule,
    CommonDirectivesModule,
    NbSidebarModule.forRoot(),
    NbTabsetModule,
    NbCardModule,
    NbListModule,
    NbAccordionModule,
    // CommonImportsModule,
    NbTabsetModule,

    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,


    NbDialogModule.forChild(),

    HttpClientModule,


    // NbCardModule,
    // NbTabsetModule,
    // CommonDirectivesModule,
    NbButtonModule,




  ] , 
  providers: [
    HttpClientModule,
    AssetApiService,
    { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true },

  ]
})
export class AssetManagementModule { }
