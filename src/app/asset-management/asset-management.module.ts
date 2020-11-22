import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetManagementRoutingModule } from './asset-management-routing.module';
import { AssetHomeComponent } from './asset-home/asset-home.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbListModule, NbSidebarModule, NbTabsetModule, NbThemeModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonDirectivesModule } from '../common-directives/common-directives.module';

import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [AssetHomeComponent, AssetConfigurationComponent],
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
    NbLayoutModule,
    NbTabsetModule,

    NbThemeModule.forRoot({ name: 'dark' }),
    NbEvaIconsModule,


    // HttpClientModule


    // NbCardModule,
    // NbTabsetModule,
    // CommonDirectivesModule,
    NbButtonModule



  ]
})
export class AssetManagementModule { }