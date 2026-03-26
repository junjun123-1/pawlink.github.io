<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { addComment, cloudAdopt, getComments, getPetDetail, interact, likePost } from '../api/mock'
import { useRoute, useRouter } from 'vue-router'
import GameModal from '../components/GameModal.vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const gameVisible = ref(false)
const pet = ref<any>(null)
const cloud = ref<any>(null)
const timeline = ref<any[]>([])
const commentsByPost = ref<Record<number, any[]>>({})
const commentDraft = ref<Record<number, string>>({})

const level = computed(() => {
  const x = cloud.value?.intimacy || 0
  if (x >= 800) return 'Lv4'
  if (x >= 600) return 'Lv3'
  if (x >= 300) return 'Lv2'
  return 'Lv1'
})

async function load() {
  const id = Number(route.params.id)
  const data = await getPetDetail(id)
  pet.value = data.pet
  cloud.value = data.cloud
  timeline.value = data.timeline
  await fetchComments(data.timeline.map((x: any) => x.id))
}

async function doInteract(type: 'feed' | 'clean' | 'play' | 'pet') {
  try {
    const id = Number(route.params.id)
    const res = await interact(id, type)
    cloud.value.intimacy = res.intimacy
    cloud.value.remaining = { ...res.remaining }
    userStore.setPoints(res.points)
    ElMessage.success('互动成功 +亲密度')
  } catch (e: any) {
    ElMessage.error(e.message)
  }
}

async function handleCloudAdopt() {
  const id = Number(route.params.id)
  await cloudAdopt(id)
  await load()
}

async function like(id: number) {
  const likes = await likePost(id)
  const t = timeline.value.find((x) => x.id === id)
  if (t) t.likes = likes
}

async function fetchComments(postIds: number[]) {
  await Promise.all(
    postIds.map(async (pid) => {
      commentsByPost.value[pid] = await getComments(pid)
    })
  )
}

async function submitComment(postId: number) {
  try {
    const content = (commentDraft.value[postId] || '').trim()
    if (!content) return ElMessage.warning('请输入评论内容')
    await addComment(postId, content)
    commentDraft.value[postId] = ''
    commentsByPost.value[postId] = await getComments(postId)
    ElMessage.success('评论成功')
  } catch (e: any) {
    ElMessage.error(e.message || '评论失败')
  }
}

function isVideo(url: string) {
  return /\.(mp4|webm|ogg|mov)$/i.test(url)
}

onMounted(async () => {
  await userStore.load()
  await load()
})
</script>

<template>
  <div v-if="pet">
    <el-carousel height="320px">
      <el-carousel-item v-for="img in pet.images" :key="img"><img :src="img" class="head-img" /></el-carousel-item>
    </el-carousel>

    <el-card class="mt">
      <h2>{{ pet.name }}</h2>
      <p>{{ pet.breed }} | {{ pet.gender }} | {{ pet.ageGroup }}</p>
      <p>{{ pet.story }}</p>
      <el-tag v-for="tag in pet.personalityTags" :key="tag" class="tag">{{ tag }}</el-tag>
    </el-card>

    <el-card v-if="cloud" class="mt">
      <h3>亲密度：{{ cloud.intimacy }} / 1000 （{{ level }}）</h3>
      <el-progress :percentage="Math.min(100, (cloud.intimacy / 1000) * 100)" :stroke-width="18" :duration="0.8" />
      <div class="act-row">
        <el-button :disabled="cloud.remaining.feed <= 0" @click="doInteract('feed')">喂养（今日剩余{{ cloud.remaining.feed }}次）</el-button>
        <el-button :disabled="cloud.remaining.clean <= 0" @click="doInteract('clean')">清洁（今日剩余{{ cloud.remaining.clean }}次）</el-button>
        <el-button :disabled="cloud.remaining.play <= 0" @click="gameVisible = true; doInteract('play')">玩耍（今日剩余{{ cloud.remaining.play }}次）</el-button>
        <el-button :disabled="cloud.remaining.pet <= 0" @click="doInteract('pet')">抚摸（今日剩余{{ cloud.remaining.pet }}次）</el-button>
      </div>
      <el-button v-if="cloud.intimacy >= 600" type="success" @click="router.push(`/apply/${pet.id}`)">申请真实领养</el-button>
    </el-card>

    <el-card v-else class="mt">
      <el-button type="primary" @click="handleCloudAdopt">立即云养</el-button>
    </el-card>

    <el-card class="mt">
      <h3>成长记录时间轴</h3>
      <el-timeline>
        <el-timeline-item v-for="i in timeline" :key="i.id" :timestamp="i.createdAt">
          <video v-if="isVideo(i.mediaUrl)" :src="i.mediaUrl" controls class="timeline-media" />
          <img v-else :src="i.mediaUrl" class="timeline-img" />
          <p>{{ i.content }}</p>
          <el-button text type="primary" @click="like(i.id)">点赞 {{ i.likes }}</el-button>

          <div class="comment-box">
            <div class="comment-list">
              <div v-for="c in commentsByPost[i.id] || []" :key="c.id" class="comment-item">
                <img :src="c.userAvatar" class="comment-avatar" alt="avatar" />
                <div class="comment-content">
                  <div class="comment-top">
                    <span class="comment-user">{{ c.userName }}</span>
                    <span class="comment-time">{{ c.createdAt }}</span>
                  </div>
                  <div class="comment-text">{{ c.content }}</div>
                </div>
              </div>
              <el-empty v-if="(commentsByPost[i.id] || []).length === 0" description="暂无评论" />
            </div>

            <div class="comment-input-row">
              <el-input
                v-model="commentDraft[i.id]"
                size="small"
                placeholder="说点什么..."
                class="comment-input"
                @keyup.enter="submitComment(i.id)"
              />
              <el-button size="small" type="primary" @click="submitComment(i.id)">发布</el-button>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
  <GameModal v-model="gameVisible" />
</template>

<style scoped>
.head-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
}
.mt {
  margin-top: 16px;
}
.tag {
  margin-right: 8px;
}
.act-row {
  margin: 12px 0;
  display: flex;
  gap: 10px;
}
.timeline-img {
  width: 360px;
  max-width: 100%;
  border-radius: 8px;
}

.timeline-media {
  width: 360px;
  max-width: 100%;
  border-radius: 8px;
}

.comment-box {
  margin-top: 10px;
  background: #fafafa;
  border: 1px solid #eef2f7;
  border-radius: 10px;
  padding: 10px;
}

.comment-list {
  max-height: 160px;
  overflow: auto;
}

.comment-item {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px dashed #eef2f7;
}
.comment-item:last-child {
  border-bottom: none;
}

.comment-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.comment-content {
  flex: 1;
  min-width: 0;
}

.comment-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 3px;
}

.comment-user {
  font-weight: 700;
  color: #1f2d3d;
  font-size: 13px;
}
.comment-time {
  color: #8a94a6;
  font-size: 12px;
  white-space: nowrap;
}

.comment-text {
  color: #4a5d75;
  font-size: 13px;
  word-break: break-word;
}

.comment-input-row {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.comment-input {
  flex: 1;
}
</style>
