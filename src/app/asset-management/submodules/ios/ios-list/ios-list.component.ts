import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetApiService } from 'src/app/asset-management/asset-api.service';
import { IosListItem } from '../ios-list-item/ios-list-item.component';

@Component({
  selector: 'app-ios-list',
  templateUrl: './ios-list.component.html',
  styleUrls: ['./ios-list.component.scss']
})
export class IosListComponent implements OnInit {


  @ViewChild('editNewAppTemplate') editNewAppTemplate

  constructor(private assetApiService: AssetApiService,

  ) {



  }
  apps: IosListItem[] = []


  ngOnInit(): void {

    this.assetApiService.getIosApps().subscribe((apps: IosListItem[]) => {
      console.log('ios_apps', apps)
      this.apps = apps
    })
  }

}
