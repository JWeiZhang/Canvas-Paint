<template>
  <div id="paint">
    <div class="control-block">
      <span :class="['icon', { selected: tool === 'pen' }]" @click="changeTool('pen')">
        <font-awesome-icon icon="pen" size="lg" />
      </span>
      <span :class="['icon', { selected: tool === 'eraser' }]" @click="changeTool('eraser')">
        <font-awesome-icon icon="eraser" size="lg" />
      </span>
      <span class="icon" @click="download">
        <font-awesome-icon icon="download" size="lg" />
      </span>
      <input type="range" min="1" max="50" value="16" v-model="lineWidth" />
      <input type="color" v-model="color" />
    </div>

    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'

@Component
export default class BeautyRiverReport extends Vue {
  @Ref('canvas') readonly canvas!: HTMLCanvasElement
  color = '#ff0000'
  ctx: CanvasRenderingContext2D | null = null
  tool = 'pen'
  lineWidth = 16
  isDrawing = false
  startPoint = {
    x: 0,
    y: 0,
  }

  mounted() {
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth * 0.99
    this.canvas.height = window.innerHeight * 0.98
    this.canvas.addEventListener('mousedown', e => {
      this.isDrawing = true
      this.startPoint = {
        x: e.offsetX,
        y: e.offsetY,
      }
    })
    this.canvas.addEventListener('mousemove', this.draw)
    this.canvas.addEventListener('mouseenter', (e: MouseEvent) => {
      this.startPoint = {
        x: e.offsetX,
        y: e.offsetY,
      }
      this.draw
    })
    this.canvas.addEventListener('mouseup', () => {
      this.isDrawing = false
    })
  }

  changeTool(tool: string) {
    this.tool = tool
  }

  draw(e: MouseEvent) {
    if (!this.isDrawing) return
    if (this.ctx) {
      if (this.tool === 'eraser') {
        this.ctx.strokeStyle = '#fff'
      } else {
        this.ctx.strokeStyle = this.color
      }
      this.ctx.lineWidth = this.lineWidth
      this.ctx.lineJoin = 'round'
      this.ctx.lineCap = 'round'
      this.ctx.beginPath()
      this.ctx.moveTo(this.startPoint.x, this.startPoint.y)
      this.ctx.lineTo(e.offsetX, e.offsetY)
      this.ctx.stroke()
      this.ctx.closePath()
    }
    this.startPoint = {
      x: e.offsetX,
      y: e.offsetY,
    }
  }

  download() {
    const url = this.canvas.toDataURL()
    const link = document.createElement('a')
    link.innerText = 'Download'
    link.href = url
    link.download = ''
    link.click()
  }
}
</script>

<style lang="scss">
.control-block {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  padding: 0 15px;
  height: 50px;
  box-shadow: 3px 3px 10px #2d2d2d;
  background-color: #fff;
  border-radius: 30px;
}

#canvas {
  display: block;
  border: 1px solid #000;
}

.icon {
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  &.selected {
    color: #fff;
    background-color: #2c3e50;
  }
}
</style>
