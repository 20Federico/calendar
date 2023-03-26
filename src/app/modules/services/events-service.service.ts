import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import eventsJSON from '../../../mock/events.mock.json'

export interface Event {
  title: string,
  description: string,
  date: Date,
  startHour: string,
  endHour: string,
  color: string,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events$ = new BehaviorSubject<Event[]>([]);
  constructor(private http: HttpClient) { }

  public init(): void {    
    this.http
      .get<Event[]>('http://localhost:3000/eventsList')
      .subscribe((events: Event[])=> {
        this.events$.next(events)
      })
  }

  public getAllEvents() {
    return this.events$;
  }

  public getEvents(startDate: string, endDate: string): Observable<Event[]> {
    return this.events$.pipe(
      map((events:Event[])=> events.filter((ev)=>new Date(ev.date)>=new Date(startDate)&&new Date(ev.date)<=new Date(endDate)))
    );
  }

  // public createEvent(): Observable<Event[]> {
  //   return this.events$.push(
  //     ((events:Event[])=> events.filter((ev)=>new Date(ev.date)>=new Date(startDate)&&new Date(ev.date)<=new Date(endDate)))
  //   );
  // }

  public createEvent(event: Event): void {
    console.log('creating');
    console.log(event);
    
    this.events$.next([...this.events$.getValue(), event])
  }

  public updateEvent(event: Event): Observable<Event[]> {
    console.log('updating');
    console.log(event.id);
    console.log(event);
    
    return this.events$;
  }

  public deleteEvent(id: number): Observable<Event[]> {
    console.log('deleting');
    console.log(id);
    
    this.events$.subscribe((event)=>{
      return event.filter((ev)=>ev.id != id);
      // this.events$.next(events.filter((ev)=>ev.id != id));
    })
    return this.events$;
  }

  

  // createEvent(event: any) {
  //   eventsJSON.eventsList.push(event);
  // }
}
