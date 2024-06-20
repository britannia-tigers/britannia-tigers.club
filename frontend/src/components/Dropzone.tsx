import { FileInput, FormField } from 'grommet'
import { useCallback, useMemo, useRef, useState } from 'react'

export interface DropzoneProps {
  name: string
  maxCount?: number
  onChange?: (e: any) => Promise<void>;
}

export function Dropzone({
  name,
  maxCount = 10,
  onChange
}: DropzoneProps) {

  const [id, setId] = useState(`text_input_${Math.round(Math.random() * 1000)}`)

  const changeHandler = useCallback(async (e: any) => {
    if(!onChange) return
    try {
      await onChange(e)
      console.log('change complete: ', e)
      // stupid way to reset the input field
      e.target.value = null;
      setId(`text_input_${Math.round(Math.random() * 1000)}`)
    } catch(e) {
      console.error(e);
    }
  }, [onChange])

  return (
    <FormField 
      key={id}
      name={name} 
      htmlFor={id} required>
        <FileInput 
          id={id}
          key={id}
          multiple={{
            max: maxCount
          }}
          messages={{
            dropPromptMultiple: 'Drag and drop here or',
            maxFile: 'Maximum of {max} files only'
          }}
          onChange={changeHandler}
        />
    </FormField>
  )
}