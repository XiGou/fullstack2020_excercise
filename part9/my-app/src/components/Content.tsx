import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps{
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts })=> {
  
  return (
    <div>
      {courseParts.map( C => <Part coursePart={C} />)}
    </div>
  );
}

export default Content;