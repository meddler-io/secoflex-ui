import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormTextComponent } from './form-builder/fields/form-text/form-text.component';
import { FormRichTextComponent } from './form-builder/fields/form-rich-text/form-rich-text.component';
import { FormBooleanComponent } from './form-builder/fields/form-boolean/form-boolean.component';
import { FormEnumComponent } from './form-builder/fields/form-enum/form-enum.component';
import { FormFileComponent } from './form-builder/fields/form-file/form-file.component';
import { FormImageComponent } from './form-builder/fields/form-image/form-image.component';
import { FormVideoComponent } from './form-builder/fields/form-video/form-video.component';
import { FormSelectComponent } from './form-builder/fields/form-select/form-select.component';
import { FormListComponent } from './form-builder/fields/form-list/form-list.component';
import { FormCodeComponent } from './form-builder/fields/form-code/form-code.component';
import { FormUrlComponent } from './form-builder/fields/form-url/form-url.component';
import { NbButtonModule, NbLayoutModule, NbSidebarModule, NbSelectModule, NbCardModule, NbListModule, NbInputModule, NbIconModule, NbCheckboxComponent, NbCheckboxModule, NbToggleComponent, NbToggleModule, NbFormFieldModule, NbListComponent, NbProgressBarModule, NbSpinnerModule, NbContextMenuModule, NbAutocompleteModule, NbActionsModule, NbMenuModule, NbDialogModule, NbPopoverModule, NbDialogService, NbUserModule, NbRadioModule, NbThemeModule, NbAccordionModule, NbAccordionComponent } from '@nebular/theme';
import { TestComponentComponent } from './form-builder/commonComponents/test-component/test-component.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { FormIpaddressComponent } from './form-builder/form-ipaddress/form-ipaddress.component';
import { FormCustomizerComponent } from './form-builder/commonComponents/form-customizer/form-customizer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { UploadComponent } from './common/shared/upload/upload.component';
import { UploadService } from './common/services/upload.service';
import { ApiService } from './common/services/api.service';

import { EditorModule } from '@tinymce/tinymce-angular';
import { AttachmentComponent } from './form-builder/commonComponents/attachment/attachment.component';
import { DelayInterceptor } from './common/services/DelayHttpInterceptor';
import { FormCreatorComponent } from './form-create/form-creator/form-creator.component';
import { RouterModule, Routes } from '@angular/router';


import { DragDropModule } from '@angular/cdk/drag-drop';
import { PageDividerComponent } from './form-builder/commonComponents/page-divider/page-divider.component';
import { FieldPropertyComponent } from './form-builder/fields/field-property/field-property.component';
import { ViewPagerComponent } from './form-builder/commonComponents/view-pager/view-pager.component';
import { PlaygroundComponent } from './playground/playground.component';
import { PropertyComponent } from './property/property.component';
// import { NgxInputSwitchModule } from '@ngx-lite/input-switch';
// import { NgxInputTagModule } from '@ngx-lite/input-tag';
import { FieldViewerComponent } from './form-builder/commonComponents/field-viewer/field-viewer.component';
import { FieldEditorComponent } from './form-builder/commonComponents/field-editor/field-editor.component';
import { ActiveFormFieldService } from './common/services/active-form-field.service';



import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { BusinessComponent } from './management/business/business.component';
import { IconSelectorComponent } from './property/icon-selector/icon-selector.component';

import { FieldHostComponent } from './form-builder/fields/field-host/field-host.component';
import { FieldDomainComponent } from './form-builder/fields/field-domain/field-domain.component';
import { CommonImportsModule } from '../asset-management/submodules/common/common-imports.module';



const routes: Routes = [
  {
    path: '',
    component: ViewPagerComponent
  }
];

@NgModule({
  declarations: [
    FormBuilderComponent, FormTextComponent, FormRichTextComponent, FormBooleanComponent, FormEnumComponent, FormFileComponent, FormImageComponent, FormVideoComponent, FormSelectComponent, FormListComponent, FormCodeComponent, FormUrlComponent, TestComponentComponent, BootstrapComponent, FormIpaddressComponent, FormCustomizerComponent, UploadComponent, AttachmentComponent, FormCreatorComponent, PageDividerComponent, FieldPropertyComponent, ViewPagerComponent, PlaygroundComponent, PropertyComponent, FieldViewerComponent, FieldEditorComponent, BusinessComponent, IconSelectorComponent, FieldHostComponent, FieldDomainComponent


  ],

  exports: [
    FormBuilderComponent, FormTextComponent, FormRichTextComponent, FormBooleanComponent, FormEnumComponent, FormFileComponent, FormImageComponent, FormVideoComponent, FormSelectComponent, FormListComponent, FormCodeComponent, FormUrlComponent, TestComponentComponent, FormIpaddressComponent
    , RouterModule,
    

  ],
  imports: [
    NbButtonModule,
    FlexLayoutModule,
    CommonModule,
    NbSelectModule,
    NbCardModule,
    NbLayoutModule,
    NbButtonModule,
    NbListModule,
    NbInputModule,
    NbIconModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbProgressBarModule,
    NbSpinnerModule,
    HttpClientModule,
    EditorModule,
    NbContextMenuModule,
    FormsModule,
    NbAutocompleteModule,
    NbActionsModule,
    NbAutocompleteModule,
    NbSidebarModule.forRoot(), //if this is your app.module
    ScrollToModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forChild(),
    RouterModule,
    CommonImportsModule,


    DragDropModule,
    NbPopoverModule,
    NbUserModule,

    NbRadioModule,
    // NgxInputTagModule.forRoot(),

    // NgxUIModule,
    NbMenuModule,
    NbAccordionModule,
    RouterModule.forChild(routes),

    NbThemeModule.forRoot({ name: 'dark' }),
    


  ],

  providers: [
    UploadService,
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: DelayInterceptor, multi: true },
    ActiveFormFieldService,



  ],

  // entryComponents: [

  //   FormBuilderComponent, FormTextComponent, FormRichTextComponent, FormBooleanComponent, FormEnumComponent, FormFileComponent, FormImageComponent, FormVideoComponent, FormSelectComponent, FormListComponent, FormCodeComponent, FormUrlComponent, TestComponentComponent, FormIpaddressComponent,
  //   FieldEditorComponent


  // ]
})
export class ReusableComponentsModule { }
