import { Injectable } from '@angular/core';


//Warning: Do not edit until synced with backend
export enum ToolType {
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
  type?: ToolType;
  link?: string[];
  path?: string[];
  children?: NavbarItem[];
}
@Injectable({
  providedIn: 'root'
})
export class ToolStoreService {



  constructor() { }

  get getToolMenu(): NavbarItem[] {
    return [
      {
        name: 'Tools',
        icon: 'eva-arrow-left',
        type: ToolType.HOST,
        link: ['/tool', 'host', 'import'],
        id: NavMenuItemsIdentifiers.Host,

        path: ['/tool/host'],
        children: [
          {
            name: 'Hosts',
            icon: 'external-link-outline',
            link: ['/tool', 'host', 'import'],
            id: NavMenuItemsIdentifiers.Host,



          },
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/tool', 'host', 'add'],
            id: NavMenuItemsIdentifiers.HostCreate,


          },

          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/tool', 'host', 'configure'],
            id: NavMenuItemsIdentifiers.HostConfigure,


          }
        ]
      },
      {
        name: 'Dependencies',
        type: ToolType.DOMAIN,
        link: ['/tool', 'domain', 'add'],

        path: ['/tool/domain'],
        id: NavMenuItemsIdentifiers.Domain,


        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/tool', 'domain', 'add'],
            id: NavMenuItemsIdentifiers.Domain,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/tool', 'domain', 'import'],
            id: NavMenuItemsIdentifiers.DomainCreate,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/tool', 'domain', 'configure'],
            id: NavMenuItemsIdentifiers.DomainConfigure,


          }
        ]
      },

      {
        name: 'Store',
        type: ToolType.WEB,
        link: ['/tool', 'web', 'add'],
        id: NavMenuItemsIdentifiers.Web,

        path: ['/tool/web'],

        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/tool', 'web', 'add'],
            id: NavMenuItemsIdentifiers.Web,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/tool', 'web', 'import'],
            id: NavMenuItemsIdentifiers.WebCreate,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/tool', 'web', 'configure'],
            id: NavMenuItemsIdentifiers.WebConfigure,


          }
        ]
      },
      {
        name: 'Android',
        type: ToolType.ANDROID,
        link: ['/tool', 'android', 'add'],

        path: ['/tool/android'],
        id: NavMenuItemsIdentifiers.Android,

        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/tool', 'android', 'add'],
            id: NavMenuItemsIdentifiers.Android,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/tool', 'android', 'import'],
            id: NavMenuItemsIdentifiers.AndroidCreate,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/tool', 'android', 'configure'],
            id: NavMenuItemsIdentifiers.AndroidConfigure,


          }
        ]

      },
      {
        name: 'iOS',
        type: ToolType.IOS,
        link: ['/tool', 'ios', 'add'],
        id: NavMenuItemsIdentifiers.Ios,

        path: ['/tool/ios'],
        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/tool', 'ios', 'add'],
            id: NavMenuItemsIdentifiers.Ios,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/tool', 'ios', 'import'],
            id: NavMenuItemsIdentifiers.IosCreate,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/tool', 'ios', 'configure'],
            id: NavMenuItemsIdentifiers.IosConfigure,


          }
        ]

      },

      {
        name: 'Repository',
        type: ToolType.REPOSITORY,
        link: ['/tool', 'repository', 'add'],

        path: ['/tool/repository'],
        id: NavMenuItemsIdentifiers.Repository,


        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/tool', 'repository', 'add'],
            id: NavMenuItemsIdentifiers.Repository,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/tool', 'repository', 'import'],
            id: NavMenuItemsIdentifiers.RepositoryCreate,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/tool', 'repository', 'configure'],
            id: NavMenuItemsIdentifiers.RepositoryConfigure,


          }
        ]


      },
      {
        name: 'Docker',
        type: ToolType.DOCKER,
        link: ['/tool', 'docker', 'add'],
        id: NavMenuItemsIdentifiers.Docker,

        path: ['/tool/docker'],

        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/tool', 'docker', 'add'],
            id: NavMenuItemsIdentifiers.Docker,


          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/tool', 'docker', 'import'],
            id: NavMenuItemsIdentifiers.DockerCreate,


          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/tool', 'docker', 'configure'],
            id: NavMenuItemsIdentifiers.DockerConfigure,


          }
        ]

      }
    ]
  }
}
