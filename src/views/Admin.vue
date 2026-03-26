<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  addGrowthPost,
  addOrUpdatePet,
  adminLogin,
  getAdminOverview,
  isAdminLoggedIn,
  reviewAdoptionApply,
  shipOrder,
  togglePetStatus
} from '../api/mock'
import { ElMessage } from 'element-plus'
import type { AgeGroup, Gender } from '../types'

const logged = ref(false)
const account = ref('admin')
const password = ref('pawlink123')
const pets = ref<any[]>([])
const posts = ref<any[]>([])
const orders = ref<any[]>([])
const applications = ref<any[]>([])

const petForm = ref<{ name: string; breed: string; gender: Gender; ageGroup: AgeGroup; desc: string }>({
  name: '',
  breed: '中华田园猫',
  gender: '公',
  ageGroup: '成年',
  desc: ''
})
const postForm = ref({ petId: 1, content: '', mediaUrl: 'https://placehold.co/600x300?text=NewPost' })
const editVisible = ref(false)
const editPet = ref<any>(null)
const uploadImages = ref<string[]>([])

function readFileAsDataURL(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function reload() {
  const data = await getAdminOverview()
  pets.value = data.pets
  posts.value = data.posts
  orders.value = data.orders
  applications.value = data.adoptionApplications
}

async function doLogin() {
  const ok = await adminLogin(account.value, password.value)
  if (!ok) return ElMessage.error('管理员账号或密码错误')
  logged.value = true
  await reload()
}

async function submitPet() {
  await addOrUpdatePet({
    ...petForm.value,
    avatar: 'https://placehold.co/300x220?text=AdminNew',
    images: ['https://placehold.co/780x380?text=AdminNew'],
    story: '后台新增',
    personalityTags: ['友好'],
    status: 'cloud'
  })
  ElMessage.success('宠物已添加')
  await reload()
}

function openEdit(row: any) {
  editPet.value = { ...row }
  uploadImages.value = []
  editVisible.value = true
}

async function onUploadChange(_: any, fileList: any[]) {
  const rawFiles = fileList
    .map((f) => f?.raw as File | undefined)
    .filter((f): f is File => !!f)
  if (rawFiles.length === 0) {
    uploadImages.value = []
    return
  }
  uploadImages.value = await Promise.all(rawFiles.map(readFileAsDataURL))
}

async function saveEdit() {
  if (!editPet.value) return
  const newAvatar = uploadImages.value[0] || editPet.value.avatar
  const newImages = uploadImages.value.length
    ? uploadImages.value
    : Array.isArray(editPet.value.images) && editPet.value.images.length > 0
      ? editPet.value.images
      : [newAvatar]
  await addOrUpdatePet({
    ...editPet.value,
    avatar: newAvatar,
    images: newImages
  })
  ElMessage.success('宠物信息已更新')
  editVisible.value = false
  await reload()
}

async function addPost() {
  await addGrowthPost(postForm.value.petId, postForm.value.content, postForm.value.mediaUrl)
  ElMessage.success('动态已发布')
  await reload()
}

onMounted(async () => {
  logged.value = isAdminLoggedIn()
  if (logged.value) await reload()
})
</script>

<template>
  <el-card v-if="!logged">
    <h3>管理员登录</h3>
    <p>演示账号：admin / pawlink123</p>
    <el-input v-model="account" placeholder="账号" class="input" />
    <el-input v-model="password" type="password" placeholder="密码" class="input" />
    <el-button type="primary" @click="doLogin">登录后台</el-button>
  </el-card>

  <template v-else>
    <el-alert title="救助站后台（可交互演示）" type="success" show-icon />
    <el-card class="mt">
      <h3>宠物管理</h3>
      <el-form inline>
        <el-input v-model="petForm.name" placeholder="宠物名" />
        <el-input v-model="petForm.breed" placeholder="品种" />
        <el-input v-model="petForm.desc" placeholder="简介" />
        <el-button type="primary" @click="submitPet">新增宠物</el-button>
      </el-form>
      <el-table :data="pets" class="mt">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名字" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" @click="togglePetStatus(row.id).then(reload)">切换状态</el-button>
            <el-button size="small" type="primary" @click="openEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="mt">
      <h3>成长记录管理</h3>
      <el-form inline>
        <el-input v-model.number="postForm.petId" placeholder="宠物ID" />
        <el-input v-model="postForm.content" placeholder="动态内容" class="wide" />
        <el-button @click="addPost">发布动态</el-button>
      </el-form>
      <p>当前动态总数：{{ posts.length }}</p>
    </el-card>

    <el-card class="mt">
      <h3>订单管理</h3>
      <el-table :data="orders">
        <el-table-column prop="id" label="订单号" />
        <el-table-column prop="productName" label="商品" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button v-if="row.status === '已支付'" size="small" type="success" @click="shipOrder(row.id).then(reload)">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="mt">
      <h3>领养审核</h3>
      <el-table :data="applications">
        <el-table-column prop="id" label="申请单号" />
        <el-table-column prop="petName" label="宠物" />
        <el-table-column prop="userName" label="用户" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" type="success" @click="reviewAdoptionApply(row.id, true).then(reload)">通过</el-button>
            <el-button size="small" type="danger" @click="reviewAdoptionApply(row.id, false).then(reload)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </template>

  <el-dialog v-model="editVisible" title="编辑宠物信息" width="560px">
    <el-form v-if="editPet" label-width="90px">
      <el-form-item label="名字"><el-input v-model="editPet.name" /></el-form-item>
      <el-form-item label="品种"><el-input v-model="editPet.breed" /></el-form-item>
      <el-form-item label="简介"><el-input v-model="editPet.desc" /></el-form-item>
      <el-form-item label="头像上传">
        <el-upload
          :auto-upload="false"
          multiple
          :show-file-list="false"
          accept="image/*"
          :on-change="onUploadChange"
        >
          <el-button type="primary">选择多图</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="预览">
        <div class="previews">
          <img
            :src="uploadImages[0] || editPet.avatar"
            class="preview"
            alt="preview"
          />
          <span v-if="uploadImages.length > 1" class="preview-more">共 {{ uploadImages.length }} 张</span>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editVisible = false">取消</el-button>
      <el-button type="primary" @click="saveEdit">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.mt {
  margin-top: 12px;
}
.input {
  width: 260px;
  margin-bottom: 10px;
}
.wide {
  width: 300px;
}
.preview {
  width: 180px;
  border-radius: 8px;
}
.previews {
  display: flex;
  align-items: center;
  gap: 12px;
}
.preview-more {
  color: #7d8795;
  font-size: 13px;
}
</style>
