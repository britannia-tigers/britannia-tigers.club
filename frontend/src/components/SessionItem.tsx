import { Box, Button, ResponsiveContext } from "grommet"
import moment, { Moment } from "moment"
import { Link, useNavigate } from "react-router-dom"
import { SessionTitles } from "./SessionTitles"
import { Paragraph } from "./Titles"
import { useAuth0 } from "@auth0/auth0-react"
import { useBookSession } from "../hooks/sessions"
import { useAuthToken } from "../hooks/auth"
import { MouseEvent, useCallback, useContext } from "react"


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

  const windowSize = useContext(ResponsiveContext)
  const passed = moment().isAfter(date);
  const { isAuthenticated, user } = useAuth0()

  const navigate = useNavigate();
  const bookSession = useBookSession()
  const token = useAuthToken();
  const isMatch = type === 'friendly' || type === 'tournament';


  /**
   * click handler
   */
  const clickHandler = useCallback(() => {
    async function fetch() {
      if(!passed && isBookingAvailable && token) {
        try {
          await bookSession(token, id);
          navigate(`/session/${id}?status=success`)
        } catch(e) {
          navigate(`/session/${id}/?status=error&message${(e as Error)?.message || 'Unknown message'}`)
        }
      }
    }

    fetch()

  }, [passed, isBookingAvailable, token])


  return (
    <Box 
      margin={windowSize === 'small' ? { top: 'none', bottom: 'large'} : { bottom: 'medium' }}
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
      </Paragraph>
      {!isMatch && <Paragraph bold>£{price.toFixed(2)} (£{(discount * price).toFixed(2)} for members)</Paragraph>}
      <Box 
        align="start" 
        margin={{
          bottom: 'none'       
        }}
        pad={windowSize === 'small' ? {
          top: 'none',
          bottom: 'medium'       
        } : {
          top: 'small',
          bottom: 'xsmall'
        }}
      >
        {passed ? (
          <Box>
            <Paragraph>This session has passed, move on...</Paragraph>
          </Box>
        ): isMatch ? (
           <Box>
           <Paragraph>This is a team/members only event, however feel free to come and cheer for us!</Paragraph>
         </Box>
        ) : isAuthenticated ? (
          <Button 
            margin={windowSize === 'small' ? { top: 'medium' } : { top: 'small' }}
            size='small' 
            disabled={passed || !isBookingAvailable} 
            primary 
            label='BOOK' 
            onClick={clickHandler}
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
