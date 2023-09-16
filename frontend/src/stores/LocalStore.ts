
type LocalDataTypes = string

interface LocalData {
  accessToken?:string
  pathname?: string
}


export function getLocalStore(name:keyof LocalData) {
  const store = getStoreData()
  return store[name]
}

export function setLocalStore(name: keyof LocalData, data:LocalDataTypes) {
  const store = getStoreData()
  store[name] = data
  setStoreData(store as LocalData)

}

function getStoreData():LocalData {
  const localStoreName = import.meta.env.VITE_LOCAL_STORE_NAME as string
  const localDataStr = localStorage.getItem(localStoreName)

  if(localDataStr && localDataStr.length > 0) {
    return JSON.parse(localDataStr)
  }

  return {}
}

function setStoreData(data: LocalData) {
  const localStoreName = import.meta.env.VITE_LOCAL_STORE_NAME as string
  localStorage.setItem(localStoreName, JSON.stringify(data))
}