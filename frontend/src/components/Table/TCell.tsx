import { TableCell, Text } from "grommet";
import { PropsWithChildren } from "react";


export const TCell = ({ children }:PropsWithChildren) => (
  <TableCell><Text size="small">{children}</Text></TableCell>
)