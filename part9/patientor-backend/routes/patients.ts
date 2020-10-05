import express from "express";
import { patientsData } from "../data/patients";
import { Patient } from "../types";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) =>{
  const resData = patientsData.map(
    ({name, id, dateOfBirth, gender,occupation}): Omit<Patient, "ssn"> => {
      return {
        name, id, dateOfBirth, gender, occupation
      };
    }
  );
  res.json(resData);
});


export default patientsRouter;
