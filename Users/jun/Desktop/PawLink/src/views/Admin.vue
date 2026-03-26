<template>
  <el-card v-if="!logged">
    <el-form label-width="90px">
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <template v-else>
    <div class="admin-container">
      <el-alert title="救助站后台（可交互演示）" type="success" show-icon />
      
      <div class="icons-section">
        <el-card class="icon-card">
          <img src="https://placehold.co/60x60?text=积分商城" alt="积分商城" />
          <p>积分商城</p>
        </el-card>
        <el-card class="icon-card">
          <img src="https://placehold.co/60x60?text=任务中心" alt="任务中心" />
          <p>任务中心</p>
        </el-card>
        <el-card class="icon-card">
          <img src="https://placehold.co/60x60?text=排行榜" alt="排行榜" />
          <p>排行榜</p>
        </el-card>
        <el-card class="icon-card">
          <img src="https://placehold.co/60x60?text=全部宠物" alt="全部宠物" />
          <p>全部宠物</p>
        </el-card>
      </div>

      <div class="recommended-pets">
        <h3>推荐宠物</h3>
        <div v-for="pet in pets.slice(0, 3)" :key="pet.id" class="pet-card">
          <img :src="pet.avatar || 'https://placehold.co/100x100?text=PetAvatar'" :alt="`宠物 ${pet.name}`" />
          <div class="pet-info">
            <h4>{{ pet.name }}</h4>
            <p>{{ pet.desc }}</p>
            <span>{{ pet.breed }}</span>
            <span>{{ pet.gender }}</span>
            <span>{{ pet.age }}</span>
          </div>
        </div>
      </div>

      <el-card class="mt">
        <h3>宠物管理</h3>
      </el-card>

      <el-card class="mt">
        <h3>成长记录管理</h3>
      </el-card>

      <el-card class="mt">
        <h3>订单管理</h3>
      </el-card>

      <el-card class="mt">
        <h3>领养审核</h3>
      </el-card>
    </div>

    <el-dialog v-model="editVisible" title="编辑宠物信息" width="560px">
    </el-dialog>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { addOrUpdatePet, fetchPets } from '@/api/pet'

const logged = ref(false)
const username = ref('')
const password = ref('')
const pets = ref([])

async function login() {
  if (username.value === 'admin' && password.value === 'admin') {
    logged.value = true
    await reload()
  } else {
    ElMessage.error('用户名或密码错误')
  }
}

async function reload() {
  pets.value = await fetchPets()
}

onMounted(() => {
  reload()
})
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icons-section {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.recommended-pets {
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
}

.pet-card {
  display: flex;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}

.pet-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.pet-info {
  padding: 10px;
  flex: 1;
}

.mt {
  margin-top: 12px;
}

.input {
  width: 260px;
  margin-bottom: 10px;
}

.wide {
  width: 300px;
}

.preview {
  width: 180px;
  border-radius: 8px;
}

.previews {
  display: flex;
  align-items: center;
  gap: 12px;
}

.preview-more {
  color: #7d8795;
  font-size: 13px;
}
</style>