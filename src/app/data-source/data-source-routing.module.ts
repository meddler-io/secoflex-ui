import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemaHomeComponent } from './schema-home/schema-home.component';

const routes: Routes = [

  {
    path: '**',
    component: SchemaHomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataSourceRoutingModule { }
