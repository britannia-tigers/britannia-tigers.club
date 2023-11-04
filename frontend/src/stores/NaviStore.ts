import { create } from 'zustand'

interface iNavi {
  navi: {
    bgIsDark: boolean
    textColor: string
  },
  form: {
    isVisible: boolean
  },
  dialog: {
    content?: string | JSX.Element
  },
  setTextColor: (color: string) => void
  setBgDark: (isDark: boolean) => void
  setFormVisible: (visible: boolean) => void
  setDialog: (content?: string | JSX.Element) => void
}

export const useNaviStore = create<iNavi>((set) => ({
  navi: {
    bgIsDark: true,
    textColor: 'white'
  },
  form: {
    isVisible: false
  },
  dialog: {
  },
  setTextColor: (textColor: string) => set(state => ({ navi: { ...state.navi, textColor } })),
  setBgDark: (bgIsDark: boolean) => set(state => ({ navi: { ...state.navi, bgIsDark } })),
  setNavi: (navi:iNavi) => set(state => ({ navi: { ...state.navi, ...navi} })),
  setFormVisible: (visible: boolean) => set(state => ({ form: { ...state.form, isVisible: visible}})),
  setDialog: (content?: string | JSX.Element) => set(() => ({ dialog: { content }}))
}))