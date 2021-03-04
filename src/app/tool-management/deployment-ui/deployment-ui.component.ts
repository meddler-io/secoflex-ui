import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-deployment-ui',
  templateUrl: './deployment-ui.component.html',
  styleUrls: ['./deployment-ui.component.scss']
})
export class DeploymentUiComponent implements OnInit {

  @Input('tool_id') tool_id

  deployments

  constructor(
    private toolApiService: ToolApiService,
    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,


  ) { }

  ngOnInit(): void {


    // return
    this
      .toolApiService
      .getDeployments(this.tool_id)
      .pipe(map((deployments: [string]) => {

        let _deployments = []

        deployments.forEach((deployment, index) => {

          let id = deployment
          let _deployment = {
            id: id,
            details: this.toolApiService.getDeployment(id),
          }

          _deployments.push(_deployment)


        })

        return _deployments

      }))

      .subscribe(_ => {
        this.deployments = _
      })


  }

  deploy() {
    this
      .toolApiService
      .createDeployment('123')
      .subscribe()

  }

  stopJob(job_id) {
    this
      .toolApiService
      .stopDeployment(job_id)
      .subscribe()
  }

  purge() {
    this
      .toolApiService
      .purgeDeployment()
      .subscribe()

  }


  runJob(job_id) {


    console.log('runJob', job_id)
    return

    this
      .toolApiService
      .runDeployment(job_id)
      .subscribe()
  }

  execJob(id) {

    this
      .toolApiService
      .execJob(id, {})
      .subscribe()
  }



  openDrawer(template, context?: any, direction = DrawerDirection.Left, size = '50', closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

    if (!context)
      context = {}


    console.log('context', context)
    const zIndex = 1000;
    const cssClass = 'backdrop_color'
    // const cssClass = 'cdk-overlay-2'
    this.document.body.classList.add('cdk-global-scrollblock')

    this.drawerMngr.create({
      direction,
      template,
      size,
      context: context,
      closeOnOutsideClick,
      parentContainer,
      isRoot,
      zIndex,
      cssClass,


    }).onDestroy(() => {

      this.document.body.classList.remove('cdk-global-scrollblock')

    });
  }
}
