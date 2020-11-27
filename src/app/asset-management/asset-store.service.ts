import { Injectable } from '@angular/core';

//Warning: Do not edit until synced with backend
export enum AssetType {
  HOST = 'host',
  DOMAIN = 'domain',
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
  REPOSITORY = 'repository',
  DOCKER = 'docker',

}


export const NavMenuItemsIdentifiers = {
  Host: 'host',
  HostCreate: 'host_create',
  HostConfigure: 'host_configure',


  Domain: 'domain',
  DomainCreate: 'domain_create',
  DomainConfigure: 'domain_configure',


  Web: 'web',
  WebCreate: 'web_create',
  WebConfigure: 'web_configure',


  Android: 'android',
  AndroidCreate: 'dandroidcreate',
  AndroidConfigure: 'android_configure',


  Ios: 'ios',
  IosCreate: 'ios_create',
  IosConfigure: 'ios_configure',


  Repository: 'repository',
  RepositoryCreate: 'repository_create',
  RepositoryConfigure: 'repository_configure',


  Docker: 'docker',
  DockerCreate: 'docker_create',
  DockerConfigure: 'docker_configure',
}





export interface NavbarItem {
  id: string;
  name: string;
  icon?: string;
  type?: AssetType;
  link?: string[];
  path?: string[];
  children?: NavbarItem[];
}


@Injectable({
  providedIn: 'root'
})
export class AssetStoreService {

  constructor() { }


  get getAssetTypes(): NavbarItem[] {
    return [
      {
        name: 'Hosts',
        icon: 'eva-arrow-left',
        type: AssetType.HOST,
        link: ['/asset', 'host', 'import'],
        id: NavMenuItemsIdentifiers.Host,

        path: ['/asset/host'],
        children: [
          {
            name: 'Hosts',
            icon: 'external-link-outline',
            link: ['/asset', 'host', 'import'],
            id: NavMenuItemsIdentifiers.Host,



          },
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'host', 'add'],
            id: NavMenuItemsIdentifiers.HostCreate,


          },

          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'host', 'configure'],
            id: NavMenuItemsIdentifiers.HostConfigure,


          }
        ]
      },
      {
        name: 'Domains',
        type: AssetType.DOMAIN,
        link: ['/asset', 'domain', 'add'],

        path: ['/asset/domain'],
        id: NavMenuItemsIdentifiers.Domain,


        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'domain', 'add'],
        id: NavMenuItemsIdentifiers.DomainCreate,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'domain', 'import'],
        id: NavMenuItemsIdentifiers.DomainCreate,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'domain', 'configure'],
        id: NavMenuItemsIdentifiers.DomainConfigure,


          }
        ]
      },

      {
        name: 'Web',
        type: AssetType.WEB,
        link: ['/asset', 'web', 'add'],
        id: NavMenuItemsIdentifiers.Web,

        path: ['/asset/web'],

        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'web', 'add'],
        id: NavMenuItemsIdentifiers.WebCreate,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'web', 'import'],
        id: NavMenuItemsIdentifiers.WebConfigure,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'web', 'configure'],
        id: NavMenuItemsIdentifiers.WebConfigure,


          }
        ]
      },
      {
        name: 'Android',
        type: AssetType.ANDROID,
        link: ['/asset', 'android', 'add'],

        path: ['/asset/android'],
        id: NavMenuItemsIdentifiers.Android,

        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'android', 'add'],
        id: NavMenuItemsIdentifiers.AndroidCreate,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'android', 'import'],
        id: NavMenuItemsIdentifiers.AndroidConfigure,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'android', 'configure'],
        id: NavMenuItemsIdentifiers.AndroidConfigure,


          }
        ]

      },
      {
        name: 'iOS',
        type: AssetType.IOS,
        link: ['/asset', 'ios', 'add'],
        id: NavMenuItemsIdentifiers.Ios,

        path: ['/asset/ios'],
        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'ios', 'add'],
        id: NavMenuItemsIdentifiers.IosCreate,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'ios', 'import'],
        id: NavMenuItemsIdentifiers.IosConfigure,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'ios', 'configure'],
        id: NavMenuItemsIdentifiers.IosConfigure,


          }
        ]

      },

      {
        name: 'Repository',
        type: AssetType.REPOSITORY,
        link: ['/asset', 'repository', 'add'],

        path: ['/asset/repository'],
        id: NavMenuItemsIdentifiers.Repository,


        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'repository', 'add'],
        id: NavMenuItemsIdentifiers.RepositoryCreate,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'repository', 'import'],
        id: NavMenuItemsIdentifiers.RepositoryConfigure,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'repository', 'configure'],
        id: NavMenuItemsIdentifiers.RepositoryConfigure,


          }
        ]


      },
      {
        name: 'Docker',
        type: AssetType.DOCKER,
        link: ['/asset', 'docker', 'add'],
        id: NavMenuItemsIdentifiers.Docker,

        path: ['/asset/docker'],

        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'docker', 'add'],
        id: NavMenuItemsIdentifiers.DockerCreate,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'docker', 'import'],
        id: NavMenuItemsIdentifiers.DockerConfigure,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'docker', 'configure'],
        id: NavMenuItemsIdentifiers.DockerConfigure,


          }
        ]

      }
    ]
  }

}
