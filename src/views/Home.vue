<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHomeData } from '../api/mock'
import type { GrowthPost, Pet } from '../types'
import { useRouter } from 'vue-router'

const router = useRouter()
const banners = ref<{ id: number; image: string; link: string }[]>([])
const recommendPets = ref<Pet[]>([])
const posts = ref<GrowthPost[]>([])

onMounted(async () => {
  const data = await getHomeData()
  banners.value = data.banners
  recommendPets.value = data.recommendPets
  posts.value = data.latestPosts
})
</script>

<template>
  <el-carousel height="280px">
    <el-carousel-item v-for="b in banners" :key="b.id">
      <img :src="b.image" class="banner" @click="router.push(b.link)" />
    </el-carousel-item>
  </el-carousel>

  <section class="card-wrap">
    <h2>推荐宠物</h2>
    <div class="grid">
      <el-card v-for="p in recommendPets" :key="p.id" @click="router.push(`/pets/${p.id}`)" class="clickable">
        <img :src="p.avatar" class="pet-img" />
        <h3>{{ p.name }}</h3>
        <p>{{ p.desc }}</p>
      </el-card>
    </div>
  </section>

  <section class="card-wrap">
    <h2>救助站动态</h2>
    <el-timeline>
      <el-timeline-item v-for="i in posts" :key="i.id" :timestamp="i.createdAt">
        {{ i.content }}
      </el-timeline-item>
    </el-timeline>
  </section>

  <section class="quick">
    <el-button @click="router.push('/mall')">积分商城</el-button>
    <el-button @click="router.push('/tasks')">任务中心</el-button>
    <el-button @click="router.push('/ranking')">排行榜</el-button>
  </section>
</template>

<style scoped>
.banner {
  width: 100%;
  height: 280px;
  object-fit: cover;
  cursor: pointer;
}
.card-wrap {
  margin-top: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.pet-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.clickable {
  cursor: pointer;
}
.quick {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
