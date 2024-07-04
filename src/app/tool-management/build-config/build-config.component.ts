import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-build-config',
  templateUrl: './build-config.component.html',
  styleUrls: ['./build-config.component.scss']
})
export class BuildConfigComponent implements OnInit {

  LOADING = false

  @Input('close') close

  @Input('refrence_id') refrence_id;
  @Input('build_id')
  build_id = '6023ed566c2cdfd6f2edb435'

  getArgs(): FormArray {
    return this.form.get('args') as FormArray
  }

  deleteArg(index: number) {
    this.getArgs().removeAt(index)
  }

  getVariables(): FormArray {
    return this.form.get('variables') as FormArray
  }

  getConfProcess(): FormArray {
    return this.form.get('config').get('process') as FormArray
  }

  getConfSystem(): FormArray {
    return this.form.get('config').get('system') as FormArray
  }
  getConfReserved(): FormArray {
    return this.form.get('config').get('reserved') as FormArray
  }

  deleteVariables(index: number) {
    this.getVariables().removeAt(index)
  }

  deleteConfProcess(index: number) {
    this.getConfProcess().removeAt(index)
  }

  deleteConfSystem(index: number) {
    this.getConfSystem().removeAt(index)
  }

  deleteConfReserved(index: number) {
    this.getConfReserved().removeAt(index)
  }



  form = new FormGroup({

    id: new FormControl(''),

    entrypoint: this.fb.array([
      new FormControl('/bin/entrypoint'),
    ]),


    cmd: this.fb.array([
      this.fb.control('/bin/cmd'),
    ]),

    args: this.fb.array([
      this.fb.control('hello'),
      this.fb.control('hello'),
    ]),


    substitute_var: new FormControl(true),

    variables: new FormArray([
      new FormGroup({
        key: new FormControl('key'),
        value: new FormControl('value'),
      })
    ])
    ,

    success_endpoint: new FormControl('http://success_endpoint.com/usr/bin/mobsf'),
    failure_endpoint: new FormControl(''),


    config: new FormGroup({

      process: new FormArray([
        new FormGroup({
          key: new FormControl('key'),
          value: new FormControl('value'),
        })
      ]),



      reserved: new FormArray([
        new FormGroup({
          key: new FormControl('key'),
          value: new FormControl('value'),
        })
      ]),
      _reserved: new FormGroup({
        message_queue_topic: new FormControl(''),
      }),

      system: new FormArray([
        new FormGroup({
          key: new FormControl('key'),
          value: new FormControl('value'),
        })
      ]),


      _process: new FormGroup({
        input_api: new FormControl(''),
        input_api_token: new FormControl(''),
        output_api: new FormControl(''),
        file_upload_api: new FormControl(''),
      }),
      _system: new FormGroup({
        base_path: new FormControl(''),
        input_dir: new FormControl(''),
        output_dir: new FormControl(''),
        results_json: new FormControl(''),
        results_schema: new FormControl(''),
        log_to_file: new FormControl(true),
        stdout_file: new FormControl(''),
        stderr_file: new FormControl(''),
        enable_logging: new FormControl(true),
        max_output_filesize: new FormControl(1000),
        sample_inputfile: new FormControl(''),
        sample_outputfile: new FormControl(''),
      })

    }),



  });


  constructor(
    private fb: FormBuilder,
    private toolApiService: ToolApiService,
    protected cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {

    this.loadConfig()
  }

  addArg() {
    this.getArgs().push(

      this.fb.control(''),

    )
  }



  addVar() {
    this.getVariables().push(

      new FormGroup({
        key: new FormControl(''),
        value: new FormControl(''),
      })

    )
  }


  addConfProcess() {
    this.getConfProcess().push(

      new FormGroup({
        key: new FormControl(''),
        value: new FormControl(''),
      })

    )
  }

  addSystemProcess() {
    this.getConfSystem().push(

      new FormGroup({
        key: new FormControl(''),
        value: new FormControl(''),
      })

    )
  }

  addReservedProcess() {
    this.getConfReserved().push(

      new FormGroup({
        key: new FormControl(''),
        value: new FormControl(''),
      })

    )
  }

  formToJson(): any {
    let data = this.form.getRawValue()

    let variables = {}
    data['variables'].forEach(element => {
      variables[element.key] = element.value
    });


    let config = {

      process: {},
      reserved: {},
      system: {},

    }
    data['config']['process'].forEach(element => {
      config['process'][element.key] = element.value
    });

    data['config']['reserved'].forEach(element => {
      config['reserved'][element.key] = element.value
    });

    data['config']['system'].forEach(element => {
      config['system'][element.key] = element.value
    });

    delete data['_process']
    delete data['_reserved']
    delete data['_system']
    data['config'] = config
    return data

  }

  save() {


    this
      .toolApiService
      .updateBuildConfig(this.build_id, this.formToJson())
      .subscribe()
  }


  loadConfig() {

    this.LOADING = true

    this
      .toolApiService
      .getBuildConfig(this.build_id)
      .subscribe(data => {

        if (!data)
          data = {}


        if (data['id'])
          this.form.setControl('id', this.fb.control(data['id']))

 
        if (data['cmd']) {

          let cmdControl = []

          data['cmd'].forEach(element => {
            cmdControl.push(this.fb.control(element))
          });

          this.form.setControl('cmd', this.fb.array(cmdControl))

        }


        if (data['entrypoint']) {

          let entrypointControl = []


          data['entrypoint'].forEach(element => {
            entrypointControl.push(this.fb.control(element))
          });


          this.form.setControl('entrypoint', this.fb.array(entrypointControl))
        }

        if (data['args']) {

          let argsControl = []

          data['args'].forEach(element => {
            argsControl.push(this.fb.control(element))
          });

          this.form.setControl('args', this.fb.array(argsControl))

        }

        if (data['substitute_var'])
          this.form.setControl('substitute_var', this.fb.control(data['substitute_var']))

        if (data['success_endpoint'])
          this.form.setControl('success_endpoint', this.fb.control(data['success_endpoint']))

        if (data['failure_endpoint'])
          this.form.setControl('failure_endpoint', this.fb.control(data['failure_endpoint']))


        if (data['config']) {

          let processConfigControl = []
          let systemConfigControl = []
          let reservedConfigControl = []
          if (data['config']['process']) {




            Object.keys(data['config']['process']).forEach(element => {
              processConfigControl.push(this.fb.group({

                key: this.fb.control(element),
                value: this.fb.control(data['config']['process'][element]),
              }))
            });

          }

          if (data['config']['system']) {




            Object.keys(data['config']['system']).forEach(element => {
              systemConfigControl.push(this.fb.group({

                key: this.fb.control(element),
                value: this.fb.control(data['config']['system'][element]),
              }))
            });

          }

          if (data['config']['reserved']) {


            Object.keys(data['config']['reserved']).forEach(element => {
              reservedConfigControl.push(this.fb.group({

                key: this.fb.control(element),
                value: this.fb.control(data['config']['reserved'][element]),
              }))
            });

          }
          let configControl = this.fb.group({
            process: this.fb.array(processConfigControl),
            reserved: this.fb.array(reservedConfigControl),
            system: this.fb.array(systemConfigControl)
          })

          this.form.setControl('config', configControl)

        }


        this.LOADING = false
        this.cdr.markForCheck()


      })
  }
}
