<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  userStore.load()
})

function doLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <header class="top-nav">
      <div class="brand">PawLink 云领养</div>
      <nav class="menu">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/pets">宠物</RouterLink>
        <RouterLink v-if="userStore.loggedIn" to="/tasks">任务中心</RouterLink>
        <RouterLink v-if="userStore.loggedIn" to="/mall">积分商城</RouterLink>
        <RouterLink to="/ranking">排行榜</RouterLink>
        <RouterLink v-if="userStore.loggedIn" to="/profile">个人中心</RouterLink>
        <RouterLink to="/admin">救助站后台</RouterLink>
        <RouterLink v-if="!userStore.loggedIn" to="/login">登录</RouterLink>
        <a v-else href="javascript:void(0)" @click="doLogout">退出</a>
      </nav>
    </header>
    <main class="page-container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f7f9fc;
}

.top-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 28px;
  background: #fff;
  border-bottom: 1px solid #e9edf5;
}

.brand {
  font-size: 20px;
  font-weight: 700;
  color: #1f2d3d;
}

.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.menu a {
  color: #4a5d75;
  text-decoration: none;
  font-weight: 600;
}

.menu a.router-link-active {
  color: #409eff;
}

.page-container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 20px 18px 40px;
}

@media (max-width: 900px) {
  .top-nav {
    padding: 10px 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .brand {
    font-size: 18px;
  }
}
</style>
