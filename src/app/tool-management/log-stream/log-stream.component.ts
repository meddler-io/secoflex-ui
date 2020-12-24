import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-log-stream',
  templateUrl: './log-stream.component.html',
  styleUrls: ['./log-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LogStreamComponent implements OnInit {
  testLogs = ''

  DELAY_TIME = 1000
  topics = [

    {
      title: 'Products',
      desc: 'Dummy Description',
      loaded: false,
      initiated: false,
      loading: new Subject(),
      collapsed: true,
      content: undefined,
      content$: new Subject()

    },
    {
      title: 'Products II',
      desc: 'Dummy Description',
      loaded: false,
      initiated: false,

      loading: new Subject(),
      collapsed: true,
      content: undefined,
      content$: new Subject(),




    },
    {
      title: 'Products III',
      desc: 'Dummy Description',
      loaded: false,
      initiated: false,

      loading: new BehaviorSubject(false),

      collapsed: true,
      content: undefined,
      content$: new Subject(),



    }
  ]

  constructor(
    private toolApiService: ToolApiService,


  ) {

  }

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      let newObject = {
        title: 'Products II',
        desc: 'Dummy Description',
        loaded: false,
        initiated: false,

        loading: new BehaviorSubject(false),
        collapsed: true,
        content: undefined,
        content$: new Subject(),




      }
      this.topics.push(newObject)
    }

    {
      let newObject = {
        title: 'Products II',
        desc: 'Dummy Description',
        loaded: false,
        initiated: false,

        loading: new BehaviorSubject(true),
        collapsed: false,
        content: undefined,
        content$: new Subject(),


      }
      this.topics.push(newObject)

      this.collapsedChange(this.topics.length - 1, false, true)

    }


  }

  streamLogs(index, forceRender) {


    if (this.topics[index].loaded)
      return


    this.topics[index].loading.next(true);

    // if (forceRender)
    // this.cd.detectChanges()

    this
      .toolApiService
      .getLogs('npop3', 100)
      .pipe(delay(this.DELAY_TIME))
      .pipe(tap(d => {
        this.topics[index].initiated = true;

      }))
      .subscribe(data => {
        this.topics[index].loaded = true;
        this.topics[index].loading.next(false);

        this.topics[index].content = data;
        this.topics[index].content$.next(data)

        console.log('loh', this.topics[index])
        // this.testLogs = data


      })
  }

  collapsedChange(index, collapsed, forceRender = false) {
    if (collapsed)
      return
    console.log('collapsedChange', index, collapsed)
    // this.topics[index].collapsed = collapsed;
    this.streamLogs(index, forceRender)
  }
}
