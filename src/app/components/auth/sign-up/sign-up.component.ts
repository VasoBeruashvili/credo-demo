import { PasswordSecurityLevel } from './../../../models/password-security-level';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationHelper } from 'src/app/helpers/validation-helper';
import { EnumPasswordSecurityLevel } from 'src/app/enums/password-security-level-enum';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDlgComponent } from '../../shared/calendar-dlg/calendar-dlg.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  formSubmitted = false;
  hidePassword = true;

  passwordSecurityLevel: PasswordSecurityLevel | undefined;

  selectedDate = null;

  constructor(private fb: FormBuilder,
    private validationHelper: ValidationHelper,
    private dialog: MatDialog) {
    this.signUpForm = this.fb.group({
      fullName: [null, Validators.required],
      email: [null, [Validators.required, this.validationHelper.emailValidator]],
      phone: [null, [Validators.required, this.validationHelper.phoneValidator]],
      password: [null, Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    this.signUpForm.controls['password'].valueChanges.subscribe((password: string) => {
      if (!this.validationHelper.hasNumberUpperCaseAndSymbol(password)) {
        this.passwordSecurityLevel = {
          text: 'Weak password',
          class: 'app-color-red',
          level: EnumPasswordSecurityLevel.WEAK
        };
      }

      if (this.validationHelper.hasUpperCase(password)) {
        this.passwordSecurityLevel = {
          text: 'Medium password',
          class: 'app-color-yellow',
          level: EnumPasswordSecurityLevel.MEDIUM
        };
      }

      if (this.validationHelper.hasNumberUpperCaseAndSymbol(password)) {
        this.passwordSecurityLevel = {
          text: 'Strong password',
          class: 'app-color-green',
          level: EnumPasswordSecurityLevel.STRONG
        };
      }
    });
  }

  onSubmit(): void {
    console.log(this.signUpForm.controls['email'].errors);
    this.formSubmitted = true;
    if (this.signUpForm.valid) {
      alert('Form submitted successfully!');
    }
  }

  onTogglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onOpenCalendarClick(): void {
    const dialogRef = this.dialog.open(CalendarDlgComponent, {
      width: '400px',
      data: this.selectedDate,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((selectedDate: any) => {
      this.selectedDate = selectedDate;
    });
  }

}
