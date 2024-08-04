import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JobApiService } from '../job-api.service';
import { str } from 'ajv';


@Component({
  selector: 'app-job-result-content',
  templateUrl: './job-result-content.component.html',
  styleUrl: './job-result-content.component.scss'
})
export class JobResultContentComponent {


  @Input('create')
  create = false;

  loading = false;

  @Input()
  filename = ``

  tempData;

  @Input('id') id
  @Input('config') config;

  LOADING = false



  @Input('close') close

  @Input('refrence_id') refrence_id;
  @Input('file_id') file_id = '669961ed8b2955d7f6f94172';


  



  
  constructor(
    private jobApiService: JobApiService,
    protected cdr: ChangeDetectorRef,



  ) {

  }

  laodConfig() {

    this.loading = true;

    this.jobApiService.getJobResultContent(
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
