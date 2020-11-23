import { trigger, state, style, transition, animate, group } from '@angular/animations';

export const basicAnimations = [trigger('openClose', [
    // ...
    state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
    })),
    state('closed', style({
        height: '100px',
        opacity: 0,
        backgroundColor: 'green'
    })),
    
    transition('open => closed', [
        animate('3s')
    ]),
    transition('closed => open', [
        animate('3s')
    ]),


    transition('void => *', [
        style({ opacity: 0 }),
        animate('600ms')
    ]),

    transition('* => void', [
        style({ opacity: 1 }),
        animate('600ms')
    ]),
    state('void', style({ opacity: '0' })),
])

,
trigger('init', [
    transition(':enter', [
      style({opacity: 0}),
      animate(250, style({opacity: '1'})),
    ]),
    transition(':leave', [
      style({opacity: '1'}),
      animate(250, style({opacity: 0})),
    ]),
  ]),

  trigger('navitem', [
    transition(':enter', [
      style({opacity: 0}),
      animate(550, style({opacity: '1'})),
    ]),
 
  ])
,

trigger('slideInOut', [
  state('in', style({height: '*', opacity: 0})),
  transition(':leave', [
      style({height: '*', opacity: 1}),

      group([
          animate(100, style({height: 0})),
          animate('100ms ease-in-out', style({'opacity': '0'}))
      ])

  ]),
  transition(':enter', [
      style({height: '0', opacity: 0}),

      group([
          animate(200, style({height: '*'})),
          animate('200ms ease-in-out', style({'opacity': '1'}))
      ])

  ])

]
)


,

trigger('openClose', [
  state('open', style({
      height: '*',
      opacity: 1,
  })),
  state('closed', style({
      height: '0',
      opacity: 0
  })),
  transition('void => &', [
      animate('0.35s')
  ]),
  transition('* => void', [
      animate('0.35s')
  ]),
]),

]




export function slideDownFadeOutAnimation(ms = 250) {
  return [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(-10px)'
      }),
      animate(
        ms,
        style({
          opacity: 1,
          transform: 'translateY(0px)'
        })
      )
    ]),
    transition(':leave', [
      animate(
        ms,
        style({
          opacity: 0
        })
      )
    ])
  ];
}
export function fadeInAnimation(ms = 250) {
  return [
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate(
        ms,
        style({
          opacity: 1
        })
      )
    ])
  ];
}
