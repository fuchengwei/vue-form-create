<template>
  <el-form-item label="内容">
    <el-input v-model="state.selectWidgetItem!.config.content" />
  </el-form-item>

  <component-type />

  <el-form-item label="图标">
    <choice-icon v-model="state.selectWidgetItem!.config.icon" />
  </el-form-item>

  <el-form-item label="href">
    <el-input v-model="state.selectWidgetItem!.config.href" />
  </el-form-item>

  <el-form-item label="是否显示下划线">
    <el-switch v-model="state.selectWidgetItem!.config.underline" />
  </el-form-item>

  <el-form-item label="是否禁用状态">
    <el-switch v-model="state.selectWidgetItem!.config.disabled" />
  </el-form-item>
</template>

<script setup lang="ts">
import ComponentType from '@/components/component-type.vue'
import ChoiceIcon from '@/components/choice-icon.vue'
import { state } from '@/store'

defineOptions({
  name: 'LinkConfig'
})
</script>
