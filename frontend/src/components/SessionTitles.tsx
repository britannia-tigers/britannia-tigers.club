import { Box } from "grommet";
import { Moment } from "moment";
import { PropsWithChildren } from "react";
import { formatDateTime } from "../helpers/displayHelpers";
import { SmallSubTitle, SubParagraph } from "./Titles";

interface SessionTitlesProps {
  title: string
  date: Moment
  locationName: string
  location?: [string, string]
}

export function SessionTitles({
  title, date, locationName, location
}:PropsWithChildren<SessionTitlesProps>) {

  const dateTime = formatDateTime(date);
  const link = location && `https://www.google.com/maps/search/?api=1&query=${location[1]}%2C${location[0]}&zoom=17`;
  
  return (
    <Box>
      <SmallSubTitle marginBottom="none">{title}</SmallSubTitle>
      <SubParagraph isLink={true} onClick={() => window.open(link, 'gmap')}>{locationName || 'TBC'}</SubParagraph>
      <SubParagraph>{dateTime}</SubParagraph>
    </Box>
  )
}



