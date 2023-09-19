import { CollectionProp, EntryProps, QueryOptions } from "contentful-management";

export type FilterParam = 'match' | 'within' | 'near' | 'lt' | 'lte' | 'gt' | 'gte';


export interface Page {

}

export interface PageFull extends Page {

}

export interface Session {
  name: string
  location: string
  date: string
}

export interface SessionFull extends Session {
  radius: string
}

export interface ExtendedQueryOptions extends QueryOptions {
  name?: string
  location?: string
  radius?: string
}

export type Response<T> = CollectionProp<EntryProps<T>>;

export type PageListResponse = Response<Page>;
export type SessionListResponse = Response<Session>;

export type SessionFullResponse = EntryProps<SessionFull>;
export type PageFullResponse = EntryProps<PageFull>;

