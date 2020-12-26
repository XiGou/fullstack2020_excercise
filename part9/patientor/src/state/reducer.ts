import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";
import { stat } from "fs";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        patientId: string;
        entry:Entry;
      };
  }| {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients:{
          ...state.patients,
          [action.payload.patientId]: {
            ...state.patients[action.payload.patientId],
            entries: [...state.patients[action.payload.patientId].entries, action.payload.entry]
          }
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]):Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
}
export const addEntryToPatient = (patientId: string, entry: Entry):Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      patientId: patientId,
      entry: entry,
    }
  };
}

export const setDiagnoses = (diagnoses: Diagnosis[]):Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
}
