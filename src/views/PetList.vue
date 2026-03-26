<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { breeds, getPets } from '../api/mock'
import type { Pet } from '../types'
import PetCard from '../components/PetCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const all = ref<Pet[]>([])
const page = ref(1)
const pageSize = 12

const filters = reactive({
  breed: '',
  gender: '',
  ageGroup: '',
  status: '',
  keyword: ''
})

const list = computed(() => all.value.slice((page.value - 1) * pageSize, page.value * pageSize))

async function fetchList() {
  loading.value = true
  all.value = await getPets(filters)
  loading.value = false
}

onMounted(fetchList)
</script>

<template>
  <el-card>
    <el-form inline>
      <el-form-item label="品种">
        <el-select v-model="filters.breed" clearable style="width: 140px">
          <el-option v-for="b in breeds" :key="b" :label="b" :value="b" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="filters.gender" clearable style="width: 100px">
          <el-option label="公" value="公" />
          <el-option label="母" value="母" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-select v-model="filters.ageGroup" clearable style="width: 100px">
          <el-option label="幼年" value="幼年" />
          <el-option label="成年" value="成年" />
          <el-option label="老年" value="老年" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="filters.status" clearable style="width: 120px">
          <el-option label="可云养" value="cloud" />
          <el-option label="可领养" value="adoptable" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.keyword" placeholder="搜索名字/描述" style="width: 200px" />
      </el-form-item>
      <el-button type="primary" @click="fetchList">筛选</el-button>
    </el-form>
  </el-card>

  <el-skeleton :loading="loading" animated :rows="6">
    <template #default>
      <el-empty v-if="all.length === 0" description="暂无匹配宠物" />
      <div class="list-grid">
        <PetCard v-for="p in list" :key="p.id" :pet="p" @click="router.push(`/pets/${p.id}`)" />
      </div>
      <el-pagination
        v-if="all.length > pageSize"
        v-model:current-page="page"
        :total="all.length"
        :page-size="pageSize"
        layout="prev, pager, next"
      />
    </template>
  </el-skeleton>
</template>

<style scoped>
.list-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
@media (max-width: 1100px) {
  .list-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 700px) {
  .list-grid {
    grid-template-columns: 1fr;
  }
}
</style>
