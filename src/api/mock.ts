import type {
  AdoptionApplication,
  GrowthPost,
  MallProduct,
  Pet,
  PostComment,
  RankingItem,
  TaskItem,
  UserCloudPet
} from '../types'

const wait = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

export const breeds = ['中华田园猫', '英短', '金毛', '柯基', '中华田园犬', '比格犬']

export const pets: Pet[] = [
  { id: 1, name: '可乐', avatar: '/可乐.jpg', images: ['/可乐.jpg'], breed: '比格犬', gender: '公', ageGroup: '幼年', personalityTags: ['亲人', '活泼'], story: '在雨夜被救助，如今逐渐恢复健康。', desc: '喜欢追球，饭量很好。', status: 'cloud' },
  { id: 2, name: '小满', avatar: '/小满.jpg', images: ['/小满.jpg'], breed: '英短', gender: '母', ageGroup: '成年', personalityTags: ['温柔', '黏人'], story: '曾长期流浪，现已适应室内生活。', desc: '爱在窗边晒太阳。', status: 'adoptable' },
  { id: 3, name: '来财', avatar: '/来财.jpg', images: ['/来财.jpg'], breed: '柯基', gender: '母', ageGroup: '幼年', personalityTags: ['聪明', '贪吃'], story: '腿部受伤后康复良好。', desc: '训练反应很快。', status: 'cloud' },
  { id: 4, name: '灰团', avatar: '/灰团.jpg', images: ['/灰团.jpg'], breed: '中华田园犬', gender: '公', ageGroup: '老年', personalityTags: ['稳重'], story: '年纪较大，需要更多照顾。', desc: '散步节奏慢，性格超稳。', status: 'adoptable' },
  { id: 5, name: '糯米', avatar: '/糯米.jpg', images: ['/糯米.jpg'], breed: '中华田园猫', gender: '母', ageGroup: '成年', personalityTags: ['独立', '好奇'], story: '从市场附近救助，已完成绝育。', desc: '喜欢玩羽毛棒。', status: 'cloud' },
  { id: 6, name: '饼饼', avatar: '/饼饼.jpg', images: ['/饼饼.jpg'], breed: '金毛', gender: '公', ageGroup: '成年', personalityTags: ['友好'], story: '被遗弃后由站内长期照料。', desc: '非常亲人，适合家庭领养。', status: 'adoptable' }
]

export const posts: GrowthPost[] = [
  { id: 1, petId: 1, content: '今天给可乐洗了澡，超级配合。', mediaUrl: '/可乐洗澡.jpg', likes: 20, createdAt: '2026-03-24 10:10' },
  { id: 2, petId: 1, content: '可乐学会了坐下指令。', mediaUrl: '/可乐坐下.jpg', likes: 12, createdAt: '2026-03-23 14:20' },
  { id: 3, petId: 3, content: '球球今天散步 3 公里。', mediaUrl: 'https://placehold.co/600x300?text=Post3', likes: 16, createdAt: '2026-03-22 09:10' }
]

export const products: MallProduct[] = [
  { id: 1, name: 'PawLink 帆布袋', image: '/帆布袋.jpg', points: 300, cashDiff: 0, stock: 8 },
  { id: 2, name: '宠物玩具盲盒', image: '/宠物玩具盲盒.jpg', points: 500, cashDiff: 9.9, stock: 15 },
  { id: 3, name: '定制徽章', image: '/定制徽章.jpg', points: 200, cashDiff: 0, stock: 0 }
]

let userCloudPets: UserCloudPet[] = [
  { petId: 1, intimacy: 550, remaining: { feed: 2, clean: 2, play: 1, pet: 3 } },
  { petId: 5, intimacy: 220, remaining: { feed: 1, clean: 2, play: 1, pet: 2 } }
]

let pointsBalance = 1280
const currentUid = 99
let adminLoggedIn = false
let currentUser: { id: number; username: string; avatar: string; donate: number; isAdmin: boolean } | null = {
  id: currentUid,
  username: 'jun',
  avatar: '/头像.jpg',
  donate: 666,
  isAdmin: false
}
let orderSeed = 2
let postSeed = 100

let tasks: TaskItem[] = [
  { id: 1, title: '今日签到', reward: 20, progress: 0, target: 1, type: 'daily', done: false },
  { id: 2, title: '完成 3 次互动', reward: 40, progress: 1, target: 3, type: 'daily', done: false },
  { id: 3, title: '累计喂养 100 次', reward: 200, progress: 34, target: 100, type: 'achievement', done: false }
]

const ranking: RankingItem[] = Array.from({ length: 30 }).map((_, i) => ({
  uid: i + 1,
  nickname: `爱心用户${i + 1}`,
  avatar: `https://placehold.co/80x80?text=U${i + 1}`,
  amount: 5000 - i * 120,
  intimacy: 2800 - i * 70,
  activeCount: 120 - i * 3
}))
ranking.push({
  uid: currentUid,
  nickname: 'jun',
  avatar: 'https://placehold.co/80x80?text=ME',
  amount: 320,
  intimacy: 380,
  activeCount: 16
})

