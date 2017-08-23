import {ChangeDetectorRef, Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../_providers/global.service';
import {Http, Response} from "@angular/http";
import {AddrequestService} from "../../_providers/addrequest.service";

import {ModalDirective} from 'ngx-bootstrap/modal/modal.component';
// import { ModalDirective } from 'ng2-bootstrap/modal';


const URL = "http://localhost:5000/upload";
declare var swal: any;
interface Post {
  exporter: string;
  crop: string;
  quantity: number;
  dueDate: Date;
  available?: number;
  left?: any;
}
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
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
    exporter: '',
    crop: '',
    quantity: '',
    describe: '',
    dueDate: '',
    postDate: '',
    photo_url: ''
  };

  @ViewChild('viewModal') public viewModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('lgModal') public lgModal: ModalDirective;

  private posts: Post[];
  private temp: Post[];
  private tempFilter: Post[];
  private pageData: Post[];

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
        this.posts = this.posts.filter(post => post.exporter.toLowerCase().indexOf(ev.toLowerCase()) > -1);
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
        this.posts = this.posts.filter(post => post.dueDate.toString().toLowerCase().indexOf(ev.toLowerCase()) > -1);
      }
      this.bigTotalItems = this.posts.length;
      this.pageChanged({page: this.bigCurrentPage});
    },
    available: (ev: any) => {
      this.sort.init();

      if (ev && ev.trim() !== '') {
        this.posts = this.posts.filter(post => post.available.toString().toLowerCase().indexOf(ev.toLowerCase()) > -1);
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

  // --------------------------------------------------------------setting the row to be deleted
  // removePost(st: any) {
  //   this.rowToDelete = st;
  // }

  constructor(private fb: FormBuilder,
              private global: GlobalService,
              private diag: AddrequestService,
              public http: Http,
              private el: ElementRef,
              private changeDetectorRef: ChangeDetectorRef) {
  }

// _______________________________________________- edit _____________________________________________


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
  }

  viewDetails(post) {
    this.toEdit = post;
    this.viewModal.show();
  }

  // ----------------------------------editing reports------------------------------------------------
  editPosts() {
    // this.toEdit.dueDate = this.toEdit.dueDate.formatted;
    this.diag.editDocs(this.toEdit)
      .subscribe(
        (data: any) => {
          // this.ngOnInit();
        }
      );
    swal("Done!", "Edited sucessifully", "success");
  }

  // ----------------------------------Marking as closed------------------------------------------------
  closePosts(post) {
    post.type = 'closed';
    this.toEdit.type = post;
    this.diag.editDocs(this.toEdit)
      .subscribe(
        (data: any) => {
          this.ngOnInit();
          swal("Done!", "Post closed", "success");
        }
      );

  }

  ngOnInit() {
    this.toEdit = {_id: null, type: '', exporter: '', crop: '', quantity: '', describe: '', dueDate: '', postDate: '', photo_url: ''
    }
    this.diag.getRequests().subscribe(res => {
      console.log(res);
      this.posts = res;
    });

    this.request = this.fb.group({
      'exporter': ['', Validators.compose([Validators.required])],
      'crop': ['', Validators.compose([Validators.required])],
      'quantity': ['', Validators.compose([Validators.pattern(/[0-9]/), Validators.required])],
      'dueDate': ['', Validators.compose([Validators.required])],
      'postDate': ['', Validators.compose([Validators.required])],
      'describe': ['', Validators.compose([Validators.required])]
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

  // addPost({exporter, crop, quantity, describe, dueDate, postDate}) {
  //   const posted = {exporter, crop, quantity, describe, dueDate, postDate};
  //   console.log(posted);
  //   this.sendData(posted);
  // }

  public open(): void {
    this.opened = !this.opened;
  }


  // sendData(data) {
  //   this.diag.addRequest(data).subscribe(
  //     (data: any) => {
  //       swal("Done!", "Request posted!", "success");
  //       this.ngOnInit();
  //     },
  //     function (error) {
  //       console.log(error);
  //       swal("Failed!", "Check Your Internet Connection!", "error");
  //     });
  //   // this.ngOnInit();
  // }

  //-------------------------------------------------------upload method----------------------
  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    let options = {
      exporter: this.request.value.exporter,
      crop: this.request.value.crop,
      quantity: this.request.value.quantity,
      dueDate: this.request.value.dueDate,
      postDate: this.request.value.postDate,
      describe: this.request.value.describe
    };

    formData.append('photo', inputEl.files.item(0));
    // formData.append('options',JSON.stringify(options));

    formData.append('exporter', options.exporter);
    formData.append('crop', options.crop);
    formData.append('quantity', options.quantity);
    formData.append('dueDate', options.dueDate.formatted);
    formData.append('postDate', options.postDate.formatted);
    formData.append('describe', options.describe);


    console.log(options);
    if (fileCount > 0) {
      this.http.post(this.global.api_url + '/upload', formData).map((res: Response) => res.json()).subscribe(
        // this.http.post('http://localhost:4200/src/assets/images', formData).map((res: Response) => res.json()).subscribe(
        (res) => {
          swal("Done!", "Request added!", "success");
          this.ngOnInit();
        }, function (error) {
          swal("Failed!", "Check Your Internet Connection!", "error");
        });
    }

    this.lgModal.hide();
    this.ngOnInit();
  }

}
