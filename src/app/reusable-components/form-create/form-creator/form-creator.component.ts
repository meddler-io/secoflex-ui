import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from '../../common/services/api.service';
import { Datastore } from '../../common/services/datastore';
import { map, startWith, filter } from 'rxjs/operators';
import { Router } from '@angular/router';


import { basicAnimations } from '../../common/animations/basic-animations';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss'],
  animations: [ ...basicAnimations , ]
})
export class FormCreatorComponent implements OnInit {

  _onHoverIndex = -1

  inputFormControl = new FormControl('', {
    validators: [Validators.min(3), Validators.required]
  })
  loading = true
  items = this.apiService.getFormSchemas
  filteredItems$ = new BehaviorSubject<any>([])

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getFormSchemas
      .pipe(filter(data => {
        return data != undefined
      }))
      .subscribe(items => {
        this.items = items
        this.filteredItems$.next(items)
        this.loading = false


      })

  }


  assignCopy() {
    this.filteredItems$.next(Object.assign([], this.items));
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    } // when nothing has typed
    this.filteredItems$.next(Object.assign([], this.items).filter(
      item => item.form_name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
    )
  }

  createForm() {

    if (this.inputFormControl.valid) {
      this
        .apiService
        .createFormSchema(this.inputFormControl.value)
        .subscribe( (data:{form_id: string} ) => {
          console.log(data)
          this.router.navigate(['/', 'form-builder' , data.form_id])
        })
    }

  }

  setOnHoverIndex(index){
    this._onHoverIndex = index
  }

  get hoverIndex(){
    return this._onHoverIndex;
  }

}
