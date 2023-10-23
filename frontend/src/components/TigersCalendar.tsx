import { Box, CalendarHeaderProps, Calendar as GCalendar, Grid, Paragraph } from "grommet"
import moment, { Moment } from "moment"
import { Next, Previous, Calendar as CalIcon } from 'grommet-icons'
import { isMobile } from "react-device-detect"
import { useState } from "react"
import { useSessions } from "../api/sessions"

interface ICalendar {
  size?: string
  curDate: Moment
  onDateSelect: (date:string | string[]) => void
}

export function Calendar({ 
  curDate, size, onDateSelect 
}: ICalendar) {

  const sess = useSessions({
    startDate: curDate.startOf('month').toISOString(),
    endDate: curDate.endOf('month').toISOString()
  })

  console.log(curDate, sess.map(s => s.date))

  const dates = sess.map(({ date }) => moment(date).startOf('day').toISOString())

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
          header={v => <Header {...v} onReset={() => onDateSelect(moment().startOf('day').toISOString())}/>}
          firstDayOfWeek={0}
          dates={dates}
          color="black"
          size={size}
          showAdjacentDays={false}
          onReference={r => console.log(r)}
          onSelect={select => onDateSelect(select)}
        >
          {props => <Day {...props} curDate={curDate}/>}
        </GCalendar>
    </Box>
  )
}

interface IDay {
  isSelected: boolean
  curDate: Moment
  date: Date
  day: number
}

function Day({
  isSelected,
  curDate,
  date,
  day
}:IDay) {

  console.log('box: ', curDate.toISOString(), date)

  return (
    <Box 
      alignContent="center"
      round='2px'
      width='100%'
      justify='center' 
      align="center"
      border={{
        color: curDate.isSame(date) ? 'brand' : 'none',
        // size: '2px'
      }}
    >
      <Box
        margin='2px'
        pad='5px'
        // background={curDate.isSame(date) ? 'brand' : 'none'}
        style={{
          boxSizing: 'border-box',
          color: isSelected ? '#d5ca00' : 'none'
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
  locale,
  onPreviousMonth,
  onNextMonth,
  onReset,
  previousInBound,
  nextInBound,
}:CalendarHeaderProps & { onReset: () => void }) {
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
      <Box gap="xsmall" gridArea="icons" direction="row-reverse" justify="start" align="center">
        <Next onClick={onNextMonth} color="black" size="18px"/>
        <Previous onClick={onPreviousMonth} color="black" size="18px"/>
        <CalIcon onClick={onReset} color="black" size="18px"/> 
      </Box>
    </Grid>
  )
}