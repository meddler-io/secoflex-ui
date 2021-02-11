import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-build-config',
  templateUrl: './build-config.component.html',
  styleUrls: ['./build-config.component.scss']
})
export class BuildConfigComponent implements OnInit {


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

    entrypoint: new FormControl('/bin/entrypoint'),

    cmd: new FormControl('/bin/cmd'),

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



    config: new FormGroup({

      process: new FormArray([
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

    success_endpoint: new FormControl(''),
    failure_endpoint: new FormControl(''),










  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  addArg() {
    this.getArgs().push(

      this.fb.control('hello'),

    )
  }



  addVar() {
    this.getVariables().push(

      new FormGroup({
        key: new FormControl('key'),
        value: new FormControl('value'),
      })

    )
  }


  addConfProcess() {
    this.getConfProcess().push(

      new FormGroup({
        key: new FormControl('key'),
        value: new FormControl('value'),
      })

    )
  }

  addSystemProcess() {
    this.getConfSystem().push(

      new FormGroup({
        key: new FormControl('key'),
        value: new FormControl('value'),
      })

    )
  }

  addReservedProcess() {
    this.getConfReserved().push(

      new FormGroup({
        key: new FormControl('key'),
        value: new FormControl('value'),
      })

    )
  }

  dump() {
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

  test() {
    let data = this.dump()
    console.log(data)


  }
}
