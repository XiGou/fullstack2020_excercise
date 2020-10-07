import React from "react";
import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ( {coursePart} ) => {

  switch (coursePart.name) {
    case "Fundamentals":
      return (
         <div>
           Name:{coursePart.name}  
           exercisesCount: {coursePart.exerciseCount}
         </div>
      );
    case "Using props to pass data":
      return (
        <div>
           Name:{coursePart.name}  
           exercisesCount: {coursePart.exerciseCount}
           groupProjectCount: {coursePart.groupProjectCount}
        </div>
      );
      break;
    case "Deeper type usage":
      return (
        <div>
        Name:{coursePart.name}  
        exercisesCount: {coursePart.exerciseCount}
        exerciseSubmissionLink: {coursePart.exerciseSubmissionLink}
        </div>
      );
      break;
    case "Deeper type usage II":
      return ( <div>
      Name:{coursePart.name}  
      exercisesCount: {coursePart.exerciseCount}
      description: {coursePart.description}
      </div>);
      break;
    default:
      return assertNever(coursePart);
  }
}

export default Part;