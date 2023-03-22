import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit {

  startDate: string = '';

  constructor(
    private route: ActivatedRoute
  ) {
  }

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
