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
    <div class="login-background"></div>
    <el-card class="login-card">
      <div class="logo-section">
        <h2 class="login-title">PawLink</h2>
        <p class="login-subtitle">宠物领养与互动平台</p>
      </div>
      <el-form label-width="80px" class="login-form">
        <el-form-item label="账号">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <el-button type="primary" :loading="loading" @click="submit" class="login-button">登录</el-button>
      <p class="tip">普通用户：任意账号 + 4位以上密码；管理员请去后台页登录。</p>
    </el-card>
  </div>
</template>

<style scoped>
.login-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 40%);
}

.login-card {
  width: 420px;
  max-width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 40px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.logo-section {
  text-align: center;
  margin-bottom: 32px;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #243042;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-subtitle {
  color: #7d8795;
  font-size: 14px;
  font-weight: 400;
}

.login-form {
  margin-bottom: 24px;
}

.login-form :deep(.el-form-item__label) {
  color: #243042;
  font-weight: 500;
}

.login-form :deep(.el-input__wrapper) {
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.login-form :deep(.el-input__wrapper:focus-within) {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.login-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.tip {
  margin-top: 0;
  color: #7d8795;
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  
  .login-title {
    font-size: 24px;
  }
}
</style>