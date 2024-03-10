import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SchedulingServiceService } from 'src/shared/services/Schedule/scheduling-service.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent {
  // @ViewChild('pieChart') pieChart: ElementRef;
  constructor(
    private router: Router,
    private scheduleService: SchedulingServiceService
  ) {}
  totalDayShift: number[] = [];
  totalNightShifts: number[] = [];
  basicData: any;
  data: any;
  options: any;
  basicOptions: any;
  allSchedules: any[] = [];
  empIDs: string[] = [];
  names: string[] = [];
  jobRoles: string[] = [];
  shifts: string[] = [];
  locations: string[] = [];
  dates: string[] = [];
  startTimes: string[] = [];
  endTimes: string[] = [];
  shiftCounts: { [key: string]: number } = {};
  jobRoleCounts: { [key: string]: number } = {};
  locationCounts: { [key: string]: number } = {};
  hoursWorkedCounts: { [key: number]: number } = {};
  nightShiftCount: number = 0;
  condition = false;
  ngOnInit() {
    this.scheduleService.getAllSchedules().subscribe((data) => {
      this.allSchedules = data;
      console.log(this.allSchedules);

      this.allSchedules.forEach((schedule) => {
        this.empIDs.push(schedule.empID);
        this.names.push(schedule.name);
        this.jobRoles.push(schedule.job_Role);
        this.shifts.push(schedule.shift);
        this.locations.push(schedule.location);
        this.dates.push(schedule.date);
        this.startTimes.push(schedule.start_Time);
        this.endTimes.push(schedule.end_Time);
        this.shiftCounts[schedule.shift] =
          (this.shiftCounts[schedule.shift] || 0) + 1;
        this.jobRoleCounts[schedule.job_Role] =
          (this.jobRoleCounts[schedule.job_Role] || 0) + 1;
        this.locationCounts[schedule.location] =
          (this.locationCounts[schedule.location] || 0) + 1;
      });
    });

    this.calculateWorkingHours();
  }

  getKeys(object: any): string[] {
    return Object.keys(object);
  }
  calculateWorkingHours() {
    this.allSchedules.forEach((schedule, index) => {
      const startTime = new Date(`1970-01-01T${this.startTimes[index]}`);
      const endTime = new Date(`1970-01-01T${this.endTimes[index]}`);
      const diffInHours =
        (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      const hoursWorked = Math.round(diffInHours);

      // Update the count for this number of hours
      this.hoursWorkedCounts[hoursWorked] =
        (this.hoursWorkedCounts[hoursWorked] || 0) + 1;
    });
  }

  getEmployeesByShift(shift: string): string {
    const employees = this.allSchedules
      .filter((schedule) => schedule.shift === shift)
      .map((schedule) => `${schedule.name} (ID: ${schedule.empID})`);
    return employees.join(', ');
  }

  getEmployeesByJobRole(jobRole: string): string {
    const employees = this.allSchedules
      .filter((schedule) => schedule.job_Role === jobRole)
      .map((schedule) => `${schedule.name} (ID: ${schedule.empID})`);
    return employees.join(', ');
  }

  getEmployeesByLocation(location: string): string {
    const employees = this.allSchedules
      .filter((schedule) => schedule.location === location)
      .map((schedule) => `${schedule.name} (ID: ${schedule.empID})`);
    return employees.join(', ');
  }

  showShiftDetails = false;
  showJobRoleDetails = false;
  showLocationDetails = false;

  // Method to toggle the visibility of child elements
  toggleDetails(card: string) {
    switch (card) {
      case 'shift':
        this.showShiftDetails = !this.showShiftDetails;
        break;
      case 'jobRole':
        this.showJobRoleDetails = !this.showJobRoleDetails;
        break;
      case 'location':
        this.showLocationDetails = !this.showLocationDetails;
        break;
    }
  }

  countShiftsByMonth(
    shifts: string[],
    dates: string[],
    shiftType: string
  ): number[] {
    // Initialize an array to store counts for each month (12 elements for 12 months)
    const monthlyCounts: number[] = new Array(12).fill(0);

    // Loop through each shift data
    for (let i = 0; i < shifts.length; i++) {
      const shift = shifts[i];
      const date = new Date(dates[i]);

      // Check if the shift matches the desired type (Day or Night)
      if (shift === shiftType) {
        // Extract the month (0-indexed) from the date
        const month = date.getMonth();

        // Increment the count for the corresponding month in the monthlyCounts array
        monthlyCounts[month]++;
      }
    }

    return monthlyCounts;
  }

  monthc() {
    this.csvDataReady = !this.csvDataReady;
    this.condition = !this.condition;
    this.totalDayShift = this.countShiftsByMonth(
      this.shifts,
      this.dates,
      'Day'
    );

    // Calculate the count of night shifts for each month
    this.totalNightShifts = this.countShiftsByMonth(
      this.shifts,
      this.dates,
      'Night'
    );

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    console.log(this.shifts);
    console.log(this.dates);

    this.data = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Night',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.totalNightShifts,
        },
        {
          label: 'Day',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: this.totalDayShift,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  csvDataReady: boolean = false;

  downloadCSV() {
    // Generate the CSV content
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Total Day Shifts,Total Night Shifts\n';
    this.totalDayShift.forEach((dayShift, index) => {
      csvContent += `${dayShift},${this.totalNightShifts[index]}\n`;
    });

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'report_and_analysis.csv';
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  }
}
