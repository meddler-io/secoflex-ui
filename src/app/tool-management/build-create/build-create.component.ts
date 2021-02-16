import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-build-create',
  templateUrl: './build-create.component.html',
  styleUrls: ['./build-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildCreateComponent implements OnInit {


  @Input('close') close

  @Input('refrence_id') refrence_id;
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
    tool_tag: new FormControl('', [Validators.required]),
    tool_name: new FormControl('', [Validators.required]),
    build_type: new FormControl('registry_public'),

    registry_public: new FormGroup({


      authentication: new FormControl('token', [Validators.required]),
      image_name: new FormControl('', [Validators.required] ),
      image_tag: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      auth_token: new FormControl('', [Validators.required]),



    }),

    registry_private: new FormGroup({

      registry_url: new FormControl(''),
      authentication: new FormControl('none'),
      image_name: new FormControl(''),
      image_tag: new FormControl(''),
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

  constructor(
    private toolApiService: ToolApiService
  ) { }

  ngOnInit(): void {
    this.switchLayout()
  }


  switchLayout() {

  
  }


  createBuild() {


    let data = {
      type: this.form.value.build_type,
      tool_tag: this.form.value.tool_tag,
      tool_name: this.form.value.tool_name,

      ...this.form.value[this.form.value.build_type],
      refrence_id: this.refrence_id,

    }

    console.debug( this.form.value[this.form.value.build_type] , this.form.value.build_type )
    this.toolApiService.buildTool(this.form.value.build_type, data).subscribe()

  }
}
