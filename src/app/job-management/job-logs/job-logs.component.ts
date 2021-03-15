import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { BehaviorSubject, interval, Subject, Subscription } from 'rxjs';
import { delay, first, repeat, takeUntil, tap } from 'rxjs/operators';
import { THROTTLE_DELAY } from 'src/app/reusable-components/common/shared/Constants';
import { JobApiService, LogSource, LOG_STREAM_STATUS } from '../job-api.service';
import { SidePannelState, StateSyncService } from '../state-sync.service';

@Component({
  selector: 'app-job-logs',
  templateUrl: './job-logs.component.html',
  styleUrls: ['./job-logs.component.scss']
})
export class JobLogsComponent implements OnInit {



  tabs = [

    {
      title: 'Request',
      route: [{
        outlets: {
          view: ['logs']
        }
      }],
      responsive: true,

    }, {
      title: 'Logs',
      route: [{
        outlets: {
          view: ['logs']
        }
      }],
      responsive: true,

    },
    {
      title: 'Result',
      route: [{
        outlets: {
          view: ['logs']
        }
      }],
      responsive: true,

    },
    {
      title: 'Settings',
      route: [{
        outlets: {
          view: ['logs']
        }
      }],
      responsive: true,

    },
    {
      title: 'Scratchpad',
      route: [{
        outlets: {
          view: ['logs']
        }
      }],
      responsive: true,

    },


  ];

  STATUS

  @Input('logsource') logSource: LogSource = LogSource.JOB
  @Input('close') close

  LOG_STREAM_STATUS$ = LOG_STREAM_STATUS


  testLogs = ''

  @Input('deep_link') deep_link = false


  @Input('log_id')
  log_id

  topic = undefined

  topics_ = [

  ]

  build_list = []

  tailing = true
  streaming = true

  @ViewChild(NgScrollbar, { static: false }) scrollbarRef: NgScrollbar;

  constructor(
    private jobApiService: JobApiService,
    private cdr: ChangeDetectorRef,
    private stateSyncService: StateSyncService,
    private activatedRoute: ActivatedRoute




  ) {

  }
  ngOnDestroy(): void {

    this.unsubscribeAll()

  }

  unsubscribeAll() {

    if (this.topic) {

      this.topic.subscription.unsubscribe()
      this.topic.pauseStreamer$.next(LOG_STREAM_STATUS.STOP);
    }
    this.pollJobStatusSubscription$.unsubscribe()
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


  pollJobStatusSubscription$ = Subscription.EMPTY


  getSource(id) {


    switch (this.logSource) {

      case LogSource.IMAGE_BUILDER:

        return this
          .jobApiService
          .getBuildExecutorStatus(id)

      case LogSource.JOB:

        return this
          .jobApiService
          .getJobStatus(id)

      default:
        return this
          .jobApiService
          .getBuildExecutorStatus(id)
    }
  }

  pollJobStatus(id: string) {
    let enough$ = new Subject()


    this.pollJobStatusSubscription$.unsubscribe()

    this.pollJobStatusSubscription$ = this.getSource(id)
      .pipe(
        tap(_ => {
          if (_['poll_again'] == false) {
            enough$.next('')
            this.tailing = false
          }

          this.STATUS = _['exec_status']

        }),
        delay(1000),
        repeat(),
        takeUntil(enough$),

      )
      .subscribe(_ => {

      })
  }

  ngOnInit(): void {


    this
      .stateSyncService
      .SelectedJobId
      .subscribe(jobid => {

        this.log_id = jobid
        this.deepLinkLoadLog()


      })




  }

  deepLinkLoadLog() {

    this.unsubscribeAll()



    this.topic = {

      log_id: this.log_id,
      exec_status: 'SUCCESS',
      title: `val['_id']`,
      desc: 'Dummy Description',
      loaded: false,
      initiated: false,
      collapsed: true,
      loading: new Subject(),
      content: [],
      content$: new Subject(),
      pauseStreamer$: new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.RESUME),
      subscription: Subscription.EMPTY


    }

    this.streamLogs(0, true)

    this.pollJobStatus(this.topic.log_id)


    // this.topics_ = [this.topic]

    // this.onSelectionChange(0)


  }


  scrollSubscruption = Subscription.EMPTY
  resumeKeepAtBottom() {
    this.scrollSubscruption.unsubscribe()
    this.scrollSubscruption = interval(300).subscribe(_ => {
      return
      this.scrollbarRef.scrollTo({ bottom: 0, duration: 150 })

    });

  }

  pauseKeepAtBottom() {
    this.scrollSubscruption.unsubscribe()
    this.scrollbarRef.scrollTo({ bottom: 0, duration: 0 })


  }



  streamLogs(index, forceRender) {


    if (this.topic)
      if (this.topic.loaded)
        return


    this.topic.loading.next(true);



    this.topic.subscription = this
      .jobApiService
      .getLogs(this.topic.log_id, 200, this.topic.pauseStreamer$, THROTTLE_DELAY)
      .pipe(
        tap(d => {
          this.topic.initiated = true;
        }))
      .subscribe(((data: string) => {
        this.topic.loaded = true;
        this.topic.loading.next(false);


        if (data == null || data == undefined || data.length == 0)
          return

        this.topic.content.push(data);
        console.log('log loaded')
        this.cdr.markForCheck()
        // this.scrollbarRef.scrollToElement('#target', {duration: 300})

      }), (error => {
        console.log('error', error)


      }), () => {
        console.log('completed')

        this.topic.pauseStreamer$.next(LOG_STREAM_STATUS.STOP);
        this.cdr.markForCheck()




      })
  }

  getStatus() {

  }

  collapsedChange(index, collapsed, forceRender = false) {


    if (collapsed)
      return

    // this.topics[index].collapsed = collapsed;
    this.streamLogs(index, forceRender)
  }

  onSelectionChange(index) {


    if (this.topic) {
      console.log('onSelectioChange', index)

      this.topic.subscription.unsubscribe()
      this.topic.pauseStreamer$.next(LOG_STREAM_STATUS.STOP);
      this.topic.content$.complete()

    }

    // if (index == 0)
    // pauseStreamer = new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.PAUSE)

    this.topic = {

      log_id: this.build_list[index].log_id,
      exec_status: this.build_list[index].exec_status,
      title: `val['_id']`,
      desc: 'Dummy Description',
      loaded: false,
      initiated: false,
      collapsed: true,
      loading: new Subject(),
      content: [],
      content$: new Subject(),
      pauseStreamer$: new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.RESUME),
      subscription: Subscription.EMPTY


    }
    this.streamLogs(index, false)


    this.pollJobStatus(this.topic.log_id)

    console.log('this.topic', this.topic)
    // this.topic = this.topics[index]

    // this.resumeKeepAtBottom()

  }





  pause(index) {
    this.topic.pauseStreamer$.next(LOG_STREAM_STATUS.PAUSE);
    this.cdr.markForCheck()


  }

  resume(index) {
    this.topic.pauseStreamer$.next(LOG_STREAM_STATUS.RESUME);
    this.cdr.markForCheck()

  }


  toggle() {

    this.stateSyncService.toggle()
  }
}
