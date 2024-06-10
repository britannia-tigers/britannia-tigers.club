import { useCallback, useEffect, useState } from "react";
import { Box, DateInput, Text } from "grommet";
import moment from "moment";
import { useSessions } from "../hooks/sessions";
import { Link, useSearchParams } from "react-router-dom";
import { formatDisplayShortDate, formatUrlDate, strTrimmer } from "../helpers/displayHelpers";
import { Copy, Edit, Share } from "grommet-icons";
import { AdminContainer } from "../components/AdminContainer";
import { TBody, TCell, THead, TRow, TTable } from "../components/Table";
import { RGBA_ASTC_10x10_Format } from "three/src/constants.js";
import { BookingAvailable } from "../components/BookingAvailable";
import { Tip } from "../components/Tip";


export function Admin() {

  const curDate = moment()

  const [searchParams, setSearchParams] = useSearchParams()
  const sDate = searchParams.get('start') || curDate.clone().subtract(3, 'months').toISOString()
  const eDate = searchParams.get('end') || curDate.clone().add(1, 'month').toISOString()

  const [dates, setDates] = useState<[string, string]>([sDate, eDate])

  useEffect(() => {
    const s = searchParams.get('start')
    const e = searchParams.get('end')
  
    if(!s || !e) {
      setDates([curDate.clone().subtract(3, 'months').toISOString(), curDate.clone().add(1, 'month').toISOString()])
    }

  }, [searchParams])

  useEffect(() => {
    if(dates) {
      setSearchParams(param => {
        param.set('start', formatUrlDate(dates[0]))
        param.set('end', formatUrlDate(dates[1]))
        return param
      })
    }
  }, [dates])

  const sessions = useSessions(dates ? { startDate: dates[0], endDate: dates[1] } : {})

  const changeHandler = useCallback((event: { value: string |string[] }) => {
      const v = event.value;
      console.log('onChange iso date:', v);
      console.log(
        'onChange utc date:',
        new Date(v[0]),
        new Date(v[1]),
      );
      setDates([v[0], v[1]])
  }, [sDate, eDate])

  return (
    <AdminContainer>
      <Box 
        pad={{ bottom: 'medium' }}
        fill={false} alignSelf="start">
        <DateInput
          value={dates}
          buttonProps={{
            size: 'xsmall',
            style:{borderRadius: '30px'},
            pad: { horizontal: 'medium', vertical: 'xsmall' },
            justify: 'start',
            secondary: true,
            label: dates ? `${formatDisplayShortDate(dates[0])} - ${formatDisplayShortDate(dates[1])}` : '',
          }}
          onChange={changeHandler}
        />
      </Box>
      { dates && (
        <TTable>
          <THead>
            <TCell />
            <TCell>Date</TCell>
            <TCell>Session name</TCell>
            <TCell>Location</TCell>
            <TCell>Participants</TCell>
            <TCell>Waiting list</TCell>
            <TCell>Paid</TCell>
            <TCell>ID</TCell>
            <TCell />
          </THead>
          <TBody>
          {sessions && sessions.map(s => {

            const diff = (s.participants && s.maxParticipants) ? s.participants.length - s.maxParticipants : 0
            const participants = s.participants && diff <= 0 ? s.participants.length : s.maxParticipants

            return (
              <TRow>
                <TCell>
                  {s.isBookingAvailable && (
                    <Tip hint='Session is available for booking'>
                      <Box><BookingAvailable /></Box>
                    </Tip>
                  )}
                </TCell>
                <TCell>{formatDisplayShortDate(s.date)}</TCell>
                <TCell><Link to={`/admin/session/${s.id}`}>{s.name}</Link></TCell>
                <TCell>{s.locationName}</TCell>
                <TCell><Text color='grey' size='small'>{participants || 0}</Text> / {s.maxParticipants ? s.maxParticipants : <>&#8734;</>}</TCell>
                <TCell><Text color='grey' size='small'>{diff > 0 ? diff : 0}</Text> / {s.maxWaitingList || <>&#8734;</>}</TCell>
                <TCell><Text color='grey' size='small'>{s.paidParticipants?.length || 0}</Text> / {s.maxParticipants || <>&#8734;</>}</TCell>
                <TCell>
                  <Tip hint='Copy session ID'>
                    <a>{strTrimmer(s.id, 4)} <Copy color="#cccccc" size="small"/></a>
                  </Tip>
                </TCell>
                <TCell><Share size='small' /></TCell>
              </TRow>
            )
          })}
          </TBody>
        </TTable> 
        )
      }    
    </AdminContainer>
  )
}