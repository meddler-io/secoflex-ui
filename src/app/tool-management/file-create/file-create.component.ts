import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToolApiService } from '../tool-api.service';
import { str } from 'ajv';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-file-create',
  templateUrl: './file-create.component.html',
  styleUrl: './file-create.component.scss'
})
export class FileCreateComponent implements OnInit {


  @Input('create')
  create = false;

  loading = false;

  @Input()
  filename = ``

  tempData;

  @Input('id') id
  @Input('config') config;

  LOADING = false

  @ViewChild('dialog') dialog;

  @Input('close') close

  @Input('refrence_id') refrence_id;
  @Input('file_id') file_id = '669961ed8b2955d7f6f94172';

  saveContent() {

    this.loading = true;
    this.toolApiService.createConfigMap(
      this.file_id,
      this.filename,
      this.tempData,
      !this.create
    ).subscribe((_: any) => {

      if (_?.status) {
        this.create = false;
      }
      if (_?.prompt_rewrite) {

        this.open()

      } else {
        this.laodConfig()

      }

      this.loading = true;
      this.cdr.markForCheck();


    })
  }


  open() {
    this.dialogService.open(this.dialog, {


      // backdropClass: 'test2',
      closeOnBackdropClick: false, context: {
        title: 'Confirm',
        message: 'This config name already exists.'
      }
    });
  }
  constructor(
    private toolApiService: ToolApiService,
    protected cdr: ChangeDetectorRef,
    private dialogService: NbDialogService,


  ) {

  }

  laodConfig() {

    this.loading = true;

    this.toolApiService.getConfigMapContent(
      this.file_id,
      this.filename,

    ).subscribe((_: string) => {

      console.log('bom', _)
      this.tempData = _;

      this.loading = false;
      this.cdr.markForCheck();

    })
  }
  ngOnInit(): void {

    if (this.create == false)
      this.laodConfig()


  }

}
