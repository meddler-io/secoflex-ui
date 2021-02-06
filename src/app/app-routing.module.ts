import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { BootstrapComponent } from './reusable-components/bootstrap/bootstrap.component';
import { FormCreatorComponent } from './reusable-components/form-create/form-creator/form-creator.component';
import { ViewPagerComponent } from './reusable-components/form-builder/commonComponents/view-pager/view-pager.component';
import { PlaygroundComponent } from './reusable-components/playground/playground.component';
import { BusinessComponent } from './reusable-components/management/business/business.component';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { BootstrapComponent } from './lander/bootstrap/bootstrap.component';
import { EntryComponentComponent } from './entry-component/entry-component.component';



const routes: Routes = [

  {
    path: '',
    component: EntryComponentComponent,
    children: [

      // Landing Module (Mostly static content)
      {
        path: 'home',
        loadChildren: () => import('./lander/lander.module').then(m => m.LanderModule),
      },

      {
        path: 'tools',
        loadChildren: () => import('./tool-management/tool-management.module').then(m => m.ToolManagementModule)

      },


      {
        path: 'schema',
        loadChildren: () => import('./data-source/data-source.module').then(m => m.DataSourceModule)

      },
      {
        path: 'asset',
        loadChildren: () => import('./asset-management/asset-management.module').then(m => m.AssetManagementModule)

      },
      {
        path: 'form-builder/:formid',
        // component: ViewPagerComponent
        loadChildren: () => import('./reusable-components/reusable-components.module').then(m => m.ReusableComponentsModule)
      },

      { path: "**", redirectTo: "tools", pathMatch: "full" },



    ]
  },
  { path: "**", redirectTo: "/", pathMatch: "full" },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
