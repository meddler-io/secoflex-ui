import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbTabsetModule } from '@nebular/theme';
import { CommonDirectivesModule } from 'src/app/common-directives/common-directives.module';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { DrawerModule } from 'src/app/drawer/drawer.module';


const common_modules = [
  NbCardModule,
  NbTabsetModule,
  CommonDirectivesModule,
  NbButtonModule,
  DrawerModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...common_modules
  ],
  exports: [
    ...common_modules
  ]
})
export class CommonImportsModule { }
