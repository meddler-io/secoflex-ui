import { Component, OnInit, ComponentFactoryResolver, OnDestroy, ViewChild, ElementRef, ViewContainerRef, Input } from '@angular/core';
import { MockDataset } from '../unittest/MockDataset';
import { FormFieldComponents } from '../common/abstract/FormFieldComponents';
import { FieldType } from '../common/schemas/FieldSchema';
import { TestComponentComponent } from './commonComponents/test-component/test-component.component';

import { of, Subject, from, merge, BehaviorSubject } from 'rxjs';
import { first, delay, tap, map, flatMap, filter } from 'rxjs/operators';
import { ApiService } from '../common/services/api.service';
import { Injector } from '@angular/core';


@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef;
  @ViewChild("componentTemplate", { read: ViewContainerRef, static: true }) componentTemplate: ViewContainerRef

  // @ViewChild('accordion') private accordianContainer: ViewContainerRef;
  @Input('form_schema_id') form_schema_id = ''




  dragEventListener$ = new BehaviorSubject<boolean>(false);

  @Input('toggleDragAndScroll') set toggleDragAndScroll(val: boolean) {
    this.dragEventListener$.next(val)
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,

    private apiService: ApiService

  ) { }



  componentTypes = FormFieldComponents.getComponentTypes()

  ngOnInit() {
    // this.mockData()

    setTimeout(() => {
      this.scrollToBottom()
    }, 2000)
  }

  ngOnDestroy() {

  }

  addNewComponent() {

  }

  selectedChange(componentType) {
    if (componentType == '*')
      return this.render('unknown')


    let component = FormFieldComponents.getComponent(componentType).component
    this.render('unknown')
  }



  addFIeld(field_id: string) {
    this.render(field_id)
  }
  render(field_id: string) {





    // const accordianItem = this.componentFactoryResolver.resolveComponentFactory(NbAccordionItemComponent)
    const testComponent = this.componentFactoryResolver.resolveComponentFactory(TestComponentComponent);
    const viewContainerRef = this.componentTemplate;
    let testComponent$ = viewContainerRef.createComponent(testComponent);

    // let testComponent$ = testComponent.create(injector)


    testComponent$.instance.dragEventListener$ = this.dragEventListener$.asObservable()
    testComponent$.instance.field_id = field_id
    // testComponent$.instance.injectComponent(component)
    testComponent$
      .instance
      .destroy$
      .pipe(map(_ => {
        return this.apiService.deleteFieldSchemaById(field_id, this.form_schema_id)
      }),
        flatMap(_ => _),
      )
      .pipe(filter(val => val['deleted'] == true))
      .subscribe(_ => {
        console.log("Destroying permanently")
        testComponent$.destroy()
      })


  }


  mockData() {
    MockDataset.forEach(data => {
      let componentType = <FieldType>data.component;
      try {
        let component = FormFieldComponents.getComponent(componentType).component
        this.render('unknown')
      } catch (err) {
        console.error(componentType, 'Failed', err)
      }
    })
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;

    } catch (err) {

      console.error(err)
    }
  }

  reorderFormFields($event) {
    console.log($event)
  }


  toggleReorder() {
    this.dragEventListener$.next(true)
  }
}
