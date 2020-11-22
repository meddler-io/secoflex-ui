import { Component, OnInit } from '@angular/core';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';

@Component({
  selector: 'app-asset-configuration',
  templateUrl: './asset-configuration.component.html',
  styleUrls: ['./asset-configuration.component.scss'],
  animations: [...basicAnimations]
})
export class AssetConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
