import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input, TemplateRef } from '@angular/core';
import { of, combineLatest, merge, Subject, Subscription, Observable, pipe, BehaviorSubject } from 'rxjs';
import { delay, mergeMapTo, first, tap, map, filter, reduce } from 'rxjs/operators';

import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { FieldType } from 'src/app/reusable-components/common/schemas/FieldSchema';
import { FormFieldComponents } from 'src/app/reusable-components/common/abstract/FormFieldComponents';
import { FormIpaddressComponent } from '../../form-ipaddress/form-ipaddress.component';
import { ApiService } from 'src/app/reusable-components/common/services/api.service';
import { NbDialogService } from '@nebular/theme';
import { PropertySchema } from 'src/app/reusable-components/common/schemas/PropertySchema';
import { Properties } from 'src/app/reusable-components/unittest/MockDataset';
import { BASIC_PROPERTIES } from 'src/app/reusable-components/common/shared/Configuration';
import { BaseFieldComponent, BaseFormCommonProperties } from 'src/app/reusable-components/common/abstract/BaseFormComponent';
import { ThrowStmt } from '@angular/compiler';
import { ActiveFormFieldService } from 'src/app/reusable-components/common/services/active-form-field.service';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';




@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss'],
  animations: basicAnimations
})
export class TestComponentComponent implements OnInit {

  component;
  title = `Lorem ipsum dolor sit amet, numquam eleifend et pri. Duo ea sumo phaedrum pertinacia. Salutatus vulputate sea ea. Audiam feugait ne est, an paulo sanctus impedit duo, no vim vero nostrud salutatus.

  Ut vel elit nonumes detraxit, errem offendit an eum. Assum corrumpit sit at, ex definiebas inciderint vix. Ei sanctus persecuti per, eu vis volumus accumsan. Nec equidem apeirian ei, esse putent regione cum in.
  
  Nam ea quis omnium. Eirmod audiam ex quo, pro mentitum similique eu, vis ex erat possit menandri. Te paulo primis sed, ex viderer deseruisse mel, diam natum nec id. Vidisse vivendum voluptaria ius et, cum ea facer decore. Mundi fastidii ei pri.
  
  Per ullum interesset ut, per no equidem ceteros consetetur. Hinc fugit feugiat mei cu. Nec laudem partem ne, graeco audiam legimus ius cu, duo putant maiestatis ne. Ea vis equidem gubergren voluptatum. Movet saepe exerci vix ei.
  
  Iudico probatus ne qui, te nec instructior comprehensam. Cu lucilius recteque definitiones eum, aliquip instructior theophrastus nec cu. Appetere rationibus reformidans sit ut, putant habemus concludaturque ut per. Sea eu prompta ceteros, ea adipisci iracundia reprimique eos, an cum apeirian definitionem. Sea ei urbanitas consetetur, blandit forensibus in has.`
  subtitle = "Make sure all the IP Addresses are reachable from hawkI Server"
  undo_message = "You have 5 more seconds to undo the change"
  field_id = ""
  identifier = ""
  published;
  publishing = false;
  properties$ = new BehaviorSubject<PropertySchema[]>([])
  public dragEventListener$: Observable<boolean> = new Observable()
  subscriptionDelete$: Subscription;
  subscriptionUndo$: Subscription;
  deleteState = false;


  baseFormCommonProperties: BaseFormCommonProperties = new BaseFormCommonProperties()

  moreContextMenuItems = [
    { title: 'Delete' },
    { title: 'Preferences' },
  ]

  @ViewChild("componentTemplate", { read: ViewContainerRef, static: true }) componentTemplate: ViewContainerRef
  @Output() delete$ = new Subject<boolean>();
  @Output() undo$ = new Subject<boolean>();
  @Output() destroy$ = new Subject<boolean>();

  undoSubscription: Observable<any> = merge(this.undo$, this.delete$, of(true).pipe(delay(3000)))
    .pipe(first()).pipe(tap(deleteConfirm => {
      console.log('observer', deleteConfirm)
    })
    );

