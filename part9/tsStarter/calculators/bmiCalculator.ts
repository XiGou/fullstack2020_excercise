
const calculateBmi = (height: number, weight: number):string => {
  const bmi:number = weight/Math.pow((height/100),2);
  if(bmi > 26) return "Innormal (over weight)";
  if(bmi < 20) return "Innormal (under weight)";
  return "Normal (healthy weight)";
} 
// console.log(process.argv);

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
console.log(calculateBmi(height, weight));

export default calculateBmi