import React from "react";
import {useStateValue} from "../state";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { Entry,Diagnosis, EntryType } from "../types";
import { TextField, SelectField, NumberField, DiagnosisSelection, Option } from "./FormField";

export type EntryFormValues = Omit<Entry, "id">; 

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () =>void;
}

const EntryTypeOptions: Option[] = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },

];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses, patients }] = useStateValue()

  return (
    <Formik
    initialValues={{
      type: "HealthCheck",
      description: 'string',
      date: 'string',
      specialist: 'string',
      diagnosisCodes: ["Healthy"]
    }}
    onSubmit={onSubmit}
    validate={values => {
      /// ...
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />  
          <Field
            label="date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />  
          <Field
            label="specialist"
            placeholder="Dr."
            name="specialist"
            component={TextField}
          />  
          <Field
            label="healthCheckRating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />
          <SelectField 
            label="type"
            name="type"
            options={EntryTypeOptions}
          />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;