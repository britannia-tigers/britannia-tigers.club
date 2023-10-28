
export const GB_LOCALE:Locale = 'en-GB'


export interface ListResponse<T> {
  sys: {
    type: string
  }
  total: number
  skip: number
  limit: number
  items: T[]
}

export interface ItemResponse<U> {
  metadata: {
    tags: []
  }
  sys: {
    type: string
    linkType: string
    id: string
  }
  createdAt: string
  updatedAt: string
  fields: U
}

type Locale = 'en-GB' | string

type LocaleBase<T = string> = {
  [locale:Locale]: T
}

type LocaleFile = LocaleBase<{
  url: string
  details: {
    size: number
    image: {
      width: number
      height: number
    }
  }
  fileName: string
  contentType: string
}>

type LocaleLink = LocaleBase<{
  sys: {
    type: string
    linkType: string
    id: string
  }
}>

export interface Asset {
  title: LocaleBase
  description: LocaleBase
  file?:LocaleFile
}

export interface SessionRequest {
  name: LocaleBase
  description?: LocaleBase
  date: LocaleBase
  location: LocaleBase<{lon: string, lat: string}>
  locationName: LocaleBase
  price: LocaleBase<number>
  discount: LocaleBase<number>
  participants: LocaleBase<string[]>
  paidParticipants: LocaleBase<string[]>
}

export interface SessionResponse {
  id: string
  name: string
  description?: string
  date: string
  price: number
  discount: number
  location: [string, string]
  locationName: string
  participants: string[]
  paidParticipants: string[]
}

export interface Sponsor {
  name: LocaleBase
  description?: LocaleBase
  logo: LocaleLink
}

export interface ConvertedListResponse<T> {
  total: number
  skip: number
  limit: number
  items: T[]
}

export interface ConvertedMapResponse<T> {
  total: number
  skip: number
  limit: number
  items: { [id: string]: T }
}