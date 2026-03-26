<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getRanking } from '../api/mock'

const tab = ref<'amount' | 'intimacy' | 'activeCount'>('amount')
const list = ref<any[]>([])
const currentUid = 99

onMounted(async () => {
  list.value = await getRanking()
})

const sorted = computed(() => [...list.value].sort((a, b) => b[tab.value] - a[tab.value]))
const me = computed(() => sorted.value.find((x) => x.uid === currentUid))
const myRank = computed(() => sorted.value.findIndex((x) => x.uid === currentUid) + 1)

function rowClassName({ row }: { row: any }) {
  if (row.uid === currentUid) return 'current-row'
  return ''
}
</script>

<template>
  <el-tabs v-model="tab">
    <el-tab-pane label="爱心榜" name="amount" />
    <el-tab-pane label="亲密度榜" name="intimacy" />
    <el-tab-pane label="活跃榜" name="activeCount" />
  </el-tabs>

  <el-table :data="sorted.slice(0, 20)" :row-class-name="rowClassName">
    <el-table-column label="排名" width="80">
      <template #default="{ $index }">{{ $index + 1 }}</template>
    </el-table-column>
    <el-table-column label="头像" width="90">
      <template #default="{ row }"><el-avatar :src="row.avatar" /></template>
    </el-table-column>
    <el-table-column prop="nickname" label="昵称" />
    <el-table-column :prop="tab" label="数值" />
  </el-table>

  <el-card v-if="me && myRank > 20" class="mt">
    <p>当前用户排名：第 {{ myRank }} 名 | 昵称：{{ me.nickname }} | 数值：{{ me[tab] }}</p>
  </el-card>
</template>

<style scoped>
.current-row {
  background: #fff3e0;
}
.mt {
  margin-top: 12px;
}
</style>
