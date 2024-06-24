import { create } from "zustand";
import { LinkType, PositionType, UserInfo, UserMetaData, UserRole, getSelf, getSelfRoles, updateSelf, uploadSelImages } from "../api/users";

export interface ChangeSelfStatsFormData {
  position?: PositionType[]
  images?: string[]
  videos?: string[]
  links?: LinkType[]
}

export interface ChangeSelfFormData extends ChangeSelfStatsFormData {
  description?: string
}



interface SelfStore {
  self: Partial<UserInfo>
  roles: UserRole[]
  fetch: (token: string) => Promise<void>
  changeSelf: (token: string, formData: ChangeSelfFormData) => Promise<void>
  changeSelfStats: (token: string, formData: ChangeSelfStatsFormData) => Promise<void>
  uploadImages: (token: string, f: FileList) => Promise<void>
  setSelf: (data: UserInfo) => void
  setAssets: (assets: Partial<UserMetaData>) => void
  setPicture: (pic: string) => void
  setRoles: (r: UserRole[]) => void
}

export const useSelfStore = create<SelfStore>((set, get) => ({
  self: {},
  roles: [],
  fetch: async (token: string) => {
    
    if(!token) return set(state => state);
    
    const data = await getSelf(token);
    const r = await getSelfRoles(token);

    set(() => ({
      self: data,
      roles: r
    }))

  },
  changeSelf: async (token, { description, images, videos, links, position }) => {
    if(!token) return set(state => state);
    
    const oldSelf = get().self;

    const res = await updateSelf(token, {
      user_metadata: {
        ...oldSelf.user_metadata,
        description: description || oldSelf.user_metadata?.description || '',
        stats: {
          ...oldSelf.user_metadata?.stats,
          position: position || oldSelf.user_metadata?.stats?.position || []
        },
        images: images || oldSelf.user_metadata?.images || [],
        videos: videos || oldSelf.user_metadata?.videos || [],
        links: links || oldSelf.user_metadata?.links || []
      }
    });

    set(() => ({self: res}))
  },
  changeSelfStats: async() => {
    // TODO: write async function to fetch api
  },
  uploadImages: async (token, f) => {
    await uploadSelImages(token, f)
    await get().fetch(token)
  },
  setSelf: data => set(state => ({ self: { ...state.self, ...data} })),
  setAssets: data => set(state => ({ 
    self: { 
      ...state.self,
      user_metadata: {
        ...state.self.user_metadata,
        description: data?.description || state.self.user_metadata?.description || '',
        stats: {...state.self.user_metadata?.stats, ...data.stats},
        images: [...(state.self.user_metadata?.images || []), ...(data?.images || [])],
        videos: [...(state.self.user_metadata?.videos || []), ...(data?.videos || [])]
      }
    } 
  })),
  setPicture: pic => set(state => ({
    self: {
      ...state.self,
      picture: pic || state.self.picture
    }
  })),
  setRoles: r => set(state => ({
    roles: [...state.roles, ...r]
  }))
}))