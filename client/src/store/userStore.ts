import { User } from '@acme/shared-models'
import produce from 'immer'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'


export type UserState = {
  userList: User[] | [];
  setUserList:(payload:  User[]) => void
  getUserList: () => void
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        // initial State
        userList: [],
        setUserList: (payload: User[]) => {
          set(
            produce((state) => {
              state.userList = payload
            }),
          )
        },
        getUserList: async () => {
          const res = await fetch('/api/users').then();
            set({
              userList:  await res.json(),
            })
          },
    
      }),
      {
        name: 'user-storage', // name of item in the storage (must be unique)
      },
    ),
    { name: 'UserStore' },
  ),
)

const initializeUserStore = () => useUserStore

export { initializeUserStore, useUserStore }
