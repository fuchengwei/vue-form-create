<template>
  <el-form-item label="类型">
    <el-select v-model="state.selectWidgetItem!.config.type" clearable class="w-full">
      <el-option label="Primary" value="primary" />
      <el-option label="Success" value="success" />
      <el-option label="Warning" value="warning" />
      <el-option label="Danger" value="danger" />
      <el-option label="Info" value="info" />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { state } from '@/store'

defineOptions({
  name: 'ComponentType'
})
</script>
