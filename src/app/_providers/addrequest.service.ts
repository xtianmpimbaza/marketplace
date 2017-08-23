import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {GlobalService} from "../_providers/global.service";

@Injectable()
export class AddrequestService {

  constructor(private _http: Http,
              private global: GlobalService) {
  }

  addRequest(Stu: any) {
    let body = JSON.stringify(Stu);
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
    return this._http.post(this.global.api_url + '/request', body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getOrders() {
    return this._http.get(this.global.api_url + '/supply')
      .map(res => res.json().map(z=>z.value));
  }
  getClosedOrders(){
    return this._http.get(this.global.api_url + '/closed')
      .map(res => res.json().map(z=>z.value));
  }
  // deleteRequest(doc:any)
  // {
  //   let body=JSON.stringify(doc);
  //   let header=new Headers({'Content-Type':'application/json'});
  //   return this._http.delete(this.global.api_url + '/delete_doc', {headers:header}).map(res => res.json());
  // }

  getPosts() {
    return this._http.get(this.global.api_url + '/posts')
      .map(res => res.json().map(r=>r.value));
  }

  getRequests() {
    return this._http.get(this.global.api_url + '/request_posted')
      .map(res => res.json().map(w=>w.value));
  }


  bidResponse(post:any){
    let body=JSON.stringify(post);
    let header=new Headers({'Content-Type':'application/json'});
    let options=new RequestOptions({headers:header});
    return this._http.put(this.global.api_url + '/edit_docs',body,options)
      .map((res:Response)=>res.json());
  }


  // ------------------------editing posts-------------------------
  editDocs(doc:any)
  {
    let body=JSON.stringify(doc);
    let header=new Headers({'Content-Type':'application/json'});
    let options=new RequestOptions({headers:header});
    return this._http.put(this.global.api_url + '/edit_docs',body,options)
      .map((res:Response)=>res.json());

  }
  //------------------------------------- get the chart data ----------------
  getFeedChart(url:any){
    return this._http.get(this.global.api_url + '/'+url)
      // .map(res => res.json().map(z=>z.value));
      .map(res => res.json());
  }
  // ------------------------- deleting requests from the -------------------
  deleteRequest(doc: any) {
    let body = JSON.stringify(doc);
    let header = new Headers({'Content-Type': 'application/json'});
    let res = new RequestOptions({headers: header});
    return this._http.post(this.global.api_url + '/delete_doc', body, res).map((res: Response) => res.json());
  }

  getRequest(url: string) {
    return this._http.get('/api/' + url)
      .map(res => res.json());
  }

}
