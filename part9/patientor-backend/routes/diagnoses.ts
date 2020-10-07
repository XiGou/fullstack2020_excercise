import express from "express";
import {diagData} from "../data/diagnoses";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) =>{
  res.json(diagData);
});


export default diagnosisRouter;
