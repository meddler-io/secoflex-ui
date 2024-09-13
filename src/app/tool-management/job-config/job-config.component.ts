import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { ToolApiService } from '../tool-api.service';
import { parseArrayOfCommandToRaw, parseRawCommandToArray } from 'src/app/reusable-components/common/services/api.service';



@Component({
  selector: 'app-job-config',
  templateUrl: './job-config.component.html',
  styleUrls: ['./job-config.component.scss']
})
export class JobConfigComponent implements OnInit {

  @ViewChild('logsTemplate', { static: false }) logsTemplate: TemplateRef<any>;


  @Input('id') id
  @Input('config') config

  LOADING = false

  @Input('close') close

  @Input('refrence_id') refrence_id;
  @Input('build_id')
  build_id = '6023ed566c2cdfd6f2edb435'



  getArgs(): FormArray {
    return this.form.get('args') as FormArray
  }

  getCmd(): FormArray {
    return this.form.get('cmd') as FormArray
  }
  deleteArg(index: number) {
    this.getArgs().removeAt(index)
  }
  deleteCmd(index: number) {
    this.getCmd().removeAt(index)
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



  form: FormGroup = new FormGroup({

    id: new FormControl(''),

    entrypoint: this.fb.array([
      // new FormControl(
      //   {
      //     value: '',
      //     disabled: true,

      //   }

      // ),
    ]),


    cmd: this.fb.array([
      this.fb.control('/bin/cmd'),
    ]),

    scanner_input: this.fb.array([])
    ,

    identifier:
      this.fb.control('', [Validators.required , Validators.minLength(2)  ]) ,


    args: this.fb.array([
      this.fb.control('hello'),
      this.fb.control('hello'),
    ]),


    substitute_var: new FormControl(true),

    variables: new FormArray([

    ])
    ,

    success_endpoint: new FormControl('http://success_endpoint.com/usr/bin/mobsf'),
    failure_endpoint: new FormControl(''),


    config: new FormGroup({

      process: new FormArray([

      ]),



      reserved: new FormArray([

      ]),
      _reserved: new FormGroup({

      }),

      system: new FormArray([

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


  copyCommandToClipboard(){
    
  }

  constructor(
    private fb: FormBuilder,
    private toolApiService: ToolApiService,
    protected cdr: ChangeDetectorRef,


    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,

  ) { 

let args = ['echo', 'Hello, World!', 'This is a test', '\\escaped\\ text'];
let rawCmd = 'bash -c \'echo "hello-world $test"\''

console.log('argument-parsing-test' , rawCmd  , '->', parseRawCommandToArray(rawCmd))
console.log('argument-parsing-test' , args,  '->' , parseArrayOfCommandToRaw(args))


  }
  ngOnInit(): void {

    this.loadConfig()
  }

  addArg() {
    this.getArgs().push(

      this.fb.control(''),

    )
  }
  addCmd() {
    this.getCmd().push(

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

    data['variables'] = variables


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

    if (!this.form.valid) {
      console.log('in valid form')
      return
    }

   
    this
      .toolApiService
      .updateBuildConfig(this.build_id, this.formToJson())
      .subscribe(d => {


      })
  }

  scannerInput = [];

  checkedChangeScannerInput(add, data) {

    let formValue = new Set(  (this.form.get('scanner_input') as FormArray).value );
    if (add) {

      formValue.add(data?.id)
    } else{
      formValue.delete(data?.id)

    }

    let newControlValue =     Array.from(formValue).map(_=>this.fb.control(_)  );


    console.log('checkedChangeScannerInput', add, data, newControlValue);



    this.form.setControl('scanner_input',
   this.fb.array(newControlValue)
      // []

    )
    
    this.cdr.markForCheck()

    console.log('form-value', this.form.get('scanner_input').value)

  }

  loadConfig() {

    this.LOADING = true

    // of(this.config)
    this
      .toolApiService
      .getBuildConfig(this.build_id)
      .subscribe((config: any) => {

        let data = config?.config;
        this.scannerInput = config?.parameters?.scanner_input || [];
        console.log('config', data)

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

          let entrypointControl = this.fb.array([])


          data['entrypoint'].forEach(element => {


            entrypointControl.push(this.fb.control(


              // {
              // value:
              element,
              // disabled: true,
              // }
            ))


          });


          this.form.setControl('entrypoint', entrypointControl);
          console.log('setting entrypoint', entrypointControl)

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

                key: this.fb.control({ value: element, disabled: true }),
                value: this.fb.control(

                  {
                    value: data['config']['reserved'][element]
                    , disabled: true
                  }

                ),
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

  run() {


    this
      .toolApiService
      .execJob(this.id, this.formToJson())
      .subscribe(d => {

        let _id = d['_id']
        this.openLogs(this.logsTemplate, _id)

      })


  }

  

  openLogs(template, id: string, direction = DrawerDirection.Left, size = '50%', closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

    const zIndex = 1000;
    const cssClass = 'backdrop_color'
    // const cssClass = 'cdk-overlay-2'
    this.document.body.classList.add('cdk-global-scrollblock')
    this.drawerMngr.create({
      direction,
      template,
      size,
      closeOnOutsideClick,
      parentContainer,
      isRoot,
      zIndex,
      cssClass,
      context: {
        id: id
      }
    }

    )
      .onDestroy(() => {
        this.document.body.classList.remove('cdk-global-scrollblock')

      });
  }


  createScanner() {


    let _ = this.id.split(':')

    let toolId = _[0];
    let imageId = _[1];


    this
      .toolApiService
      .createTask(toolId , imageId, this.formToJson())
      .subscribe(d => {

        let _id = d['_id']
        // this.openLogs(this.logsTemplate, _id)

      })

  }
}
