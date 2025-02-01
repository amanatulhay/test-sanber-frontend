import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import Swal from "sweetalert2";

interface Account {
  username: string;
  token: string;
}

interface AuthStore {
  account: Account | null
  login: (params: Account) => void
  logout: () => void
}

const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      account: get()?.account,
      login: (params) =>{
        set({ account: params })
      },
      logout: () =>{
        set({ account: null });
        Swal.fire({
          title: "SUCCES",
          text: "You have successfully log out!",
          icon: "success"
        });
      } 
    }),
    {
      name: 'auth-storage',
    },
  ),
)

export default authStore