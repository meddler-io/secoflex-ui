import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

import { AssetApiService } from 'src/app/asset-management/asset-api.service';
import { AndroidListItem } from '../android-list-item/android-list-item.component';



@Component({
  selector: 'app-android-list',
  templateUrl: './android-list.component.html',
  styleUrls: ['./android-list.component.scss']
})
export class AndroidListComponent implements OnInit {


  

  @ViewChild('editNewAppTemplate') editNewAppTemplate

  constructor(private assetApiService: AssetApiService,

  ) {



  }
  apps: AndroidListItem[] = []


  ngOnInit(): void {

    this.assetApiService.getAndroidApps().subscribe((apps: AndroidListItem[]) => {
      console.log('androdapps', apps)
      this.apps = apps
    })
  }



}
