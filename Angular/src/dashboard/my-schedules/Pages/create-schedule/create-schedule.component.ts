import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss'],
})
export class CreateScheduleComponent {
  DialogueForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateScheduleComponent>
  ) {
    this.initiateform();
  }
  initiateform() {
    this.DialogueForm = this.formBuilder.group({
      empID: [''],
      name: [''],
      job_Role: [''],
      shift: [''],
      location: [''],
      date: [''],
      start_Time: [''],
      end_Time: [''],
    });
  }
  onAdd(): void {
    this.dialogRef.close(this.DialogueForm.value); // Pass form data back to the main component
  }
}
