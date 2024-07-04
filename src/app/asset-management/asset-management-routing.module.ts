import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetHomeComponent } from './asset-home/asset-home.component';
import { NavMenuItemsIdentifiers } from './asset-store.service';

const routes: Routes = [

  {
    path: '',
    component: AssetHomeComponent,
    pathMatch: 'full',

  },


  {
    path: '',
    component: AssetHomeComponent,


    children: [


      // { path: '', redirectTo: 'host', pathMatch: 'full' },
      // {
      //   path: '',
      //   loadChildren: () => import('./submodules/host/host.module').then(m => m.HostModule)
      // },
      {
        path: 'host',
        loadChildren: () => import('./submodules/host/host.module').then(m => m.HostModule),
        data: {
          id: NavMenuItemsIdentifiers.Host
        }

      },
      {

        path: 'domain',
        loadChildren: () => import('./submodules/domain/domain.module').then(m => m.DomainModule),
        data: {
          id: NavMenuItemsIdentifiers.Domain
        }

      },

      {
        path: 'web',
        loadChildren: () => import('./submodules/web/web.module').then(m => m.WebModule),
        data: {
          id: NavMenuItemsIdentifiers.Web
        }
        ,

      }, {
        path: 'android',
        loadChildren: () => import('./submodules/android/android.module').then(m => m.AndroidModule),
        data: {
          id: NavMenuItemsIdentifiers.Android
        }

      }, {
        path: 'ios',
        loadChildren: () => import('./submodules/ios/ios.module').then(m => m.IosModule),
        data: {
          id: NavMenuItemsIdentifiers.Ios
        }

      }, {
        path: 'repository',
        loadChildren: () => import('./submodules/repository/repository.module').then(m => m.RepositoryModule),
        data: {
          id: NavMenuItemsIdentifiers.Repository
        }

      }, {
        path: 'docker',
        loadChildren: () => import('./submodules/docker/docker.module').then(m => m.DockerModule),
        data: {
          id: NavMenuItemsIdentifiers.Docker
        }

      },


      // { path: '**', redirectTo: 'host' },

    ]
  }
  // ,

  // {
  //   path: 'host2',
  //   component: AssetHomeComponent,
  //   children: [
  //     {
  //       path: '',
  //       outlet: 'asset',
  //       loadChildren: () => import('./submodules/host/host.module').then(m => m.HostModule)
  //     }
  //   ]
  // }
  // ,

  // {
  //   path: 'domain',
  //   component: AssetHomeComponent,
  //   children: [
  //     {
  //       path: '',
  //       outlet: 'asset',
  //       loadChildren: () => import('./submodules/domain/domain.module').then(m => m.DomainModule)
  //     }
  //   ]
  // }
  // ,

  // {
  //   path: 'android',
  //   component: AssetHomeComponent,
  //   children: [
  //     {
  //       path: '',
  //       outlet: 'asset',
  //       loadChildren: () => import('./submodules/android/android.module').then(m => m.AndroidModule)
  //     }
  //   ]
  // }
  // ,

  // {
  //   path: 'ios',
  //   component: AssetHomeComponent,
  //   children: [
  //     {
  //       path: '',
  //       outlet: 'asset',
  //       loadChildren: () => import('./submodules/ios/ios.module').then(m => m.IosModule)
  //     }
  //   ]
  // }
  // ,

  // {
  //   path: 'web',
  //   component: AssetHomeComponent,
  //   children: [
  //     {
  //       path: '',
  //       outlet: 'asset',
  //       loadChildren: () => import('./submodules/web/web.module').then(m => m.WebModule)
  //     }
  //   ]
  // }
  // ,

  // {
  //   path: 'repository',
  //   component: AssetHomeComponent,
  //   children: [
  //     {
  //       path: '',
  //       outlet: 'asset',
  //       loadChildren: () => import('./submodules/repository/repository.module').then(m => m.RepositoryModule)
  //     }
  //   ]
  // }
  // ,

  // {
  //   path: 'docker',
  //   component: AssetHomeComponent,
  //   children: [
  //     {
  //       path: '',
  //       outlet: 'asset',
  //       loadChildren: () => import('./submodules/docker/docker.module').then(m => m.DockerModule)
  //     }
  //   ]
  // }
  ,
  {
    path: '**',
    redirectTo: 'host'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }
