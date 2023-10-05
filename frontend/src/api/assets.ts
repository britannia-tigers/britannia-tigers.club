import axios from 'axios'
import { Asset, GB_LOCALE, ItemResponse, ListResponse } from './api.interface'

export interface ApiAsset {
  title: string
  url: string
  size: number
}

/**
 * get all assets
 * @returns 
 */
export async function getAllAssets() {

  const assetsRes = await axios.get<ListResponse<ItemResponse<Asset>>>('/api/assets')
  const { items } = assetsRes.data

  return assetsResponseConverter(items)
}

const assetsResponseConverter = (items: ItemResponse<Asset>[])  => {

  return items.reduce((prev, cur) => {
    if(!cur.fields.file) return prev

    return { ...prev, [cur.sys.id]: {
      title: cur.fields.title[GB_LOCALE],
      url: cur.fields.file[GB_LOCALE].url,
      size: cur.fields.file[GB_LOCALE].details.size
    }}
  }, {} as { [id: string]: ApiAsset })
}