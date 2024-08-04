import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { SharedDataService } from '../shared-data-service.service';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-deployment-ui',
  templateUrl: './deployment-ui.component.html',
  styleUrls: ['./deployment-ui.component.scss']
})
export class DeploymentUiComponent implements OnInit, OnDestroy , AfterViewInit {


  @ViewChild('jobConfigTemplate') jobConfigTemplate;

  @Input('tool_id') tool_id

  deployments = this.sharedDataService.ToolId
    .pipe(
      map(
        (id => {
        return id;
      }
      )
    )
  ).pipe(

switchMap(tool_id=>{

return  this
.toolApiService
.getDeployments(tool_id)
.pipe(map((deployments: [string]) => {

let _deployments = []

deployments.map((deployment : any, index) => {

  deployment.id = deployment?.ID;
  return deployment;

  let id = deployment
  let _deployment = {
    id: id,
    details: this.toolApiService.getDeployment(id),
  }

  _deployments.push(_deployment)


})

_deployments = deployments;

console.log('_deployments', _deployments)
return _deployments

}))


})


  )




constructor(
  private toolApiService: ToolApiService,
  private drawerMngr: DrawerService,
  @Inject(DOCUMENT) private document: Document,
  private activatedRoute: ActivatedRoute,
  private cdr: ChangeDetectorRef,
  private sharedDataService: SharedDataService,



) { }
  ngAfterViewInit(): void {

    return;
    this.openDrawer(this.jobConfigTemplate , 
      {
        'config': {},
        'id':    '669961ed8b2955d7f6f94172:66a0e05dc1756beee40d4736'
      }
      
    )
  }

sharedServiceSubscription$ = Subscription.EMPTY

ngOnDestroy(): void {

  this.sharedServiceSubscription$.unsubscribe()
}


ngOnInit(): void {



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



openDrawer(template, context ?: any, direction = DrawerDirection.Left, size = '50', closeOnOutsideClick = true, isRoot = true, parentContainer ?: any) {

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
