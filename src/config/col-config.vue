<template>
  <el-form-item label="栅格占据的列数">
    <el-input v-model.number="state.selectWidgetItem!.config.span" />
  </el-form-item>

  <el-form-item label="栅格左侧的间隔格数">
    <el-input v-model.number="state.selectWidgetItem!.config.offset" />
  </el-form-item>

  <el-form-item label="栅格向右移动格数">
    <el-input v-model.number="state.selectWidgetItem!.config.push" />
  </el-form-item>

  <el-form-item label="栅格向左移动格数">
    <el-input v-model.number="state.selectWidgetItem!.config.pull" />
  </el-form-item>

  <el-form-item label="响应式栅格数(xs)">
    <el-input v-model.number="state.selectWidgetItem!.config.xs" />
  </el-form-item>

  <el-form-item label="响应式栅格数(sm)">
    <el-input v-model.number="state.selectWidgetItem!.config.sm" />
  </el-form-item>

  <el-form-item label="响应式栅格数(md)">
    <el-input v-model.number="state.selectWidgetItem!.config.md" />
  </el-form-item>

  <el-form-item label="响应式栅格数(lg)">
    <el-input v-model.number="state.selectWidgetItem!.config.lg" />
  </el-form-item>

  <el-form-item label="响应式栅格数(xl)">
    <el-input v-model.number="state.selectWidgetItem!.config.xl" />
  </el-form-item>

  <el-form-item label="自定义标签元素">
    <el-input v-model="state.selectWidgetItem!.config.tag" />
  </el-form-item>
</template>

<script setup lang="ts">
import { state } from '@/store'

defineOptions({
  name: 'ColConfig'
})
</script>
