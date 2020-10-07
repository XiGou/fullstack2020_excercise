import express from "express";
import patientsData from "../data/patients";
import { Patient, PublicPatient } from "../types";
import {v4 as uuid} from "uuid";
import {toNewPatient } from "../utils/parsers";

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
    body.id = uuid();
    res.json(body);
    
  } catch (error) {
    res.status(400).send(error.message);
  }
});

patientsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(
    patientsData.filter(P => P.id === id)
    // .map( P => ({...P, entries:[]}))
  );

});



export default patientsRouter;
