import { create } from 'zustand'

interface iNavi {
  navi: {
    bgIsDark: boolean
    textColor: string
  },
  setTextColor: (color: string) => void
  setBgDark: (isDark: boolean) => void
}

export const useNaviStore = create<iNavi>((set) => ({
  navi: {
    bgIsDark: true,
    textColor: 'white'
  },
  setTextColor: (textColor: string) => set(state => ({ navi: { ...state.navi, textColor } })),
  setBgDark: (bgIsDark: boolean) => set(state => ({ navi: { ...state.navi, bgIsDark } })),
  setNavi: (navi:iNavi) => set(state => ({ navi: { ...state.navi, ...navi} }))
}))