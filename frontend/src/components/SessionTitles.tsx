import { Box, BoxExtendedProps, ResponsiveContext, Text } from "grommet";
import { Moment } from "moment";
import { PropsWithChildren, useContext } from "react";
import { formatDateTime } from "../helpers/displayHelpers";
import { SmallSubTitle, SubParagraph } from "./Titles";

interface SessionTitlesProps extends BoxExtendedProps {
  title: string
  date: Moment
  duration: number
  locationName: string
  location?: [string, string]
}

export function SessionTitles ({
  title, date, locationName, location, duration, ...restProps
}:PropsWithChildren<SessionTitlesProps>) {

  const dateTime = formatDateTime(date);
  const link = location && `https://www.google.com/maps/search/?api=1&query=${location[1]}%2C${location[0]}&zoom=17`;
  
  return (
    <Box {...restProps}>
      <SmallSubTitle marginBottom="none">{title}</SmallSubTitle>
      <SubParagraph isLink={true} onClick={() => window.open(link, 'gmap')}>{locationName || 'TBC'}</SubParagraph>
      <SubParagraph>{dateTime} <Text size='xsmall' color='#888888'>({duration}mins)</Text></SubParagraph>
    </Box>
  )
}

