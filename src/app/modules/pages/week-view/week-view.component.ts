import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss']
})
export class WeekViewComponent implements OnInit {

  startDate: string = '';
  days: { label: string; date: Date; }[] = [];
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
  }

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
    const week = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']

    let date = new Date(+this.startDate.split('-')[2], +this.startDate.split('-')[1], +this.startDate.split('-')[0]);
    let days = [];

    let startDate = new Date(date.getFullYear(), date.getMonth(), 1+date.getDate()-date.getDay())
    let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+7-date.getDay())
    while (startDate <= endDate) {
      days.push(
        {
          label: week[new Date(startDate).getDay()] + ' ' + new Date(startDate).getDate(),
          date: new Date(startDate),
        }  
      );
      startDate.setDate(startDate.getDate() + 1);
    }
    this.days = days;
    
  }

  getCurrentDay(item: any) {
    const today = new Date(new Date().setHours(0,0,0,0)).toISOString();
    let itemDate = new Date(item.date).toISOString();
    return today == itemDate;
  }

  openEvent(date: Date, hour:number) {
    this.event.date = new Date(date);
    this.event.startHour = (''+hour).padStart(2,'0')+':00';
    this.event.endHour = (1+hour+'').padStart(2,'0')+':00';
    this.eventOpen = !this.eventOpen;
  }
}
