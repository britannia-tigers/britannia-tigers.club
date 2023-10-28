import { Box, Button, Grid, ResponsiveContext } from "grommet";
import { InnerContainer, InnerTitle } from "../components/InnerContainer";
import { WhitePage } from "../components/WhitePage";
import { Calendar } from "../components/TigersCalendar";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Mo, { Moment } from 'moment'
import { useContext, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useSessions } from "../api/sessions";
import { SessionTitles } from "../components/SessionTitles";
import { Paragraph, SmallSubTitle, SubTitle } from "../components/Titles";
import { SessionResponse } from "../api/api.interface";
import { formatDateTime } from "../helpers/displayHelpers";
import { Previous } from "../components/Previous";


/**
 * Session page
 * @returns 
 */
export function Session() {

  const [searchParams, setSearchParams] = useSearchParams()
  const sDate = searchParams.get('date') || undefined

  const [sessions, setSessions] = useState<SessionResponse[]>();

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
        <InnerTitle bottomPadding="small" >Sessions</InnerTitle>
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
            <Calendar 
              size="medium"
              onDateSelect={setDate}
              onSessions={setSessions}
              curDate={momentDate}/>
          </Box>
          <Box gridArea="events">
            {sessions && sessions.length > 0 ? sessions.map(sess => (
              <SessionItem 
                id={sess.id}
                title={sess.name} 
                description={sess.description}
                date={moment(sess.date)}
                location={sess.locationName}
                price={sess.price}
                discount={sess.discount}
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
      <Previous 
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          left: '30px',
          top: '40px'
        }}/>
    </WhitePage>   
  )
}


interface SessionItemProps {
  id: string
  title: string
  date: Moment
  location: string
  description?: string
  price: number
  discount: number
}

function SessionItem({
  id, 
  title,
  date,
  location,
  description,
  price,
  discount
}: SessionItemProps) {

  const disabled = moment().isAfter(date);
  const navigate = useNavigate();
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
        location={location}
      />
      <Paragraph marginTop="18px" marginBottom="18px">
        {description || 'A friendly session at a prime location.'}
        {disabled && (
          <><br/> This session is passed, move on...</>
        )}
      </Paragraph>
      <Paragraph bold>£{price} (£{(discount * price).toFixed(2)} for members)</Paragraph>
      <Box align="start" pad={{
        top: 'small',
        bottom: 'xsmall'
      }}>
        <Button 
          size='small' 
          disabled={disabled} 
          primary 
          label='BOOK' 
          onClick={() => !disabled && navigate(`/session/${id}`)}
          type="submit"/>
      </Box>
    </Box>
  );
}

/**
 * format url date
 * @param d 
 * @returns 
 */
function formatUrlDate(d?:string) {
  return  Mo(d).startOf('day').format('YYYY-MM-DD')
}