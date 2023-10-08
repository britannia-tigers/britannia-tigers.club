import { create } from 'zustand'

interface iNavi {
  navi: {
    bgIsDark: boolean
    textColor: string
  },
  form: {
    isVisible: boolean
  }
  setTextColor: (color: string) => void
  setBgDark: (isDark: boolean) => void
  setFormVisible: (visible: boolean) => void
}

export const useNaviStore = create<iNavi>((set) => ({
  navi: {
    bgIsDark: false,
    textColor: 'white'
  },
  form: {
    isVisible: false
  },
  setTextColor: (textColor: string) => set(state => ({ navi: { ...state.navi, textColor } })),
  setBgDark: (bgIsDark: boolean) => set(state => ({ navi: { ...state.navi, bgIsDark } })),
  setNavi: (navi:iNavi) => set(state => ({ navi: { ...state.navi, ...navi} })),
  setFormVisible: (visible: boolean) => set(state => ({ form: { ...state.form, isVisible: visible}}))
}))