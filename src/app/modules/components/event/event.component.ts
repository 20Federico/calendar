import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { EventsService } from '../../services/events-service.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Output() delete = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  @Input() event: {
    title: string,
    description: string,
    date: any,
    startHour: string,
    endHour: string,
    color: string,
    id: number | undefined
  } = {title: '',
    description: '',
    date: '',
    startHour: '8:00',
    endHour: '9:00',
    color: '#BFBFBF',
    id: undefined
  };

  week = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
  months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
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

  saveEvent() {
    if (this.event.title == '') {
      this.event.title = '(senza titolo)'
    }
    this.onSave.emit(this.event);    
    this.close.emit(true)
  }

  deleteEvent(id: number) {
    this.delete.emit(id);
    this.close.emit(true);
  }

  closeEvent() {
    this.close.emit(true)
  }

}
