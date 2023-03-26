import { ActivatedRoute, Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
  months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  currentDate = new Date();
  monthSelected = this.months[this.currentDate.getMonth()] + ' ' + this.currentDate.getFullYear();
  
  startDate = new Date();
  viewSelected = 'Mese';
  currentRoute = '';

  constructor(
    private router: Router,
  ) {
      this.currentRoute = "";
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url; 
            const view = this.currentRoute?.split('/')[1];
            if (view) {
              this.viewSelected = this.currentRoute?.split('/')[1] == 'month' ? 'Mese' : this.currentRoute?.split('/')[1] == 'week' ? 'Settimana' : 'Giorno';  
            }
            const date = this.currentRoute?.split('/')[2];
            const dateSplit = date?.split('-');
            if (date) {
              this.startDate = new Date(dateSplit? +dateSplit[2] : 2025, dateSplit ? +dateSplit[1]:1, dateSplit? +dateSplit[0]: 1);
            }
        }
    });
  }

  ngOnInit(): void {
  }

  getDateSelected() {
    return this.monthSelected = this.months[this.startDate.getMonth()] + ' ' + this.startDate.getFullYear();
  }

  changeView(view: string) {
    this.viewSelected = view;
  }

  goToToday() {
    this.startDate = new Date();
    let view = this.viewSelected == 'Mese' ? 'month' : this.viewSelected == 'Settimana' ? 'week' : 'day'; 

    this.getDateSelected();
    this.router.navigate([view, this.startDate.getDate() + '-' + this.startDate.getMonth() + '-' + this.startDate.getFullYear()]);

  }

  goToPreviousNext(next: boolean) {
    if (this.viewSelected == 'Mese') {
      if (next) {
        this.startDate = new Date(this.startDate.getFullYear(), (this.startDate.getMonth()+1), this.startDate.getDate());
      } else {
        this.startDate = new Date(this.startDate.getFullYear(), (this.startDate.getMonth()-1), this.startDate.getDate());
      }
      this.router.navigate(['month', this.startDate.getDate() + '-' + this.startDate.getMonth() + '-' + this.startDate.getFullYear()]);

    }
    if (this.viewSelected == 'Settimana') {
      if (next) {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate()+7);
      } else {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate()-7);
      }
      this.router.navigate(['week', this.startDate.getDate() + '-' + this.startDate.getMonth() + '-' + this.startDate.getFullYear()]);
    }
    if (this.viewSelected == 'Giorno') {
      if (next) {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate()+1);
      } else {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate()-1);
      }
      this.router.navigate(['day', this.startDate.getDate() + '-' + this.startDate.getMonth() + '-' + this.startDate.getFullYear()]);
    }
  }

  getPrevNextLabel(next: boolean): string {
    let label = '';
    if (this.viewSelected === 'Mese') {
      if (next) {
        label = 'Mese successivo'
      } else {
        label = 'Mese precedente'
      }   
    }
    if (this.viewSelected === 'Settimana') {
      if (next) {
        label = 'Settimana successiva'
      } else {
        label = 'Settimana precedente'
      }
    }
    if (this.viewSelected === 'Giorno') {
      if (next) {
        label = 'Giorno successivo'
      } else {
        label = 'Giorno precedente'
      }  
    }

    return label;
  } 

  changeDate(event: any) {
    let view = this.viewSelected == 'Mese' ? 'month' : this.viewSelected == 'Settimana' ? 'week' : 'day'; 
    this.router.navigate([view, event?.value?.getDate() + '-' + event?.value?.getMonth() + '-' + event?.value?.getFullYear()]);
  }

}
