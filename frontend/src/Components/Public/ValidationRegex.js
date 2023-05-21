//Regex valudation file, used throught the program to validate input forms

export const COURSENUMBERREGEX = /^[0-9]{3}[A-Z]?[A-Z]?$/;
export const TITLEREGEX = /^.{3,255}$/;
export const CREDITSNUMBERREGEX = /^[1-5]$/;
export const NAMEREGEX = /^[a-zA-Z\s]{3,40}$/;
export const CREDITSMAJORREGEX = /^(?:[1-9]|[1-9][0-9]|1[0-4][0-9]|150)$/;
