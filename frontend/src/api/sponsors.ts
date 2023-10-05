import axios, { AxiosError } from 'axios'
import { Asset, ConvertedMapResponse, GB_LOCALE, ItemResponse, ListResponse, Sponsor } from './api.interface'
import { useEffect, useState } from 'react'
import { ApiAsset, getAllAssets } from './assets'


interface ApiSponsor {
  name: string
  description?: string
  logo: ApiAsset
}

export async function getAllSponsors() {

  const sponsorsRes = await axios.get<ListResponse<ItemResponse<Sponsor>>>('/api/sponsors')
  const assetMap = await getAllAssets()
  const { items } = sponsorsRes.data

  return sponsorsResponseConverter(items, assetMap)
}

function sponsorsResponseConverter(
  items: ItemResponse<Sponsor>[], 
  assets: { [id:string]: ApiAsset }
): ApiSponsor[] {
  return items.map(i => ({
    name: i.fields.name[GB_LOCALE],
    description: i.fields.description && i.fields.description[GB_LOCALE],
    logo: i.fields.logo && assets[i.fields.logo[GB_LOCALE].sys.id]
  }))
}



export function useSponsors() {

  const [data, setData] = useState([] as ApiSponsor[])

  useEffect(() => {
    async function fetch() {
      const d = await getAllSponsors()
      setData(d)
    }

    fetch()
  }, [])

  return data
}