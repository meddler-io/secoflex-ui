import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbListModule, NbTabsetModule } from '@nebular/theme';
import { CommonDirectivesModule } from 'src/app/common-directives/common-directives.module';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { DrawerModule } from 'src/app/drawer/drawer.module';
import { LogStreamComponent } from 'src/app/tool-management/log-stream/log-stream.component';
import { PageDividerComponent } from 'src/app/reusable-components/form-builder/commonComponents/page-divider/page-divider.component';



const common_modules = [
  NbCardModule,
  NbTabsetModule,
  CommonDirectivesModule,
  NbButtonModule,
  DrawerModule,


]


@NgModule({
  declarations: [
    PageDividerComponent,


    PageDividerComponent,



  ],
  imports: [
    CommonModule,
    ...common_modules
  ],
  exports: [
    ...common_modules
  ]
})
export class CommonImportsModule { }
