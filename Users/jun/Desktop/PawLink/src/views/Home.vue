<template>
  <div class="home-container">
    <!-- 轮播图区域 -->
    <div class="banner-section">
      <el-carousel 
        height="320px" 
        :interval="4000" 
        type="card" 
        indicator-position="outside"
        @change="handleBannerChange"
        class="custom-carousel"
      >
        <el-carousel-item v-for="b in banners" :key="b.id">
          <img :src="b.image" class="banner-image" @click="router.push(b.link)" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 推荐宠物区域 -->
    <section class="section-card">
      <div class="section-header">
        <h2 class="section-title">🌟 推荐宠物</h2>
        <el-button type="primary" size="small" @click="router.push('/pets')" class="view-all-btn">
          查看全部
        </el-button>
      </div>
      <div class="pet-grid">
        <div 
          v-for="p in recommendPets" 
          :key="p.id" 
          @click="router.push(`/pets/${p.id}`)" 
          class="pet-card clickable"
        >
          <div class="pet-image-wrapper">
            <img :src="p.avatar" class="pet-image" />
            <div class="pet-status" :class="`status-${p.status}`">
              {{ p.status === 'cloud' ? '云养中' : '可领养' }}
            </div>
          </div>
          <div class="pet-info">
            <h3 class="pet-name">{{ p.name }}</h3>
            <div class="pet-meta">
              <span class="pet-breed">{{ p.breed }}</span>
              <span class="pet-gender" :class="p.gender === '公' ? 'gender-male' : 'gender-female'">
                {{ p.gender }}
              </span>
            </div>
            <p class="pet-desc">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 救助站动态区域 -->
    <section class="section-card">
      <h2 class="section-title">📰 救助站动态</h2>
      <div class="timeline-container">
        <el-timeline>
          <el-timeline-item 
            v-for="i in posts" 
            :key="i.id" 
            :timestamp="i.createdAt"
            placement="top"
            class="timeline-item"
          >
            <el-card class="timeline-card">
              <p class="timeline-content">{{ i.content }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </section>

    <!-- 快捷入口区域 -->
    <section class="quick-access">
      <h2 class="section-title">🚀 快捷入口</h2>
      <div class="quick-buttons">
        <el-button 
          @click="router.push('/mall')" 
          class="quick-btn btn-mall"
          size="large"
        >
          <div class="btn-icon">🎁</div>
          <div class="btn-text">积分商城</div>
        </el-button>
        <el-button 
          @click="router.push('/tasks')" 
          class="quick-btn btn-tasks"
          size="large"
        >
          <div class="btn-icon">✅</div>
          <div class="btn-text">任务中心</div>
        </el-button>
        <el-button 
          @click="router.push('/ranking')" 
          class="quick-btn btn-ranking"
          size="large"
        >
          <div class="btn-icon">🏆</div>
          <div class="btn-text">排行榜</div>
        </el-button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  max-width: 1900px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 轮播图样式 */
.banner-section {
  margin-bottom: 40px;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.custom-carousel :deep(.el-carousel__container) {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  height: 320px !important;
  width: 100%; /* 确保轮播图容器宽度为100% */
}

.banner-image {
  width: 100%; /* 确保图片宽度为100%，以适应容器宽度 */
  height: 320px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.banner-image:hover {
  transform: scale(1.03);
}

/* 区块卡片样式 */
.section-card {
  background: var(--background-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 32px;
  margin-bottom: 40px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.section-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.view-all-btn {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

/* 宠物网格样式 */
.pet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.pet-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
}

.pet-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.pet-image-wrapper {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.pet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.pet-card:hover .pet-image {
  transform: scale(1.1);
}

.pet-status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.status-cloud {
  background: var(--secondary-color);
}

.status-adoptable {
  background: var(--success-color);
}

.pet-info {
  padding: 16px;
}

.pet-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.pet-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-secondary);
}

.pet-breed {
  background: var(--background-gray);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.gender-male {
  color: #409eff;
}

.gender-female {
  color: #ff6b6b;
}

.pet-desc {
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* 时间轴样式 */
.timeline-container {
  max-width: 600px;
}

.timeline-item :deep(.el-timeline-item__wrapper) {
  padding-bottom: 24px;
}

/* 媒体查询 */
@media (max-width: 900px) {
  .banner-section {
    margin-bottom: 20px;
  }

  .custom-carousel :deep(.el-carousel__container) {
    height: 240px !important;
  }

  .banner-image {
    height: 240px;
  }

  .section-card {
    padding: 20px;
  }

  .section-title {
    font-size: 24px;
  }

  .pet-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .pet-card {
    height: auto;
  }

  .pet-image-wrapper {
    height: 140px;
  }
}
</style>