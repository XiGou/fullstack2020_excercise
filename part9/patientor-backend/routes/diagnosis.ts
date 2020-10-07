import express from "express";
import patientsData from "../data/patients";
import { Patient, PublicPatient } from "../types";
import {v4 as uuid} from "uuid";
import {toNewPatient } from "../utils/parsers";

const diagnosisRouter = express.Router();


diagnosisRouter.get("/", (_req, res) =>{
  const resData = patientsData.map(
    ({name, id, dateOfBirth, gender,occupation }): PublicPatient => {
      return {
        name, id, dateOfBirth, gender, occupation
      };
    }
  );
  res.json(resData);
});



patientsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(
    patientsData.filter(P => P.id === id)
    // .map( P => ({...P, entries:[]}))
  );

});



export default diagnosisRouter;
