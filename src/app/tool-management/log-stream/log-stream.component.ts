import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { BehaviorSubject, interval, pipe, Subject, Subscription, timer } from 'rxjs';
import { delay, map, repeat, repeatWhen, retry, retryWhen, switchMap, takeUntil, tap } from 'rxjs/operators';
import { THROTTLE_DELAY } from 'src/app/reusable-components/common/shared/Constants';
import { LOG_STREAM_STATUS, ToolApiService } from '../tool-api.service';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { StateSyncService } from 'src/app/job-management/state-sync.service';



export enum LogSource {
  IMAGE_BUILDER = 'image_builder',
  JOB = 'job'
}


@Component({
  selector: 'app-log-stream',
  templateUrl: './log-stream.component.html',
  styleUrls: ['./log-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None

})
export class LogStreamComponent implements OnInit, OnDestroy {



  STATUS

  @Input('logsource') logSource: LogSource = LogSource.IMAGE_BUILDER
  @Input('close') close

  LOG_STREAM_STATUS$ = LOG_STREAM_STATUS


  testLogs = ''

  @Input('deep_link') deep_link = false


  @Input('log_id')
  log_id = 'npop3'

  topic = undefined

  topics_ = [

  ]

  build_list = []

  tailing = true
  streaming = true

  @ViewChild(NgScrollbar, { static: false }) scrollbarRef: NgScrollbar;


  resultMetaData 

  constructor(
    private toolApiService: ToolApiService,
    private cdr: ChangeDetectorRef,
    private drawerMngr: DrawerService,
    private stateSyncService: StateSyncService,




  ) {

  }
  ngOnDestroy(): void {

    console.log('unsubscribe')
    this.topic.subscription.unsubscribe()
    this.topic.pauseStreamer$.next(LOG_STREAM_STATUS.STOP);
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

    console.log('logsource', this.logSource)
    switch (this.logSource) {

      case LogSource.IMAGE_BUILDER:

        return this
          .toolApiService
          .getBuildExecutorStatus(id)

      case LogSource.JOB:

        return this
          .toolApiService
          .getJobStatus(id)

      default:
        return this
          .toolApiService
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
          }

          this.STATUS = _['exec_status']
          console.log('tap_1', _)
        }),
        delay(1000),
        repeat(),
        takeUntil(enough$),

      )
      .subscribe(_ => {

      })
  }

  ngOnInit(): void {

    if (this.deep_link == true)
      this.deepLinkLoadLog()
    else{
      this.getExecutors(this.log_id)

    


    }


    this.resultMetaData =    this.stateSyncService.jobApiService.getJobResult(this.log_id).pipe(map(( _:[] )=>{
        
      console.log('resultMetaData', _.length)
      return _.length > 0
    }))
  }

  deepLinkLoadLog() {
    console.log('deep_link')


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

    console.log(this.topic)
    this.topic.loading.next(true);



    this.topic.subscription = this
      .toolApiService
      .getLogs(this.topic.log_id, 10, this.topic.pauseStreamer$, THROTTLE_DELAY)
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


  getExecutors(build_id: string) {

    this
      .toolApiService
      .getBuildExecoturs(build_id)
      .subscribe((data: []) => {


        data.forEach((val, index) => {

          // let pauseStreamer = new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.RESUME)
          // if (index == 0)
          // pauseStreamer = new BehaviorSubject<LOG_STREAM_STATUS>(LOG_STREAM_STATUS.PAUSE)

          // let data = {
          //   log_id: val['_id'],
          //   title: val['_id'],
          //   desc: 'Dummy Description',
          //   loaded: false,
          //   initiated: false,
          //   loading: new Subject(),
          //   collapsed: true,
          //   content: [],
          //   content$: new Subject(),
          //   pauseStreamer$: pauseStreamer,
          //   subscription: Subscription.EMPTY


          // }

          this.build_list.push({
            log_id: val['_id'],
            title: val['_id'],
            exec_status: val['exec_status'],

            desc: 'Dummy Description',
            loaded: false,
            initiated: false,
            collapsed: true,

          })




          this.cdr.markForCheck()
          if (index == 0) {
            this.onSelectionChange(index)

          }


        })




      })
  }


  pause(index) {
    this.topic.pauseStreamer$.next(LOG_STREAM_STATUS.PAUSE);
    this.cdr.markForCheck()


  }

  resume(index) {
    this.topic.pauseStreamer$.next(LOG_STREAM_STATUS.RESUME);
    this.cdr.markForCheck()

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
}
