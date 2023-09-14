import { User } from '@auth0/auth0-react'
import { create } from 'zustand'

export const useUserStore = create<User>((set) => ({
  user: User,
  setUser: (user:User) => set(state => ({ user: { ...state.user, ...user} }))
}))