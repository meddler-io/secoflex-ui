import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-build-create',
  templateUrl: './build-create.component.html',
  styleUrls: ['./build-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildCreateComponent implements OnInit {

  selectedbuildTypesFormControl = new FormControl();

  buildTypes = [
    {
      name: 'Docker Image',
      id: 'repository',
      active: true,
      children: [
        {
          name: 'Docker Hub',
          id: 'registry_public',

        },
        {
          name: 'Private Repository',
          id: 'registry_private',
        },

      ]
    },

    {
      name: 'Docker Bundle',
      id: 'repository',
      children: [
        {
          name: 'Git Repository',
          id: 'bundle_git',
        },
        {
          name: 'Bundle Url',
          id: 'bundle_url',
        },
        {
          name: 'Upload Bundle',
          id: 'bundle_upload',
        },

      ]
    },



  ]

  gitRepositories = [
    { name: 'GitHub', id: 'github' },
    { name: 'GitLab', id: 'gitlab' },
    { name: 'Bitbucket', id: 'bitbucket' },
    { name: 'Other', id: 'other' },
  ]

  bundleType = [
    { name: 'Zip', id: 'zip' },
    { name: 'Tar', id: 'tar' }
  ]


  form = new FormGroup({
    build_type: new FormControl('bundle_git'),

    registry_public: new FormGroup({


      authentication: new FormControl('none'),
      image_name: new FormControl('rounak316/hello'),
      image_tag: new FormControl('latest'),
      username: new FormControl(''),
      password: new FormControl(''),
      auth_token: new FormControl(''),



    }),

    registry_private: new FormGroup({

      registry_url: new FormControl(''),
      authentication: new FormControl('none'),
      image_name: new FormControl('rounak316/hello'),
      image_tag: new FormControl('latest'),
      username: new FormControl(''),
      password: new FormControl(''),
      auth_token: new FormControl(''),
    }),

    bundle_git: new FormGroup({
      repository: new FormControl('github'),
      repository_url: new FormControl(''),
      authentication: new FormControl('credentials'),



      username: new FormControl(''),
      password: new FormControl(''),
      token: new FormControl(''),
      ssh: new FormControl(''),

    }),

    bundle_url: new FormGroup({
      type: new FormControl('zip'),
      url: new FormControl(''),

    }),

    bundle_upload: new FormGroup({
      type: new FormControl('zip'),
      url: new FormControl(''),
    }),



  });

  constructor() { }

  ngOnInit(): void {
    this.switchLayout()
  }


  switchLayout() {

    this.selectedbuildTypesFormControl.valueChanges.subscribe(val => {
      console.log('value', val)
    })
  }

}
