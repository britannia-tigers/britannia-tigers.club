import { Box, Grid } from "grommet";
import { InnerContainer } from "../components/InnerContainer";
import { WhitePage } from "../components/WhitePage";
import { Calendar } from "../components/TigersCalendar";
import { useSearchParams } from "react-router-dom";
import Mo from 'moment'
import { useEffect, useMemo } from "react";
import moment from "moment";
import { useSessions } from "../api/sessions";


/**
 * Session page
 * @returns 
 */
export function Session() {

  const [searchParams, setSearchParams] = useSearchParams()
  const sDate = searchParams.get('date') || undefined


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


  return (
    <WhitePage>
      <InnerContainer>
        <Grid>
          <Box>
            <Calendar 
              size="medium"
              onDateSelect={setDate}
              curDate={momentDate}/>
          </Box>
          <Box>

          </Box>
        </Grid>

      </InnerContainer>
    </WhitePage>   
  )
}

/**
 * format url date
 * @param d 
 * @returns 
 */
function formatUrlDate(d?:string) {
  return  Mo(d).startOf('day').format('YYYY-MM-DD')
}