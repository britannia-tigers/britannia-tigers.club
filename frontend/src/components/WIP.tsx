import { Box } from "grommet";
import { PropsWithChildren } from "react";

interface WIPProps {
  align?: string
}

export function WIP({ children, align = 'left' }: PropsWithChildren<WIPProps>) {

  return (
    <Box 
      style={{
        position: 'absolute', 
        top: 0,
        zIndex:99,
        background: 'rgba(255, 255, 255, 0.85)'
      }} 
      fill align='center' justify="center">
        <Box align={align}>
          {children}
        </Box>
    </Box>
  )
}