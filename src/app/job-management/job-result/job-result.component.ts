import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MainContainerTabs, StateSyncService } from '../state-sync.service';
import { switchMap, tap } from 'rxjs';
import { JobApiService } from '../job-api.service';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';

@Component({
  selector: 'app-job-result',
  templateUrl: './job-result.component.html',
  styleUrls: ['./job-result.component.scss']
})
export class JobResultComponent implements OnInit, OnDestroy {

  loading = true;
  jobId;

  files = this.stateSyncService.SelectedJob.pipe(
    tap(_ => {

      this.loading = true;
    }),


    switchMap((_: any) => {

      this.jobId = _?._id;
      console.log('result', _)
      return this.stateSyncService.jobApiService.getJobResult(_?._id)
      return _;

    })
    ,
    tap(_ => {

      this.loading = false;
    })
  )

  openDrawer(template, context, direction = DrawerDirection.Left, size = '50%', closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

    const zIndex = 1000;
    const cssClass = 'backdrop_color'
    // const cssClass = 'cdk-overlay-2'

    this.drawerMngr.create({
      direction,
      template,
      size,
      closeOnOutsideClick,
      parentContainer,
      isRoot,
      zIndex,
      cssClass,
      context: context
    }

    )
      .onDestroy(() => {


      });
  }
  constructor(
    private stateSyncService: StateSyncService,
    private jobApiService: JobApiService,
    protected cdr: ChangeDetectorRef,
    private drawerMngr: DrawerService,
  ) { }

  ngOnDestroy(): void {
    this.stateSyncService.mainContainerActiveTab.next(
      MainContainerTabs.UNDEFINED
    )
  }

  ngOnInit(): void {

    this.stateSyncService.mainContainerActiveTab.next(
      MainContainerTabs.RESULT
    )
  }

  onClick(filename) {

    if (this.jobId)
      this.jobApiService.getJobResultContent(this.jobId, filename).subscribe()
  }

}
