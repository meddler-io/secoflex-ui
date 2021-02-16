import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-tool-create',
  templateUrl: './tool-create.component.html',
  styleUrls: ['./tool-create.component.scss']
})
export class ToolCreateComponent implements OnInit {

  constructor(
    private toolApiService: ToolApiService

  ) { }


  form = new FormGroup({

    alias: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9]+(?:[._-]{1,2}[a-z0-9]+)*')]),
    name: new FormControl('', [Validators.required]),
    desc: new FormControl(''),

  })

  ngOnInit(): void {
  }

  createTool() {
    this.toolApiService.createTool(this.form.value).subscribe()

  }

}
