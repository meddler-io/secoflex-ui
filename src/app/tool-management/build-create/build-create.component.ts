import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbTagComponent, NbTagInputDirective } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';

import { map, flatMap, mergeMap, filter, tap } from 'rxjs/operators';
import { ToolApiService } from '../tool-api.service';


// const REGEX_GIT_REPO = '((git|ssh|http(s)?)|(git@[\w\.]+))(:(//)?)([\w\.@\:/\-~]+)(\.git)(/)?'
// const REGEX_GIT_REPO = '(git)?(://)([\w\.@\:/\-~]+)(\.git)(/)?'
const REGEX_GIT_REPO = '(git)?(://)(.*)(\.git)(/)?'

@Component({
  selector: 'app-build-create',
  templateUrl: './build-create.component.html',
  styleUrls: ['./build-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildCreateComponent implements OnInit {

  @Input('edit_mode') edit_mode = false
  @Input('build_id') build_id = undefined


  bundke_upload_progress = new BehaviorSubject<{

    progress: number,
    uploading: boolean

  }>({
    progress: 20,
    uploading: false
  })

  tags: Set<string> = new Set<string>();
  options: string[] = [];

  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
    this.options.push(tagToRemove.text);
  }

  onTagAdd(value: string): void {
    if (value) {
      this.tags.add(value);
      this.options = this.options.filter(o => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }

  // End

  @Input('close') close

  @Input('refrence_id') refrence_id;
  buildTypes = [
    {
      name: 'Docker File',
      id: 'dockerfile',
      active: true,
      children: [
        {
          name: 'Dockerfile',
          id: 'dockerfile',
          active: true,


        }
      ]
    },
    {
      name: 'Docker Image',
      id: 'repository',
      active: true,
      children: [

        {
          name: 'Docker Hub',
          id: 'registry_public',
          active: true,


        },
        {
          name: 'Private Repository',
          id: 'registry_private',
          active: false,

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
          active: true,

        },
        {
          name: 'Bundle Url',
          id: 'bundle_url',
          active: false,

        },
        {
          name: 'Upload Bundle',
          id: 'bundle_upload',
          active: true,

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


  config_form = new FormGroup({

    dockerfile: new FormGroup({

      authentication: new FormControl('none', []),

      data: new FormGroup({
        dockerfile: new FormControl('Dockerfile', [Validators.required]),
      }),

      auth_mode: new FormGroup({

        none: new FormGroup({}),
        credentials: new FormGroup({
          username: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required]),
        }),
        token: new FormGroup({
          auth_token: new FormControl('', [Validators.required]),

        }),

      })



    }),

    registry_public: new FormGroup({

      authentication: new FormControl('credentials', []),

      data: new FormGroup({
        image_name: new FormControl('', [Validators.required]),
        image_tag: new FormControl('', [Validators.required]),
      }),

      auth_mode: new FormGroup({

        none: new FormGroup({}),
        credentials: new FormGroup({
          username: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required]),
        }),
        token: new FormGroup({
          auth_token: new FormControl('', [Validators.required]),

        }),

      })



    }),

    registry_private: new FormGroup({


      authentication: new FormControl('credentials', []),

      data: new FormGroup({
        image_name: new FormControl('', [Validators.required]),
        image_tag: new FormControl('', [Validators.required]),
        registry_url: new FormControl(''),

      }),

      auth_mode: new FormGroup({

        none: new FormGroup({}),
        credentials: new FormGroup({
          username: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required]),
        }),
        token: new FormGroup({
          auth_token: new FormControl('', [Validators.required]),

        }),

      })

    }),

    bundle_git: new FormGroup({


      authentication: new FormControl('ssh', []),

      data: new FormGroup({
        repository: new FormControl('github', [Validators.required]),
        repository_url: new FormControl('', [Validators.required, Validators.pattern(REGEX_GIT_REPO)]),
      }),

      auth_mode: new FormGroup({

        none: new FormGroup({}),
        credentials: new FormGroup({
          username: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required]),
        }),
        token: new FormGroup({
          auth_token: new FormControl('', [Validators.required]),

        }),

        ssh: new FormGroup({
          ssh_key: new FormControl('', [Validators.required]),

        }),

      })




    }),

    bundle_url: new FormGroup({


      authentication: new FormControl('none', []),

      data: new FormGroup({
        type: new FormControl('tar'),
        url: new FormControl('', [Validators.required]),


      }),

      auth_mode: new FormGroup({
        none: new FormGroup({}),

      })

    }),

    bundle_upload: new FormGroup({

      authentication: new FormControl('none', []),

      meta: new FormGroup({
        progress: new FormControl(54),
      }),

      data: new FormGroup({
        type: new FormControl('zip'),
        url: new FormControl('', [Validators.required]),

        bucket: new FormControl('', [Validators.required]),
        filename: new FormControl('', [Validators.required]),
        identifier: new FormControl('', [Validators.required]),
        version: new FormControl('', [Validators.required]),



      }),

      auth_mode: new FormGroup({

        none: new FormGroup({}),
      })

    }),

  })

  form = new FormGroup({

    tool: new FormGroup({
      name: new FormControl(
        {
          value: 'tool_name', disabled: true
        }
        , [Validators.required]),

      alias: new FormControl(
        {
          value: 'tool_name', disabled: true
        }
        , [Validators.required]),



    }),


    tool_name: new FormControl(
      {
        value: 'tool_name', disabled: true
      }
      , [Validators.required]),
    tool_tag: new FormControl({
      value: 'tool_tag', disabled: true
    }, [Validators.required]),
    build_type: new FormControl('bundle_url'),
    desc: new FormControl('Description'),





  });

  constructor(
    private toolApiService: ToolApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.init()
  }


  init() {

    if (this.edit_mode) {
      this
        .toolApiService.getBuild(this.refrence_id, this.build_id)
        .subscribe(d => {

          let build = d['build']
          let build_type = build['type']
          let auth = d['auth']
          let tool = d['tool']
          let auth_mode = auth['mode']
          auth = auth['auth']

          let config = build['config']

          console.log('build', build)
          console.log('build_type', build_type)
          console.log('auth', auth)
          console.log('auth_mode', auth_mode)
          console.log('config', config)


          let build_form = this.config_form.get(build_type)
          if (build_form) {
            let data_form = build_form.get('data')
            let authentication_form = build_form.get('auth_mode')
            let auth_mode_form = build_form.get('authentication')

            if (auth_mode_form) {
              auth_mode_form.setValue(auth_mode)
            }

            if (authentication_form) {
              authentication_form = authentication_form.get(auth_mode)
              Object.keys(auth).forEach(k => {
                console.log('config key', k, authentication_form.get(k))
                authentication_form.get(k).setValue(auth[k])
              })
              console.log('authentication_form', authentication_form)

            }

            if (data_form) {
              Object.keys(config).forEach(k => {
                console.log('config key', k, data_form.get(k))

                data_form.get(k).setValue(config[k])
              })
            }
          }



          if (build_type)
            this.form.get('build_type').setValue(build_type)

          if (tool) {
            if (tool.name)
              this.form.get('tool').get('name').setValue(tool.name)
              if (tool.alias)
              this.form.get('tool').get('alias').setValue(tool.alias)

          }

        })
    }

  }

  download(data: {}) {

    console.log('download', data)
    this.toolApiService.getBuildDownloadUrl(data)
      .pipe(map(d => {
        return d['url']
      })
        ,

        tap(url => {

          var a = document.createElement("a");
          a.href = url;
          a.target = '_blank';
          a.click();
        })
      )
      .subscribe()
  }

  upload(file: File, formGroup: FormGroup) {

    let upload_data = {

    }



    this
      .toolApiService
      .getBuildUploadUrl('test_id', file.name)
      .pipe(map((d: {}) => {
        upload_data = d
        return d['url']
      }))
      .pipe(map(url => {

        return this.toolApiService.uploadWithUrl(file, url)

      })
        ,
        mergeMap(_ => _),

        tap(_ => {

          this.bundke_upload_progress.next({
            uploading: true,
            progress: _.progress
          })

        }),
        filter(_ => _.status)

      )

      .subscribe((d => {



        this.bundke_upload_progress.next({
          uploading: false,
          progress: .0
        })

        let controls = formGroup.controls
        Object.keys(upload_data).forEach(k => {
          controls[k].setValue(upload_data[k])
        })

        console.log('controls', controls)
        // formControl.setValue(upload_url)
        this.cdr.markForCheck()


      }))

  }

  saveChanges() {
    if (this.edit_mode) {
      this.editBuild()
    } else {
      this.createBuild()
    }
  }

  createBuild() {

    let _build_type = this.form.get('build_type').value
    let config_form = this.config_form.get(_build_type)

    let authentication = config_form.get('authentication').value
    let auth_mode = config_form.get('auth_mode').get(authentication).value
    let config = config_form.get('data').value

    let data = {

      'auth': {
        'auth': auth_mode,
        'mode': authentication,
      },

      'build': {
        'config': config,
        'type': _build_type,

      },
      'refrence_id': this.refrence_id
    }



    this.toolApiService.createBuild(_build_type, data).subscribe(_ => {
      console.log(_)
    })


    console.log('config', data)



  }

  editBuild() {

    let _build_type = this.form.get('build_type').value
    let config_form = this.config_form.get(_build_type)

    let authentication = config_form.get('authentication').value
    let auth_mode = config_form.get('auth_mode').get(authentication).value
    let config = config_form.get('data').value

    let data = {

      'auth': {
        'auth': auth_mode,
        'mode': authentication,
      },

      'build': {
        'config': config,
        'type': _build_type,

      },
      'refrence_id': this.refrence_id
    }



    this.toolApiService.editBuild(this.build_id, _build_type, data).subscribe(_ => {

    })


    console.log('config', data)



  }








}
