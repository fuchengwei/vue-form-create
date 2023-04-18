<template>
  <el-form-item label="IconName">
    <ChoiceIcon v-model="state.selectWidgetItem!.config.name" />
  </el-form-item>

  <el-form-item label="Size">
    <el-input v-model="state.selectWidgetItem!.config.size" />
  </el-form-item>

  <el-form-item label="Color">
    <el-color-picker v-model="state.selectWidgetItem!.config.color" show-alpha />
  </el-form-item>
</template>

<script setup lang="ts">
import ChoiceIcon from '@/components/choice-icon.vue'
import { state } from '@/store'

defineOptions({
  name: 'IconConfig'
})
</script>
