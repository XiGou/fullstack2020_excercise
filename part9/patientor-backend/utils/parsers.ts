import { Gender, Patient } from "../types";

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
  };
};



