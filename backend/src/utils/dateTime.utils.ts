import * as moment from "moment";
import "moment-timezone";

/**
 * get up coming day of week
 * it will get the next week even if today is day of week
 * 0 is sunday and 6 is saturday
 * @param day 
 */
export function getNextDayOfWeek(targetDay:number, targetHour:number = 0) {
  const today = moment().tz("Europe/London").isoWeekday();

  if(today < targetDay) {
    return moment()
      .tz("Europe/London")
      .isoWeekday(targetDay)
      .hours(targetHour)
      .minutes(0);
  } else {
    return moment()
      .tz("Europe/London")
      .startOf('day').add(1, 'weeks')
      .isoWeekday(targetDay)
      .hours(targetHour)
      .minutes(0);
  }
}