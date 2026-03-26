<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getPetDetail, submitAdoptionApply } from '../api/mock'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const pet = ref<any>(null)
const cloud = ref<any>(null)
const form = ref({ address: '', exp: '', reason: '' })

onMounted(async () => {
  const res = await getPetDetail(Number(route.params.petId))
  pet.value = res.pet
  cloud.value = res.cloud
})

async function submit() {
  if (!form.value.address || !form.value.reason) {
    ElMessage.warning('请补全住址和领养理由')
    return
  }
  await submitAdoptionApply(Number(route.params.petId), form.value.reason)
  ElMessage.success('申请提交成功，等待审核')
  router.push('/profile')
}
</script>

<template>
  <el-card v-if="pet && cloud">
    <h2>领养申请 - {{ pet.name }}</h2>
    <img :src="pet.avatar" class="img" />
    <p>当前亲密度：{{ cloud.intimacy }}</p>
    <el-form label-width="100px">
      <el-form-item label="住址"><el-input v-model="form.address" /></el-form-item>
      <el-form-item label="养宠经验"><el-input v-model="form.exp" type="textarea" /></el-form-item>
      <el-form-item label="领养理由"><el-input v-model="form.reason" type="textarea" /></el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">提交申请</el-button>
  </el-card>
</template>

<style scoped>
.img {
  width: 300px;
  border-radius: 8px;
}
</style>
