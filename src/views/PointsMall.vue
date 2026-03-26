<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createOrder, getProducts, payOrder } from '../api/mock'
import { ElMessage, ElMessageBox } from 'element-plus'

const products = ref<any[]>([])

onMounted(async () => {
  products.value = await getProducts()
})

async function exchange(id: number) {
  try {
    const p = products.value.find((x) => x.id === id)
    if (!p) return
    if (p.stock <= 0) return ElMessage.warning('库存不足')
    await ElMessageBox.confirm('确认兑换该商品？', '提示')
    const res = await createOrder(id)
    if (res.needCashPay) {
      await ElMessageBox.confirm(`该商品需补差价 ${res.cash} 元，是否模拟支付？`, '支付确认')
      await payOrder(res.orderId)
      ElMessage.success('补差价支付成功，兑换完成')
    } else {
      ElMessage.success('积分兑换成功')
    }
    products.value = await getProducts()
  } catch (e: any) {
    // ElMessageBox confirm 取消时不弹错误
    if (String(e?.message || '').includes('取消')) return
    ElMessage.error(e?.message || '兑换失败')
  }
}
</script>

<template>
  <div class="grid">
    <el-card v-for="p in products" :key="p.id">
      <img :src="p.image" class="cover" />
      <h3>{{ p.name }}</h3>
      <p>{{ p.points }} 积分 <span v-if="p.cashDiff"> + {{ p.cashDiff }} 元</span></p>
      <p>库存：{{ p.stock }}</p>
      <el-button :disabled="p.stock <= 0" type="primary" @click="exchange(p.id)">
        {{ p.stock <= 0 ? '库存不足' : '立即兑换' }}
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
@media (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
