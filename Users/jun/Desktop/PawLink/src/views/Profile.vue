
<template>
  <div class="profile-container">
    <el-card class="user-info">
      <div class="user-avatar">
        <img :src="user.avatar" alt="用户头像" />
      </div>
      <div class="user-details">
        <h3>{{ user.username }}</h3>
        <p>总积分：{{ user.points }} | 累计助养金额：{{ user.donate }}</p>
      </div>
    </el-card>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="my-pets">
          <h3>我的云宠列表</h3>
          <div v-for="pet in cloudPets" :key="pet.petId" class="pet-item">
            <div class="pet-name">{{ pet.name }}</div>
            <div class="pet-progress">{{ (pet.intimacy / 1000 * 100).toFixed(0) }}%</div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="points-detail">
          <h3>积分明细</h3>
          <table>
            <thead>
              <tr>
                <th>时间</th>
                <th>原因</th>
                <th>变动值</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in pointsLogs" :key="log.time">
                <td>{{ log.time }}</td>
                <td>{{ log.reason }}</td>
                <td>{{ log.delta }}</td>
              </tr>
            </tbody>
          </table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="badges-wall">
          <h3>勋章墙</h3>
          <div v-for="badge in badges" :key="badge.name" class="badge-item">
            <div class="badge-name">{{ badge.name }}</div>
            <div class="badge-status" v-if="badge.unlocked">已获得</div>
            <div class="badge-desc">{{ badge.condition }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.profile-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.user-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.user-details h3 {
  margin: 0;
}

.my-pets, .points-detail, .badges-wall {
  margin-bottom: 20px;
}

.pet-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.points-detail table {
  width: 100%;
  border-collapse: collapse;
}

.points-detail th, .points-detail td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ebebeb;
}

.badge-item {
  margin-bottom: 10px;
}
</style>