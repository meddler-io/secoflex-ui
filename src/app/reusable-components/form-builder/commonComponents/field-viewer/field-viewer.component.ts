import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/reusable-components/common/services/api.service';
import { tap, map, delay } from 'rxjs/operators';
import { FormFieldComponents } from 'src/app/reusable-components/common/abstract/FormFieldComponents';
import { from, of } from 'rxjs';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { ActiveFormFieldService } from 'src/app/reusable-components/common/services/active-form-field.service';
import { ColorPallete, THROTTLE_DELAY } from 'src/app/reusable-components/common/shared/Constants';


@Component({
  selector: 'app-field-viewer',
  templateUrl: './field-viewer.component.html',
  styleUrls: ['./field-viewer.component.scss']
})
export class FieldViewerComponent implements OnInit {


  ColorPallete = ColorPallete
  items = []

  @Input('field_id') field_schema_id;

  _items = []

  @Input('fields') set fields(fields: string[]) {

    fields.forEach((field, index) => {

      this._items.push({ loading: true })
      this
        .apiService
        .getFieldSchemaById(field)
        .pipe(

          tap(data => {
            this.field_schema_data = data;
            let identifier;
            let type = FormFieldComponents.getComponent(data.component_type).title

            try {
              identifier = data.properties.find(_ => _.property_identifier == 'identifier').property_default_value
              if (identifier == undefined)
                identifier = data['field_id']
              if (identifier.length < 1)
                identifier = data['field_id']
            } catch (err) {
              identifier = type

            }
            of(null).pipe(delay(THROTTLE_DELAY)).subscribe(_ => {
              this._items[index] = { title: type, icon: 'checkmark', data: field, selected: this.field_schema_id == field, loading: false }

            })
            // console.log(this.field_schema_data, FormFieldComponents.getComponent('url'))
          }))
        .subscribe(d => {
          console.log("Fetching")
        })

    })

  }

  // type: string;
  identifier: string;

  constructor(private apiService: ApiService, private activeFormFieldService: ActiveFormFieldService,
    menu: NbMenuService
  ) {

    menu.onItemClick().subscribe((val) => {
      // .... do what you want


      menu.getSelectedItem().subscribe(_ => {
        if (_.item)
          _.item.selected = false

        val.item.selected = true;

      })
      this.selectField(val.item.data)
      // console.log('onItemClick', val)
    });

  }

  field_schema_data = {}

  ngOnInit(): void {

    this
      .apiService
      .getFieldSchemaById(this.field_schema_id)

      .pipe(

        tap(data => {
          this.field_schema_data = data;
          let type = FormFieldComponents.getComponent(data.component_type).title
          // console.log('title', this.type)
          try {
            this.identifier = data.properties.find(_ => _.property_identifier == 'identifier').property_default_value
            if (this.identifier == undefined)
              this.identifier = data['field_id']
            if (this.identifier.length < 1)
              this.identifier = data['field_id']
          } catch (err) {
            this.identifier = type

          }


          // console.log(this.field_schema_data, FormFieldComponents.getComponent('url'))
        }))
      .subscribe()
  }


  selectField(field_id) {
    this
      .activeFormFieldService.publishSelectedField(field_id)
  }

  delete(index) {

  }

  onHover$ = -1

  onHover(index) {
    console.log('onHover', index)
    this.onHover$ = index
  }
}
