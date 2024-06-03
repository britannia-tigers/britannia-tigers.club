import axios, { AxiosError } from 'axios'
import { Asset, ConvertedMapResponse, GB_LOCALE, ItemResponse, ListResponse, Sponsor } from './api.interface'
import { useEffect, useState } from 'react'
import { ApiAsset, getAllAssets } from './assets'
import { Document } from '@contentful/rich-text-types'


interface ApiSponsor {
  id: string
  name: string
  description?: string
  about?: Document
  logo: ApiAsset
}

export async function getAllSponsors() {

  const sponsorsRes = await axios.get<ListResponse<ItemResponse<Sponsor>>>('/api/sponsors')
  const assetMap = await getAllAssets()
  const { items } = sponsorsRes.data

  return sponsorsResponseConverter(items, assetMap)
}

export async function getSponsorById(id:string) {
  const sponsorsRes = await axios.get<ItemResponse<Sponsor>>(`/api/sponsors/${id}`)
  const assetMap = await getAllAssets()

  return singleSponsorResConvert(sponsorsRes.data, assetMap);



}

function singleSponsorResConvert(i: ItemResponse<Sponsor>, assets: { [id:string]: ApiAsset }) {
  return {
    id: i.sys.id,
    name: i.fields.name?.[GB_LOCALE],
    description: i.fields.description?.[GB_LOCALE],
    about: i.fields.about?.[GB_LOCALE],
    logo: i.fields.logo && assets[i.fields.logo[GB_LOCALE].sys.id],
    website: i.fields.website?.[GB_LOCALE]
  }
}

function sponsorsResponseConverter(
  items: ItemResponse<Sponsor>[], 
  assets: { [id:string]: ApiAsset }
): ApiSponsor[] {
  return items.map(i => singleSponsorResConvert(i, assets))
}


export function useSponsorFull(id?: string) {

  const [data, setData] = useState<ApiSponsor>()

  useEffect(() => {
    async function fetch() {

      if(id === undefined) {
        console.error('Sponsor id is not defined');
        setData(undefined);
        return;
      }

      const d = await getSponsorById(id)
      setData(d)
    }

    fetch()
  }, [])

  return data
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