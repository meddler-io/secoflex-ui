
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApiService } from '../job-api.service';
import { ToolApiService } from 'src/app/tool-management/tool-api.service';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { DOCUMENT } from '@angular/common';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { map } from 'rxjs';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrl: './pipeline.component.scss'
})
export class PipelineComponent {


  showOnlyGraph = false;

  pipelines = this.toolApiService.getTaskPipelines().pipe(map((_: any) => _?.pipelines));

  graph = this.toolApiService.getTaskPipelines();

  test(node) {
    console.log('click', node)
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
  tools = this.toolApiService.getAllTasks();

  constructor(
    private toolApiService: ToolApiService,
    private route: ActivatedRoute,
    private router: Router,

    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {

  }

  onSelectTool(id) {

    this.router.navigate([
      {
        outlets: {
          "tool_list": `tool/${id}`
        }
      }
    ], {
      relativeTo: this.route.parent
    })
  }

  closeToolSelection() {


    this.router.navigate([
      {
        outlets: {
          "tool_list": null
        }
      }
    ], {
      relativeTo: this.route.parent
    })
  }


  selectPipelineView(pipelines) {

    let pipeline = pipelines?.pipeline	;
    if (pipeline.length > 0) {
      let id   = pipeline[0]['_id']['$oid']
      console.log('selectPipelineView', id);

      this.router.navigate([  '/jobs', 'pipeline' ,   id  ] 
        , 
        {
          relativeTo: this.route.parent.parent,
          
           preserveFragment: false}

      )

    }
  }
}
