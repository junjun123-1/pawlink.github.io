<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const form = ref({ username: 'jun', password: '1234' })
const loading = ref(false)

async function submit() {
  loading.value = true
  const ok = await userStore.login(form.value.username, form.value.password)
  loading.value = false
  if (!ok) return ElMessage.error('登录失败，请检查账号或密码')
  ElMessage.success('登录成功')
  router.push('/')
}
</script>

<template>
  <div class="login-wrap">
    <el-card class="login-card">
      <h2>PawLink 登录</h2>
      <el-form label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
      </el-form>
      <el-button type="primary" :loading="loading" @click="submit">登录</el-button>
      <p class="tip">普通用户：任意账号 + 4位以上密码；管理员请去后台页登录。</p>
    </el-card>
  </div>
</template>

<style scoped>
.login-wrap {
  min-height: 70vh;
  display: grid;
  place-items: center;
}
.login-card {
  width: 420px;
  max-width: 100%;
}
.tip {
  margin-top: 10px;
  color: #7d8795;
}
</style>
