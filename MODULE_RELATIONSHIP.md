# PawLink 项目模块调用关系

## 1. 整体架构

```
src/
├── main.ts                 # 应用入口
├── App.vue                 # 根组件
├── router/                 # 路由配置
├── stores/                 # 状态管理
├── api/                    # API 接口层
├── views/                  # 页面视图组件
├── components/             # 通用组件
├── types.ts                # TypeScript 类型定义
└── style.css               # 全局样式
```

## 2. 核心依赖关系

### 2.1 应用启动流程
- `main.ts` → 导入并初始化:
  - `App.vue` (根组件)
  - `router/index.ts` (路由)
  - `stores/user.ts` (Pinia store)
  - `ElementPlus` (UI 组件库)
  - `style.css` (全局样式)

### 2.2 路由导航关系
- **公共页面** (无需登录):
  - `/` → `Home.vue`
  - `/pets` → `PetList.vue`
  - `/ranking` → `Ranking.vue`
  - `/login` → `Login.vue`
  - `/admin` → `Admin.vue`

- **受保护页面** (需要登录):
  - `/pets/:id` → `PetDetail.vue`
  - `/profile` → `Profile.vue`
  - `/mall` → `PointsMall.vue`
  - `/tasks` → `Tasks.vue`
  - `/apply/:petId` → `AdoptionApply.vue` (还需要亲密度检查)

## 3. API 层调用关系

### 3.1 API 模块 (`src/api/mock.ts`)
所有数据操作都通过 mock API 实现，主要导出函数包括：

**用户相关:**
- `userLogin(username, password)` → 用户登录
- `logout()` → 用户登出
- `isLoggedIn()` → 检查登录状态
- `isAdminLoggedIn()` → 检查管理员登录状态

**首页数据:**
- `getHomeData()` → 获取首页轮播图、推荐宠物、动态

**宠物相关:**
- `getPets(filters)` → 获取宠物列表
- `getPetDetail(petId)` → 获取宠物详情
- `cloudAdopt(petId)` → 云养宠物
- `interact(petId, action)` → 宠物互动

**个人中心:**
- `getProfileData()` → 获取个人资料、云宠列表、积分明细等

**积分商城:**
- `getProducts()` → 获取商品列表
- `createOrder(productId)` → 创建订单
- `payOrder(orderId)` → 支付订单

**任务系统:**
- `getTasks()` → 获取任务列表
- `signInTask()` → 签到任务

**排行榜:**
- `getRanking()` → 获取排行榜数据

**领养申请:**
- `canApplyAdoption(petId)` → 检查是否可申请领养
- `submitAdoptionApply(petId, reason)` → 提交领养申请

**管理员功能:**
- `adminLogin(username, password)` → 管理员登录
- `getAdminOverview()` → 获取后台概览数据
- `addOrUpdatePet(data)` → 添加/更新宠物
- `togglePetStatus(petId)` → 切换宠物状态
- `addGrowthPost(petId, content, mediaUrl)` → 添加成长记录
- `reviewAdoptionApply(applyId, passed)` → 审核领养申请
- `shipOrder(orderId)` → 发货订单

### 3.2 视图层对 API 的调用

#### Home.vue
- 导入: `getHomeData`
- 调用: `onMounted` 中调用 `getHomeData()`

#### Profile.vue  
- 导入: `getProfileData`, `payOrder`, `pets`
- 调用: 
  - `onMounted` 中调用 `getProfileData()`
  - `mockPay` 函数中调用 `payOrder()`

#### PetList.vue
- 导入: `getPets`, `breeds`
- 调用: `fetchList` 函数中调用 `getPets(filters)`

#### PetDetail.vue
- 导入: `getPetDetail`, `cloudAdopt`, `interact`, `likePost`, `getComments`, `addComment`
- 调用: 各种互动操作对应的 API 函数

#### PointsMall.vue
- 导入: `getProducts`, `createOrder`, `payOrder`
- 调用: 
  - `onMounted` 中调用 `getProducts()`
  - `exchange` 函数中调用 `createOrder()` 和 `payOrder()`

#### Tasks.vue
- 导入: `getTasks`, `signInTask`
- 调用:
  - `onMounted` 中调用 `getTasks()`
  - `signIn` 函数中调用 `signInTask()`

#### Ranking.vue
- 导入: `getRanking`
- 调用: `onMounted` 中调用 `getRanking()`

#### Login.vue
- 导入: `userLogin`
- 调用: `doLogin` 函数中调用 `userLogin()`

#### AdoptionApply.vue
- 导入: `submitAdoptionApply`
- 调用: `submit` 函数中调用 `submitAdoptionApply()`

#### Admin.vue
- 导入: 多个管理员 API 函数
- 调用: 各种管理操作对应的 API 函数

## 4. Store 层调用关系

### 4.1 User Store (`src/stores/user.ts`)
- **状态**: 用户基本信息、登录状态、积分等
- **Actions**:
  - `load()` → 加载用户数据 (调用 `getProfileData`)
  - `login()` → 用户登录 (调用 `userLogin` + `load`)
  - `logout()` → 用户登出 (调用 `logout` API)

### 4.2 视图层对 Store 的使用

#### App.vue
- 导入: `useUserStore`
- 使用: `onMounted` 中调用 `userStore.load()`
- 使用: `doLogout` 函数中调用 `userStore.logout()`

#### Profile.vue
- 导入: `useUserStore`
- 使用: 显示用户信息 (`userStore.username`, `userStore.points` 等)
- 使用: `refresh` 函数中调用 `userStore.load()`

#### 其他受保护页面
- 在模板中使用 `v-if="userStore.loggedIn"` 控制显示

## 5. 组件间关系

### 5.1 通用组件
- `PetCard.vue` → 在 `Home.vue` 和 `PetList.vue` 中使用
- `BadgeWall.vue` → 在 `Profile.vue` 中使用

### 5.2 页面组件依赖
- 所有页面组件都依赖 `vue-router` 的 `RouterView`
- 受保护页面都依赖 `userStore` 的登录状态
- 大部分页面都使用 `ElementPlus` 组件

## 6. 数据流总结

```
用户操作 → 视图组件 → API 调用 → Mock 数据层 → 响应数据 → 视图更新
                             ↑
                         Store 状态同步
```

- **API 层**: 所有业务逻辑和数据操作都在 `mock.ts` 中实现
- **Store 层**: 主要管理用户会话状态，在登录/登出时与 API 同步
- **视图层**: 负责 UI 渲染和用户交互，调用 API 获取/提交数据
- **路由层**: 控制页面导航和访问权限

## 7. 关键设计特点

1. **Mock API 模式**: 所有后端接口都通过前端 mock 实现，便于开发和演示
2. **Pinia 状态管理**: 使用 Pinia 管理用户会话状态
3. **Vue Router 导航守卫**: 实现页面访问权限控制
4. **ElementPlus UI**: 统一的 UI 组件库
5. **TypeScript 类型安全**: 完整的类型定义确保代码质量