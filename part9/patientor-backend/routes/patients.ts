import express from "express";
import { patientsData } from "../data/patients";
import { Patient } from "../types";
import {v4 as uuid} from "uuid";

const patientsRouter = express.Router();
let data = patientsData;

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

patientsRouter.post("/", (req, res) => {
  const body = req.body;
  body.id = uuid();
  data = data.concat(body as Patient);
  res.json(body);
});

export default patientsRouter;
