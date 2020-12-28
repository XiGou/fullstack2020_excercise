import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps, useFormikContext } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, Gender, EntryType, Entry } from "../types";
import { generatePath } from "react-router-dom";

// structure of a single option
export type Option = {
  value: Gender|EntryType|string;
  label: string;
};


// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: Option[];
};



export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options
}: SelectFieldProps) => {

  const [entryType, setEntryType] = useState("HealthCheck");

  const {
    values,
    handleChange,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    isValid // will work with validation schema or validate fn defined
  } = useFormikContext();

  const myHandleChange = (e:React.ChangeEvent<HTMLInputElement>)  => {
    const selectedEntryType = e.target.value;
    setEntryType(selectedEntryType)
    console.log("myHandle selected", selectedEntryType,values);
    handleChange(e)
  };
  if (entryType == "HealthCheck" ) {
    return (
      <Form.Field>
        <label>{label}</label>
        <Field as="select"  name={name} className="ui dropdown" onChange={myHandleChange}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </Field>
        
        <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
    
      </Form.Field>
    )
  }

  if(entryType == "Hospital") {
    return (
      <Form.Field>
        <label>{label}</label>
        <Field as="select"  name={name} className="ui dropdown" onChange={myHandleChange}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </Field>
        
        <Field
            label="discharge date"
            placeholder="XXXX-XX-XX"
            name="dischargeDate"
            component={TextField}
          />  
        <Field
            label="discharge criteria"
            placeholder="XXXX-XX-XX"
            name="dischargeCriteria"
            component={TextField}
          />  
    
      </Form.Field>
    )
  }
  // type is OccupationalHealthcare 
  return (
    <Form.Field>
      <label>{label}</label>
      <Field as="select"  name={name} className="ui dropdown" onChange={myHandleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
      
      <Field
            label="employerName"
            placeholder="jiangson"
            name="employerName"
            component={TextField}
          />  
        <Field
            label="sickLeave startDate"
            placeholder="XXXX-XX-XX"
            name="sickLeaveStartDate"
            component={TextField}
          />  
        <Field
            label="sickLeave endDate"
            placeholder="XXXX-XX-XX"
            name="sickLeaveEndDate"
            component={TextField}
          />  
  
    </Form.Field>
  )

 };

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
