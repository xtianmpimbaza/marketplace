import {ChangeDetectorRef, Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../_providers/global.service';
import {Http, Response} from "@angular/http";
import {AddrequestService} from "../../_providers/addrequest.service";


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  posts: any;
  crops: any;

  constructor(private fb: FormBuilder,
              private global: GlobalService,
              private diag: AddrequestService,
              public http: Http,
              private el: ElementRef,
              private changeDetectorRef: ChangeDetectorRef) {
  }
  ngOnInit() {
    //  -------------------------- get bid requests ---------------------------------
    this.diag.getFeedChart('bid_status').subscribe(res => {
      this.posts = res;
      console.log(this.posts);

    });

    //  -------------------------- get bid requests ---------------------------------
    this.diag.getFeedChart('crop_report').subscribe(res => {
      this.crops = res;
      console.log(this.crops);

    });
  }

}
