import { Box } from "grommet";
import { Moment } from "moment";
import { PropsWithChildren } from "react";
import { formatDateTime } from "../helpers/displayHelpers";
import { SmallSubTitle, SubParagraph } from "./Titles";

interface SessionTitlesProps {
  title: string
  date: Moment
  location: string
}

export function SessionTitles({
  title, date, location
}:PropsWithChildren<SessionTitlesProps>) {

  const dateTime = formatDateTime(date);

  return (
    <Box>
      <SmallSubTitle marginBottom="none">{title}</SmallSubTitle>
      <SubParagraph>{location || 'TBC'}<br/>
      {dateTime}
      </SubParagraph>
    </Box>
  )
}



