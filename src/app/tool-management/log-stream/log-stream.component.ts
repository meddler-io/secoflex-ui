import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { delay, repeat, repeatWhen, retry, retryWhen, switchMap, tap } from 'rxjs/operators';
import { THROTTLE_DELAY } from 'src/app/reusable-components/common/shared/Constants';
import { LOG_STREAM_STATUS, ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-log-stream',
  templateUrl: './log-stream.component.html',
  styleUrls: ['./log-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None

})
export class LogStreamComponent implements OnInit {
  testLogs = ''

  @Input('log_id')
  log_id = 'npop3'


  topics = [

    {
      title: 'Products',
      desc: 'Dummy Description',
      loaded: false,
      initiated: false,
      loading: new Subject(),
      collapsed: true,
      content: [],
      content$: new Subject(),
      pauseStreamer$: new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.RESUME)




    },
    {
      title: 'Products II',
      desc: 'Dummy Description',
      loaded: false,
      initiated: false,

      loading: new Subject(),
      collapsed: true,
      content: [],

      content$: new Subject(),
      pauseStreamer$: new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.RESUME)






    },
    {
      title: 'Products III',
      desc: 'Dummy Description',
      loaded: false,
      initiated: false,

      loading: new BehaviorSubject(false),

      collapsed: true,
      content: [],

      content$: new Subject(),
      pauseStreamer$: new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.RESUME)





    }
  ]

  constructor(
    private toolApiService: ToolApiService,


  ) {

  }

  ngOnInit(): void {
    for (let i = 0; i < 30; i++) {
      let newObject = {
        title: 'Products II',
        desc: 'Dummy Description',
        loaded: false,
        initiated: false,

        loading: new BehaviorSubject(false),
        collapsed: true,
        content: [],

        content$: new Subject(),
        pauseStreamer$: new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.RESUME)





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
        content: [],
        content$: new Subject(),
        pauseStreamer$: new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.RESUME),

      }
      this.topics.push(newObject)

      this.collapsedChange(this.topics.length - 1, false, true)

    }


  }




  streamLogs(index, forceRender) {


    if (this.topics[index].loaded)
      return
    this.topics[index].loading.next(true);


    this
      .toolApiService
      .getLogs(this.log_id, 2, this.topics[index].pauseStreamer$)
      .pipe(
        delay(THROTTLE_DELAY),
        tap(d => {
          this.topics[index].initiated = true;
        }))
      .subscribe(data => {
        this.topics[index].loaded = true;
        this.topics[index].loading.next(false);


        this.topics[index].content.push(data);
      })
  }

  collapsedChange(index, collapsed, forceRender = false) {


    if (collapsed)
      return

    // this.topics[index].collapsed = collapsed;
    this.streamLogs(index, forceRender)
  }



  pause(index) {
    this.topics[index].pauseStreamer$.next(LOG_STREAM_STATUS.PAUSE);


  }

  resume(index) {
    this.topics[index].pauseStreamer$.next(LOG_STREAM_STATUS.STOP);


  }
}
