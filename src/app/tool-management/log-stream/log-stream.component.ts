import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { BehaviorSubject, interval, Subject, Subscription, timer } from 'rxjs';
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

  LOG_STREAM_STATUS$ = LOG_STREAM_STATUS


  testLogs = ''

  @Input('log_id')
  log_id = 'npop3'

  topic

  topics = [

  ]

  tailing = false
  streaming = true

  @ViewChild(NgScrollbar, { static: false }) scrollbarRef: NgScrollbar;

  constructor(
    private toolApiService: ToolApiService,
    private cdr: ChangeDetectorRef


  ) {

  }

  toggleTail(tailing) {


    if (tailing == true) {
      this.resumeKeepAtBottom()
    } else {
      this.pauseKeepAtBottom()
    }

  }

  toggleStreamingLogs(val, index) {

    if (val) {
      this.pause(index)
    } else {
      this.resume(val)
    }

  }

  ngOnInit(): void {

    this.getExecutors(this.log_id)

  }


  scrollSubscruption = Subscription.EMPTY
  resumeKeepAtBottom() {
    this.scrollSubscruption.unsubscribe()
    this.scrollSubscruption = interval(300).subscribe(_ => {
      this.scrollbarRef.scrollTo({ bottom: 0, duration: 150 })

    });

  }

  pauseKeepAtBottom() {
    this.scrollSubscruption.unsubscribe()
    this.scrollbarRef.scrollTo({ bottom: 0, duration: 0 })


  }



  streamLogs(index, forceRender) {


    if (this.topics[index].loaded)
      return
    this.topics[index].loading.next(true);



    this
      .toolApiService
      .getLogs(this.topics[index].log_id, 20, this.topics[index].pauseStreamer$, THROTTLE_DELAY)
      .pipe(
        delay(THROTTLE_DELAY),
        tap(d => {
          this.topics[index].initiated = true;
        }))
      .subscribe((data => {
        this.topics[index].loaded = true;
        this.topics[index].loading.next(false);


        this.topics[index].content.push(data);
        console.log('log loaded')
        this.cdr.markForCheck()
        // this.scrollbarRef.scrollToElement('#target', {duration: 300})

      }), (error => {
        console.log('error', error)


      }), () => {
        console.log('completed')
        this.topics[index].pauseStreamer$.next(LOG_STREAM_STATUS.STOP);
        this.cdr.markForCheck()




      })
  }

  collapsedChange(index, collapsed, forceRender = false) {


    if (collapsed)
      return

    // this.topics[index].collapsed = collapsed;
    this.streamLogs(index, forceRender)
  }

  onSelectionChange(index) {
    this.streamLogs(index, false)

    this.topic = this.topics[index]

    // this.resumeKeepAtBottom()

  }


  getExecutors(build_id: string) {

    this
      .toolApiService
      .getBuildExecoturs(build_id)
      .subscribe((data: []) => {


        data.forEach((val, index) => {

          let pauseStreamer = new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.RESUME)
          // if (index == 0)
          // pauseStreamer = new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.PAUSE)

          let data = {
            log_id: val['_id'],
            title: val['_id'],
            desc: 'Dummy Description',
            loaded: false,
            initiated: false,
            loading: new Subject(),
            collapsed: true,
            content: [],
            content$: new Subject(),
            pauseStreamer$: pauseStreamer


          }

          this.topics.push(data)


          this.cdr.markForCheck()
          if (index == 0) {
            this.onSelectionChange(index)

          }


        })




      })
  }


  pause(index) {
    this.topics[index].pauseStreamer$.next(LOG_STREAM_STATUS.PAUSE);
    this.cdr.markForCheck()


  }

  resume(index) {
    this.topics[index].pauseStreamer$.next(LOG_STREAM_STATUS.RESUME);
    this.cdr.markForCheck()

  }
}
