<template>
  <el-form-item label="栅格间隔">
    <el-input v-model.number="state.selectWidgetItem!.config.gutter" />
  </el-form-item>

  <el-form-item label="水平排列方式">
    <el-select v-model="state.selectWidgetItem!.config.justify" clearable class="w-full">
      <el-option label="start" value="start" />
      <el-option label="end" value="end" />
      <el-option label="center" value="center" />
      <el-option label="space-around" value="space-around" />
      <el-option label="space-between" value="space-between" />
      <el-option label="space-evenly" value="space-evenly" />
    </el-select>
  </el-form-item>

  <el-form-item label="垂直排列方式">
    <el-select v-model="state.selectWidgetItem!.config.align" clearable class="w-full">
      <el-option label="top" value="top" />
      <el-option label="middle" value="middle" />
      <el-option label="bottom" value="bottom" />
    </el-select>
  </el-form-item>

  <el-form-item label="自定义标签元素">
    <el-input v-model="state.selectWidgetItem!.config.tag" />
  </el-form-item>
</template>

<script setup lang="ts">
import { state } from '@/store'

defineOptions({
  name: 'RowConfig'
})
</script>
