import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent {
  message: string;

  constructor(public dialogRef: MatDialogRef<CreateMessageComponent>) {}

  closeDialog(): void {
    // Close the dialog and pass the message back to the parent component
    this.dialogRef.close(this.message);
  }
}
