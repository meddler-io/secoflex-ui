import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToolApiService } from '../tool-api.service';
import { FormControl, Validators } from '@angular/forms';
import { SharedDataService } from '../shared-data-service.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-worker-deployment-config',

  templateUrl: './worker-deployment-config.component.html',
  styleUrl: './worker-deployment-config.component.scss'
})
export class WorkerDeploymentConfigComponent implements OnInit {


  image_tags;
  loading = true;
  validateNo(e): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }
  @Input('create_mode') create_mode = false;

  @Input('context') context;
  scale_formcontrol = new FormControl(1, [Validators.required
    ,
  Validators.min(0),


  ])

  image_formcontrol = new FormControl();
  memory_formcontrol = new FormControl(255, [Validators.required,

  Validators.min(255),

  ])
  constructor(
    protected cdr: ChangeDetectorRef,

    private sharedDataService: SharedDataService,

    private toolApiService: ToolApiService
  ) {


  }
  ngOnInit(): void {





    if (this.create_mode == false) {

      console.log('context', this.context)


      this.image_tags = this.sharedDataService.ToolId.pipe(


        switchMap((tool_id) => {

          return this.toolApiService.getToolImageTags(tool_id)

        })
      )
  
      

      this.toolApiService.getDeployment(this.context?.id).subscribe((_: any) => {

        this.loading = false;
        console.log('__', _,


          _?.TaskGroups[0]?.Count
          ,
          _?.TaskGroups[0]?.Tasks[0]?.Resources?.MemoryMB


        )


        this.scale_formcontrol.setValue(
          parseInt(_?.TaskGroups[0]?.Count)


        )

        this.image_formcontrol.setValue(
          _?.TaskGroups[0]?.Tasks[0]?.Config?.image


        )
        this.memory_formcontrol.setValue(
          parseInt(_?.TaskGroups[0]?.Tasks[0]?.Resources?.MemoryMB)

        )

        this.cdr.markForCheck()

      })


    }
    else {

      this.loading = false;
    }

  }

  deploy(id: string) {

    const data = {
      TraceId: id,
      fprocess: 'echo hello world'
    }
    this.toolApiService.createDeployment(id, this.scale_formcontrol.value, this.memory_formcontrol.value).subscribe(_ => {
      console.log(_)

    })
  }

  update_deploy(id: string) {

    const data = {
      TraceId: id,
      fprocess: 'echo hello world'
    }
    this.toolApiService.updateDeployment(id, this.scale_formcontrol.value, this.memory_formcontrol.value  ,  this.image_formcontrol.value ).subscribe(_ => {
      console.log(_)

    })
  }
}
