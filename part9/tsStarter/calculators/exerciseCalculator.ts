interface calculateExerciseRst { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number; 
}

const  calculateExercise = (dailyExerciseHours: Array<number>, 
    targetHoursDaily: number): calculateExerciseRst => {
      const periodLength = dailyExerciseHours.length;
      const trainingDays = dailyExerciseHours.reduce(
        (prev: number, cur: number):number => prev+(cur>0?1:0),
        0
      );
      const success = (trainingDays == periodLength);
      const rating = Math.floor((trainingDays/periodLength)*3+1);
      const totalHours = dailyExerciseHours.reduce((a:number, b:number) => a+b);
      const average = totalHours/periodLength;
      const target = targetHoursDaily;
      let ratingDescription;
      switch (rating) {
        case 1:
          ratingDescription =  'you would better to North Pole soon';
          break;
        case 2:
          ratingDescription =  'not too bad but could be better';
          break;
        case 3:
          ratingDescription =  'you are very inner curly';
          break;
        default:
          ratingDescription = 'none';
          break;
      }

      return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
      }

}

const targetHoursDaily: number = Number(process.argv[2]);

let dailyExerciseHours: Array<number> = [];
for (let index = 3; index < process.argv.length; index++) {
  dailyExerciseHours.push(Number(process.argv[index]));
}

console.log(
  calculateExercise(dailyExerciseHours, targetHoursDaily)
);