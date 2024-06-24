import { FormField, TextInput as GTextI } from "grommet";
import { ChangeEvent, HTMLInputTypeAttribute, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

interface TextInputProps {
  label?: string
  placeholder?: string
  required?: boolean
  type?: HTMLInputTypeAttribute
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  name: string
  disabled?: boolean
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
  label, placeholder, required, type, onChange, disabled,
  name, value: initialValue, validate, validateOn = 'submit'
}:TextInputProps) {

  const id = useMemo(() => `text_input_${Math.round(Math.random() * 1000)}`, [])
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if(onChange) onChange(e);
  }, [onChange])

  useEffect(() => setValue(initialValue), [initialValue])

  return (
    <FormField 
      name={name}
      placeholder={placeholder}
      required={required}
      type={type}
      validate={validate}
      validateOn={validateOn}
      label={label} 
      onChange={handleChange}
      value={value}
      disabled={disabled}
      htmlFor={id}
      >
        <Input 
          name={name}
          value={value}
          onChange={handleChange}
          type={type === undefined ? 'text' : type}
          required={required}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
        /> 
    </FormField>
  )
}

const Error = styled.div`
  font-size: 12px;
`