import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss'],
})
export class CreateScheduleComponent {
  DialogueForm: FormGroup;
  updatedFormData: any;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // debugger;
    this.initiateform(data);
  }

  initiateform(data: any) {
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
      this.DialogueForm.setValue(data);
    }
  }
  onAdd(): void {
    this.dialogRef.close(this.DialogueForm.value); // Pass form data back to the main component
  }
}
