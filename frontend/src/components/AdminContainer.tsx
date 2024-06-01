import { Box, Header } from "grommet";
import { PropsWithChildren, ReactNode } from "react";
import { Emblem } from "./Emblem";
import { User } from "./User";
import { SubTitle } from "./Titles";
import { Link } from "react-router-dom";
import { AdminTitleLink } from "./AdminTitleLink";

interface IProps {
  heading?: ReactNode | string
}

export function AdminContainer({ heading, children }: PropsWithChildren<IProps>) {

  return (
    <Box>
      <Header
        sticky='scrollup'
        pad={{vertical: 'small', horizontal: 'medium'}}
        background="light-2"
        alignContent="start"
        direction="row"
        justify="between"
        fill='horizontal'
      >
        <Box direction="row" justify="center" alignContent="center" gap="small">
          <Emblem height="32px" />
          <Box fill='vertical' alignContent="center" justify="center"><SubTitle marginTop="5px" marginBottom="none"><AdminTitleLink to='/admin'>Admin Panel</AdminTitleLink> {heading ? <>- {heading}</> : ''}</SubTitle></Box>
        </Box>
        <User notFixed padding='none' />
      </Header>
      <Box 
        pad={{
        top: 'medium',
        horizontal: 'medium'
        }}
        >
        {children}
      </Box>
    </Box>

  )
}