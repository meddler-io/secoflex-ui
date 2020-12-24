import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { ToolApiService } from '../tool-api.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';

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



  tools$ = this.toolApiService.getTools()

  constructor(
    private toolApiService: ToolApiService

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


}