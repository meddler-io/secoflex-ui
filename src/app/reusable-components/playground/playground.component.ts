import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },

    
  ];


}
