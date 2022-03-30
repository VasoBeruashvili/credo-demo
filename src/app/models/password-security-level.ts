import { EnumPasswordSecurityLevel } from "../enums/password-security-level-enum";

export interface PasswordSecurityLevel {
    text: string;
    class: string;
    level: EnumPasswordSecurityLevel;
}