let orders = [{ id: 'OD20260325001', productName: 'PawLink 帆布袋', status: '待支付' }]
let adoptionApplications: AdoptionApplication[] = [
  { id: 'AP20260325001', petId: 1, petName: '小白', userId: currentUid, userName: 'jun', reason: '有稳定环境', status: '待审核' }
]

let comments: PostComment[] = [
  {
    id: 1,
    postId: 1,
    userName: '欣欣',
    userAvatar: 'https://placehold.co/32x32?text=XX',
    content: '小白好乖！',
    createdAt: '2026-03-24 10:15'
  }
]
let commentSeed = 10

export async function getHomeData() {
  await wait()
  return {
    banners: [
      { id: 1, image: '/首页图片1.png', link: '/pets/1' },
      { id: 2, image: '/首页图片2.png', link: '/tasks' }
    ],
    recommendPets: pets.slice(0, 6),
    latestPosts: posts.slice(0, 5)
  }
}

export async function getPets(filters?: Record<string, string>) {
  await wait()
  let list = [...pets]
  if (filters?.breed) list = list.filter((p) => p.breed === filters.breed)
  if (filters?.gender) list = list.filter((p) => p.gender === filters.gender)
  if (filters?.ageGroup) list = list.filter((p) => p.ageGroup === filters.ageGroup)
  if (filters?.status) list = list.filter((p) => p.status === filters.status)
  if (filters?.keyword) {
    const k = filters.keyword.trim()
    list = list.filter((p) => p.name.includes(k) || p.desc.includes(k))
  }
  return list
}

export async function getPetDetail(petId: number) {
  await wait()
  const pet = pets.find((p) => p.id === petId)
  // 未登录时不返回云养信息，保证“亲密度区域仅当已登录且已云养时显示”
  const cloud = currentUser ? userCloudPets.find((x) => x.petId === petId) : undefined
  return {
    pet,
    cloud,
    // 时间倒序展示：id 越大越新（addGrowthPost 时会自增递增）
    timeline: posts
      .filter((x) => x.petId === petId)
      .slice()
      .sort((a, b) => b.id - a.id)
  }
}

export async function cloudAdopt(petId: number) {
  await wait()
  if (!currentUser) throw new Error('请先登录')
  if (!userCloudPets.some((x) => x.petId === petId)) {
    userCloudPets.push({ petId, intimacy: 50, remaining: { feed: 2, clean: 2, play: 1, pet: 3 } })
  }
  return true
}

export async function interact(petId: number, action: 'feed' | 'clean' | 'play' | 'pet') {
  await wait()
  if (!currentUser) throw new Error('请先登录')
  const target = userCloudPets.find((x) => x.petId === petId)
  if (!target) throw new Error('请先云养')
  if (target.remaining[action] <= 0) throw new Error('今日次数已用完')
  target.remaining[action] -= 1
  const gain = action === 'play' ? 30 : 20
  target.intimacy += gain
  pointsBalance += 10
  tasks = tasks.map((t) => {
    if (t.id === 2) {
      const progress = Math.min(t.target, t.progress + 1)
      return { ...t, progress, done: progress >= t.target }
    }
    if (t.id === 3 && action === 'feed') {
      const progress = Math.min(t.target, t.progress + 1)
      return { ...t, progress, done: progress >= t.target }
    }
    return t
  })
  return { intimacy: target.intimacy, points: pointsBalance, remaining: target.remaining }
}

export async function likePost(postId: number) {
  await wait()
  if (!currentUser) throw new Error('请先登录')
  const target = posts.find((x) => x.id === postId)
  if (target) target.likes += 1
  return target?.likes || 0
}

export async function getProfileData() {
  await wait()
  if (!currentUser) {
    throw new Error('请先登录')
  }
  const u = currentUser
  return {
    user: {
      id: u.id,
      username: u.username,
      avatar: u.avatar,
      points: pointsBalance,
      donate: u.donate,
      isAdmin: u.isAdmin
    },
    cloudPets: userCloudPets,
    pointsLogs: [
      { time: '2026-03-25 09:00', reason: '签到奖励', delta: +20 },
      { time: '2026-03-24 20:12', reason: '互动奖励', delta: +10 }
    ],
    badges: [
      { name: '新手助养官', unlocked: true, condition: '首次云养成功' },
      { name: '互动达人', unlocked: tasks.find((x) => x.id === 2)?.done || false, condition: '累计互动 50 次' }
    ],
    orders,
    adoptionApplications: adoptionApplications.filter((a) => a.userId === u.id)
  }
}

export async function getProducts() {
  await wait()
  return products
}

export async function createOrder(productId: number) {
  await wait()
  const p = products.find((x) => x.id === productId)
  if (!p || p.stock <= 0) throw new Error('库存不足')
  if (pointsBalance < p.points) throw new Error('积分不足')
  p.stock -= 1
  pointsBalance -= p.points
  const id = `OD20260325${String(orderSeed++).padStart(3, '0')}`
  const status = p.cashDiff > 0 ? '待支付' : '已支付'
  orders.unshift({ id, productName: p.name, status })
  return { needCashPay: p.cashDiff > 0, cash: p.cashDiff, orderId: id }
}

