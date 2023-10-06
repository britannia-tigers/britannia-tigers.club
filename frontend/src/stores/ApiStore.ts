import { create } from 'zustand'
import { combine } from 'zustand/middleware'
// import { combine } from 'zustand/middleware'

export interface Sponsor {
  title: string
    description: string
    file: {
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
    }
}

export type SponsorList = Sponsor[]


export const useApiStore = create(combine({
  sponsors: [] as Sponsor[]
}, (set) => ({
  setSponsors: () => set((state)=> ({ sponsors: state.sponsors }))
})))