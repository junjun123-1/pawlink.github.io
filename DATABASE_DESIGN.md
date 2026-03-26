# PawLink 项目数据库详细设计

## 1. 数据库设计概述

PawLink 是一个宠物救助和云养平台，核心功能包括：
- 宠物信息管理（救助/领养状态）
- 用户云养互动系统
- 积分商城和任务系统  
- 成长记录和社交互动
- 领养申请审核流程

**设计原则**: 采用关系型数据库设计，优先保证数据一致性，适当使用反范式化提升查询性能。

## 2. 实体关系图 (ERD)

```
┌─────────────┐       ┌─────────────┐       ┌──────────────┐
│    User     │───────│ CloudPet    │───────│     Pet      │
└─────────────┘ 1   * └─────────────┘ *   1 └──────────────┘
      │                                            │
      │ 1                                          │ 1
      │                                            │
┌─────────────┐                              ┌──────────────┐
│   Order     │                              │ GrowthPost   │
└─────────────┘                              └──────────────┘
      │                                            │
      │ 1                                          │ *
      │                                            │
┌─────────────┐                              ┌──────────────┐
│   Product   │                              │ PostComment  │
└─────────────┘                              └──────────────┘

┌─────────────┐       ┌──────────────────┐
│    Task     │───────│ UserTaskProgress │
└─────────────┘ *   1 └──────────────────┘

┌─────────────┐       ┌──────────────────┐
│    User     │───────│ AdoptionApply    │
└─────────────┘ 1   * └──────────────────┘
```

## 3. 数据表设计

### 3.1 用户表 (users)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 用户ID |
| username | VARCHAR(50) | UNIQUE, NOT NULL | 用户名 |
| password_hash | VARCHAR(255) | NOT NULL | 密码哈希 |
| avatar_url | VARCHAR(500) | | 头像URL |
| points_balance | INT | DEFAULT 0 | 积分余额 |
| total_donate | DECIMAL(10,2) | DEFAULT 0.00 | 累计助养金额 |
| is_admin | BOOLEAN | DEFAULT false | 是否管理员 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

### 3.2 宠物表 (pets)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 宠物ID |
| name | VARCHAR(100) | NOT NULL | 宠物名称 |
| avatar_url | VARCHAR(500) | NOT NULL | 主头像URL |
| breed | VARCHAR(100) | NOT NULL | 品种 |
| gender | ENUM('公','母') | NOT NULL | 性别 |
| age_group | ENUM('幼年','成年','老年') | NOT NULL | 年龄组 |
| story | TEXT | NOT NULL | 救助故事 |
| description | TEXT | NOT NULL | 描述 |
| status | ENUM('cloud','adoptable') | NOT NULL | 状态 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

### 3.3 宠物图片表 (pet_images)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 图片ID |
| pet_id | BIGINT | FK, NOT NULL | 宠物ID |
| image_url | VARCHAR(500) | NOT NULL | 图片URL |
| sort_order | INT | DEFAULT 0 | 排序序号 |

> **反范式说明**: 将图片单独建表而非存储为JSON数组，便于图片管理和排序控制。

### 3.4 云养关系表 (cloud_pets)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| user_id | BIGINT | PK, FK | 用户ID |
| pet_id | BIGINT | PK, FK | 宠物ID |
| intimacy_level | INT | DEFAULT 0 | 亲密度 |
| feed_count | INT | DEFAULT 0 | 喂养次数 |
| clean_count | INT | DEFAULT 0 | 清洁次数 |
| play_count | INT | DEFAULT 0 | 互动次数 |
| pet_count | INT | DEFAULT 0 | 抚摸次数 |
| last_interact_at | DATETIME | | 最后互动时间 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 云养开始时间 |

> **反范式说明**: 将互动计数直接存储在关系表中，避免频繁聚合查询，提升性能。

### 3.5 成长记录表 (growth_posts)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 记录ID |
| pet_id | BIGINT | FK, NOT NULL | 宠物ID |
| content | TEXT | NOT NULL | 内容 |
| media_url | VARCHAR(500) | | 媒体URL |
| likes_count | INT | DEFAULT 0 | 点赞数 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |

### 3.6 评论表 (post_comments)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 评论ID |
| post_id | BIGINT | FK, NOT NULL | 成长记录ID |
| user_id | BIGINT | FK, NOT NULL | 用户ID |
| content | TEXT | NOT NULL | 评论内容 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |

### 3.7 商品表 (mall_products)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 商品ID |
| name | VARCHAR(200) | NOT NULL | 商品名称 |
| image_url | VARCHAR(500) | NOT NULL | 商品图片 |
| points_required | INT | NOT NULL | 所需积分 |
| cash_difference | DECIMAL(10,2) | DEFAULT 0.00 | 现金差价 |
| stock_quantity | INT | DEFAULT 0 | 库存数量 |
| is_active | BOOLEAN | DEFAULT true | 是否上架 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |

### 3.8 订单表 (orders)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| id | VARCHAR(50) | PK | 订单ID (格式: OD+日期+序列) |
| user_id | BIGINT | FK, NOT NULL | 用户ID |
| product_id | BIGINT | FK, NOT NULL | 商品ID |
| product_name | VARCHAR(200) | NOT NULL | 商品名称快照 |
| points_used | INT | NOT NULL | 使用积分 |
| cash_paid | DECIMAL(10,2) | DEFAULT 0.00 | 支付现金 |
| status | ENUM('待支付','已支付','已发货','已完成','已取消') | DEFAULT '待支付' | 订单状态 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

