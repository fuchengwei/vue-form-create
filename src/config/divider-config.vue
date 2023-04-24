<template>
  <el-form-item label="内容">
    <el-input v-model="state.selectWidgetItem!.config.content" />
  </el-form-item>

  <direction-type label="分割线方向" />

  <el-form-item label="分隔符样式">
    <el-select v-model="state.selectWidgetItem!.config.borderStyle" clearable class="w-full">
      <el-option label="none" value="none" />
      <el-option label="hidden" value="hidden" />
      <el-option label="dotted" value="dotted" />
      <el-option label="dashed" value="dashed" />
      <el-option label="solid" value="solid" />
      <el-option label="double" value="double" />
      <el-option label="groove" value="groove" />
      <el-option label="ridge" value="ridge" />
      <el-option label="inset" value="inset" />
      <el-option label="outset" value="outset" />
    </el-select>
  </el-form-item>

  <el-form-item label="分割线内容位置">
    <el-radio-group v-model="state.selectWidgetItem!.config.contentPosition">
      <el-radio-button label="left">left</el-radio-button>
      <el-radio-button label="center">center</el-radio-button>
      <el-radio-button label="right">right</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import DirectionType from '@/components/direction-type.vue'
import { state } from '@/store'

defineOptions({
  name: 'DividerConfig'
})
</script>
