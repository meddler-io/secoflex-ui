import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToolApiService } from '../tool-api.service';
import { BehaviorSubject, of } from 'rxjs';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent implements OnInit {


  loading = false;


  @Input('id') id = '669961ed8b2955d7f6f94172';

  fileList$ = new BehaviorSubject([]);

  fileList = this.fileList$.asObservable()
  constructor(
    private toolApiService: ToolApiService,
    protected cdr: ChangeDetectorRef,
    private drawerMngr: DrawerService,


  ) {

  }

  openDrawer(template, context, direction = DrawerDirection.Left, size = '50%', closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

    const zIndex = 1000;
    const cssClass = 'backdrop_color'
    // const cssClass = 'cdk-overlay-2'

    this.drawerMngr.create({
      direction,
      template,
      size,
      closeOnOutsideClick,
      parentContainer,
      isRoot,
      zIndex,
      cssClass,
      context: context
    }

    )
      .onDestroy(() => {


      });
  }


  loadData() {
    this.loading = true;
    this.toolApiService.getConfigMapList(
      this.id,

    ).subscribe((_: []) => {
      this.fileList$.next(_)
      this.loading = false;

      this.cdr.markForCheck();


    })
  }

  ngOnInit(): void {


    this.loadData();

  }

  copyText(textToCopy) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  copyToClipboard(filename) {

    this.toolApiService.getConfigMapVariable(this.id, filename).subscribe((_: any) => {

      if (_?.status)
        this.copyText(_?.variable)
    })

  }

  removeObject(filename) {

    this.loading = true;
    this.toolApiService.removeConfigMap(
      this.id,
      filename

    ).subscribe((_: []) => {

      this.loading = false;

      this.loadData();

    })
  }
}
