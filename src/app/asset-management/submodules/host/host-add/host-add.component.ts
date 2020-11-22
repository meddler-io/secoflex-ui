import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { AssetApiService } from 'src/app/asset-management/asset-api.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';

@Component({
  selector: 'app-host-add',
  templateUrl: './host-add.component.html',
  styleUrls: ['./host-add.component.scss'],
  animations: [...basicAnimations]
})
export class HostAddComponent implements OnInit {


  saving = false;
  saving_ip_index = -1


  ip_addresses_adding: FormControl;

  ip_addresses = new FormArray([
    new FormControl('')
  ]);


  tmp$ = 1


  addNewIp() {

    this.ip_addresses.push(new FormControl(''));
  }

  constructor(private assetApiService: AssetApiService) { }

  ngOnInit(): void {
  }

  removeAt(index) {
    this.ip_addresses.removeAt(index)
  }


  saveIp() {
    this.saving = true;
    this.ip_addresses.controls.forEach((ip_address_form, index) => {
      if (ip_address_form.valid) {
        this.assetApiService.addHost(ip_address_form.value).subscribe(_ => {
          this.ip_addresses.removeAt(index)
        })
        // console.log('ip_address', ip_address_form.value)
      }
    })
    this.saving = false
  }
}
