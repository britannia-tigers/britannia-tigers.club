import { Box, Button } from "grommet"
import moment, { Moment } from "moment"
import { Link, useNavigate } from "react-router-dom"
import { SessionTitles } from "./SessionTitles"
import { Paragraph } from "./Titles"
import { useAuth0 } from "@auth0/auth0-react"
import { useBookSession } from "../hooks/sessions"
import { useAuthToken } from "../hooks/auth"


interface SessionItemProps {
  id: string
  title: string
  type: string
  date: Moment
  location: [string, string]
  locationName: string
  description?: string
  price: number
  discount: number
  isBookingAvailable: boolean
}

export function SessionItem({
  id, 
  title,
  type,
  date,
  location,
  locationName,
  description,
  price,
  discount,
  isBookingAvailable
}: SessionItemProps) {

  const passed = moment().isAfter(date);
  const { isAuthenticated, user } = useAuth0()

  const navigate = useNavigate();
  const bookSession = useBookSession()
  const token = useAuthToken();
  const isMatch = type === 'friendly' || type === 'tournament';

  console.log('token', token);

  return (
    <Box 
      margin={{ bottom: 'medium' }}
      pad={{ bottom: 'medium' }}
      border={{
        side: 'bottom',
        style: 'dashed',
        color: '#999999'
      }}
    >
      <SessionTitles
        title={title}
        date={date}
        locationName={locationName}
        location={location}
      />
      <Paragraph marginTop="18px" marginBottom="18px">
        {description || 'A friendly session at a prime location.'}
        {passed && (
          <><br/> This session is passed, move on...</>
        )}
      </Paragraph>
      {!isMatch && <Paragraph bold>£{price.toFixed(2)} (£{(discount * price).toFixed(2)} for members)</Paragraph>}
      <Box align="start" pad={{
        top: 'small',
        bottom: 'xsmall'
      }}>
        {isMatch ? (
           <Box>
           <Paragraph>Feel free to come and watch us.</Paragraph>
         </Box>
        ) : isAuthenticated ? (
          <Button 
            size='small' 
            disabled={passed || !isBookingAvailable} 
            primary 
            label='BOOK' 
            onClick={() => !passed && isBookingAvailable && token && bookSession(token, id)}
            type="submit"/>
        ): (
          <Box>
            <Paragraph>Sign up or Login above to book this session.</Paragraph>
          </Box>
        )}
      </Box>
    </Box>
  );
}
