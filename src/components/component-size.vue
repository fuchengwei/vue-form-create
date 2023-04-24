<template>
  <el-form-item label="尺寸">
    <el-radio-group
      v-model="state.selectWidgetItem!.config.size"
      @click="(event: any) => event.target!.value === state.selectWidgetItem!.config.size && (state.selectWidgetItem!.config.size = undefined)"
    >
      <el-radio-button label="large">large</el-radio-button>
      <el-radio-button label="default">default</el-radio-button>
      <el-radio-button label="small">small</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import { state } from '@/store'

defineOptions({
  name: 'ComponentSize'
})
</script>
