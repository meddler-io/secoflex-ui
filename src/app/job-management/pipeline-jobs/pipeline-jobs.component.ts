import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { ToolApiService } from 'src/app/tool-management/tool-api.service';

@Component({
  selector: 'app-pipeline-jobs',
  templateUrl: './pipeline-jobs.component.html',
  styleUrl: './pipeline-jobs.component.scss'
})
export class PipelineJobsComponent implements OnInit {

  // search tagbar


  filteredOptionsTags$: Observable<any>;

  @ViewChild('autoInputTag') inputTag;


  selected_tag = ''

  getFilteredOptionsTags(value: string): Observable<any> {
    return of(value).pipe(

      switchMap(search_val => {

        return this.toolApiService.getTaskPipelinesJobsSearchMetaDataTags(search_val)

      })
      ,
      map((_: any) => _?.result)

    );
  }

  onChangeTags() {
    this.filteredOptionsTags$ = this.getFilteredOptionsTags(this.inputTag.nativeElement.value) //.pipe(map( (_: any)=>_?.result));
  }

  onSelectionChangeTags($event) {
    this.filteredOptionsTags$ = this.getFilteredOptionsTags($event).pipe(

      tap(_ => {
        this.filterChange()
      })
    );
  }

  // search bar

  filteredOptions$: Observable<any>;

  @ViewChild('autoInput') input;

  selected_asset = ''


  getFilteredOptions(value: string): Observable<any> {
    return of(value).pipe(

      switchMap(search_val => {

        return this.toolApiService.getTaskPipelinesJobsSearchMetaData(search_val)

      })
      ,
      map((_: any) => _?.result)

    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value) //.pipe(map( (_: any)=>_?.result));
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event).pipe(

      tap(_ => {
        this.filterChange()
      })
    );
  }

  // 


  loadingFindings$ = true;
  loadMoreFindings$ = new BehaviorSubject<number>(1)

  constructor(
    private toolApiService: ToolApiService,
    private activatedRoute: ActivatedRoute,
    private drawerMngr: DrawerService,


  ) {

  }


  selectedValuesMetadata: { [key: string]: any } = {};


  currentFilter$ = new BehaviorSubject({});

  currentFilter = this.currentFilter$.asObservable().pipe(tap(_ => {
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


          let _filter = data.filter;


          if (this.selected_asset.length > 0)
            _filter['request.scanner_value'] = [this.selected_asset]

          if (this.selected_tag.length > 0)
            _filter['tags'] = [this.selected_tag]

          console.log('filterChange', _filter, this.selected_asset)
          return this.toolApiService.getTaskPipelinesJobs(data.id, data.filter, page_number);

        })

      )

      // return this.toolApiService.getTaskPipelinesJobs(data.id, data.filter);
    })
    ,
    tap(_ => {

      this.loadingFindings$ = false;
    })
  )


  filterChange() {


    this.currentFilter$.next(this.selectedValuesMetadata)

  }

  reset(){
    this.selected_asset = '';
    this.onSelectionChange(this.selected_asset)
  }


  resetAll() {




    this.goto(1);
    this.selectedValuesMetadata = {};
    this.filterChange()


  }

  retry(id) {
    this.toolApiService.retryTask(id).subscribe()
  }

  ngOnInit(): void {


    this.filteredOptions$ = this.getFilteredOptions('');
    this.filteredOptionsTags$ = this.getFilteredOptionsTags('');

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
}
