import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../_providers/global.service';
import {AddrequestService} from "../../_providers/addrequest.service";

// interface Post {
//   exporter: string;
//   product: string;
//   quantity: number;
//   dueDate: Date;
//   crop: any;
//   time:any;
// }
declare var swal: any;

interface AcePost {
  ace: string;
  crop: string;
  quantity: number;
  date: Date;
  time:any;
}

@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.scss']
})
export class ClosedComponent implements OnInit {

  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: { date: Date, mode: string }[];
  public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
    'shortDate'];
  public format: string = this.formats[0];
  public dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1
  };
  private opened = false;
  request: FormGroup;

  public maxSize = 5;
  public bigTotalItems = 0;
  public bigCurrentPage = 1;
  public numPages = 0;
  public itemsPerPage = 5;

  private posts: AcePost[];
  private temp: AcePost[];
  private tempFilter: AcePost[];
  private pageData: AcePost[];

  private aT = true;
  private cT;
  private qT;
  private dT;


  private sort = {
    ace: () => {
      if (this.aT === undefined) {
        this.sort.init();
      }
      this.cT = undefined;
      this.qT = undefined;
      this.dT = undefined;
      this.aT = (this.aT === undefined || this.aT === false);
      this.posts = this.aT ? this.posts.sort(this.global.comp.sortAce) : this.posts.reverse();
      this.pageChanged({page: this.bigCurrentPage});
    },
    crop: () => {
      if (this.cT === undefined) {
        this.sort.init();
      }
      this.cT = (this.cT === undefined || this.cT === false);
      this.qT = undefined;
      this.dT = undefined;
      this.aT = undefined;
      this.posts = this.cT ? this.posts.sort(this.global.comp.sortCrop) : this.posts.reverse();
      this.pageChanged({page: this.bigCurrentPage});
    },
    quantity: () => {
      if (this.qT === undefined) {
        this.sort.init();
      }
      this.cT = undefined;
      this.qT = (this.qT === undefined || this.qT === false);
      this.dT = undefined;
      this.aT = undefined;
      this.posts = this.qT ? this.posts.sort(this.global.comp.sortQty) : this.posts.reverse();
      this.pageChanged({page: this.bigCurrentPage});
    },
    date: () => {
      if (this.dT === undefined) {
        this.sort.init();
      }
      this.cT = undefined;
      this.qT = undefined;
      this.dT = (this.dT === undefined || this.dT === false);
      this.aT = undefined;
      this.posts = this.qT ? this.posts.sort(this.global.comp.sortDate) : this.posts.reverse();
      this.pageChanged({page: this.bigCurrentPage});
    },
    init: () => {
      this.posts = this.temp;
    }
  };
  private filter = {
    ace: (ev: any) => {
      this.sort.init();

      if (ev && ev.trim() !== '') {
        this.posts = this.posts.filter(post => post.ace.toLowerCase().indexOf(ev.toLowerCase()) > -1);
      }
      this.bigTotalItems = this.posts.length;
      this.pageChanged({page: this.bigCurrentPage});
    },
    crop: (ev: any) => {
      this.sort.init();

      if (ev && ev.trim() !== '') {
        this.posts = this.posts.filter(post => post.crop.toLowerCase().indexOf(ev.toLowerCase()) > -1);
      }
      this.bigTotalItems = this.posts.length;
      this.pageChanged({page: this.bigCurrentPage});
    },
    quantity: (ev: any) => {
      this.sort.init();

      if (ev && ev.trim() !== '') {
        this.posts = this.posts.filter(post => post.quantity.toString().toLowerCase().indexOf(ev.toLowerCase()) > -1);
      }
      this.bigTotalItems = this.posts.length;
      this.pageChanged({page: this.bigCurrentPage});
    },
    date: (ev: any) => {
      this.sort.init();

      if (ev && ev.trim() !== '') {
        this.posts = this.posts.filter(post => post.date.toString().toLowerCase().indexOf(ev.toLowerCase()) > -1);
      }
      this.bigTotalItems = this.posts.length;
      this.pageChanged({page: this.bigCurrentPage});
    },
  };

//---------------------------------------------------------------------calling the delete method
  deletePosts(row:any) {
    this.diag.deleteRequest(row).subscribe(
      data => {
        this.posts.splice(this.posts.indexOf(row), 1);
        if (data) {
          swal("Done!", "Entry deleted!", "success");
        }
        else swal("Failed!", "Delete failed!", "success");
      });
  }

  constructor(private fb: FormBuilder, private global: GlobalService,
              private diag: AddrequestService,
              private ref: ChangeDetectorRef) {
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];
  }

  ngOnInit() {

    this.diag.getClosedOrders().subscribe(res => {
      console.log(res);
      this.posts = res;
    });

    this.request = this.fb.group({
      'exporter': ['', Validators.compose([Validators.required])],
      'product': ['', Validators.compose([Validators.required])],
      'quantity': ['', Validators.compose([Validators.pattern(/[0-9]/), Validators.required])],
      'dueDate': ['', Validators.compose([Validators.required])]
    });

    this.temp = this.posts;
    this.posts = this.posts.sort(this.global.comp.sortAce);
    this.bigTotalItems = this.posts.length;
    this.pageChanged({page: 1});
  }

  public pageChanged({page}): void {
    this.pageData = this.posts.filter((value, index) => {
      if (index >= this.maxSize * (page - 1) && index < page * this.maxSize) {
        return value;
      }
    });
  }



  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public today(): void {
    this.dt = new Date();
  }

  public d20090824(): void {
    this.dt = moment('2009-08-24', 'YYYY-MM-DD')
      .toDate();
  }

  public disableTomorrow(): void {
    this.dateDisabled = [{date: this.tomorrow, mode: 'day'}];
  }

  // todo: implement custom class cases
  public getDayClass(date: any, mode: string): string {
    if (mode === 'day') {
      const dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (const event of this.events) {
        const currentDay = new Date(event.date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return event.status;
        }
      }
    }

    return '';
  }

  public disabled(date: Date, mode: string): boolean {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  }

  public open(): void {
    this.opened = !this.opened;
  }

  public clear(): void {
    this.dt = void 0;
    this.dateDisabled = undefined;
  }

  public toggleMin(): void {
    this.dt = new Date(this.minDate.valueOf());
  }

}
