import { Injectable } from '@angular/core';
import eventsJSON from '../../../mock/events.mock.json'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  getEvents(startDate: string, endDate: string) {
    const events = [];
    for (let i = 0; i < eventsJSON.eventsList.length; i++) {
      const ev = eventsJSON.eventsList[i];
      if (new Date(ev.date)>=new Date(startDate) && new Date(ev.date)<=new Date(endDate)) {
        events.push(ev);
      }
    }
    return events;
  }

  createEvent(event: any) {
    eventsJSON.eventsList.push(event);
  }
}
