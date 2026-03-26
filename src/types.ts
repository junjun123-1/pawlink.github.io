export type PetStatus = 'cloud' | 'adoptable'
export type Gender = '公' | '母'
export type AgeGroup = '幼年' | '成年' | '老年'

export interface Pet {
  id: number
  name: string
  avatar: string
  images: string[]
  breed: string
  gender: Gender
  ageGroup: AgeGroup
  personalityTags: string[]
  story: string
  desc: string
  status: PetStatus
}

export interface GrowthPost {
  id: number
  petId: number
  content: string
  mediaUrl: string
  likes: number
  createdAt: string
}

export interface PostComment {
  id: number
  postId: number
  userName: string
  userAvatar: string
  content: string
  createdAt: string
}

export interface AdoptionApplication {
  id: string
  petId: number
  petName: string
  userId: number
  userName: string
  reason: string
  status: '待审核' | '已通过' | '已拒绝'
}

export interface UserCloudPet {
  petId: number
  intimacy: number
  remaining: Record<'feed' | 'clean' | 'play' | 'pet', number>
}

export interface MallProduct {
  id: number
  name: string
  image: string
  points: number
  cashDiff: number
  stock: number
}

export interface TaskItem {
  id: number
  title: string
  reward: number
  progress: number
  target: number
  type: 'daily' | 'achievement'
  done: boolean
}

export interface RankingItem {
  uid: number
  nickname: string
  avatar: string
  amount: number
  intimacy: number
  activeCount: number
}
