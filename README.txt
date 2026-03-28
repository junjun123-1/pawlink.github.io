PawLink 宠物领养与互动平台项目

本文件夹为 PawLink 项目的根目录，这是一个基于 Vue 3 + TypeScript + Element Plus 开发的宠物领养与互动平台。项目采用现代化前端技术栈，支持桌面端宽屏布局（最大1800px），提供完整的用户交互体验。

主要文件和文件夹说明：

【根目录文件】
├── README.md                - 项目 Markdown 格式的说明文档
├── README.txt               - 本说明文件（纯文本格式）
├── DATABASE_DESIGN.md       - 数据库设计文档
├── MODULE_RELATIONSHIP.md   - 模块关系设计文档
├── package.json             - 项目依赖和脚本配置
├── package-lock.json        - 依赖版本锁定文件
├── tsconfig.json            - TypeScript 全局配置
├── tsconfig.app.json        - 应用特定的 TypeScript 配置
├── tsconfig.node.json       - Node 环境的 TypeScript 配置
├── vite.config.ts           - Vite 构建工具配置
├── index.html               - 应用入口 HTML 文件
├── .gitignore               - Git 忽略文件配置
└── .vscode/                 - VS Code 编辑器配置目录

【public 目录】- 静态资源目录（直接复制到构建输出目录）
├── favicon.svg              - 网站图标
├── icons.svg                - Element Plus 图标资源
├── 头像.jpg                 - 用户头像图片
├── 可乐.jpg                 - 宠物"可乐"的主图片
├── 可乐坐下.jpg             - 宠物"可乐"的成长记录图片
├── 可乐洗澡.jpg             - 宠物"可乐"的成长记录图片
├── 小满.jpg                 - 宠物"小满"的主图片
├── 来财.jpg                 - 宠物"来财"的主图片
├── 灰团.jpg                 - 宠物"灰团"的主图片
├── 糯米.jpg                 - 宠物"糯米"的主图片
├── 饼饼.jpg                 - 宠物"饼饼"的主图片
├── 帆布袋.jpg               - 积分商城商品"帆布袋"图片
├── 宠物玩具盲盒.jpg         - 积分商城商品"宠物玩具盲盒"图片
├── 定制徽章.jpg             - 积分商城商品"定制徽章"图片
├── 首页图片1.png            - 首页轮播图1
├── 首页图片2.png            - 首页轮播图2
└── 首页图片3.jpg            - 首页轮播图3

【src 目录】- 源代码目录
├── main.ts                  - 应用入口文件
├── App.vue                  - 根组件
├── style.css                - 全局样式文件
├── types.ts                 - TypeScript 类型定义文件
├── assets/                  - 组件内使用的静态资源
├── api/                     - API 接口和 mock 数据
│   └── mock.ts              - 模拟数据和 API 实现
├── components/              - 可复用组件
│   ├── BadgeWall.vue        - 徽章墙组件
│   ├── CommentList.vue      - 评论列表组件
│   ├── PetCard.vue          - 宠物卡片组件
│   └── PostMedia.vue        - 媒体内容组件
├── router/                  - 路由配置
│   └── index.ts             - 路由定义和守卫
├── stores/                  - Pinia 状态管理
│   └── user.ts              - 用户状态 store
└── views/                   - 页面视图组件
    ├── Home.vue             - 首页
    ├── Login.vue            - 登录页面
    ├── Profile.vue          - 个人中心页面
    ├── PetList.vue          - 宠物列表页面
    ├── PetDetail.vue        - 宠物详情页面
    ├── PointsMall.vue       - 积分商城页面
    ├── Tasks.vue            - 任务中心页面
    ├── Ranking.vue          - 排行榜页面
    ├── AdoptionApply.vue    - 领养申请页面
    └── Admin.vue            - 管理后台页面

【其他目录】
├── dist/                    - 构建输出目录（生产环境文件）
├── node_modules/            - 项目依赖包目录
└── .git/                    - Git 版本控制目录

项目功能特性：
- 宠物浏览与领养申请
- 云养宠物互动系统
- 积分商城兑换文创产品
- 任务中心赚取积分
- 爱心排行榜展示
- 管理后台审核功能
- 响应式桌面端优化设计

技术栈：
- Vue 3 (Composition API)
- TypeScript
- Element Plus UI 组件库
- Pinia 状态管理
- Vue Router 路由管理
- Vite 构建工具