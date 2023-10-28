import { Moment } from "moment";

/**
 * format date time to visible 
 * @param t 
 * @returns 
 */
export const formatDateTime = (t: Moment, dateOnly?:boolean):string => 
  t.isValid() ? t.format(`DD MMM YYYY ${dateOnly ? '' : 'HH:mm'}`) : '...';