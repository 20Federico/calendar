import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events-service.service';

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
  eventsList: any;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.startDate = params['startDate'];
      this.createGrid();
    })
  }

  createGrid() {
    const week = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']

    let date = new Date(+this.startDate.split('-')[2], +this.startDate.split('-')[1], +this.startDate.split('-')[0]);

    this.dateSelected = 
    {
      label: week[new Date(date).getDay()] + ' ' + new Date(date).getDate(),
      date: new Date(date),
      events: []
    }  

    this.getEvents(this.dateSelected.date.toISOString(), this.dateSelected.date.toISOString());
  }
  
  getEvents(startDate: string, endDate: string) {
    // mock che restituisce array di oggetti evento
    this.eventsList = this.eventsService.getEvents(startDate, endDate);

    //display events
    for (let r = 0; r < this.eventsList.length; r++) {
      const event = this.eventsList[r];
      
      this.dateSelected.events.push(event)
    }
  }

  getCurrentDay() {
    const today = new Date(new Date().setHours(0,0,0,0)).toISOString();
    let itemDate = new Date(this.dateSelected.date).toISOString();
    return today == itemDate;
  }

  openEvent(date: Date, hour:number) {    
    this.event.title = '',
    this.event.description = '',
    this.event.date = new Date(date);
    console.log(this.event.date);
    this.event.startHour = (''+hour).padStart(2,'0')+':00';
    this.event.endHour = (1+hour+'').padStart(2,'0')+':00';
    this.event.color = '#BFBFBF';
    this.eventOpen = !this.eventOpen;
    console.log(this.eventOpen);
  }

  calcEventHeight(startHour: string, endHour:string) {
    let minutes = (+endHour.split(':')[0] - +startHour.split(':')[0])*60 + (+endHour.split(':')[1] - +startHour.split(':')[1]);
    let height = 50*minutes / 60 + 'px';
    return height;
  }
}
