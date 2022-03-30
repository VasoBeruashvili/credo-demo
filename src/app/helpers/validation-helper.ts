import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class ValidationHelper {
    emailValidator(control: FormControl) {
        if (control.value) {
            const matches = control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
            return matches ? null : { 'invalidEmail': true };
        } else {
            return null;
        }
    }

    phoneValidator(control: FormControl) {
        if (control.value) {
            const matches = control.value.match(/^(((5))[0-9]{8})$/);
            return matches ? null : { 'invalidPhone': true };
        } else {
            return null;
        }
    }

    hasUpperCase(value: string) {
        return (/[A-Z]/.test(value));
    }

    hasNumberUpperCaseAndSymbol(value: string) {
        return (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #+=\(\)\^?&])[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/.test(value));
    }
}