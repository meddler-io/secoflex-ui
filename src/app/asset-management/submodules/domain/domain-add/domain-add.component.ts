import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, Validators } from '@angular/forms';
import { AssetApiService } from 'src/app/asset-management/asset-api.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';

const ipPattern =
  "^([A-Za-z0-9]\.|[A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9]\.){1,3}[A-Za-z]{2,6}$"

const validations = [
  Validators.pattern(ipPattern), Validators.required
]

@Component({
  selector: 'app-domain-add',
  templateUrl: './domain-add.component.html',
  styleUrls: ['./domain-add.component.scss'],
  animations: [...basicAnimations]

})
export class DomainAddComponent implements OnInit {


  saving = false;
  saving_ip_index = -1


  ip_addresses_adding: FormControl;

  ip_addresses = new FormArray([
    new FormControl('', validations)
  ]);


  tmp$ = 1


  addNew() {

    this.ip_addresses.push(new FormControl('' , validations));
  }

  constructor(private assetApiService: AssetApiService) { }

  ngOnInit(): void {
  }

  removeAt(index) {
    this.ip_addresses.removeAt(index)
  }


  saveIp() {
    this.saving = true;
    this.ip_addresses.controls.forEach((ip_address_form) => {
      if (ip_address_form.valid) {
        this.assetApiService.addDomain(ip_address_form.value).subscribe()
        // console.log('ip_address', ip_address_form.value)
      }
    })
  }

}
