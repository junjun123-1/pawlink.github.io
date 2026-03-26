import { defineStore } from 'pinia'
import { getProfileData, isLoggedIn, logout, userLogin } from '../api/mock'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: 0,
    username: '',
    avatar: '',
    points: 0,
    donate: 0,
    isAdmin: false,
    loggedIn: false,
    loaded: false
  }),
  actions: {
    async load() {
      if (!isLoggedIn()) {
        this.loggedIn = false
        this.loaded = true
        return
      }
      const res = await getProfileData()
      this.id = res.user.id
      this.username = res.user.username
      this.avatar = res.user.avatar
      this.points = res.user.points
      this.donate = res.user.donate
      this.isAdmin = res.user.isAdmin
      this.loggedIn = true
      this.loaded = true
    },
    async login(username: string, password: string) {
      const user = await userLogin(username, password)
      if (!user) return false
      await this.load()
      return true
    },
    logout() {
      logout()
      this.$reset()
    },
    setPoints(v: number) {
      this.points = v
    }
  }
})
