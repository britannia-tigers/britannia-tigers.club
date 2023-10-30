import { FormField, TextInput as GTextI } from "grommet";
import { HTMLInputTypeAttribute, useMemo } from "react";
import styled from "styled-components";

interface TextInputProps {
  label?: string
  placeholder?: string
  required?: boolean
  type?: HTMLInputTypeAttribute
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  name: string
  validate?:
    | {
        regexp?: object;
        message?: string | React.ReactNode;
        status?: 'error' | 'info';
      }
    | ((...args: any[]) => any)
    | (
        | {
            regexp?: object;
            message?: string | React.ReactNode;
            status?: 'error' | 'info';
          }
        | ((...args: any[]) => any)
      )[]
validateOn?: 'blur' | 'submit' | 'change'
}

const Input = styled(GTextI)`
  padding: 6px 0px;
  height: auto;
  border: 0;
  &:focus {
    box-shadow: none;
  }
`

export function TextInput({ 
  label, placeholder, required, type, onChange, 
  name, value, validate, validateOn = 'submit'
}:TextInputProps) {

  const id = useMemo(() => `text_input_${Math.round(Math.random() * 1000)}`, [])

  return (
    <FormField 
      name={name}
      placeholder={placeholder}
      required={required}
      type={type}
      validate={validate}
      validateOn={validateOn}
      label={label} 
      onChange={onChange}
      value={value}
      htmlFor={id}
      >
        <Input 
          name={name}
          value={value}
          onChange={onChange}
          type={type === undefined ? 'text' : type}
          required={required}
          id={id}
          placeholder={placeholder}
        /> 
    </FormField>
  )
}

const Error = styled.div`
  font-size: 12px;
`