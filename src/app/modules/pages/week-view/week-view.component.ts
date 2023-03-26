import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../services/events-service.service';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss']
})
export class WeekViewComponent implements OnInit {

  startDate: string = '';
  days: { label: string; date: Date; events:any }[] = [];
  eventOpen = false;
  event: {
    title: string,
    description: string,
    date: Date,
    startHour: string,
    endHour: string,
    color: string,
    id: number | undefined
  } = {
    title: '',
    description: '',
    date: new Date(),
    startHour: '08:00',
    endHour: '09:00',
    color: '#BFBFBF',
    id: undefined
  }
  eventsList: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.startDate = params['startDate'];
      this.createGrid();
    })
  }

  createGrid() {
    const week = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']

    let date = new Date(+this.startDate.split('-')[2], +this.startDate.split('-')[1], +this.startDate.split('-')[0]);
    let days = [];

    let startDate = new Date(date.getFullYear(), date.getMonth(), 1+date.getDate()-(date.getDay()== 0? 7: date.getDay()))
    let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+7-(date.getDay()== 0? 7: date.getDay()))
    while (startDate <= endDate) {
      days.push(
        {
          label: week[new Date(startDate).getDay()] + ' ' + new Date(startDate).getDate(),
          date: new Date(startDate),
          events: []
        }  
      );
      startDate.setDate(startDate.getDate() + 1);
    }
    this.days = days;
    
    this.getEvents(this.days[0].date.toISOString(), this.days[this.days.length-1].date.toISOString());
  }

  getEvents(startDate: string, endDate: string) {
    // mock che restituisce array di oggetti evento
    this.eventsList = this.eventsService.getEvents(startDate, endDate);

    //display events
    for (let i = 0; i < this.days.length; i++) {
      const day = this.days[i];
      for (let r = 0; r < this.eventsList.length; r++) {
        const event = this.eventsList[r];
        if (event.date == day.date.toISOString()) {
          day.events.push(event)
        }
      }
    }
  }

  getCurrentDay(item: any) {
    const today = new Date(new Date().setHours(0,0,0,0)).toISOString();
    let itemDate = new Date(item.date).toISOString();
    return today == itemDate;
  }

  openEvent(date: Date, hour:number, event?:any) {
    this.eventOpen = false;

    this.event.title = '',
    this.event.description = '',
    this.event.date = new Date(date);
    this.event.startHour = (''+hour).padStart(2,'0')+':00';
    this.event.endHour = (1+hour+'').padStart(2,'0')+':00';
    this.event.color = '#BFBFBF';
    this.event.id = undefined;
    
    if (event) {
      this.event.title = event.title;
      this.event.description = event.description;
      this.event.date = new Date(event.date);
      this.event.startHour = event.startHour;
      this.event.endHour = event.endHour;
      this.event.color = event.color;
      this.event.id = event.id;
    }
    this.eventOpen = true;
  }

  calcEventHeight(startHour: string, endHour:string) {
    let minutes = (+endHour.split(':')[0] - +startHour.split(':')[0])*60 - (+startHour.split(':')[1]) + +endHour.split(':')[1];
    let height = minutes / 60*50 + 'px';
    return height;
  }
}
