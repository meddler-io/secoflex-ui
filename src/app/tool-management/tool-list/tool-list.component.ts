import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { delay, map, startWith } from 'rxjs/operators';
import { ToolApiService } from '../tool-api.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { THROTTLE_DELAY } from 'src/app/reusable-components/common/shared/Constants';
import { DOCUMENT } from '@angular/common';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';

export interface Group {
  name: string;
  children: string[];
}


@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [...basicAnimations]
})
export class ToolListComponent implements OnInit {



  tools$ = this.toolApiService.getTools() // .pipe(delay(THROTTLE_DELAY))

  constructor(
    private toolApiService: ToolApiService,
    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,

  ) {

  }

  groups: Group[];
  filteredGroups$: Observable<Group[]>;
  inputFormControl: FormControl;

  ngOnInit() {
    


    this.groups = [
      {
        name: 'Group 1',
        children: ['Option 11', 'Option 12', 'Option 13'],
      },
      {
        name: 'Group 2',
        children: ['Option 21', 'Option 22', 'Option 23'],
      },
      {
        name: 'Group 3',
        children: ['Option 31', 'Option 32', 'Option 33'],
      }];

    this.filteredGroups$ = of(this.groups);
    this.inputFormControl = new FormControl();

    this.filteredGroups$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );

  }

  private filterChildren(children: string[], filterValue: string) {
    return children.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filter(value: string): Group[] {
    const filterValue = value.toLowerCase();
    return this.groups
      .map(group => {
        return {
          name: group.name,
          children: this.filterChildren(group.children, filterValue),
        }
      })
      .filter(group => group.children.length);
  }

  trackByFn(index, item) {
    return item.name;
  }

  openDrawer(template, context?: any, direction = DrawerDirection.Left, size = '50%', closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

    if (!context)
      context = {}


    const zIndex = 1000;
    const cssClass = 'backdrop_color'
    // const cssClass = 'cdk-overlay-2'
    this.document.body.classList.add('cdk-global-scrollblock')

    this.drawerMngr.create({
      direction,
      template,
      size,
      context: context,
      closeOnOutsideClick,
      parentContainer,
      isRoot,
      zIndex,
      cssClass,


    }).onDestroy(() => {

      this.document.body.classList.remove('cdk-global-scrollblock')

    });
  }

}
