import { Component, Injectable, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/shared/services/employee/employee.service';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],

})

export class CreateProfileComponent {

  @ViewChild('op') op: OverlayPanel;

    showOverlayPanel(event: any) {
        this.op.toggle(event);
    }
  roleOptions: SelectItem[] = [
    { label: 'Admin', value: 0 },
    { label: 'Employee', value: 1 }
  ];
  profileForm: FormGroup;
  constructor(private fb : FormBuilder,private dialogRef: MatDialogRef<CreateProfileComponent>,private employeeService:EmployeeService){
    this.profileForm = this.fb.group({
      EmpID: new FormControl('', [Validators.required, Validators.pattern('^EMP\\d{5}$'),]),
      Name: new FormControl('', Validators.required),
      Role: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Phone: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$'),])
   });
  }


  message:string;



  confirmDialog() {this.employeeService.createNewEmployee(this.profileForm.value).subscribe((response)=>{

    this.closeDialogAfterResponse(response);
     
     })
  
  }
  closeDialog() {
    this.dialogRef.close();
  }
  closeDialogAfterResponse(response :any){
    
    this.dialogRef.close(response);
  }

}
