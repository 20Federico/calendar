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

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      console.log('initmese');
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
    let days = [];

    let startDate = new Date(date.getFullYear(), date.getMonth(), 1+date.getDate()-date.getDay())
    let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+7-date.getDay())
    while (startDate <= endDate) {
      days.push(
        {
          label: week[new Date(startDate).getDay()] + ' ' + new Date(startDate).getDate() + '/'+new Date(startDate).getMonth(),
          date: new Date(startDate),
        }  
      );
      startDate.setDate(startDate.getDate() + 1);
    }
    this.days = days;
    console.log(this.days);
    
  }
}
