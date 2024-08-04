import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus } from '@nebular/theme';
import { AssetApiService } from 'src/app/asset-management/asset-api.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';

const ipPattern = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
const validations = [
  Validators.pattern(ipPattern), Validators.required, Validators.minLength(1)
]

@Component({
  selector: 'app-repository-add',
  templateUrl: './repository-add.component.html',
  styleUrls: ['./repository-add.component.scss'],
  animations: [...basicAnimations]
})
export class RepositoryAddComponent implements OnInit {



  saving = false;
  saving_ip_index = -1



  // url = new FormControl('http://localhost:4200/asset/repository/add.git', validations)



  auth$ = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required

    ])
  })

  access_token$ = new FormGroup({
    access_token: new FormControl('', [
      Validators.required

    ])
  })

  ssh$ = new FormGroup({
    ssh: new FormControl('', [
      Validators.required

    ])
  })


  ip_addresses_adding: FormControl;

  ip_addresses = new FormArray([
    new FormControl('', validations)
  ]);


  tmp$ = 1


  myForm : any = new FormGroup({
    name: new FormControl('', [Validators.required ]),
    url: new FormControl('', validations),
    credential_type: new FormControl('none'),
    credentials: new FormGroup({
    })
  })


  addNewIp() {

    this.ip_addresses.push(new FormControl(''));
  }

  constructor(private assetApiService: AssetApiService) { }

  ngOnInit(): void {

    this.myForm.get('credential_type').valueChanges.subscribe(d => {
      console.log('d', d)
      switch (d) {
        case 'none':
          this.myForm.setControl('credentials', null)
          break

        case 'password':
          this.myForm.setControl('credentials', this.auth$)
          break

        case 'access_token':
          this.myForm.setControl('credentials', this.access_token$)
          break

        case 'ssh':
          this.myForm.setControl('credentials', this.ssh$)
          break
      }

    })
  }

  removeAt(index) {
    this.ip_addresses.removeAt(index)
  }


  save() {
    this.saving = true;


    this.assetApiService.addRepository(this.myForm.value).subscribe()

  }

  // 






  // credential_selected = 'none'

}
