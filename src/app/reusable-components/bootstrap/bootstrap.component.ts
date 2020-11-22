import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { startWith, map, filter, tap, flatMap } from 'rxjs/operators';
import { FormTemplates } from '../unittest/MockDataset';
import { Datastore } from '../common/services/datastore';
import { ApiService } from '../common/services/api.service';
import { NbMenuItem } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { FormSchema } from 'src/app/models/FormSchem';
import { FormFieldComponents } from '../common/abstract/FormFieldComponents';
import { FormBuilderComponent } from '../form-builder/form-builder.component';
import { basicAnimations } from '../common/animations/basic-animations';


@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss'],
  animations: basicAnimations
})
export class BootstrapComponent implements OnInit {



  toggleDragAndScroll = false;    
  @ViewChild('formBuilder') formBuilderComponent: FormBuilderComponent
  @ViewChild('formInput') formInput: ElementRef<HTMLInputElement>
  showAutocompleteBar = false;
  minFormNameLength = 1;
  options: any[] = [];
  filteredControlOptions$: Observable<string[]>;
  inputFormControl: FormControl = new FormControl(
    ''
  );
  value: string;


  componentTypes = [...FormFieldComponents.getComponentTypes(),
  ...FormFieldComponents.getComponentTypes(),
  ...FormFieldComponents.getComponentTypes()]


  formSchema: FormSchema = {
    form_id: "",
    form_name: "",
    form_metadata: [],
    form_tags: [],
    field: [],
    public: true,
    draft: true,
    archived: true,
    version: 1,
  }

  items: NbMenuItem[] = [
    {
      title: 'home',
      link: '/',
      icon: 'person-outline',
      pathMatch: 'prefix'
    },
    {
      title: 'dashboard',
      icon: 'person-outline',
      pathMatch: 'prefix',
      link: '/dashboard'
    },
    {
      title: 'dashboard',
      icon: 'person-outline',
      pathMatch: 'prefix',
      link: '/dashboard'
    }, {
      title: 'dashboard',
      icon: 'person-outline',
      pathMatch: 'prefix',
      link: '/dashboard'
    }
    , {
      title: 'dashboard',
      icon: 'person-outline',
      pathMatch: 'prefix',


      link: 'dashboard'
    }, {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    },
    {
      title: 'home',
      icon: 'person-outline',

      link: '/'
    },
    {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    },
    {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    }, {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    }
    , {
      title: 'dashboard',
      link: 'dashboard'
    }, {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    },
    {
      title: 'home',
      icon: 'person-outline',

      link: '/'
    },
    {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    },
    {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    }, {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    }
    , {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    }, {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    },
    {
      title: 'home',
      icon: 'person-outline',

      link: '/'
    },
    {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    },
    {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    }, {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    }
    , {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    }, {
      title: 'dashboard',
      icon: 'person-outline',

      link: 'dashboard'
    }
  ];

  toggleScroll(){
    this.toggleDragAndScroll = !this.toggleDragAndScroll;
  }

  ngOnInit() {

    this
      .activateRoute
      .params
      .pipe(
        map(route => route.formid),
        filter(val => !!val),
        map(formid => {
          return this
            .apiService
            .fetchFormSchemaById(formid)
            .pipe(
              tap(
                (formSchema: FormSchema) => {
                  this.formSchema = formSchema
                }
              ),
              tap(
                (formSchema: FormSchema) => {

                  console.log('renderForm', formSchema)
                  formSchema.field.forEach(field_id => {
                    this.formBuilderComponent.addFIeld(field_id)
                  })

                }
              )

            )
        }
        ),
        flatMap(_ => _),
        tap(value => {
        })

      )
      .subscribe()



    Datastore
      .FormSchema
      .pipe(filter(val => !!val))
      .subscribe(formSchema => {
        console.debug('formSchema', formSchema)
        this.options = formSchema
      })

    this.filteredControlOptions$ = of(this.options);
    this.filteredControlOptions$ = this.inputFormControl.valueChanges
      .pipe(filter(value => !!value))
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );
  }

  private filter(value: string): string[] {

    console.debug('filtering', value, typeof (value))
    const filterValue = value.toLowerCase();

    let options = this.options.filter(optionValue => optionValue['form_name'].toLowerCase().includes(filterValue));

    return options;
  }



  constructor(private apiService: ApiService, private activateRoute: ActivatedRoute) { }

  formAutoCompleteSelectionChanged(form_data) {
    console.log('form', form_data)

    
    if (!form_data)
      return

    if (form_data == '')
      return

    if (typeof (form_data) == 'object') {


      if (form_data[0] == false) {
        form_data = form_data[1]
        console.log('boom', form_data)

        this.inputFormControl.setValue(form_data)

      } else {

        form_data = form_data[1]
        console.log('poom', form_data)

        this.inputFormControl.setValue('')
        console.log('Create New', form_data)
        this.apiService.createFormSchema(form_data).subscribe()
      }


    } else {

    }

  }

  onFocusShift(showAutocompleteBar) {
    this.showAutocompleteBar = showAutocompleteBar;
    if (showAutocompleteBar == true) {

    }
    // setTimeout(() => { this.formInput.nativeElement.focus() }, 0)
  }


  addField(component) {


    let componentType = component.type;
    this
      .apiService
      .createFieldSchema(this.formSchema.form_id, componentType)
      .pipe(filter(value => !!value['field_id']))
      .pipe(tap((value: { field_id: string }) => {
        console.log('addField field_id', value.field_id)
        this.formBuilderComponent.addFIeld(value.field_id)

      }))
      .subscribe()

    // console.log('addField', component)
  }

  renderForm() {


    console.log('renderForm', this.formSchema)
  }

}
