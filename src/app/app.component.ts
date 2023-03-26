import { Component, OnInit } from '@angular/core';
import { EventsService } from './modules/services/events-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Calendar';

  constructor(private eventsService: EventsService) {}

  ngOnInit () {
    this.eventsService.init();
  }
}
