import moment, { Moment } from "moment";

/**
 * format date time to visible 
 * @param t 
 * @returns 
 */
export const formatDateTime = (t: Moment, dateOnly?:boolean):string => 
  t.isValid() ? t.format(`DD MMM YYYY ${dateOnly ? '' : 'HH:mm'}`) : '...';

/**
 * format url date
 * @param d 
 * @returns 
 */
export function formatUrlDate(d?:string) {
  return  moment(d).startOf('day').format('YYYY-MM-DD')
}

export function formatDisplayLongDate(d?:string) {
  return moment(d).startOf('day').format('Do MMM YYYY')
}

export function formatDisplayShortDate(d?:string) {
  return moment(d).startOf('day').format('DD MMM YYYY')
}

export function strTrimmer(str:string, pad:number = 5) {
  return `${str.substring(0, pad)}...${str.substring(str.length - pad, str.length)}`
}