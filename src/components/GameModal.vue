<script setup lang="ts">
import { onMounted, ref } from 'vue'

const model = defineModel<boolean>({ default: false })
const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  let x = 20
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#409eff'
    ctx.fillRect(x, 60, 30, 30)
    x = (x + 8) % 280
  }, 120)
})
</script>

<template>
  <el-dialog v-model="model" title="玩耍小游戏" width="420px">
    <p>示例小游戏：移动方块。可替换为正式 Canvas 游戏逻辑。</p>
    <canvas ref="canvasRef" width="320" height="160" class="canvas" />
  </el-dialog>
</template>

<style scoped>
.canvas {
  border: 1px solid #d9dfe7;
  border-radius: 8px;
}
</style>
