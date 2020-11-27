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


export interface NavbarItem {
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

        path: ['/asset/host'],
        children: [
          {
            name: 'Hosts',
            icon: 'external-link-outline',
            link: ['/asset', 'host', 'import'],

          },
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'host', 'add'],

          },

          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'host', 'configure'],

          }
        ]
      },
      {
        name: 'Domains',
        type: AssetType.DOMAIN,
        link: ['/asset', 'domain', 'add'],

        path: ['/asset/domain'],


        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'domain', 'add'],

          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'domain', 'import'],

          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'domain', 'configure'],

          }
        ]
      },

      {
        name: 'Web',
        type: AssetType.WEB,
        link: ['/asset', 'web', 'add'],

        path: ['/asset/web'],

        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'web', 'add'],

          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'web', 'import'],

          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'web', 'configure'],

          }
        ]
      },
      {
        name: 'Android',
        type: AssetType.ANDROID,
        link: ['/asset', 'android', 'add'],

        path: ['/asset/android'],

        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'android', 'add'],

          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'android', 'import'],

          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'android', 'configure'],

          }
        ]

      },
      {
        name: 'iOS',
        type: AssetType.IOS,
        link: ['/asset', 'ios', 'add'],

        path: ['/asset/ios'],
        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'ios', 'add'],

          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'ios', 'import'],

          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'ios', 'configure'],

          }
        ]

      },

      {
        name: 'Repository',
        type: AssetType.REPOSITORY,
        link: ['/asset', 'repository', 'add'],

        path: ['/asset/repository'],

        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'repository', 'add'],

          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'repository', 'import'],

          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'repository', 'configure'],

          }
        ]


      },
      {
        name: 'Docker',
        type: AssetType.DOCKER,
        link: ['/asset', 'docker', 'add'],

        path: ['/asset/docker'],

        children: [
          {
            name: 'Create',
            icon: 'plus-circle-outline',
            link: ['/asset', 'docker', 'add'],

          },
          {
            name: 'Import',
            icon: 'external-link-outline',
            link: ['/asset', 'docker', 'import'],

          },
          {
            name: 'Configure',
            icon: 'external-link-outline',
            link: ['/asset', 'docker', 'configure'],

          }
        ]

      }
    ]
  }

}
