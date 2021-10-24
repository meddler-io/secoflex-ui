import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterContentChecked, AfterViewInit } from '@angular/core';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { FormFieldComponents } from 'src/app/reusable-components/common/abstract/FormFieldComponents';
import { FormSchema } from 'src/app/models/FormSchem';
import { ApiService } from 'src/app/reusable-components/common/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { filter, tap, startWith, map, flatMap, take, delay } from 'rxjs/operators';
import { FormBuilderComponent } from '../../form-builder.component';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Datastore } from 'src/app/reusable-components/common/services/datastore';
import { Properties } from 'src/app/reusable-components/unittest/MockDataset';
import { FieldEditorComponent } from '../field-editor/field-editor.component';
import { ActiveFormFieldService } from 'src/app/reusable-components/common/services/active-form-field.service';
import { SimpleChange } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { ColorPallete } from 'src/app/reusable-components/common/shared/Constants';

// import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';


@Component({
  selector: 'app-view-pager',
  templateUrl: './view-pager.component.html',
  styleUrls: ['./view-pager.component.scss'],
  animations: basicAnimations
})
export class ViewPagerComponent implements OnInit, AfterContentChecked {

  @ViewChild('fieldEditor', { static: false }) fieldEditorComponent: FieldEditorComponent;
  @ViewChild('formBuilder') formBuilderComponent: FormBuilderComponent
  @ViewChild('formInput') formInput: ElementRef<HTMLInputElement>


  viewEditor = true

  ColorPallete = ColorPallete
  properties = this.activeFormFieldService.properties$.asObservable()

  selectedField = this.activeFormFieldService.selectedField$.asObservable()
  toggleDragAndScroll = false;
  toggleAddComponentValue = false;

  showAutocompleteBar = false;
  minFormNameLength = 1;
  options: any[] = [];
  filteredControlOptions$: Observable<string[]>;
  inputFormControl: FormControl = new FormControl(
    ''
  );
  value: string;


  componentTypes = FormFieldComponents.getComponentTypes()



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

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['formSchema']) {
      // aa prop changed
      console.log('scroll property changed')
    }

  }


  toggleAddComponent() {

    this.toggleAddComponentValue = !this.toggleAddComponentValue
  }
  toggleScroll() {
    this.toggleDragAndScroll = !this.toggleDragAndScroll;
  }

  properties_visible = true;
  report_builder_visible = true;


  toggleProperties() {
    console.log('toggleProperties')
    this.properties_visible = !this.properties_visible;
  }
  toggleReportBuilder() {
    console.log('toggleReportBuilder')

    this.report_builder_visible = !this.report_builder_visible;
  }



  formId = new BehaviorSubject(undefined);

  refreshFormAtributes(onInit: boolean) {
    this.formId
      .asObservable()
      .pipe(filter(_ => !!_))
      .pipe(take(1))
      .subscribe((formid: string) => {
        console.log('formId ', formid)
        this
          .apiService
          .fetchFormSchemaById(formid)
          .pipe(

            delay(100),

            tap(
              (formSchema: FormSchema) => {
                this.formSchema = formSchema
              }
            ),
            tap(
              (formSchema: FormSchema) => {
                if (!onInit)
                  return

                console.log('renderForm', formSchema)
                formSchema.field.forEach((field_id, index) => {
                  // this.formBuilderComponent.addFIeld(field_id)
                  if (index == 0) {
                    console.log('seelcting field')
                    this.selectField(field_id)
                  }



                })

              }
            )
          )
          .subscribe(_ => {
          })

      })



  }




  ngOnInit() {

    this
      .activateRoute
      .params
      .pipe(
        map(route => route.formid),
        filter(val => !!val),

        tap(formid => {
          this.formId.next(formid)

        }),
        tap(formid => {
          this.refreshFormAtributes(true)
        }
        ),

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






    {
      this.activeFormFieldService
        .selectedField$
        .pipe(filter(_ => !!_))
        .subscribe((field: string) => {


          // setTimeout((_ => {


          //   let id = field
          //   const config: ScrollToConfigOptions = {
          //     target: id,
          //     container: 'field_container',

          //   };

          //   this.scrollToService.scrollTo(config).subscribe(val => {


          //   },
          //     error => {


          //     }
          //   );
          // }), 0)


        })

    }



  }






  constructor(private apiService: ApiService, private activateRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private activeFormFieldService: ActiveFormFieldService,
    // private scrollToService: ScrollToService
  ) { }



  addField(component) {


    let componentType = component.type;
    this
      .apiService
      .createFieldSchema(this.formSchema.form_id, componentType)
      .pipe(filter(value => !!value['field_id']))
      .pipe(tap((value: { field_id: string }) => {
        this.selectField(value.field_id)
      }))
      .pipe(tap())
      .subscribe(_ => {
        this.refreshFormAtributes(false)
      })

    // console.log('addField', component)
  }


  private filter(value: string): string[] {

    console.debug('filtering', value, typeof (value))
    const filterValue = value.toLowerCase();

    let options = this.options.filter(optionValue => optionValue['form_name'].toLowerCase().includes(filterValue));

    return options;
  }

  selectField(field_id) {
    this.activeFormFieldService.publishSelectedField(field_id)
  }

  getProperties(properties) {
    this.activeFormFieldService.publishSelectedFieldProperties(properties)
    // this.cd.detectChanges();


  }


  ngAfterContentChecked() {
    this.cd.detectChanges();
  }


  properyOnChange(index, change) {
    // console.log(change)
    // return;
    this.fieldEditorComponent.onPropertyChange(change)

    // this.properties$.n
    // console.log('change detected', change)
    // this.fieldEditorComponent.properties
  }

  save() {
    this.selectedField.pipe(
      take(1),
      map(field_id => {
        return this.fieldEditorComponent.save(field_id)
      })
      ,
      flatMap(_ => _),
      tap(_ => {
        console.log("Saved")
      })

    )
      .subscribe()



    // (field_id => {
    //   this.fieldEditorComponent.save(field_id)

    // })
  }

  activeNavbarMenuChange(data) {
    console.log('activeNavbarMenuChange', data)
  }


  activeBottom = 0;


  items: NbMenuItem[] = [
    {
      title: 'Profile',
      icon: 'person-outline',
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
    },
  ];

}
