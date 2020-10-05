import express from "express";
import bmiCalculator from "./calculators/bmiCalculator";
import calculateExercise from "./calculators/exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  

  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  const bmi:string = bmiCalculator(height, weight);
  
  if(isNaN(weight) || isNaN(height) || req.query.weight == null || req.query.height == undefined ){
  res.send({
        error: "malformatted parameters"
    });
  }
  res.json({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // const weight = Number(req.query.weight);
  // const height = Number(req.query.height);
  // const bmi:string = bmiCalculator(height, weight);
  
  // if(isNaN(weight) || isNaN(height) || req.query.weight == null || req.query.height == undefined ){
  // res.send({
  //       error: "malformatted parameters"
  //   });
  // }
  // res.json({
  //   weight,
  //   height,
  //   bmi
  // });
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = req.body;
  
  
  if(body.target == undefined || body.daily_exercises == undefined){
    res.json( {
      error: "parameters missing"
    });
    return;
  }


  if(!( typeof body.target === 'number' && !isNaN(body.target)) || !(body.daily_exercises instanceof Array) 
      || !body.daily_exercises.reduce((prev:any, cur:any) =>{
        return (prev && (typeof cur === 'number' && !isNaN(cur) ));
      }, true)){
    res.json({
      error: "malformatted parameters"
    });
    return; 
  }

  res.json(calculateExercise(body.daily_exercises, body.target));
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
