import express from "express";
import {diagData} from "../data/diagnoses";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) =>{
  res.json(diagData);
});


export default diagnosesRouter;
