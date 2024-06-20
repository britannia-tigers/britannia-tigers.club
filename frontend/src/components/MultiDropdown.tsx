import { FormField, SelectMultiple } from "grommet";
import { useMemo } from "react";

export interface MultiDropdownProps<T = string[]> {
  options: string[]
  name: string
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  label?: string
  defaultValue?: T
}

export function MultiDropdown({ 
  options,
  name,
  placeholder = 'Select',
  onChange,
  disabled,
  label,
  defaultValue
}: MultiDropdownProps) {

  const id = useMemo(() => `multi_select_${Math.round(Math.random() * 1000)}`, [])

  return (
    <FormField
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      label={label} 
      htmlFor={id}
      defaultValue={defaultValue}
    >
      <SelectMultiple
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </FormField>
  )
}