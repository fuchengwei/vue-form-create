<template>
  <el-form-item label="内容">
    <el-input v-model="state.selectWidgetItem!.config.content" />
  </el-form-item>

  <component-size />

  <component-type />

  <el-form-item label="自定义元素标签">
    <el-input v-model="state.selectWidgetItem!.config.tag" />
  </el-form-item>

  <el-form-item label="是否显示省略号">
    <el-switch v-model="state.selectWidgetItem!.config.truncated" />
  </el-form-item>
</template>

<script setup lang="ts">
import ComponentType from '@/components/component-type.vue'
import ComponentSize from '@/components/component-size.vue'
import { state } from '@/store'

defineOptions({
  name: 'TextConfig'
})
</script>
