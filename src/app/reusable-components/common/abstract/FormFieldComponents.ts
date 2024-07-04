
import { FormBuilderComponent } from '../../form-builder/form-builder.component';
import { FormTextComponent } from '../../form-builder/fields/form-text/form-text.component';
import { FormRichTextComponent } from '../../form-builder/fields/form-rich-text/form-rich-text.component';
import { FormBooleanComponent } from '../../form-builder/fields/form-boolean/form-boolean.component';
import { FormEnumComponent } from '../../form-builder/fields/form-enum/form-enum.component';
import { FormFileComponent } from '../../form-builder/fields/form-file/form-file.component';
import { FormImageComponent } from '../../form-builder/fields/form-image/form-image.component';
import { FormVideoComponent } from '../../form-builder/fields/form-video/form-video.component';
import { FormSelectComponent } from '../../form-builder/fields/form-select/form-select.component';
import { FormListComponent } from '../../form-builder/fields/form-list/form-list.component';
import { FormCodeComponent } from '../../form-builder/fields/form-code/form-code.component';
import { FormUrlComponent } from '../../form-builder/fields/form-url/form-url.component';
import { Component, ComponentFactoryResolver } from '@angular/core';
import { FieldType } from '../schemas/FieldSchema';
import { NbListComponent } from '@nebular/theme';
import { BaseFormComponent } from './BaseFormComponent';
import { FormIpaddressComponent } from '../../form-builder/form-ipaddress/form-ipaddress.component';
import { FieldHostComponent } from '../../form-builder/fields/field-host/field-host.component';
import { FieldDomainComponent } from '../../form-builder/fields/field-domain/field-domain.component';



interface FormFieldComponentsI {
    component: any;
    title?: string;

}



export class FormFieldComponents {



    private static fieldsDictionary = new Map<FieldType, FormFieldComponentsI>(
        [
            [FieldType.IP_ADDRESS, { title: 'Ip Address', component: FormIpaddressComponent }],
            [FieldType.BOOLEAN, { title: 'Boolean', component: FormBooleanComponent }],
            [FieldType.CODE, { title: 'Code', component: FormCodeComponent }],
            [FieldType.ENUM, { title: 'Enum', component: FormEnumComponent }],
            [FieldType.FILE, { title: 'File', component: FormFileComponent }],
            [FieldType.IMAGE, { title: 'Image', component: FormImageComponent }],
            [FieldType.LIST, { title: 'List', component: FormListComponent }],
            [FieldType.RICH_TEXT, { title: 'Rich Text', component: FormRichTextComponent }],
            [FieldType.SELECT, { title: 'Select', component: FormSelectComponent }],
            [FieldType.TEXT, { title: 'Text', component: FormTextComponent }],
            [FieldType.URL, { title: 'URL', component: FormUrlComponent }],
            [FieldType.VIDEO, { title: 'Video', component: FormVideoComponent }],
            [FieldType.HOST, { title: 'Host', component: FieldHostComponent }],
            [FieldType.DOMAIN, { title: 'Domain', component: FieldDomainComponent }],



        ]

    )

    static getComponentTypes() {


        return Array.from(FormFieldComponents.fieldsDictionary.keys()).map(key => {
            return { title: this.fieldsDictionary.get(key).title, type: key }
        })
    }

    static getComponent(fieldType: FieldType): {
        component: any; title?: string
    } {
        if (FormFieldComponents.fieldsDictionary.has(fieldType)) {
            return FormFieldComponents.fieldsDictionary.get(fieldType)
        }

        throw new Error("No such component found");

    }

}