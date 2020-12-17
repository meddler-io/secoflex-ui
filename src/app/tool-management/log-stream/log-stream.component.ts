import { Component, OnInit } from '@angular/core';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-log-stream',
  templateUrl: './log-stream.component.html',
  styleUrls: ['./log-stream.component.scss']
})
export class LogStreamComponent implements OnInit {
  testLogs = ''


  constructor(
    private toolApiService: ToolApiService

  ) { }

  ngOnInit(): void {
    this.streamLogs()

  }

  streamLogs() {

    this
      .toolApiService
      .getLogs('npop3', 100)
      .subscribe(data => {
        this.testLogs = data
      })
  }

}
