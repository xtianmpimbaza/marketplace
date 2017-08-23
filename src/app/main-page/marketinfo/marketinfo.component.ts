import {ChangeDetectorRef, Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../_providers/global.service';
import {Http, Response} from "@angular/http";
import {AddrequestService} from "../../_providers/addrequest.service";

import {ModalDirective} from 'ngx-bootstrap/modal/modal.component';
// import { ModalDirective } from 'ng2-bootstrap/modal';


const URL = "http://localhost:5000/upload";
declare var swal: any;

interface Market {
  market: string;
  commodity: string;
  unit: number;
  collectionDate: Date;
  wholesaleprice: string;
  retailprice:string;
}
@Component({
  selector: 'app-requests',
  templateUrl: './marketinfo.component.html',
  styleUrls: ['./marketinfo.component.scss']
})

export class MarketinfoComponent implements OnInit {
  private opened = false;
  request: FormGroup;
  public params: any;
  public maxSize = 8;
  public bigTotalItems = 0;
  public bigCurrentPage = 1;
  public numPages = 0;
  public itemsPerPage = 8;
  public toEdit: any = {
    _id: null,
    type: '',
    market: '',
    commodity: '',
    unit: '',
    collectionDate: '',
    wholesaleprice:'',
    retailprice:'',
  };

  @ViewChild('viewModal') public viewModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('lgModal') public lgModal: ModalDirective;

  private posts: Market[];
  private temp: Market[];
  private tempFilter: Market[];
  private pageData: Market[];

  private eT = true;
  private cT;
  private qT;
  private dT;
  private aT;

  private sort = {
    exporter: () => {
      if (this.eT === undefined) {
        this.sort.init();
      }
      this.cT = undefined;
      this.qT = undefined;
      this.dT = undefined;
      this.aT = undefined;
      this.eT = (this.eT === undefined || this.eT === false);
      this.posts = this.eT ? this.posts.sort(this.global.comp.sortExporter) : this.posts.reverse();
      this.pageChanged({page: this.bigCurrentPage});
    },
    crop: () => {
      if (this.cT === undefined) {
        this.sort.init();
      }
      this.cT = (this.cT === undefined || this.cT === false);
      this.qT = undefined;
      this.dT = undefined;
      this.eT = undefined;
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
      this.eT = undefined;
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
      this.eT = undefined;
      this.aT = undefined;
      this.posts = this.qT ? this.posts.sort(this.global.comp.sortDueDate) : this.posts.reverse();
      this.pageChanged({page: this.bigCurrentPage});
    },
    available: () => {
      if (this.aT === undefined) {
        this.sort.init();
      }
      this.cT = undefined;
      this.qT = undefined;
      this.aT = (this.aT === undefined || this.aT === false);
      this.eT = undefined;
      this.posts = this.aT ? this.posts.sort(this.global.comp.sortAvailable) : this.posts.reverse();
      this.pageChanged({page: this.bigCurrentPage});
    },
    init: () => {
      this.posts = this.temp;
    }
  };
  private filter = {
    exporter: (ev: any) => {
      this.sort.init();

      if (ev && ev.trim() !== '') {
        this.posts = this.posts.filter(post => post.market.toLowerCase().indexOf(ev.toLowerCase()) > -1);
      }
      this.bigTotalItems = this.posts.length;
      this.pageChanged({page: this.bigCurrentPage});
    },
    crop: (ev: any) => {
      this.sort.init();

      if (ev && ev.trim() !== '') {
        this.posts = this.posts.filter(post => post.commodity.toLowerCase().indexOf(ev.toLowerCase()) > -1);
      }
      this.bigTotalItems = this.posts.length;
      this.pageChanged({page: this.bigCurrentPage});
    },
    quantity: (ev: any) => {
      this.sort.init();

      if (ev && ev.trim() !== '') {
        this.posts = this.posts.filter(post => post.unit.toString().toLowerCase().indexOf(ev.toLowerCase()) > -1);
      }
      this.bigTotalItems = this.posts.length;
      this.pageChanged({page: this.bigCurrentPage});
    },
    date: (ev: any) => {
      this.sort.init();

      if (ev && ev.trim() !== '') {
        this.posts = this.posts.filter(post => post.collectionDate.toString().toLowerCase().indexOf(ev.toLowerCase()) > -1);
      }
      this.bigTotalItems = this.posts.length;
      this.pageChanged({page: this.bigCurrentPage});
    },
    available: (ev: any) => {
      this.sort.init();

      if (ev && ev.trim() !== '') {
        this.posts = this.posts.filter(post => post.wholesaleprice.toString().toLowerCase().indexOf(ev.toLowerCase()) > -1);
      }
      this.bigTotalItems = this.posts.length;
      this.pageChanged({page: this.bigCurrentPage});
    }
  };

  //---------------------------------------------------------------------calling the delete method
  deletePosts(row: any) {
    this.diag.deleteRequest(row).subscribe(
      data => {
        this.posts.splice(this.posts.indexOf(row), 1);
        if (data) {
          swal("Done!", "Entry deleted!", "success");
        }
        else swal("Failed!", "Delete failed!", "success");
      });
  }

  constructor(private fb: FormBuilder,
              private global: GlobalService,
              private diag: AddrequestService,
              public http: Http,
              private el: ElementRef,
              private changeDetectorRef: ChangeDetectorRef) {
  }

// _______________________________________________ edit _____________________________________________

  postDetails(post) {

    this.toEdit = post;

    console.log(this.toEdit.exporter);
    this.editModal.show();
    this.changeDetectorRef.detectChanges();
  }

  saveEdited() {
    console.log(this.toEdit);
    this.editModal.hide();
    this.editPosts();
    this.editModal.hide();
  }

  // ----------------------------------editing reports------------------------------------------------
  editPosts() {
    this.diag.editDocs(this.toEdit)
      .subscribe(
        (data: any) => {
        }
      );
    swal("Done!", "Edited sucessifully", "success");
  }

  // ----------------------------------Marking as closed------------------------------------------------

  ngOnInit() {
    this.toEdit = { };
    this.diag.getFeedChart('market_info').subscribe(res => {
      this.posts = res;
      console.log(this.posts);

    });

    this.request = this.fb.group({
      'market': ['', Validators.compose([Validators.required])],
      'commodity': ['', Validators.compose([Validators.required])],
      'unit': ['', Validators.compose([Validators.pattern(/[0-9]/), Validators.required])],
      'wholesaleprice': ['', Validators.compose([Validators.required])],
      'collectionDate': ['', Validators.compose([Validators.required])],
      'retailprice': ['', Validators.compose([Validators.required])]
    });

    this.posts = [];
    // this.posts = [
    //   // {exporter: 'Ysaac', crop: 'Aeed', quantity: 20, dueDate: new Date('2-12-2017'), available: 0},
    //   // {exporter: 'Asaac11', crop: 'Zeed', quantity: 2030, dueDate: new Date('2-2-2017'), available: 0}
    // ];
    this.temp = this.posts;
    this.posts = this.posts.sort(this.global.comp.sortExporter);
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

  log(value) {
    console.log(value);
  }

  addPost({market, commodity, unit, collectionDate, wholesaleprice, retailprice}) {
    const posted = { market, commodity, unit, collectionDate, wholesaleprice, retailprice};
    console.log(posted);
    this.sendData(posted);
    this.lgModal.hide();
  }

  // public open(): void {
  //   this.opened = !this.opened;
  // }

  sendData(data) {
    this.diag.addRequest(data).subscribe(
      (data: any) => {
        swal("Done!", "Request posted!", "success");
        this.ngOnInit();
      },
      function (error) {
        console.log(error);
        swal("Failed!", "Check Your Internet Connection!", "error");
      });
  }

}
