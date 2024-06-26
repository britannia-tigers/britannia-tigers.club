import { Box, Grid, ResponsiveContext } from "grommet";
import { InnerContainer, InnerTitle, MobileInnerTitle } from "../components/InnerContainer";
import { WhitePage } from "../components/WhitePage";
import { Calendar } from "../components/TigersCalendar";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Mo from 'moment'
import { useContext, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Paragraph, SmallSubTitle } from "../components/Titles";
import { SessionResponse, UserSessionResponse } from "../api/api.interface";
import { formatDateTime } from "../helpers/displayHelpers";
import { Previous } from "../components/Previous";
import { SessionItem } from "../components/SessionItem";
import { User } from "../components/User";
import { useNaviStore } from "../stores/NaviStore";
import { BrowserView, MobileView } from "react-device-detect";
import { formatUrlDate } from "../helpers/displayHelpers";


/**
 * Session page
 * @returns 
 */
export function Session() {

  const { setTextColor } = useNaviStore();
  const [searchParams, setSearchParams] = useSearchParams()
  const sDate = searchParams.get('date') || undefined

  useEffect(() => setTextColor('#000000'), []);

  const [sessions, setSessions] = useState<UserSessionResponse[]>();

  /**
   * set date accordingly
   * @param dateStr 
   */
  function setDate(dateStr:string | string[]) {
    if(Array.isArray(dateStr)) {
      setSearchParams(param => {
        param.append('startDate', formatUrlDate(dateStr[0]))
        param.append('endDate', formatUrlDate(dateStr[1]))
        return param
      })
    } else {
      setSearchParams(param => {
        param.set('date', formatUrlDate(dateStr))
        return param
      })
    }
  }

  /**
   * set default date to today
   */
  useEffect(() => {
    if(sDate && Mo(sDate).isValid()) return

    const nDate = formatUrlDate()
    setDate(nDate)
  }, [])

  const momentDate = useMemo(() => Mo(sDate).startOf('day'), [sDate])

  const navigate = useNavigate();

  const windowSize = useContext(ResponsiveContext);

  return (
    <WhitePage>
      <InnerContainer>
        <BrowserView>
          <InnerTitle bottomPadding="small" >Sessions</InnerTitle>
        </BrowserView>
        <MobileView>
          <MobileInnerTitle bottomPadding="medium" >Sessions</MobileInnerTitle>
        </MobileView>

        <Grid 
          pad={windowSize === 'small' ? { horizontal: 'large', vertical: 'none' } : 'none'}
          responsive
          columns={windowSize === 'small' ? ['flex'] : ['1/2', '1/2']}
          rows={windowSize === 'small' ? ['auto', 'auto'] : ['flex']}
          gap={{
            row: windowSize === 'small' ? 'large' : 'medium',
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
            <Calendar 
              size="medium"
              onDateSelect={setDate}
              onSessions={setSessions}
              curDate={momentDate}/>
          </Box>
          <Box gridArea="events">
            {sessions && sessions.length > 0 ? sessions.sort((a, b) => moment(a.date).diff(b.date, 'second')).map(sess => (
              <SessionItem 
                id={sess.id}
                title={sess.name} 
                type={sess.type}
                description={sess.description}
                date={moment(sess.date)}
                duration={sess.duration}
                location={sess.location}
                locationName={sess.locationName}
                price={sess.price}
                discount={sess.discount}
                isBookingAvailable={sess.isBookingAvailable}
                isBooked={sess.booked}
                isPaid={sess.paid}
                availability={sess.maxParticipants && (sess.maxParticipants - (sess.participants?.length || 0))}
              />
            )) : (
              <>              
                <SmallSubTitle marginBottom="18px">Oops...</SmallSubTitle>
                <Paragraph>
                  Looks like there is no session 
                  { momentDate.isSame(moment(), 'day') ? ' today' : ` on the ${formatDateTime(momentDate, true)}` }.
                  Use the date picker on the left 
                </Paragraph>
              </>
            )}
          </Box>
        </Grid>

      </InnerContainer>
      <User showInMobileView={true}/>

      <Previous 
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          left: '20px',
          top: '30px'
        }}/>
    </WhitePage>   
  )
}