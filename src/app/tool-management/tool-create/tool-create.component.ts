import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, of, pipe } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-tool-create',
  templateUrl: './tool-create.component.html',
  styleUrls: ['./tool-create.component.scss']
})
export class ToolCreateComponent implements OnInit {

  @Input('close') close : EventEmitter<any>;
  @Input('edit_mode') edit_mode = false
  @Input('tool_id') tool_id

  constructor(
    private toolApiService: ToolApiService,
    private cdr: ChangeDetectorRef

  ) { }


  form = new FormGroup({

    alias: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9]+(?:[._-]{1,2}[a-z0-9]+)*')]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),

  })

  ngOnInit(): void {

    if (this.edit_mode == true) {
      this.toolApiService.getTool(this.tool_id).subscribe(d => {
        let alias = d['alias']
        let name = d['name']
        let description = d['description']

        this.form.get('alias').setValue(alias)
        this.form.get('alias').disable()

        this.form.get('name').setValue(name)
        this.form.get('description').setValue(description)
        this.cdr.markForCheck()
      })
    }

  }

  createTool() {

    of(EMPTY).pipe(map(_ => {
      if (this.edit_mode == true) {
        return this.toolApiService.editTool(this.tool_id, this.form.value)
      } else {
        return this.toolApiService.createTool(this.form.value)
      }
    })
      ,
      mergeMap(_ => _),


      tap(_ => {

        this.close.next(undefined)
      }))
      .subscribe()


    // this.toolApiService.createTool(this.form.value).subscribe()

  }

}
