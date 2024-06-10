import axios from 'axios'
import { GB_LOCALE, ItemResponse, ListResponse, SessionRequest, SessionResponse, SessionType } from './api.interface'
import { useEffect, useState } from 'react'

export interface ApiSessionGetQuery {
  id?: string
  date?: string
  startDate?: string
  endDate?: string
  name?: string
  location?: [number, number]
  skip?: number
  limit?: number

}

/**
 * Add self to a session
 * @param authToken 
 * @param id 
 * @returns 
 */
export async function addSelfToSession(authToken:string, id:string) {
  const res = await axios.post<ItemResponse<SessionRequest>>(`/api/sessions/${id}/participants/self`, {}, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  });

  return convertOne(res.data);
}

export async function removeSelfSession(authToken: string, id:string) {
  const response = await axios.delete<ItemResponse<SessionRequest>>(`/api/sessions/${id}/participants/self`, {
    headers: {
      Authorization: `bearer ${authToken}`
    }
  });
  return response.data;
}

/**
 * get a session by id
 * @param id 
 * @returns 
 */
export async function getSessionById(id:string) {
  const sessionsRes = await axios.get<ItemResponse<SessionRequest>>(`/api/sessions/${id}`);
  return convertOne(sessionsRes.data);
}

/**
 * get all assets
 * @returns 
 */
export async function getSessions({
  date,
  startDate,
  endDate,
  name,
  location,
  skip,
  limit
}: ApiSessionGetQuery) {

  const sessionsRes = await axios.get<ListResponse<ItemResponse<SessionRequest>>>('/api/sessions', {
    params: {
      name: name && encodeURI(name),
      location: location && encodeURI(location?.join(',')),
      skip,
      limit,
      date: date && encodeURI(date),
      startDate: startDate && encodeURI(startDate),
      endDate: endDate && encodeURI(endDate)
    }
  })
  const { items } = sessionsRes.data

  return sessionsResponseConverter(items)
}

const sessionsResponseConverter = (
  items: ItemResponse<SessionRequest>[]
)  => {
  return items.map(convertOne);
}


/**
 * convert one session item response
 * @param cur 
 * @returns 
 */
function convertOne(cur:ItemResponse<SessionRequest>) {
  return {
    id: cur.sys.id,
    name: cur.fields.name[GB_LOCALE],
    type: cur.fields.type[GB_LOCALE] as SessionType,
    date: cur.fields.date[GB_LOCALE],
    duration: cur.fields.duration[GB_LOCALE],
    description: cur.fields.description && cur.fields.description[GB_LOCALE],
    location: [cur.fields.location[GB_LOCALE].lon, cur.fields.location[GB_LOCALE].lat] as [string, string],
    locationName: cur.fields.locationName[GB_LOCALE],
    price: cur.fields.price[GB_LOCALE],
    discount: cur.fields.discount[GB_LOCALE],
    maxParticipants: cur.fields.maxParticipants && cur.fields.maxParticipants[GB_LOCALE],
    maxWaitingList: cur.fields.maxWaitingList && cur.fields.maxWaitingList[GB_LOCALE],
    participants: cur.fields.participants && cur.fields.participants[GB_LOCALE],
    paidParticipants: cur.fields.paidParticipants && cur.fields.paidParticipants[GB_LOCALE],
    isBookingAvailable: cur.fields.isBookingAvailable && cur.fields.isBookingAvailable[GB_LOCALE]
  }
}



// const sessionsResponseConverter = (
//   items: ItemResponse<SessionRequest>[]
// )  => {

//   return items.reduce((prev:any, cur: ItemResponse<SessionRequest>) => {

//     return { ...prev, [cur.sys.id]: {
//       name: cur.fields.name[GB_LOCALE],
//       date: cur.fields.date[GB_LOCALE],
//       location: [cur.fields.location[GB_LOCALE].lon, cur.fields.location[GB_LOCALE].lat],
//       participants: cur.fields.participants[GB_LOCALE],
//       paidParticipants: cur.fields.participants[GB_LOCALE]
//     }}

//   }, {} as { [id: string]: SessionResponse })
// }