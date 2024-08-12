import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-tools-list-for-input',
  templateUrl: './tools-list-for-input.component.html',
  styleUrl: './tools-list-for-input.component.scss'
})
export class ToolsListForInputComponent {


  @Input('id') id;

  exportedToolsList = this.toolApiService.getAllTasks();

  constructor(
    private toolApiService: ToolApiService,
    protected cdr: ChangeDetectorRef,



  ) {

  }

  selectedIds = new Set();

  selectResult(index){

  if(  this.selectedIds.has(index) ){
    this.selectedIds.delete(index)
  }else{
    this.selectedIds.add(index)

  }
  }

  save(){
    console.log('save dependency ', );

    this.toolApiService.updateTaskToAddIngestedResults(this.id, Array.from(this.selectedIds )).subscribe()
  }
}
