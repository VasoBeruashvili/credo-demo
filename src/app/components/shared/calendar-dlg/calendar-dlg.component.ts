import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-dlg',
  templateUrl: './calendar-dlg.component.html',
  styleUrls: ['./calendar-dlg.component.scss']
})
export class CalendarDlgComponent implements OnInit {

  selected = new Date;

  constructor(private dialogRef: MatDialogRef<CalendarDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date) { }

  ngOnInit() {
    this.selected = this.data;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSetDateClick(): void {
    this.dialogRef.close(this.selected);
  }

}
