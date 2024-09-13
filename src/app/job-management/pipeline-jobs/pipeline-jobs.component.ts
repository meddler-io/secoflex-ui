import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { ToolApiService } from 'src/app/tool-management/tool-api.service';

@Component({
  selector: 'app-pipeline-jobs',
  templateUrl: './pipeline-jobs.component.html',
  styleUrl: './pipeline-jobs.component.scss'
})
export class PipelineJobsComponent implements OnInit {



  loadingFindings$ = true;
  loadMoreFindings$ = new BehaviorSubject<number>(1)

  constructor(
    private toolApiService: ToolApiService,
    private activatedRoute: ActivatedRoute,

  ) {

  }


  selectedValuesMetadata: { [key: string]: any } = {};


  currentFilter$ = new BehaviorSubject({});

  currentFilter = this.currentFilter$.asObservable().pipe(tap(_=>{
    this.goto(1)
    // this.loadingFindings$ = true;
  }));

  pipeline_meta_data = this.toolApiService.getTaskPipelinesJobsMetadata();


  pipeline = this.activatedRoute.paramMap.pipe(map(params => {


    this.resetAll()
    return params.get('id')

  })
    ,

    switchMap((id: string) => {

      return this.currentFilter.pipe(

        map(filter => {


          return { filter, id }

        })

      )
    })

    ,
    switchMap(data => {


      return this.loadMoreFindings$.asObservable().pipe(

        switchMap(page_number => {

          return this.toolApiService.getTaskPipelinesJobs(data.id, data.filter , page_number);

        })

      )

      // return this.toolApiService.getTaskPipelinesJobs(data.id, data.filter);
    })
    ,
    tap(_=>{
      
      this.loadingFindings$ = false;
    })
  )


  filterChange() {

    
    this.currentFilter$.next(this.selectedValuesMetadata)

  }


  resetAll(){
    this.goto(1);
    this.selectedValuesMetadata = {};
    this.filterChange()
    
    
  }

  retry(id){
    this.toolApiService.retryTask(id).subscribe()
  }

  ngOnInit(): void {


    this.loadingFindings$ = true;



  }

  onPageChange(page_number) {
    this.goto(page_number)
  }


  goto(page) {


    this.loadingFindings$ = true;
    // this.lastFindingIdOffset = page ;
    this.loadMoreFindings$.next(page);
  }
}
