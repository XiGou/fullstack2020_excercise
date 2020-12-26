import express from "express";
import patientsData from "../data/patients";
import { Patient, PublicPatient, Entry } from "../types";
import {v4 as uuid} from "uuid";
import {toNewPatient, toNewEntry } from "../utils/parsers";

const patientsRouter = express.Router();


patientsRouter.get("/", (_req, res) =>{
  const resData = patientsData.map(
    ({name, id, dateOfBirth, gender,occupation }): PublicPatient => {
      return {
        name, id, dateOfBirth, gender, occupation
      };
    }
  );
  res.json(resData);
});

patientsRouter.post("/", (req, res) => {
  try {
    const body = toNewPatient(req.body) as Patient;
    // store
    body.id = uuid();
    [...patientsData, body];

    res.json(body);
    
  } catch (error) {
    res.status(400).send(error.message);
  }
});
patientsRouter.post("/:id/entries", (req, res) => {
  const patientId = req.params.id;

  try {
    const body = toNewEntry(req.body) as Entry;
    //store
    body.id = uuid();
    patientsData.map(
      P => P.id === patientId
        ?{...P, entries: [...P.entries, body]}
        :P
    );

    res.json(body);
    
  } catch (error) {
    res.status(400).send(error.message);
  }
});

patientsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id)
  res.json(
    patientsData.filter(P => P.id === id)
    // .map( P => ({...P, entries:[]}))
  );

});



export default patientsRouter;
