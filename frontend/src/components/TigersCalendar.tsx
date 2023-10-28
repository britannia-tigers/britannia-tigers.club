import { Box, CalendarHeaderProps, Calendar as GCalendar, Grid, Paragraph } from "grommet"
import moment, { Moment } from "moment"
import { Next, Previous, Calendar as CalIcon } from 'grommet-icons'
import { isMobile } from "react-device-detect"
import { useEffect, useMemo, useState } from "react"
import { useSessions } from "../api/sessions"
import { SessionResponse } from "../api/api.interface"

interface ICalendar {
  size?: string
  curDate: Moment
  onDateSelect: (date:string | string[]) => void
  onSessions: (sess: SessionResponse[]) => void
}

interface IDay {
  isSelected: boolean
  isInRange: boolean
  activeMomentDates: Moment[]
  date: Date
  day: number
}


/**
 * Calendar of Tigers with sessions
 * @param param0 
 * @returns 
 */
export function Calendar({ 
  curDate, size, onDateSelect, onSessions
}: ICalendar) {


  /**
   * generate variable with curDate changes
   */
  const [startDate, endDate, lastMonth, nextMonth] = useMemo(() => {
    const sDate = curDate.clone().startOf('month');
    const eDate = curDate.clone().endOf('month');

    const nextMonthFirstDate = curDate.clone().add(1, 'month').startOf('month');
    const lastMonthLastDate = curDate.clone().subtract(1, 'month').endOf('month');
    
    return [sDate, eDate, lastMonthLastDate, nextMonthFirstDate];
  }, [curDate])

  /**
   * get sessions within the month
   */
  const sess = useSessions({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  })

  /**
   * redate with start of the day
   */
  const dates = sess.map(({ date }) => moment(date).startOf('day').toISOString())

  /**
   * filter out day that is not today
   */
  useEffect(() => onSessions(sess.filter(s => moment(s.date).isSame(curDate, 'day'))), [sess, curDate]);


  return (
    <Box 
      pad='medium'
      elevation="medium" 
      height='350px'
      width='320px'>
          <GCalendar
            daysOfWeek
            animate={false}
            fill={true}
            header={({ date }) => (
              <Header
                date={date} 
                onPreviousMonth={() => onDateSelect(lastMonth.toISOString())}
                onNextMonth={() => onDateSelect(nextMonth.toISOString())}
                onReset={() => onDateSelect(moment().startOf('day').toISOString())}
              />
            )}
            firstDayOfWeek={0}
            date={curDate.toISOString()}
            color="black"
            size={size}
            showAdjacentDays={false}
            onReference={r => console.log('on Reference: ', r)}
            onSelect={select => onDateSelect(select)}
          >
            {props => <Day {...props} activeMomentDates={dates.map(d => moment(d))}/>}
          </GCalendar>
    </Box>
  )
}



/**
 * Day component of the tigers calendar
 * @param param0 
 * @returns 
 */
function Day({
  isSelected,
  activeMomentDates,
  date,
  day
}:IDay) {

  const isActiveDate = activeMomentDates.find(m => m.isSame(date))?.isValid();

  return (
    <Box 
      alignContent="center"
      round='2px'
      width='100%'
      justify='center' 
      align="center"
      border={{
        color: isSelected ? 'brand' : 'none'
      }}
    >
      <Box
        margin='2px'
        pad='5px'
        style={{
          boxSizing: 'border-box',
          color: isActiveDate ? '#d5ca00' : 'none'
        }}
        round='2px'>
        {day}
      </Box>
    </Box>
  )
}


/**
 * Header
 * @param param0 
 * @returns 
 */
function Header({
  date,
  onPreviousMonth,
  onNextMonth,
  onReset
}:Partial<CalendarHeaderProps> & { onReset: () => void }) {
  const moDate = moment(date)
  const month = moDate.format('MMM')
  const year = moDate.year()
  return (
    <Grid
      pad={{horizontal:'small', top: 'small', bottom: 'medium'}}
      columns={['70%', '30%']}
      rows={['1']}
      areas={isMobile ? [] : [['monthYear', 'icons']]}
    >
      <Box gridArea="monthYear"><Paragraph margin='none'>
          {month} {year}
        </Paragraph></Box>
      <Box gap="xsmall" gridArea="icons" direction="row-reverse" justify="start" align="center" style={{ paddingBottom: '4px' }}>
        <Next onClick={onNextMonth} color="black" size="18px" style={{ cursor: 'pointer' }}/>
        <Previous onClick={onPreviousMonth} color="black" size="18px" style={{ cursor: 'pointer' }}/>
        <CalIcon onClick={onReset} color="black" size="18px" style={{ cursor: 'pointer' }}/> 
      </Box>
    </Grid>
  )
}