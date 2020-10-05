export interface Diagnose {
  code:string;
  name:string;
  latin?:string;
}

type Gender = 'female' | 'male' ;
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender:Gender;
  occupation:string;
}

