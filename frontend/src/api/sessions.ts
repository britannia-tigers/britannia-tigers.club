import axios from 'axios'
import { GB_LOCALE, ItemResponse, ListResponse, SessionRequest, SessionResponse } from './api.interface'
import { useEffect, useState } from 'react'

export interface ApiSessionGetQuery {
  date?: string
  startDate?: string
  endDate?: string
  name?: string
  location?: [number, number]
  skip?: number
  limit?: number

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

  return items.map(cur => ({
      name: cur.fields.name[GB_LOCALE],
      date: cur.fields.date[GB_LOCALE],
      location: [cur.fields.location[GB_LOCALE].lon, cur.fields.location[GB_LOCALE].lat] as [string, string],
      participants: cur.fields.participants[GB_LOCALE],
      paidParticipants: cur.fields.participants[GB_LOCALE]
  }))
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

export function useSessions(props:ApiSessionGetQuery) {

  const [sessions, setSessions] = useState([] as SessionResponse[])

  useEffect(() => {
    async function fetch() {
      const d = await getSessions(props)
      setSessions(d)
    }

    fetch()
  }, [])

  return sessions
}