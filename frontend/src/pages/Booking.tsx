import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
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
import { PageWrapper } from '../components/PageWrapper';

enum BookingStatusTypes {
  booking_info,
  booking_success,
  booking_error,
  booking_cancel,
  payment_success,
  payment_cancel
}

type BookingStatus = keyof typeof BookingStatusTypes


export function Booking() {

  const windowSize = useContext(ResponsiveContext)
  const { sessionId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const status = searchParams.get('status') as BookingStatus || undefined
  const navigate = useNavigate()
  const sess = useSession(sessionId)
  const { isAuthenticated, isLoading, user } = useAuth0()
  const [location, setLocation] = useState(sess?.location.map(n => Number(n)))

  useEffect(() => {
    if(sess?.location) setLocation(sess.location.map(n => Number(n)))
  }, [sess, sess?.location]);


  /**
   * return this if not user
   */
  if(!isLoading && !isAuthenticated) {
    return (
      <PageWrapper>
        <InnerContainer>
          <InnerTitle bottomPadding="small" >You are not logged in</InnerTitle>
          <Paragraph>
            Please sign up or log in above to view your booking.
          </Paragraph>
        </InnerContainer>
      </PageWrapper>
    )
  }

  /**
   * return according to status
   */
  switch(status) {
    case 'booking_info':
    case 'booking_success':
    case 'payment_success':
      return (
        <PageWrapper backTo='/session'>
          <InnerContainer>
            <BrowserView>
              <InnerTitle bottomPadding="small" >{ status ==='booking_success' ? 'Booking' : 'Payment' } Success</InnerTitle>
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
                    duration={sess.duration}
                    location={sess.location}
                    locationName={sess.locationName}
                    type={sess.type}
                    price={sess.price}
                    discount={sess.discount}
                    isBooked={sess.booked}
                    isPaid={sess.paid}
                    isBookingAvailable={sess.isBookingAvailable}
                  />
                )}
              </Box>
            </Grid>
          </InnerContainer>
        </PageWrapper>
      )
    case 'booking_cancel':
      return (
        <PageWrapper>
          <InnerContainer>
            <BrowserView>
              <InnerTitle bottomPadding="small" >Booking cancelled</InnerTitle>
            </BrowserView>
            <MobileView>
              <MobileInnerTitle>Session Booked</MobileInnerTitle>
            </MobileView>

          </InnerContainer>
        </PageWrapper>
      )
    case 'booking_error':
      return (
        <PageWrapper>
          <InnerContainer>
            <InnerTitle bottomPadding="small" >Error...</InnerTitle>
          </InnerContainer>
        </PageWrapper>
      )
    case 'payment_cancel':
      return (
        <PageWrapper backTo={`/session`}>
          <InnerContainer>
            <InnerTitle bottomPadding="small" >Payment cancelled</InnerTitle>
          </InnerContainer>
        </PageWrapper>
      )
    default:
      return (
        <InnerContainer>
          <InnerTitle bottomPadding="small" >Something went wrong</InnerTitle>
        </InnerContainer>
      )
  }

}