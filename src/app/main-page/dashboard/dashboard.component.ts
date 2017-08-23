import {ChangeDetectorRef, Component, OnInit, ElementRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../_providers/global.service';
import {Http} from "@angular/http";
import {AddrequestService} from "../../_providers/addrequest.service";

interface Users {
  name: string;
  ace: string;
  district: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: any = 0;
  approved: any = 0;
  closed: any = 0;
  notifications: any = 0;
  month: any = [];
  mon: any = [];
  crops_data:any = [];
  bid_status:any = [];

  caltulatePosts(posts: any) {
    this.posts += posts;
    return this.posts;
  }

  ///////////////////////////////////////////////////
  public lineChartData: Array<any> = [
    {data: [965, 469, 870, 181, 966, 765, 160], label: 'Series A'}
  ];

  public lineChartLabels: Array<any> = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  public lineChartOptions: any = {
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      // The following will affect the vertical lines (xAxe) of your dataset
      xAxes: [{
        gridLines: {
          // You can change the color, the dash effect, the main axe color, etc.
          borderDash: [0.5, 1],
          color: '#348632'
        }
      }],

      // And this will affect the horizontal lines (yAxe) of your dataset
      yAxes: [{
        gridLines: {
          borderDash: [0.5, 1],
          color: '#348632'
        }
      }]
    },
    responsive: true
  };
  // -----------------------------------------------------------------------Doughnut chart
  public doughnutChartLabels:string[] = ['New bids','Accepted', 'Rejected'];
  public doughnutChartData:number[] = this.bid_status;
  public doughnutChartType:string = 'doughnut';

  //--------------------------------------------- pie chart ----------------------------------

  public pieChartLabels: string[] = ['Beans', 'Maize', 'Matooke', 'Sorghum', 'Simsim', 'Ground nuts', 'Others'];
  public pieChartData: number[] = this.crops_data;
  public pieChartType = 'pie';

  public users: Users[] = [
    {name: 'Izzo', ace: 'MK', district: 'Busia'},
    {name: 'Izzo1', ace: 'MK', district: 'Busia'},
    {name: 'Izzo2', ace: 'MK', district: 'Busia'},
    {name: 'Izzo3', ace: 'MK', district: 'Busia'},
    {name: 'Izzo4', ace: 'MK', district: 'Busia'},
    {name: 'Izzo5', ace: 'MK', district: 'Busia'},
    {name: 'Izzo6', ace: 'MK', district: 'Busia'}
  ];

  public countPosts(posts) {

  }

  constructor(private global: GlobalService,
              private diag: AddrequestService,
              public http: Http,
              private el: ElementRef,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.diag.getPosts().subscribe(res => {
      this.posts = res.length;
      // console.log(res);
    });

    this.diag.getOrders().subscribe(res => {
      this.approved = res.length;
      // console.log(res);
    });

    this.diag.getClosedOrders().subscribe(res => {
      this.closed = res.length;
      // console.log(res);
    });

    this.diag.getFeedChart('rejected').subscribe(res => {
      this.mon.push(res.jan);
      this.mon.push(res.feb);
      this.mon.push(res.mar);
      this.mon.push(res.apr);
      this.mon.push(res.may);
      this.mon.push(res.jun);
      this.mon.push(res.jul);
      this.mon.push(res.aug);
      this.mon.push(res.sep);
      this.mon.push(res.oct);
      this.mon.push(res.nov);
      this.mon.push(res.dec);

      console.log(this.mon);

      this.diag.getFeedChart('bar_chart').subscribe(res => {
        this.month.push(res.jan);
        this.month.push(res.feb);
        this.month.push(res.mar);
        this.month.push(res.apr);
        this.month.push(res.may);
        this.month.push(res.jun);
        this.month.push(res.jul);
        this.month.push(res.aug);
        this.month.push(res.sep);
        this.month.push(res.oct);
        this.month.push(res.nov);
        this.month.push(res.dec);

        console.log(this.month);
      });
    });

    this.diag.getFeedChart('crop_on_market').subscribe(res => {
      this.crops_data.push(res.beans);
      this.crops_data.push(res.maize);
      this.crops_data.push(res.matooke);
      this.crops_data.push(res.sorghum);
      this.crops_data.push(res.simsim);
      this.crops_data.push(res.gnuts);
      this.crops_data.push(res.others);

      console.log(this.crops_data);
    });

    this.diag.getFeedChart('bid_status').subscribe(res => {
      this.bid_status.push(res.pending);
      this.bid_status.push(res.accepted);
      this.bid_status.push(res.rejected);
      console.log(this.bid_status);
    });
  }

  // ----------------------------------------------------bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: this.month, label: 'Approved'},
    {data: this.mon, label: 'Rejected'}
  ];

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

}
