<template>
  <el-form-item :label="props.label">
    <el-radio-group v-model="state.selectWidgetItem!.config.direction">
      <el-radio-button label="horizontal">horizontal</el-radio-button>
      <el-radio-button label="vertical">vertical</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import { state } from '@/store'

defineOptions({
  name: 'DirectionType'
})

const props = defineProps<{
  label: string
}>()
</script>
