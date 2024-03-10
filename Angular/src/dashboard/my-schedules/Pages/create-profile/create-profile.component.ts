import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/shared/services/employee/employee.service';
import { SelectItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { HttpResponse } from '@angular/common/http';
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
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateProfileComponent>,
    private employeeService: EmployeeService
  ) {
    this.profileForm = this.fb.group({
      EmpID: new FormControl('', [
        Validators.required,
        Validators.pattern('^EMP\\d{5}$'),
      ]),
      Name: new FormControl('', Validators.required),
      Role: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{10}$'),
      ]),
    });
  }

  roleOptions: SelectItem[] = [
    { label: 'Admin', value: 0 },
    { label: 'Employee', value: 1 },
  ];
  profileForm: FormGroup;
  message: string;

  confirmDialog():void {
    this.employeeService
      .createNewEmployee(this.profileForm.value)
      .subscribe((response: HttpResponse<string>) => {
        this.closeDialogAfterResponse(response);
      });
  }
  closeDialog() :void{
    this.dialogRef.close();
  }
  closeDialogAfterResponse(response: HttpResponse<string>):void {
    this.dialogRef.close(response);
  }
}
