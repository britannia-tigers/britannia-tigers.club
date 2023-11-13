import { Box, Tip as  GTip, Text, TipProps as GTipProps } from 'grommet';
import { ReactNode } from 'react';

export interface TipProps extends GTipProps {
  hint?: string | ReactNode
}

export const Tip = ({ children, hint, ...props }:TipProps) => (
  <GTip 
    plain
    dropProps={{ align: { top: 'bottom', left: 'left' } }}
    content={
      <Box round={'xsmall'} background='black' pad="xsmall" gap="xsmall" width={{ max: 'xsmall' }}>
        <Text size="xsmall">
          {hint}
        </Text>
      </Box>
    }
    {...props}>{children}</GTip>
)