import express from "express";
import bmiCalculator from "./calculators/bmiCalculator";

const app = express();

app.get('/bmi', (req, res) => {
  
  
  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
  const bmi:string = bmiCalculator(height, weight);
  
  if(weight === NaN || height ===NaN || req.query.weight == null || req.query.height == undefined ){
  res.send({
        error: "malformatted parameters"
    });
  }
  res.json({
    weight,
    height,
    bmi
  });
})


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
