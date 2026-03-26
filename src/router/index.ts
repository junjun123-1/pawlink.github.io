import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PetList from '../views/PetList.vue'
import PetDetail from '../views/PetDetail.vue'
import Profile from '../views/Profile.vue'
import PointsMall from '../views/PointsMall.vue'
import Tasks from '../views/Tasks.vue'
import Ranking from '../views/Ranking.vue'
import AdoptionApply from '../views/AdoptionApply.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import { canApplyAdoption, isLoggedIn } from '../api/mock'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/pets', component: PetList },
    { path: '/pets/:id', component: PetDetail, meta: { requiresAuth: true } },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/mall', component: PointsMall, meta: { requiresAuth: true } },
    { path: '/tasks', component: Tasks, meta: { requiresAuth: true } },
    { path: '/ranking', component: Ranking },
    { path: '/apply/:petId', component: AdoptionApply, meta: { needsIntimacy: true, requiresAuth: true } },
    { path: '/admin', component: Admin },
    { path: '/login', component: Login }
  ]
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !isLoggedIn()) return '/login'
  if (!to.meta.needsIntimacy) return true
  const petId = Number(to.params.petId)
  const ok = await canApplyAdoption(petId)
  if (!ok) return '/profile'
  return true
})

export default router
