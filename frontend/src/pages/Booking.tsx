import React, { useContext } from 'react';
import { WhitePage } from '../components/WhitePage';
import { InnerContainer, InnerTitle } from '../components/InnerContainer';
import { Previous } from '../components/Previous';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, ResponsiveContext } from 'grommet';
import { SessionItem } from '../components/SessionItem';
import moment from 'moment';
import { useAuth0 } from '@auth0/auth0-react';
import { useSession } from '../hooks/sessions';

export function Booking() {

  const windowSize = useContext(ResponsiveContext)
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const sess = useSession(sessionId)
  const { isAuthenticated, user } = useAuth0()

  console.log(user);
  
  return (
    <WhitePage>
      <InnerContainer>
        <InnerTitle bottomPadding="small" >Booking</InnerTitle>
        <Grid 
          responsive
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
      <Previous 
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          left: '30px',
          top: '40px'
        }}/>

    </WhitePage>

  )
}