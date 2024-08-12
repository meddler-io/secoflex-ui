import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApiService } from '../job-api.service';
import { ToolApiService } from 'src/app/tool-management/tool-api.service';

@Component({
  selector: 'app-tool-selector',
  templateUrl: './tool-selector.component.html',
  styleUrls: ['./tool-selector.component.scss']
})
export class ToolSelectorComponent implements OnInit {

  tools = this.toolApiService.getAllTasks()

  constructor(
    private toolApiService: ToolApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSelectTool(tool) {
    console.log(tool, this.route)
    this.router.navigate([
      {
        outlets: {
          "tool_list": `tool/${tool._id}`
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

}
