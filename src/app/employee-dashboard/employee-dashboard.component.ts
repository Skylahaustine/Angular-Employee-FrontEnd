import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeeModelObj: EmployeeModel= new EmployeeModel();
  employeeData!: any;

showAdd!:boolean;
showUpdate!:boolean;







//Inject form builder
  constructor(private formbuilber: FormBuilder,
    private api :ApiService) { }

  ngOnInit(): void {
    this.formValue= this.formbuilber.group(
      {
        id :[''],
        name :[''],
        email :[''],
        gender :[''],
        status:['']

      })
      this.getallEmployee();
  }
clickAddEmployee(){
  this.formValue.reset();
  this.showAdd= true;
  this.showUpdate= false;
}

  postEmployeeDetails(){
    this.employeeModelObj.id= this.formValue.value.id;
    this.employeeModelObj.name= this.formValue.value.name;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.gender= this.formValue.value.gender;
    this.employeeModelObj.status= this.formValue.value.status;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Succesifully")
      this.formValue.reset();
      this.getallEmployee();
      let ref =document.getElementById('cancel')
      ref?.click();

    },
    err=>{
      console.log(this.employeeModelObj)
      alert("Something Went wrong");
    })
  }

getallEmployee(){
  this.api.getEmployee()
  .subscribe(res=>{
    this.employeeData= res;
  })


}
deleteEmployee(row:any){
  this.api.deleteEmployee(row.id)
  .subscribe(res =>{
    alert("Employee Deleted");
    this.getallEmployee();
  })
}

onEdit(row:any){

  this.showAdd= false;
  this.showUpdate= true;
  this.employeeModelObj.id =row.id;

  this.formValue.controls['name'].setValue(row.name);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['gender'].setValue(row.gender);
  this.formValue.controls['status'].setValue(row.status);
  
}

updateEmployeeDetails(){
 
  this.employeeModelObj.name= this.formValue.value.name;
  this.employeeModelObj.email= this.formValue.value.email;
  this.employeeModelObj.gender= this.formValue.value.gender;
  this.employeeModelObj.status= this.formValue.value.status;

  this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
  .subscribe(res=> {
    alert("Updated Succesifully");

    let ref =document.getElementById('cancel')
    ref?.click();

    this.formValue.reset();
    this.getallEmployee();


  })



}
}
