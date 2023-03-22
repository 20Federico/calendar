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

    this.dateSelected = 
    {
      label: week[new Date(date).getDay()] + ' ' + new Date(date).getDate() + '/'+new Date(date).getMonth(),
      date: new Date(date)
    }  
    console.log(this.dateSelected);
  }

}