export async function payOrder(orderId: string) {
  await wait()
  orders = orders.map((o) => (o.id === orderId ? { ...o, status: '已支付' } : o))
  return true
}

export async function shipOrder(orderId: string) {
  await wait()
  orders = orders.map((o) => (o.id === orderId ? { ...o, status: '已发货' } : o))
  return true
}

export async function getTasks() {
  await wait()
  return tasks
}

export async function signInTask() {
  await wait()
  tasks = tasks.map((t) => (t.id === 1 ? { ...t, progress: 1, done: true } : t))
  pointsBalance += 20
  return { points: pointsBalance, tasks }
}

export async function getRanking() {
  await wait()
  return ranking
}

export async function canApplyAdoption(petId: number) {
  await wait()
  const cloud = userCloudPets.find((x) => x.petId === petId)
  return !!cloud && cloud.intimacy >= 600
}

export async function submitAdoptionApply(petId: number, reason: string) {
  await wait()
  if (!currentUser) throw new Error('请先登录')
  const pet = pets.find((x) => x.id === petId)
  if (!pet) return false
  adoptionApplications.unshift({
    id: `AP20260325${Math.floor(Math.random() * 9999)}`,
    petId,
    petName: pet.name,
    userId: currentUid,
    userName: 'jun',
    reason,
    status: '待审核'
  })
  return true
}

export async function adminLogin(username: string, password: string) {
  await wait()
  adminLoggedIn = username === 'admin' && password === 'pawlink123'
  if (adminLoggedIn) {
    currentUser = {
      id: 1,
      username: 'admin',
      avatar: 'https://placehold.co/100x100?text=A',
      donate: 0,
      isAdmin: true
    }
  }
  return adminLoggedIn
}

export function isAdminLoggedIn() {
  return adminLoggedIn
}

export async function userLogin(username: string, password: string) {
  await wait()
  if (!username || password.length < 4) return null
  adminLoggedIn = false
  currentUser = {
    id: currentUid,
    username,
    avatar: `https://placehold.co/100x100?text=${encodeURIComponent(username.slice(0, 1).toUpperCase())}`,
    donate: 666,
    isAdmin: false
  }
  return currentUser
}

export function logout() {
  adminLoggedIn = false
  currentUser = null
}

export function isLoggedIn() {
  return !!currentUser
}

export async function getAdminOverview() {
  await wait()
  return { pets, posts, orders, adoptionApplications }
}

export async function addOrUpdatePet(data: Partial<Pet> & { id?: number }) {
  await wait()
  if (data.id) {
    const idx = pets.findIndex((x) => x.id === data.id)
    if (idx >= 0) pets[idx] = { ...pets[idx], ...data } as Pet
    return true
  }
  const id = Math.max(...pets.map((p) => p.id)) + 1
  pets.push({
    id,
    name: data.name || `新宠物${id}`,
    avatar: data.avatar || 'https://placehold.co/300x220?text=New',
    images: data.images || ['https://placehold.co/780x380?text=New'],
    breed: data.breed || '中华田园猫',
    gender: data.gender || '公',
    ageGroup: data.ageGroup || '成年',
    personalityTags: data.personalityTags || ['待完善'],
    story: data.story || '待补充',
    desc: data.desc || '待补充',
    status: data.status || 'cloud'
  })
  return true
}

export async function togglePetStatus(petId: number) {
  await wait()
  const target = pets.find((x) => x.id === petId)
  if (!target) return false
  target.status = target.status === 'cloud' ? 'adoptable' : 'cloud'
  return true
}

export async function addGrowthPost(petId: number, content: string, mediaUrl: string) {
  await wait()
  posts.unshift({
    id: postSeed++,
    petId,
    content,
    mediaUrl,
    likes: 0,
    createdAt: new Date().toLocaleString()
  })
  return true
}

export async function reviewAdoptionApply(applyId: string, passed: boolean) {
  await wait()
  adoptionApplications = adoptionApplications.map((a) =>
    a.id === applyId ? { ...a, status: passed ? '已通过' : '已拒绝' } : a
  )
  return true
}

export async function getComments(postId: number) {
  await wait(120)
  return comments
    .filter((c) => c.postId === postId)
    .slice()
    .sort((a, b) => b.id - a.id)
}

export async function addComment(postId: number, content: string) {
  await wait(150)
  if (!currentUser) throw new Error('请先登录')
  const trimmed = content.trim()
  if (!trimmed) throw new Error('评论内容不能为空')
  const c: PostComment = {
    id: commentSeed++,
    postId,
    userName: currentUser.username,
    userAvatar: currentUser.avatar,
    content: trimmed,
    createdAt: new Date().toLocaleString()
  }
  comments.unshift(c)
  return c
}