> **反范式说明**: 存储 `product_name` 快照，防止商品信息变更影响历史订单。

### 3.9 任务表 (tasks)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 任务ID |
| title | VARCHAR(200) | NOT NULL | 任务标题 |
| description | TEXT | | 任务描述 |
| reward_points | INT | NOT NULL | 奖励积分 |
| target_value | INT | NOT NULL | 目标值 |
| task_type | ENUM('daily','achievement') | NOT NULL | 任务类型 |
| is_active | BOOLEAN | DEFAULT true | 是否启用 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |

### 3.10 用户任务进度表 (user_task_progress)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| user_id | BIGINT | PK, FK | 用户ID |
| task_id | BIGINT | PK, FK | 任务ID |
| current_progress | INT | DEFAULT 0 | 当前进度 |
| is_completed | BOOLEAN | DEFAULT false | 是否完成 |
| completed_at | DATETIME | | 完成时间 |
| last_updated | DATETIME | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 最后更新时间 |

### 3.11 领养申请表 (adoption_applications)
| 字段名 | 数据类型 | 约束 | 说明 |
|--------|----------|------|------|
| id | VARCHAR(50) | PK | 申请ID (格式: AP+日期+序列) |
| user_id | BIGINT | FK, NOT NULL | 用户ID |
| pet_id | BIGINT | FK, NOT NULL | 宠物ID |
| pet_name | VARCHAR(100) | NOT NULL | 宠物名称快照 |
| user_name | VARCHAR(50) | NOT NULL | 用户名快照 |
| reason | TEXT | NOT NULL | 申请理由 |
| status | ENUM('待审核','已通过','已拒绝') | DEFAULT '待审核' | 申请状态 |
| reviewed_by | BIGINT | FK | 审核管理员ID |
| reviewed_at | DATETIME | | 审核时间 |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |

> **反范式说明**: 存储 `pet_name` 和 `user_name` 快照，确保历史记录的完整性。

## 4. 索引设计

### 4.1 核心索引
```sql
-- 用户相关
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_points ON users(points_balance);

-- 宠物相关  
CREATE INDEX idx_pets_status ON pets(status);
CREATE INDEX idx_pets_breed ON pets(breed);

-- 云养关系
CREATE INDEX idx_cloud_pets_user ON cloud_pets(user_id);
CREATE INDEX idx_cloud_pets_pet ON cloud_pets(pet_id);
CREATE INDEX idx_cloud_pets_intimacy ON cloud_pets(intimacy_level);

-- 成长记录
CREATE INDEX idx_posts_pet ON growth_posts(pet_id);
CREATE INDEX idx_posts_created ON growth_posts(created_at);

-- 订单相关
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);

-- 任务相关
CREATE INDEX idx_task_progress_user ON user_task_progress(user_id);
CREATE INDEX idx_task_progress_completed ON user_task_progress(is_completed);
```

### 4.2 复合索引
```sql
-- 高频查询优化
CREATE INDEX idx_cloud_pets_user_intimacy ON cloud_pets(user_id, intimacy_level);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_posts_pet_created ON growth_posts(pet_id, created_at DESC);
```

## 5. 反范式化设计说明

### 5.1 必要的反范式化
1. **快照字段**: 订单和领养申请中的名称快照，保证历史数据一致性
2. **计数字段**: 云养关系中的互动计数，避免实时聚合计算
3. **冗余字段**: 成长记录的点赞数，支持快速展示

### 5.2 性能与一致性的权衡
- **读多写少**: 成长记录、评论等社交功能以读取为主，适合反范式化
- **实时性要求**: 任务进度、积分余额需要强一致性，保持规范化
- **历史追溯**: 订单、申请等业务需要完整历史记录，采用快照模式

## 6. 数据完整性约束

### 6.1 外键约束
- 所有关系表都建立外键约束，确保引用完整性
- 删除用户时级联删除相关云养关系、订单、评论等
- 删除宠物时级联删除图片、成长记录、云养关系等

### 6.2 业务约束
```sql
-- 积分不能为负
ALTER TABLE users ADD CONSTRAINT chk_points_non_negative 
CHECK (points_balance >= 0);

-- 库存不能为负  
ALTER TABLE mall_products ADD CONSTRAINT chk_stock_non_negative 
CHECK (stock_quantity >= 0);

-- 亲密度范围限制
ALTER TABLE cloud_pets ADD CONSTRAINT chk_intimacy_range 
CHECK (intimacy_level BETWEEN 0 AND 10000);
```

## 7. 扩展性考虑

### 7.1 水平扩展
- 用户数据可按用户ID分片
- 宠物数据相对稳定，可单独部署
- 社交数据（评论、点赞）可使用NoSQL存储

### 7.2 功能扩展
- **标签系统**: 可扩展 personality_tags 为独立标签表
- **地理位置**: 宠物救助地点可增加地理坐标字段
- **多语言支持**: 文本字段可扩展为多语言版本

## 8. 总结

本数据库设计遵循以下原则：
- ✅ **第三范式为主**: 核心业务数据保持规范化
- ✅ **适度反范式**: 高频读取场景采用反范式化提升性能  
- ✅ **完整约束**: 通过外键和检查约束保证数据完整性
- ✅ **索引优化**: 针对高频查询场景建立合适的索引
- ✅ **扩展友好**: 预留扩展字段和分表分库可能性

该设计能够支撑 PawLink 平台的核心业务需求，同时具备良好的性能和可维护性。