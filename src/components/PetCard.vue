<script setup lang="ts">
import type { Pet } from '../types'

defineProps<{ pet: Pet }>()
</script>

<template>
  <el-card class="pet-card" shadow="hover">
    <img :src="pet.avatar" class="cover" alt="pet" />
    <div class="body">
      <div class="title">{{ pet.name }}</div>
      <p>{{ pet.desc }}</p>
      <el-tag size="small">{{ pet.breed }}</el-tag>
    </div>
  </el-card>
</template>

<style scoped>
.pet-card {
  cursor: pointer;
}
.cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.title {
  font-size: 16px;
  font-weight: 700;
  margin: 8px 0;
}
.body p {
  color: #667185;
  min-height: 40px;
}
</style>
