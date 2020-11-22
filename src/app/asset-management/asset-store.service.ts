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


@Injectable({
  providedIn: 'root'
})
export class AssetStoreService {

  constructor() { }


  get getAssetTypes() {
    return [
      {
        name: 'Hosts',
        type: AssetType.HOST,
        link: [ '/', 'asset',  'host'],
        path: ['/asset/host'],
        categories: [
          {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }
        ]
      },
      {
        name: 'Domains',
        type: AssetType.DOMAIN,
        link: [ '/' , 'asset',  'domain'],
        path: ['/asset/domain'],

        categories: [
          {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          }, {
            name: 'Hosts'
          },
          {
            name: 'Security Groups'
          },
          {
            name: 'Credentials'
          },
        ]
      },

      {
        name: 'Web',
        type: AssetType.WEB,
        link: [ '/' , 'asset',  'web'],
        path: ['/asset/web'],

        categories: []

      },
      {
        name: 'Android',
        type: AssetType.ANDROID,
        link: [ '/' , 'asset',  'android'],
        path: ['/asset/android'],

        categories: []

      },
      {
        name: 'iOS',
        type: AssetType.IOS,
        link: [ '/' , 'asset',  'ios'],
        path: ['/asset/ios'],

        categories: []

      },
  
      {
        name: 'Repository',
        type: AssetType.REPOSITORY,
        link: [ '/' , 'asset',  'repository'],
        path: ['/asset/repository'],

        categories: []


      },
      {
        name: 'Docker',
        type: AssetType.DOCKER,
        link: [ '/' , 'asset',  'docker'],
        path: ['/asset/docker'],

        categories: []

      }
    ]
  }

}
