import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent implements OnInit {

  startDate: string = '';

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
    
  }

}
