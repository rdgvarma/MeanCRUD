import { Injectable } from '@angular/core';
import { IEmoloyee } from './credientials';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public datareceiver:any;
  public datareceiverparser:any;
 
  //post data to server
  private _url:string ="http://192.168.1.55:3003/api/employee/enrolment";
  //get all data from server 
  private _url1:string ="http://192.168.1.55:3003/api/employee/all";
  //post update data to server
  private _url2:string ="http://192.168.1.55:3003/api/employee/enrolment/updated-data";

  getuserdatatofield(){
    console.log("this is from the getuserdatatofield  sending the data to u : "+ this.datareceiver);
    console.log(" typeof(this.datareceiver) "+typeof(this.datareceiver));
    let secondparser = JSON.parse(JSON.stringify(this.datareceiver));
    console.log(" type of secondparser : "+typeof(secondparser));
    console.log(secondparser.data.userID + secondparser.data.phone);
  }

  constructor( private _httpClient:HttpClient ) { }

  //*** updating the single user Id
  updateGetData(post_jobs_id:number):Observable <IEmoloyee[]>{
    const url =`http://192.168.1.55:3003/api/employee/update-get-data/${post_jobs_id}`;
    return this._httpClient.get<IEmoloyee[]>(url)
  }
  //*** updating the single user Id

  //***afterfetching updating and save to db starts here
    updatepostData(params) {
      return this._httpClient.put(this._url2,params)
      .subscribe((data:any)=> (console.log("this is from updatepostData () :"+ JSON.stringify(data))))
    };

  //***afterfetching updating and save to db ends here

  //*** getting the single doc of data by userID
    getSingleUserID(post_jobs_id:number){
      const url =`http://192.168.1.55:3003/api/employee/getsingle-data-by-userid/${post_jobs_id}`;
      this._httpClient.get(url).subscribe((data:any)=>(
        console.log("this.is from getSingleUserID : "+JSON.stringify(data)))
      
      );
    }
  //*** getting the single doc of data by userID

  //***deleting the doc using userid
    removeuserdoc(post_jobs_id:number){
      const url =`http://192.168.1.55:3003/api/employee/deletebyuserid/${post_jobs_id}`;
       this._httpClient.delete(url).subscribe((data:any)=> (console.log("this is from deleteData () :"+ JSON.stringify(data))));
    }
  //***deleting the doc using userid

  // *** it will enroll the user starts here
    getUserData(params) {
      return this._httpClient.post(this._url,params)
      .subscribe((data:any)=> (console.log("this is from sendData () :"+ JSON.stringify(data))))
    };
  // *** it will enroll the user ends here

  //get all data methord starts here
    getalldata():Observable <IEmoloyee[]>{
      return this._httpClient.get<IEmoloyee[]>(this._url1)
      //.pipe(catchError(this.errorHandler));
    }
      //  errorHandler(error: HttpErrorResponse){
      //    return Observable.throw(error.message || 'server error');
      //  }
  //get all data methord ends here

}
