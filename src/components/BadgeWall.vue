<script setup lang="ts">
defineProps<{ badges: { name: string; unlocked: boolean; condition: string }[] }>()
</script>

<template>
  <div class="badge-wall">
    <el-card v-for="b in badges" :key="b.name" class="badge-item">
      <div class="name">{{ b.name }}</div>
      <el-tag :type="b.unlocked ? 'success' : 'info'">{{ b.unlocked ? '已获得' : '未解锁' }}</el-tag>
      <p>{{ b.unlocked ? '太棒啦，继续保持！' : b.condition }}</p>
    </el-card>
  </div>
</template>

<style scoped>
.badge-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}
.name {
  font-weight: 700;
  margin-bottom: 6px;
}
p {
  color: #7d8795;
}
</style>
