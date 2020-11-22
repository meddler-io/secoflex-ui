import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked, TemplateRef, ViewChild } from '@angular/core';
import { PropertySchema, PropertyType } from '../common/schemas/PropertySchema';
import { basicAnimations } from '../common/animations/basic-animations';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  animations: basicAnimations
})
export class PropertyComponent implements OnInit {

  @Input('property') property: PropertySchema;
  @Output('propertOnChange') propertOnChange = new EventEmitter()

  @ViewChild('dialogTmpl', { static: false }) dialogTpl: TemplateRef<any>;



  openDialog(options): void {

  }

  PropertyType = PropertyType;
  size = 'small'
  identifier = 'identifier'
  styleStatus: 'control'


  form: FormGroup;
  value: Observable<number>;

  constructor(private formBuilder: FormBuilder,
    //  private dialogMngr: DialogService
     ) { }


  onChange(event) {

    this.property.property_default_value = event
    this.propertOnChange.emit(this.property)
  }


  ngOnInit(): void {
    console.log('Initial Property', this.property)

    this.form = this.formBuilder.group({
      property: [this.property.property_default_value]
    });

    this.value = this.form.controls.property.valueChanges;

    this.value.subscribe(data => {
      this.onChange(data)
    })

  }

  options = [
    { value: 'This is value 1', label: 'Option 1' },
    { value: 'This is value 2', label: 'Option 2', disabled: true },
    { value: 'This is value 3', label: 'Option 3' },
    { value: 'This is value 4', label: 'Option 4', disabled: true },
    { value: 'This is value 5', label: 'Option 5' },
  ];




}
