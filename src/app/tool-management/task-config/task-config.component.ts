import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { ToolApiService } from '../tool-api.service';
import { element } from 'protractor';
import { parseArrayOfCommandToRaw, parseRawCommandToArray } from 'src/app/reusable-components/common/services/api.service';
import { NbToggleComponent } from '@nebular/theme';


@Component({
  selector: 'app-task-config',
  templateUrl: './task-config.component.html',
  styleUrl: './task-config.component.scss'
})
export class TaskConfigComponent {



  toggleCmdViewControl = new FormControl(false);
  // 



  rawCommandView = new FormControl('hello-world');


  @ViewChild('logsTemplate', { static: false }) logsTemplate: TemplateRef<any>;


  @Input('saveAction') saveAction = false;
  @Input('runAction') runAction = false;



  @Input('edit')
  edit = false;


  @Input('id') id


  copyText(textToCopy) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }


  importCmd() {

    console.log('ViewChild')


    let argsCmd = parseRawCommandToArray(this.rawCommandView.value);


    let entrypointControl = new FormArray([]);
    let cmdControl = new FormArray([]);
    if (argsCmd.length > 0) {
      let entrypoint = argsCmd[0];
      let args = argsCmd.slice(1);

      // this.getEntrypoint().set

      entrypointControl.push(this.fb.control(entrypoint));

      args.forEach(element => {
        cmdControl.push(this.fb.control(element))
      });

      (this.response_form.get('config') as FormGroup).setControl('entrypoint', entrypointControl);
      (this.response_form.get('config') as FormGroup).setControl('cmd', cmdControl);



    }

    this.toggleCmdViewControl.setValue(false)


  }

  copyCommandToClipboard() {


    let args = this.getEntrypoint().value.concat(this.getCmd().value.concat(
      this.getArgs().value
    )

    )


    let rawCmd = parseArrayOfCommandToRaw(args);
    // let argsCmd = parseRawCommandToArray(rawCmd);
    // console.log('copyCommandToClipboard',
    //   argsCmd
    // );

    this.copyText(rawCmd);

  }


  switchViewCmd(event) {

    console.log('switchViewCmd', event);
    let args = this.getEntrypoint().value.concat(this.getCmd().value.concat(
      this.getArgs().value
    )

    )


    this.rawCommandView.setValue(
      parseArrayOfCommandToRaw(args)

    )
  }


  @Input('config') config

  LOADING = false

  @Input('close') close

  @Input('refrence_id') refrence_id;
  @Input('build_id')
  build_id = '6023ed566c2cdfd6f2edb435'

  getArgs(): FormArray {
    return (this.response_form.get('config') as FormGroup).get('args') as FormArray
  }

  getEntrypoint(): FormArray {
    return (this.response_form.get('config') as FormGroup).get('entrypoint') as FormArray
  }
  getCmd(): FormArray {
    return (this.response_form.get('config') as FormGroup).get('cmd') as FormArray
  }
  deleteArg(index: number) {
    this.getArgs().removeAt(index)
  }
  deleteCmd(index: number) {
    this.getCmd().removeAt(index)
  }

  getVariables(): FormArray {
    return (this.response_form.get('config') as FormGroup).get('variables') as FormArray
  }

  getResult(): FormArray {
    return (this.response_form.get('config') as FormGroup).get('result') as FormArray
  }


  getEnviron(): FormArray {
    return (this.response_form.get('config') as FormGroup).get('environ') as FormArray
  }


  getConfProcess(): FormArray {
    return (this.response_form.get('config') as FormGroup).get('process') as FormArray
  }

  getConfSystem(): FormArray {
    return (this.response_form.get('config') as FormGroup).get('system') as FormArray
  }
  getConfReserved(): FormArray {
    return (this.response_form.get('config') as FormGroup).get('reserved') as FormArray
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



  response_form: FormGroup = new FormGroup({

    publisher: new FormControl(false),
    initiator: new FormControl(false),
    title: new FormControl(''),
    description: new FormControl(''),
    identifier: new FormControl(''),




    config: new FormGroup({

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

      ingested_results: this.fb.array([]),

      identifier:
        this.fb.control('', [Validators.required, Validators.minLength(2)]),


      args: this.fb.array([
        this.fb.control('hello'),
        this.fb.control('hello'),
      ]),


      substitute_var: new FormControl(true),

      environ: new FormArray([

      ])
      ,
      variables: new FormArray([

      ])
      ,

      result: new FormArray([

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



    })
  });

  formDataForPropertiesAttributes: Record<string, Record<string, any>> = {};




  constructor(
    private fb: FormBuilder,
    private toolApiService: ToolApiService,
    protected cdr: ChangeDetectorRef,


    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,

  ) { }
  ngOnInit(): void {

    this.loadConfig()


    this.toggleCmdViewControl.valueChanges.subscribe(_ => {
      console.log('boomboo', _)
      this.switchViewCmd(_);
    })
  }

  addArg() {
    this.getArgs().push(

      this.fb.control(''),

    )
  }

  addScannerResult() {

    this.getResult().push(

      new FormGroup({

        export: new FormControl(false),
        value: new FormControl(''),
        regex: new FormControl(false),
        directory: new FormControl(false),
        variable: new FormControl(''),
      })

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


  addEnv() {
    this.getEnviron().push(

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
    let form_data = this.response_form.getRawValue();

    form_data.config['scanner_properties'] = this.formDataForPropertiesAttributes

    let data = form_data?.config;

    let variables = {}
    data['variables'].forEach(element => {
      variables[element.key] = element.value
    });

    data['variables'] = variables


    let environ = {}
    data['environ'].forEach(element => {
      environ[element.key] = element.value
    });

    data['environ'] = environ

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


    form_data.config = data;

    return form_data

  }


  save() {

    if (!this.response_form.valid) {
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

    let formValue = new Set(((this.response_form.get('config') as FormGroup).get('scanner_input') as FormArray).value);
    if (add) {

      formValue.add(data?.id)
    } else {
      formValue.delete(data?.id)

    }

    let newControlValue = Array.from(formValue).map(_ => this.fb.control(_));


    console.log('checkedChangeScannerInput', add, data, newControlValue);



    (this.response_form.get('config') as FormGroup).setControl('scanner_input',
      this.fb.array(newControlValue)
      // []

    )

    this.cdr.markForCheck()

    console.log('form-value', (this.response_form.get('config') as FormGroup).get('scanner_input').value)

  }

  tool_id;
  image_id;

  parseAndLoadConfig(form_config: any) {


    let form = this.response_form.get('config') as FormGroup;





    let config = form_config?.config;

    this.tool_id = config?.config?.tool_id;
    this.image_id = config?.config?.image_id;

    let data = config?.config;




    console.log('scannerInput', form_config?.parameters?.scanner_input)
    this.scannerInput = form_config?.parameters?.scanner_input || [];

    if (!data)
      data = {}


    if (data['id'])
      form.setControl('id', this.fb.control(data['id']))

    if (data['identifier'])
      form.setControl('identifier', this.fb.control(data['identifier']))


    if (data['ingested_results']) {

      console.log('parseAndLoadConfig', data?.ingested_results)
      form.setControl('ingested_results', this.fb.array(data['ingested_results']))
    }


    if (data['scanner_input']) {

      form.setControl('scanner_input', this.fb.array(data['scanner_input']))
      form.setControl('scanner_value', this.fb.array(data['scanner_input']?.map(_ => '')))
    }





    // Result data
    if (data['result']) {

      let result = [];
      data['result'].forEach((element: {  export: boolean ,  value: string, directory: boolean, regex: boolean, variable: string }) => {

        result.push(this.fb.group({
          export: new FormControl(false),
          value: this.fb.control(element.value),
          regex: this.fb.control(element.regex),
          directory: this.fb.control(element.directory),
          variable: this.fb.control(element.variable),

        }))
      });



      form.setControl('result', this.fb.array(result))



    }

    // Environ variables
    if (data['environ']) {

      let environ = [];
      Object.keys(data['environ']).forEach(element => {
        environ.push(this.fb.group({
          key: this.fb.control(element),
          value: this.fb.control(data['environ'][element]),
        }))
      });



      form.setControl('environ', this.fb.array(environ))



    }


    if (data['cmd']) {

      let cmdControl = []

      data['cmd'].forEach(element => {
        cmdControl.push(this.fb.control(element))
      });

      form.setControl('cmd', this.fb.array(cmdControl))

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


      form.setControl('entrypoint', entrypointControl);
      console.log('setting entrypoint', entrypointControl)

    }

    if (data['args']) {

      let argsControl = []

      data['args'].forEach(element => {
        argsControl.push(this.fb.control(element))
      });

      form.setControl('args', this.fb.array(argsControl))

    }

    // Set variables
    if (data['variables']) {

      let variables = this.getVariables();
      Object.keys(data['variables']).forEach(element => {
        variables.push(this.fb.group({

          key: this.fb.control(element),
          value: this.fb.control(data['variables'][element]),
        }))
      });



    }


    if (data['substitute_var'])
      form.setControl('substitute_var', this.fb.control(data['substitute_var']))

    if (data['success_endpoint'])
      form.setControl('success_endpoint', this.fb.control(data['success_endpoint']))

    if (data['failure_endpoint'])
      form.setControl('failure_endpoint', this.fb.control(data['failure_endpoint']))


    if (data['config']) {

      let processConfigControl = []
      let systemConfigControl = []
      let reservedConfigControl = []
      if (data['config']['process']) {




        Object.keys(data['config']['process']).forEach(element => {
          processConfigControl.push(this.fb.group({

            // key: this.fb.control(element),
            // value: this.fb.control(data['config']['process'][element]),

            key: new FormControl({ value: element, disabled: true }),
            value: new FormControl({ value: data['config']['process'][element], disabled: true }),
          }))
        });

      }

      if (data['config']['system']) {




        Object.keys(data['config']['system']).forEach(element => {
          systemConfigControl.push(this.fb.group({

            key: new FormControl({ value: element, disabled: true }),
            value: new FormControl({ value: data['config']['system'][element], disabled: true }),
            // value: this.fb.control(data['config']['system'][element]),
          }

          ))
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

      console.log('config', form.value, data)

      let configControl = this.fb.group({
        process: this.fb.array(processConfigControl),
        reserved: this.fb.array(reservedConfigControl),
        system: this.fb.array(systemConfigControl)
      })

      form.setControl('config', configControl)

    }


    this.response_form.setControl('config', form);

    this.response_form.get('title').setValue(config?.title);
    this.response_form.get('description').setValue(config?.description);
    this.response_form.get('publisher').setValue(config?.publisher);
    this.response_form.get('initiator').setValue(config?.initiator);
    this.response_form.get('identifier').setValue(config?.identifier);



    this.LOADING = false
    this.cdr.markForCheck()



  }

  loadConfig() {

    this.LOADING = true

    // of(this.config)
    this
      .toolApiService
      .getTaskById(this.id)
      .subscribe((config: any) => {

        this.parseAndLoadConfig(config);


        this.scannerInput.forEach(inp => {
          this.formDataForPropertiesAttributes[inp.id] = {};

          let scanner_properties = config?.config?.config?.scanner_properties;
          // console.log('boommer', scanner_properties);
          if (inp?.id in scanner_properties) {
            this.formDataForPropertiesAttributes[inp.id] = scanner_properties[inp?.id]

          }


        })

      }
      )
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

  runTask() {

    let id = (this.response_form.get('config') as FormGroup).get('scanner_input')?.value;
    let val = (this.response_form.get('config') as FormGroup).get('scanner_value')?.value;

    let scanner_val = id.map((id, index) => ({
      scanner_id: id,
      scanner_value: val[index]
    }));


    this
      .toolApiService
      .runTask(this.id, scanner_val)
      .subscribe((_: any) => {


        this.openLogs(this.logsTemplate, _?.id)

      })
  }

  updateScanner() {




    this
      .toolApiService
      .updateTask(this.id, this.formToJson())
      .subscribe(config => {

        this.parseAndLoadConfig(config)



      })

  }
}
