import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {


  tabs = [

    {
      title: 'Request_',
      route: [{
        outlets: {
          
          sub_comp: ['logs1']
        }
      }],
      responsive: true,

    }, {
      title: 'Logs',
      route: [{
        outlets: {
          sub_comp: ['logs2'],          
        }
      }],
      responsive: true,

    },
    {
      title: 'Result',
      route: [{
        outlets: {
          sub_comp: ['logs3']

        }
      }],
      responsive: true,

    },
    {
      title: 'Settings',
      route: [{
        outlets: {
          sub_comp: ['logs4']

        }
      }],
      responsive: true,

    },
    {
      title: 'Scratchpad',
      route: [{
        outlets: {
          sub_comp: ['logs6']

        }
      }],
      responsive: true,

    },


  ];

  constructor() { }

  ngOnInit(): void {
  }

}
