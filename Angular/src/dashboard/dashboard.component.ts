import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { myDetails } from 'src/shared/models/myDetails.interface';
import { EmployeeService } from 'src/shared/services/employee/employee.service';
import { CreateMessageComponent } from './my-schedules/Pages/create-message/create-message/create-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommunicationService } from 'src/shared/services/communications/communication.service';
import { Table } from 'primeng/table';

import { Displayedmessages } from 'src/shared/models/Displayedmessages.interface';
import { SchedulingServiceService } from 'src/shared/services/Schedule/scheduling-service.service';
import { messageModel } from 'src/shared/models/messageModel.interface';
import { swapRequestForm } from 'src/shared/models/swapRequestForm.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class DashboardComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private route: Router,
    private dialog: MatDialog,
    private scheduleService: SchedulingServiceService,
    private communicationService: CommunicationService,
    private messageService: MessageService
  ) {}

  myDetails: myDetails = {
    name: '',
    empID: '',
    Role: 0,
    email: '',
    phone: '',
  };

  currentEmployeeId: string;
  currentEmployeeRole: string;
  pendingRequests :swapRequestForm[]=[];

  messages: Displayedmessages[] = [];
  dates: any[] = [
    { year: 2024, month: 1, day: 20 },
    { year: 2024, month: 1, day: 21 },
    // Add more dates as needed
  ];

  // Function to check if a date is in the disabledDates array
  isDateDisabled(date: Date): boolean {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based in JavaScript
    const day = date.getDate();

    return this.dates.some(
      (d) => d.year === year && d.month === month && d.day === day
    );
  }

  ngOnInit() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };

    this.initateEmplpoyeeDetails();
    this.getEmployeeDetails();

    if (this.currentEmployeeRole == 'admin') this.getPendingRequests();

    if (this.currentEmployeeRole == 'employee') {
      const storedMessages = sessionStorage.getItem('messages');
      if (storedMessages) {
        // If messages are found in local storage, parse them and assign to this.messages
        this.messages = JSON.parse(storedMessages);
      } else {
        // If messages are not in local storage, fetch them from the service
        this.getAllmessages();
      }
    }
  }

  getPendingRequests(): void {
    this.communicationService.getPendingRequests().subscribe((data) => {
      this.pendingRequests = data;
    });
  }

  getAllmessages(): void {
    this.communicationService.getAllMessages().subscribe((data: string[]) => {
      this.messages = data.map((m) => ({ messagesValue: m, isRead: false }));

      sessionStorage.setItem('messages', JSON.stringify(this.messages));
    });
  }

  initateEmplpoyeeDetails(): void {
    const token = sessionStorage.getItem('jwtToken');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.currentEmployeeId = tokenPayload['empID'];

    this.currentEmployeeRole = tokenPayload['role'];
  }

  getEmployeeDetails(): void {
    this.employeeService.getEmployee().subscribe((data) => {
      this.myDetails = data;
    });
  }

  isDropdownVisible = false;
  showSidebar = false;
  toggleDropdown() {
    this.showSidebar = !this.showSidebar;
  }

  onMessageClick(message): void {
    console.log(message);
    // Handle the message click
  }

  broadcastMessage(): void {
    this.dialog
      .open(CreateMessageComponent)
      .afterClosed()
      .subscribe((message) => {
        if (message) {
          const messageModel: messageModel = { message: message };

          // Pass the messageModel object to sendBroadcastMessage
          this.communicationService
            .sendBroadcastMessage(messageModel)
            .subscribe((response) => {
              if (response.body['message'] == 'success') {
                this.showLifeLong('Broadcast Success', true);
              } else if (response.body['message'] == 'failure')
                this.showLifeLong('Unknown Error', false);
            });
        }
      });
  }
  userLogout(): void {
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }

  clear(table: Table): void {
    table.clear();
  }
  markAsRead(message: any): void {
    const index = this.messages.findIndex(
      (msg) => msg.messagesValue === message.messagesValue
    );

    if (index !== -1) {
      this.messages[index].isRead = true;
      this.messages = this.messages.filter((msg) => !msg.isRead);
      sessionStorage.setItem('messages', JSON.stringify(this.messages));
    }
  }

  rejectSwap(schedule: swapRequestForm): void {
    this.scheduleService.rejectSwapDetails(schedule).subscribe((data) => {
      if (data.body['message'] == 'Swap Rejected') {
        this.showLifeLong('Swap Rejected !', true);
        location.reload();
      } else {
        this.showLifeLong('Reject Failed', false);
        location.reload();
      }
    });
  }

  acceptSwap(schedule: any): void {
    this.scheduleService.acceptSwapDetails(schedule).subscribe((data) => {
      if (data.body['message'] == 'Swap Accepted') {
        this.showLifeLong('Swap Accepted !', true);
        location.reload();
      } else {
        this.showLifeLong('Unknown Error', false);
      }
    });
  }

  showLifeLong(displayedMessage: string, type: boolean): void {
    //  console.log("here inside toast");

    if (type == true)
      this.messageService.add({
        severity: 'success',
        summary: 'Status',
        detail: displayedMessage,
        life: 2000,
      });
    else
      this.messageService.add({
        severity: 'error',
        summary: 'Unknown Error',
        detail: displayedMessage,
        life: 2000,
      });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    event.preventDefault();
    window.alert('You must Logout first !');
  }
}
