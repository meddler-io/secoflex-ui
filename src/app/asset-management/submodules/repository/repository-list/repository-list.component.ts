import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AssetApiService } from 'src/app/asset-management/asset-api.service';

interface RepositoryListItem {
  url: string;
  credential_type: string
  group: string | undefined;
  credentials: Date;
  dou?: Date

}

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {


  selected_host_list_item = -1;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;


  assets: RepositoryListItem[] = [

  ]

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    private assetApiService: AssetApiService
    // private dsa : BlockScrollStrategy
  ) {



  }


  ngOnInit(): void {

    this.assetApiService.getRepository().subscribe((d: RepositoryListItem[]) => {
      this.assets = d
    })

  }


}
