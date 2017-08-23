import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {

  public api_url: string;
  comp = {
    compareText: (a, b) => (a.toLowerCase() < b.toLowerCase()) ? -1 : (a.toLowerCase() > b.toLowerCase()) ? 1 : 0,
    compareDate: (a, b) => {
      a = new Date(a);
      b = new Date(b);
      return a - b;
    },
    compareNumber: (a, b) => a - b,
    sortAce: (a, b) => this.comp.compareText(a.ace, b.ace),
    sortCrop: (a, b) => this.comp.compareText(a.crop, b.crop),
    sortQty: (a, b) => this.comp.compareNumber(a.quantity, b.quantity),
    sortDate: (a, b) => this.comp.compareDate(a.date, b.date),
    sortExporter: (a, b) => this.comp.compareText(a.exporter, b.exporter),
    sortDueDate: (a, b) => this.comp.compareDate(a.Duedate, b.Duedate),
    sortAvailable: (a, b) => this.comp.compareNumber(a.available, b.available),
    sortStatus: (a, b) => this.comp.compareText(a.status, b.status),
  };

  constructor() {
    // this.api_url = 'localhost:5000';
    this.api_url = 'http://localhost:5000';

    // this.api_url = 'https://ezymarketplace-web.herokuapp.com';
  }

}
