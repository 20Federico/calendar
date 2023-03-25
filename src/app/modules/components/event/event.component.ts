import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() event: {
    title: string,
    description: string,
    date: Date,
    startHour: string,
    endHour: string,
    color: string
  } = {title: '',
    description: '',
    date: new Date(),
    startHour: '8:00',
    endHour: '9:00',
    color: '#BFBFBF'};

  week = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
  months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  constructor() { }

  ngOnInit(): void {
    console.log('event component start');
    
  }

  generateHourList() {
    const hourList = [];
    for (let i = 0; i < 24; i++) {
      hourList.push(
        (''+i).padStart(2,'0') + ':00'
      )
      hourList.push(
        (''+i).padStart(2,'0') + ':15'
      )
      hourList.push(
        (''+i).padStart(2,'0') + ':30'
      )
      hourList.push(
        (''+i).padStart(2,'0') + ':45'
      )
    }
    return hourList;
  }

  checkDates() {
    if (this.event.startHour && this.event.endHour) {
      let start = [];
      let end = [];
      start = this.event.startHour?.split(':');
      end = this.event.endHour?.split(':');
        if (+start[0] > +end[0] || (+start[0] == +end[0] && +start[1] > +end[1])) {
          setTimeout(()=>this.event.startHour = this.event.endHour, 0);
        }
    } 
  }

}
