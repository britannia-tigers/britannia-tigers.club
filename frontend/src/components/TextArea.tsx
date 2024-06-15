import { FormField, TextArea as GTA } from "grommet";
import { useCallback, useMemo, useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";


interface TextAreaProps {
  label?: string
  placeholder?: string
  maxLength?: number
  rows?: number
  required?: boolean
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  value?: string
  name: string
}

const TA = styled(GTA)`
  border: 0;
  padding: 12px 0px;
  &:focus {
    box-shadow: none;
  }
`

export function TextArea({ name, value, onChange, label, placeholder, required, maxLength = 250, rows=3 }:TextAreaProps) {

  const id = useMemo(() => `text_input_${Math.round(Math.random() * 1000)}`, [])
  const [v, setV] = useState<string>(value || '');
  useEffect(() => value ? setV(value) : undefined, [value]);

  const handleChange = useCallback((e:ChangeEvent<HTMLTextAreaElement>) => {
    setV(e.target.value)
    if(onChange) onChange(e);
  }, [value])

  return (
    <FormField 
      name={name}
      value={v}
      required={required}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={rows}
      label={label} 
      htmlFor={id}
    >
      <TA 
        name={name}
        value={v}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        id={id}
        />
    </FormField>
  )
}