  deleteSubscription: Observable<any> = this.delete$
    .pipe(first())
    .pipe(tap(_ => {
      this.deleteState = true;
    }))
    .pipe(map(_ => {
      const viewContainerRef = this.componentTemplate;
      return viewContainerRef.detach(0)

    }))
    .pipe(tap(detachedComponent => {

      if (this.subscriptionUndo$)
        this.subscriptionUndo$.unsubscribe()

      this.subscriptionUndo$ = this.undoSubscription.subscribe(deleteConfirm => {
        if (deleteConfirm == true) {
          console.log("deleteConfirm", deleteConfirm, detachedComponent)
          this.destroy$.next(true)

        } else {
          console.log("Undoing", deleteConfirm, detachedComponent)
          const viewContainerRef = this.componentTemplate;
          viewContainerRef.insert(detachedComponent)
          this.initiateSubscriptions()


        }
      })

    })
    );


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private apiService: ApiService,
    private dialogService: NbDialogService,
    private activeFormFieldService: ActiveFormFieldService,
    private scrollToService: ScrollToService
  ) { }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }


  triggerScrollTo() {

    const config: ScrollToConfigOptions = {
      // target: 'destination',
      offset: 200
    };

    this.scrollToService.scrollTo(config);
  }

  ngOnInit() {
    this.getData()

    this
      .dragEventListener$
      .pipe(tap(_ => {
        console.log('scrollEvent', _)
      }))
      .subscribe()


    this.getProperties()

    this.activeFormFieldService.commonProperties$
      .pipe(map(data => <BaseFormCommonProperties>data.reduce((a, x) => ({ ...a, [x.property_identifier]: x.property_default_value }), {})
      ))

      .subscribe(data => {
        data.instructions
        this.baseFormCommonProperties = data;
      })

  }

  getProperties() {
    // this.BasicProperties.next(Properties)
  }

  refreshData() {
    return tap(val => {
      console.log('val', val, val['title'])
      if (val['title'])
        this.title = val['title']

      if (val['subtitle'])
        this.subtitle = val['subtitle']

      if (val['published'] != undefined)
        this.published = val['published']
      if (val['identifier'] != undefined)
        this.identifier = val['identifier']


    })

  }

  getData() {

    this
      .apiService
      .getFieldSchemaById(this.field_id)
      .pipe(filter(val => !!val['component_type']))
      .pipe(this.refreshData())
      .pipe(map(val => val['component_type']))

      .pipe(tap
        (component_type => {
          console.log('field_data', component_type)
          let component = FormFieldComponents.getComponent(component_type).component
          this.injectComponent(component)

        }
        ),
      )
      .subscribe()

  }

  delete() {
    this.delete$.next(true);
  }

  undo() {
    this.undo$.next(false);
  }

  injectComponent(component$: typeof BaseFieldComponent) {
    this.component = this.componentFactoryResolver.resolveComponentFactory(component$);
    const viewContainerRef = this.componentTemplate;
    this.component = viewContainerRef.createComponent(this.component)


    let customProperties = [];
    // console.debug('tpype',  this.component.instance   , (typeof this.component.instance.getProperties ) );
    if (typeof this.component.instance.getProperties === 'function') {
      customProperties = this.component.instance.getProperties()
    }

    console.log('customProperties', customProperties)
    // Get Properties

    // this.activeFormFieldService.publishSelectedFieldProperties(customProperties)
    this.properties$.next(customProperties)

    this.initiateSubscriptions()

  }


  initiateSubscriptions() {
    this.deleteState = false;

    if (this.subscriptionDelete$)
      this.subscriptionDelete$.unsubscribe()


    this.deleteSubscription.subscribe()
  }



  updateTitle(title) {

    this
      .apiService
      .updateFieldSchemaById(this.field_id, { title: title })
      .pipe(this.refreshData())

      .subscribe()
  }

  updateIdentifier(identifier) {
    this
      .apiService
      .updateFieldSchemaById(this.field_id, { identifier: identifier })
      .pipe(this.refreshData())

      .subscribe()
  }

  updateSubtitle(subtitle) {

    this
      .apiService
      .updateFieldSchemaById(this.field_id, { subtitle: subtitle })
      .pipe(this.refreshData())
      .subscribe()
  }

  togglePublished(published) {

    this.publishing = true

    this
      .apiService
      .updateFieldSchemaById(this.field_id, { published: published })
      .pipe(this.refreshData())
      .pipe(tap(val => {
        this.publishing = false
      }))
      .subscribe()

  }


  onPropertyChange(property) {
    if (this.component)
      this.component.instance.onPropertyChange(property);
  }

  test() {
    console.log('clicked')
  }
}
