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
    NbLayoutModule,
    NbTabsetModule,

    NbThemeModule.forRoot({ name: 'dark' }),
    NbEvaIconsModule,


    NbDialogModule.forChild(),

    // HttpClientModule


    // NbCardModule,
    // NbTabsetModule,
    // CommonDirectivesModule,
    NbButtonModule,




  ]
})
export class AssetManagementModule { }
