import { CollectionProp, EntryProps, QueryOptions } from "contentful-management";
import contentfulConfig from "./contentful.config";

export type FilterParam = 'match' | 'within' | 'near' | 'lt' | 'lte' | 'gt' | 'gte';


export interface Page {

}

export interface PageFull extends Page {

}

export interface LocalisedEntry<T> {
  [name:string]: T
}

export interface Session {
  name: string
  location: string
  date: string
  locationName?: string
  type?: string
  description?: string
  participants?: string[]
  paidParticipants?: string[]
  isBookingAvailable?: boolean
  price?: number
  discount?: number
}

export interface LocalisedSession {
  name: LocalisedEntry<string>
  location: LocalisedEntry<string>
  date: LocalisedEntry<string>
  locationName?: LocalisedEntry<string>
  type?: LocalisedEntry<string>
  description?: LocalisedEntry<string>
  participants?: LocalisedEntry<string[]>
  paidParticipants?: LocalisedEntry<string[]>
  isBookingAvailable?: LocalisedEntry<boolean>
  price?: LocalisedEntry<number>
  discount?: LocalisedEntry<number>
}

export interface LocalisedSessionFull extends LocalisedSession {
  radius: LocalisedEntry<string>
}

export interface Sponsor {
  name: string
  description?: string
  logo: string
  priority?: number
  amount: number
  website?: string
  email?: string
  startDate: string
  endDate: string
}

export interface ExtendedQueryOptions extends QueryOptions {
  name?: string
  location?: string
  radius?: string
}

export type Response<T> = CollectionProp<EntryProps<T>>;

export type PageListResponse = Response<Page>;
export type SessionListResponse = Response<LocalisedSession>;
export type SponsorListResponse = Response<Sponsor>;

export type SessionFullResponse = EntryProps<LocalisedSessionFull>;
export type PageFullResponse = EntryProps<PageFull>;

