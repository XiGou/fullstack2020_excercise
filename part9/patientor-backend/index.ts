import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
const app = express();


app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("get a ping.");
  res.send("pong");
});
app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientsRouter);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
