import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit {

  startDate: string = '';
  days: any = [];
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
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.startDate = params['startDate'];

      this.createGrid();
      this.getEvents();
    })
  }

  getCurrentDay(item: any) {
    const today = new Date(new Date().setHours(0,0,0,0)).toISOString();
    let itemDate = new Date(item.date).toISOString();
    return today == itemDate;
  }

  createGrid() {
    const week = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

    let month = +this.startDate.split('-')[1];

    let date = new Date(+this.startDate.split('-')[2], +this.startDate.split('-')[1], 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(
        {
          label: week[new Date(date).getDay()].slice(0, 3) + ' ' + new Date(date).getDate(),
          date: new Date(date),
          disabled: false,
        }  
      );
      date.setDate(date.getDate() + 1);
    }
    this.days = days;

    let firstDay = new Date(+this.startDate.split('-')[2], +this.startDate.split('-')[1], 1)
    let firstMonday = firstDay.getDay() == 1 ? undefined : new Date(+this.startDate.split('-')[2], +this.startDate.split('-')[1], 2-(firstDay.getDay()==0 ? 7 : firstDay.getDay()))

    let lastDay = new Date( this.days[this.days.length-1].date);
    let lastSunday = lastDay.getDay() == 0 ? undefined : new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate()+7-lastDay.getDay())

    if (firstMonday) {
      const beforeDay  = [];
      while (firstMonday < firstDay) {
        beforeDay.push(
          {
            label: week[new Date(firstMonday).getDay()].slice(0, 3) + ' ' + new Date(firstMonday).getDate(),
            date: new Date(firstMonday),
            disabled: true
          }  
        )
        firstMonday = new Date(firstMonday.getFullYear(), firstMonday.getMonth(), firstMonday.getDate()+1);
      }
      this.days = beforeDay.concat(this.days);
    }

    if (lastSunday) {
      const afterDays = [];
      while (lastDay < lastSunday) {
        lastDay = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate()+1);
        afterDays.push(
          {
            label: week[new Date(lastDay).getDay()].slice(0, 3) + ' ' + new Date(lastDay).getDate(),
            date: new Date(lastDay),
            disabled: true
          }  
        )
      }      
      this.days = this.days.concat(afterDays);
    }
  }

  
  getEvents() {
    // mock che restituisce array di oggetti evento
    //display events
  }

  openEvent(date: Date) {
    this.event.date = new Date(date);
    this.eventOpen = !this.eventOpen;
  }
}
