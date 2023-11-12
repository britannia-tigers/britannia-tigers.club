import { Box, Tag as  GroTag, TagExtendedProps } from 'grommet'

export const Tag = ({ value, name, ...rest}:TagExtendedProps) => (
    <GroTag 
      size='xsmall'
      name={name?.toUpperCase()}
      value={value?.toString().toUpperCase()}
      {...rest} />
  )