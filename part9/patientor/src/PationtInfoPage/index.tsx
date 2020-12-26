import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, List, Segment, Header } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import AddEntryForm from "../AddEntryModal/AddEntryForm"
import AddEntryModal from "../AddEntryModal"
import { Diagnosis, Entry, Patient } from "../types";
import {EntryFormValues} from "../AddEntryModal/AddEntryForm"
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import EntryItem from "./EntryItem";
import {setDiagnoses} from "../state/reducer";

const PatientInfoPage: React.FC = () => {
  const [me, setMe] = useState<Patient|undefined>();
  
  const {id} = useParams<{id: string}>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  let diagList: Diagnosis[] = [];
  let diagMap: Map<Diagnosis["code"],Diagnosis> = new Map();

  const [, dispatch] = useStateValue();

  const getDiagMap = async () => {
    try {
      const { data: diags } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnosis`
      );
      if(diags.length !== 0){
        diagList = diags;
        dispatch(setDiagnoses(diagList));
      }
    } catch (e) {
      console.error(e.response.data);
      // setError(e.response.data.error);
    }
  }

  const getMyInfo = async (id: string) => {
    try {
      const { data: mee } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients/${id}`
      );
      console.log(mee)
      if(mee.length !== 0)setMe(mee[0]);
    } catch (e) {
      console.error(e.response.data);
      // setError(e.response.data.error);
    }
  };
  useEffect(() => {
    getMyInfo(id);
    getDiagMap();
    
    
  }, []);

  const onSubmit = async (value: EntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        value
      );
      // dispatch({ type: "ADD", payload: newPatient });
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  }
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if(me === undefined ) return null;
  const {entries:meEntries, ...meNoEntries} = me;
  return (
      <div className="PatientInfo">
        <Container textAlign="left">
          <h2>Patient Info</h2>
        <Table celled>
          <Table.Body>
            {
               Object.entries(meNoEntries).map(
                    En => 
                    <Table.Row>
                      <Table.Cell>{En[0]}</Table.Cell>
                      <Table.Cell>{En[1]}</Table.Cell>
                    </Table.Row>
                  )
              }

          </Table.Body>
        </Table>
        </Container>

        <Container>
        <h2>entries</h2>
          {
            meEntries.map(
              En => <EntryItem  entry={En} diagMap={diagMap}/>
            )
          }
  
        </Container>
        
        <AddEntryModal
          modalOpen={modalOpen}
          onClose = {closeModal}
          onSubmit = {onSubmit}
          error = {error}
          />
        <Button onClick={openModal}>Add New Entry</Button>


      </div>
  );
};

export default PatientInfoPage;
