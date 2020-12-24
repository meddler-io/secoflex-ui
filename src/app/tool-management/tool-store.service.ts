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
            name: 'Create Tool',
            icon: 'external-link-outline',
            link: ['/tool', 'host', 'import'],
            id: NavMenuItemsIdentifiers.Host,



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
        name: 'Data Sources',
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
            name: 'Manage',
            icon: 'external-link-outline',
            link: ['/tool', 'domain', 'configure'],
            id: NavMenuItemsIdentifiers.DomainConfigure,


          }
        ]
      },

      {
        name: 'Plugin Store',
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
    
    ]
  }
}
