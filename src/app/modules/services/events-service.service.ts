import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  title: string,
  description: string,
  date: string,
  startHour: string,
  endHour: string,
  color: string,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events = new BehaviorSubject<Event[]>([]);
  private events$ = this.events.asObservable();

  constructor(private http: HttpClient) { }

  public init(): void {    
    this.http
      .get<Event[]>('http://localhost:3000/eventsList')
      .subscribe((events: Event[])=> {
        this.events.next(events)
      })
  }

  public getAllEvents(): Observable<Event[]> {
    return this.events$;
  }

  public getEvents(startDate: string, endDate: string): Observable<Event[]> {
    this.events.pipe(
      map((events:Event[])=> events.filter((ev)=>new Date(ev.date)>=new Date(startDate)&&new Date(ev.date)<=new Date(endDate)))
    );
    return this.events$; 
  }

  public createEvent(event: Event) {
    event.date = new Date(event.date).toISOString();
    let evento: any = [] 
    Object.assign(evento, event)
    this.events.next([evento,...this.events.value]);
  }

  public updateEvent(event: Event){
    event.date = new Date(event.date).toISOString();
    let events = this.events.value;
    events = events.filter(ev=>ev.id !=event.id);
    this.events.next(events);
    let evento: any = [] 
    Object.assign(evento, event)
    this.events.next([evento,...this.events.value]);

  }

  public deleteEvent(id: number) {
    let events = this.events.value;
    events = events.filter(ev=>ev.id !=id);
    this.events.next(events);
  }
}
