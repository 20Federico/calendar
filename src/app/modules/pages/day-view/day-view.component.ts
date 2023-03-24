import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent implements OnInit {

  startDate: string = '';
  dateSelected: any= {};
  eventOpen = false;
  event: {
    title: string,
    description: string,
    date: Date,
    startHour: string,
    endHour: string,
    color: string
  } = {
    title: '',
    description: '',
    date: new Date(),
    startHour: '08:00',
    endHour: '09:00',
    color: '#BFBFBF'
  };

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.startDate = params['startDate'];
      this.createGrid();
      this.getEvents();
    })
  }

  getEvents() {

  }

  createGrid() {
    const week = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']

    let date = new Date(+this.startDate.split('-')[2], +this.startDate.split('-')[1], +this.startDate.split('-')[0]);

    this.dateSelected = 
    {
      label: week[new Date(date).getDay()] + ' ' + new Date(date).getDate(),
      date: new Date(date)
    }  
  }

  getCurrentDay() {
    const today = new Date(new Date().setHours(0,0,0,0)).toISOString();
    let itemDate = new Date(this.dateSelected.date).toISOString();
    return today == itemDate;
  }

  openEvent(date: Date, hour:number) {
    this.event.date = new Date(date);
    this.event.startHour = (''+hour).padStart(2,'0')+':00';
    this.event.endHour = (1+hour+'').padStart(2,'0')+':00';
    this.eventOpen = !this.eventOpen;
  }
}
