import { Diagnosis, Entry } from "../types";
import React from "react";
import {List, Header, Segment, Icon, SemanticCOLORS} from "semantic-ui-react";

type EntryItemOption = {
  entry: Entry;
  diagMap: Map<Diagnosis["code"], Diagnosis>;
}

const EntryItem : React.FC<EntryItemOption> = ({entry, diagMap}) => {
  const healthyColor:SemanticCOLORS[] = ["green", "blue", "yellow", "red"];

  switch (entry.type) {
    case "OccupationalHealthcare":
      
        return (
          <Segment>
            <Header as="h2">
              {entry.date}:
              <Icon size='big' name='stethoscope' />
            </Header>
              <p>{entry.description}</p>
            
          </Segment>
         

        );
      
      
  
    case "HealthCheck":
      return (
      <Segment>
            <Header as="h2">
              {entry.date}:
              <Icon size='big' name='user doctor' />
            </Header>
              <p>{entry.description}</p>
              <Icon color={healthyColor[entry.healthCheckRating]}  name="heart outline"/>
      </Segment>
     
      );
      break;
  
    case "Hospital":
      return (
         <Segment>
            <Header as="h2">
              {entry.date}:
              <Icon size='big' name='hospital' />
            </Header>
              <p>{entry.description}</p>

      </Segment>
      );
      break;
  
    default:
      return null;
      break;
  }
}

export default EntryItem;