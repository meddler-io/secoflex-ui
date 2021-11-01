import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, shareReplay } from 'rxjs';
import { TreeNgxComponent } from 'tree-ngx/src/tree-ngx/tree-ngx.component';
import { JobApiService } from '../job-api.service';
import { StateSyncService } from '../state-sync.service';
// import { TreeNgxComponent } from 'tree-ngx/tree-ngx.module';


@Component({
  selector: 'app-job-file-viewer',
  templateUrl: './job-file-viewer.component.html',
  styleUrls: ['./job-file-viewer.component.scss']
})
export class JobFileViewerComponent implements OnInit {



  // SelectedJob = this.stateSyncService.SelectedJob.pipe(shareReplay())

  files = [];


  _bucketname;
  bucketname = this.stateSyncService.SelectedJob.pipe(
    shareReplay(),
    map((_: { _id: string }) => {
      return _?._id;
    })
  )


  constructor(
    private jobApiService: JobApiService,
    private cdr: ChangeDetectorRef,
    private stateSyncService: StateSyncService,




  ) { }

  onClick(bucketName: string, id: string) {

    console.log(
      'bucketname', bucketName, id
    )

    if (id.endsWith('/')) {
      console.log('folder_click', id)

      this.files = []
      this.
        jobApiService.
        getListOfObjects(bucketName, id)
        .subscribe(
          (objects: []) => {

            objects.forEach(object => {
              this.files.push(
                object,
              )
            })

          }
        );


    } else {

      this.jobApiService.downloadFile(bucketName, id)
      console.log('file_click', id)

    }
  }

  ngOnInit(): void {

    this.bucketname.pipe(
      mergeMap(
        (bucketname) => {
          return this.
            jobApiService.
            getListOfObjects(bucketname)


        }

      )
    ).subscribe(
      (objects: []) => {

        objects.forEach(object => {
          this.files.push(
            object
          )
        })

      }
    );




  }

}
