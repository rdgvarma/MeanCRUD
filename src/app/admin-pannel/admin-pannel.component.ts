import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { EmployeeService } from './../employee.service';
import { HttpClient,HttpParams } from '@angular/common/http';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-admin-pannel',
  templateUrl: './admin-pannel.component.html',
  styleUrls: ['./admin-pannel.component.css']
})
export class AdminPannelComponent implements OnInit {


    

  employeeForm: FormGroup;
  eform:FormGroup;
  submitted = false;
  public dlf={};
 
  public adminrole:string;
  public userID:number;
  public userName:string;
  public pwd:string;
  public role:string;
  public address:string;
  public phone:number;
  public allusersdata;
  public errorMsg;
  public deleteuserdata;
  public route;
  public idd;
  //public test2 = new Test2();
  public test3:[{userID:30}];
  public objv = {p:2};
  public jobslist:any;
  public aone:any;bone:any;cone:any;done:any;eone:any;fone:any;
   

  constructor(private employeeService:EmployeeService,
              private httpClient:HttpClient,
              
            ) {}

  ngOnInit() {
    this.employeeForm = new FormGroup ({
      adminrole : new FormControl(),
      userID : new FormControl(),
      userName : new FormControl(),
      pwd : new FormControl(),
      role :new FormControl(),
      address : new FormControl(),
      phone: new FormControl()
    });
  }

 
  //**deleting the document using userid */

  //**deleting the document using userid */
  onloadfetchData(){
    console.log("u need to present the data here after feching the user ");
    this.employeeService.getuserdatatofield();
  }

  saikrishna(){
    console.log("saikrishna");
   setTimeout(()=>{
      console.log(this.jobslist);
      console.log(this.jobslist.data);
      this.aone=this.jobslist.data.userID;
      this.bone=this.jobslist.data.userName;
      this.cone=this.jobslist.data.pwd;
      this.done=this.jobslist.data.role;
      this.eone=this.jobslist.data.address;
      this.fone=this.jobslist.data.phone;

      this.employeeForm.setValue({
        adminrole : 'UpdateSave' ,
       userID :this.aone,
       userName : this.bone  ,
       pwd : this.cone,
       role : this.done ,
       address : this.eone ,
       phone: this.fone
     })


   },2000)
  }


  //***fetching the all documents starts here.
  onfetchDataClick(){
    console.log("getting the all data from the database..");
    this.employeeService.getalldata()
    // .subscribe(data => this.allusersdata = data, 
    //             error =>this.errorMsg = error,
                
    //             );
    .subscribe((data)=>{
      console.log(data)
    }
      
      );
               
  }
  //***fetching the all documents ends here.

  //***sending data to the server start shere
  onSubmit():void{
    
    this.submitted = true;
    //console loging the form in typeof object
    console.log(this.employeeForm.value);
    //assign the individual values to an individual variables
    this.adminrole =this.employeeForm.value.adminrole;
    this.userID =this.employeeForm.value.userID;
    this.userName =this.employeeForm.value.userName;
    this.pwd = this.employeeForm.value.pwd;
    this.role = this.employeeForm.value.role;
    this.address = this.employeeForm.value.address;
    this.phone = this.employeeForm.value.phone;
    //logging the individual variables
    console.log(this.adminrole + "/"+this.userID +"/"+this.userName +"/"+this.pwd +"/" +this.role +"/"+this.role +"/"+this.address+"/"+this.phone);
    //assigning in the form of json object
    this.dlf={
      "adminrole":this.adminrole,
      "userID":this.userID,
      "userName":this.userName,
      "pwd":this.pwd,
      "role":this.role,
      "address":this.address,
      "phone":this.phone,
    }

    if (this.adminrole == "Delete") {
      console.log(" Here we are getting the user id for deleting the doc : "+ (this.userID));
      this.employeeService.removeuserdoc(this.userID);
    } else if(this.adminrole == "Create"){
      console.log("user entered into the create mode.." + this.dlf);
      this.employeeService.getUserData(this.dlf);
    } else if(this.adminrole == "GetSingleUserData"){
      console.log(" Here we are getting the user id for getting single user doc : "+ (this.userID));
      this.employeeService.getSingleUserID(this.userID);
    } else if(this.adminrole == "Update"){
      console.log("Here we are getting the user id for updating single user doc : "+ (this.userID));
      this.employeeService.updateGetData(this.userID) .subscribe((data)=>{
        console.log(data);
        this.jobslist=data;
        this.saikrishna();
      });
    } else if (this.adminrole == "UpdateSave"){
      console.log("this is from update save "+ this.dlf);
      this.employeeService.updatepostData(this.dlf);
    }
  }
  //***sending data to the server ends here  

}
