import { Gender, Patient, Entry, HealthCheckRating} from "../types";
// import {v3 as uuid} from "uuid";

const isString = (text:any):text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (name: any) : string=> {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name:${name}`);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseGender = (para: any): Gender => {
  if (!para || !isGender(para)) {
      throw new Error(`Incorrect or missing date: ${para}`);
  }
  return para;
};

export const toNewPatient = (object: any): Omit<Patient, "id"> => {
  return {
    name: parseString(object.name),
    ssn: parseString(object.ssn),
    occupation: parseString(object.occupation),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    entries:[]
  };
};

/////////////////////


export const parseStringArray = (obj:any) => {
  if(!obj || !(obj instanceof Array) ){
    throw new Error(`Incorrect or missing string aeeay: ${obj}`);
  }
  obj.forEach(element => {
    parseString(element);
  });
  return obj;
}

const parseHealthCheckRating = (obj:any) => {
  if(!obj || !(Object.values(HealthCheckRating).includes(obj)) ){
    throw new Error(`Incorrect or missing HealthCheckRating: ${obj}`);
  }
  return obj;
}

export const toNewEntry = (obj: any) :Omit<Entry, "id"> => {
  
  if(!obj){
    throw new Error(`Incorrect or missing Entry: ${obj}`);
  }
  const type = parseString(obj.type);
  parseString(obj.description);
  parseString(obj.date);
  parseString(obj.specialist);
  if(obj.diagnosisCodes)parseStringArray(obj.diagnosisCodes);
  switch (type) {
    case "HealthCheck":
      parseHealthCheckRating(obj.HealthCheckRating);
      break;
    case "OccupationalHealthcare":
      parseString(obj.employerName);
      if(obj.sickLeave){
        parseString(obj.sickLeave.startDate);
        parseString(obj.sickLeave.endDate);
      }
      break;
    case "Hospital":
      if(!obj.discharge){
        throw new Error(`Incorrect or missing discharge: ${obj}`);
      }
      parseString(obj.discharge.date);
      parseString(obj.discharge.criteria);
      break;
  
    default:
      break;
    }
    return obj;




}



