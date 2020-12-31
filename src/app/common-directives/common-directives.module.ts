import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndDirective } from './directives/dnd.directive';
import { EllipsisDirective } from './directives/ellipsis.directive';
import { LeftBorderDirective } from './directives/left-border.directive';
import { OnFocusDirective } from './directives/on-focus.directive';
import { TrimPipe } from './directives/trim.pipe';
import { BorderDirective } from './directives/border.directive';
import { HoverColorDirective } from '../asset-management/directives/hover-color.directive';
import { DebounceClickDirective } from './debounce-click.directive';
import { AutofocusDirective } from './autofocus.directive';

const Directives = [
  LeftBorderDirective, EllipsisDirective,
  DndDirective,
  OnFocusDirective,
  BorderDirective,
  TrimPipe,
  HoverColorDirective,
  DebounceClickDirective

]

@NgModule({
  declarations: [
    ...Directives,
    DebounceClickDirective,
    AutofocusDirective

  ],
  imports: [
    CommonModule
  ], exports: [
    ...Directives
  ]
})
export class CommonDirectivesModule { }
