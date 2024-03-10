
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,

  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { scheduleDetails } from 'src/shared/models/scheduleDetails.interface';
import { SchedulingServiceService } from 'src/shared/services/Schedule/scheduling-service.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss'],
})
export class CreateScheduleComponent {
  DialogueForm: FormGroup;
 
  constructor(
    private scheduleservice: SchedulingServiceService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: scheduleDetails
  ) {
    // debugger;

    this.initiateform(data);
  }

  flag = false;
  initiateform(data: scheduleDetails) :void{
    this.DialogueForm = this.formBuilder.group({
      empID: ['', [Validators.required, Validators.pattern('^EMP\\d{5}$')]],
      name: ['', Validators.required],
      job_Role: ['', Validators.required],
      shift: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      start_Time: ['', Validators.required],
      end_Time: ['', Validators.required],
    });

    if (data) {
      this.flag = true;
      this.DialogueForm.setValue(data);
    }
  }
  onAdd(): void {
    console.log(this.DialogueForm.value);
    //  debugger;
    if (this.flag == true) {
      this.scheduleservice
        .updateSchedule(this.DialogueForm.value)
        .subscribe((data) => {
          if (data.body['message'] == 'success') {
            this.dialogRef.close('success'); // Pass form data back to the main component
          } else if (data.body['message'] == 'failure') {
            this.dialogRef.close('failure');
          }
        });
    } else {
      this.scheduleservice
        .createSchedule(this.DialogueForm.value)
        .subscribe((data) => {
          if (data.body['message'] == 'success') {
            this.dialogRef.close('success'); // Pass form data back to the main component
          } else if (data.body['message'] == 'failure') {
            this.dialogRef.close('failure');
          }
        });
    }
  }
}
