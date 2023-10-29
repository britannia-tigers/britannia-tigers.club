import React, { useContext, useEffect, useState } from 'react';
import { WhitePage } from '../components/WhitePage';
import { InnerContainer, InnerTitle, MobileInnerTitle } from '../components/InnerContainer';
import { Previous } from '../components/Previous';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Grid, ResponsiveContext } from 'grommet';
import { SessionItem } from '../components/SessionItem';
import moment from 'moment';
import { useAuth0 } from '@auth0/auth0-react';
import { useSession } from '../hooks/sessions';
import { Paragraph } from '../components/Titles';
import { BrowserView, MobileView } from 'react-device-detect';
import { Map } from '../components/Map';
import { User } from '../components/User';

export function Booking() {

  const windowSize = useContext(ResponsiveContext)
  const { sessionId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const status = searchParams.get('status') || undefined
  const navigate = useNavigate()
  const sess = useSession(sessionId)
  const { isAuthenticated, isLoading, user } = useAuth0()
  const [location, setLocation] = useState(sess?.location.map(n => Number(n)))

  useEffect(() => {
    if(sess?.location) setLocation(sess.location.map(n => Number(n)))
  }, [sess, sess?.location]);

  
  return (
    <WhitePage>
      {!isLoading && !isAuthenticated ? (
        <InnerContainer>
          <InnerTitle bottomPadding="small" >You are not logged in</InnerTitle>
          <Paragraph>
            Please sign up or log in above to view your booking.
          </Paragraph>
        </InnerContainer>
      ) : status === 'success' ? (
        <InnerContainer>
          <BrowserView>
            <InnerTitle bottomPadding="small" >Success!</InnerTitle>
          </BrowserView>
          <MobileView>
            <MobileInnerTitle>Session Booked</MobileInnerTitle>
          </MobileView>
          <Grid 
            responsive
            pad={windowSize === 'small' ? { horizontal: 'large' } : { horizontal: 'none' }}
            columns={windowSize === 'small' ? ['1'] : ['1/2', '1/2']}
            rows={windowSize === 'small' ? ['flex', 'flex'] : ['flex']}
            gap={{
              row: windowSize === 'small' ? 'large' : 'none',
              column: windowSize === 'small' ? 'none' : 'medium'
            }}
            areas={windowSize === 'small' ? [
              { name: 'calendar', start: [0, 0], end: [0, 0] },
              { name: 'events', start: [0, 1], end: [0, 1] }
            ] : [
              { name: 'calendar', start: [0, 0], end: [0, 0] },
              { name: 'events', start: [1, 0], end: [1, 0] }
            ]}
            >
            <Box gridArea="calendar" align="center">
              {location && <Map lnglat={location}/>}
            </Box>
            <Box gridArea="events">
              {sess && (
                <SessionItem 
                  id={sess.id}
                  title={sess.name}
                  date={moment(sess.date)}
                  location={sess.location}
                  locationName={sess.locationName}
                  type={sess.type}
                  price={sess.price}
                  discount={sess.discount}
                  isBookingAvailable={sess.isBookingAvailable}
                />
              )}
            </Box>
          </Grid>
        </InnerContainer>
      ) : status === 'error' ? (
        <InnerContainer>
          <InnerTitle bottomPadding="small" >Error...</InnerTitle>
        </InnerContainer>
      ) : (
        <InnerContainer>
          <InnerTitle bottomPadding="small" >Something went wrong</InnerTitle>
        </InnerContainer>
      )}
      <User showInMobileView={true}/>
      <Previous 
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          left: '20px',
          top: '30px'
        }}/>
    </WhitePage>
  )
}