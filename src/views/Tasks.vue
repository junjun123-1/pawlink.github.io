<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getTasks, signInTask } from '../api/mock'
import { ElMessage } from 'element-plus'

const list = ref<any[]>([])

let timer: number | null = null

async function refresh() {
  list.value = await getTasks()
}

onMounted(async () => {
  await refresh()
  // 与 PetDetail 的互动联动：定时拉取任务进度，确保实时更新
  timer = window.setInterval(() => {
    refresh().catch(() => {})
  }, 3000)
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})

const daily = computed(() => list.value.filter((x) => x.type === 'daily'))
const achievement = computed(() => list.value.filter((x) => x.type === 'achievement'))

async function signIn() {
  const res = await signInTask()
  list.value = res.tasks
  ElMessage.success(`签到成功，当前积分 ${res.points}`)
}
</script>

<template>
  <el-card>
    <h3>每日任务</h3>
    <el-table :data="daily">
      <el-table-column prop="title" label="任务" />
      <el-table-column label="进度">
        <template #default="{ row }">{{ row.progress }}/{{ row.target }}</template>
      </el-table-column>
      <el-table-column prop="reward" label="奖励积分" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button v-if="row.id === 1 && !row.done" size="small" @click="signIn">立即签到</el-button>
          <el-tag v-else type="success">{{ row.done ? '已完成' : '进行中' }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-card class="mt">
    <h3>成就任务</h3>
    <el-table :data="achievement">
      <el-table-column prop="title" label="任务" />
      <el-table-column label="进度">
        <template #default="{ row }">{{ row.progress }}/{{ row.target }}</template>
      </el-table-column>
      <el-table-column prop="reward" label="奖励积分" />
    </el-table>
  </el-card>
</template>

<style scoped>
.mt {
  margin-top: 14px;
}
</style>
