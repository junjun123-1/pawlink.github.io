<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProfileData, payOrder, pets } from '../api/mock'
import BadgeWall from '../components/BadgeWall.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const cloudPets = ref<any[]>([])
const logs = ref<any[]>([])
const badges = ref<any[]>([])
const orders = ref<any[]>([])
const adoptionApps = ref<any[]>([])

onMounted(async () => {
  await refresh()
})

async function refresh() {
  const res = await getProfileData()
  cloudPets.value = res.cloudPets
  logs.value = res.pointsLogs
  badges.value = res.badges
  orders.value = res.orders
  adoptionApps.value = res.adoptionApplications || []
  await userStore.load()
}

async function mockPay(id: string) {
  await payOrder(id)
  ElMessage.success('支付成功')
  await refresh()
}
</script>

<template>
  <el-card>
    <div class="profile-head">
      <el-avatar :src="userStore.avatar" :size="60" />
      <div>
        <h3>{{ userStore.username }}</h3>
        <p>总积分：{{ userStore.points }} | 累计助养金额：{{ userStore.donate }}</p>
      </div>
    </div>
  </el-card>

  <el-card class="mt">
    <h3>我的云宠列表</h3>
    <el-row :gutter="12">
      <el-col v-for="item in cloudPets" :key="item.petId" :span="8">
        <el-card @click="router.push(`/pets/${item.petId}`)" class="cp-item">
          <h4>{{ pets.find((x) => x.id === item.petId)?.name }}</h4>
          <el-progress :percentage="Math.min(100, (item.intimacy / 1000) * 100)" />
        </el-card>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="mt">
    <h3>积分明细</h3>
    <el-table :data="logs">
      <el-table-column prop="time" label="时间" />
      <el-table-column prop="reason" label="原因" />
      <el-table-column prop="delta" label="变动值" />
    </el-table>
  </el-card>

  <el-card class="mt">
    <h3>勋章墙</h3>
    <BadgeWall :badges="badges" />
  </el-card>

  <el-card class="mt">
    <h3>我的订单</h3>
    <el-table :data="orders">
      <el-table-column prop="id" label="订单号" />
      <el-table-column prop="productName" label="商品名" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button v-if="row.status === '待支付'" size="small" type="primary" @click="mockPay(row.id)">模拟支付</el-button>
          <el-tag v-else type="success">可查看详情</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-card class="mt">
    <h3>我的领养申请记录</h3>
    <el-table :data="adoptionApps">
      <el-table-column prop="id" label="申请单号" />
      <el-table-column prop="petName" label="宠物" />
      <el-table-column prop="reason" label="领养理由" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag v-if="row.status === '待审核'" type="info">待审核</el-tag>
          <el-tag v-else-if="row.status === '已通过'" type="success">已通过</el-tag>
          <el-tag v-else type="danger">已拒绝</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="adoptionApps.length === 0" description="暂无申请记录" />
  </el-card>

  <el-card class="mt">
    <h3>设置</h3>
    <el-button>修改密码</el-button>
    <el-button type="danger">退出登录</el-button>
  </el-card>
</template>

<style scoped>
.mt {
  margin-top: 14px;
}
.profile-head {
  display: flex;
  gap: 14px;
  align-items: center;
}
.cp-item {
  cursor: pointer;
}
</style>
