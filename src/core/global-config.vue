<template>
  <el-form label-position="top">
    <el-form-item label="国际化">
      <el-select v-model="state.globalConfig.locale" value-key="name">
        <el-option v-for="locale of locales" :key="locale.name" :label="locale.name" :value="locale.value" />
      </el-select>
    </el-form-item>

    <el-form-item label="组件大小">
      <el-radio-group v-model="state.globalConfig.size">
        <el-radio-button label="small" />
        <el-radio-button label="default" />
        <el-radio-button label="large" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="zIndex">
      <el-input-number v-model.number="state.globalConfig.zIndex" :controls="false" placeholder="全局初始化zIndex的值" />
    </el-form-item>

    <el-form-item label="buttonAutoInsertSpace">
      <el-switch v-model="state.globalConfig.button!.autoInsertSpace" />
    </el-form-item>

    <el-form-item label="messageMax">
      <el-input-number v-model="state.globalConfig.message!.max" :controls="false" placeholder="可同时显示消息最大数量" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { state } from '@/store'
import locales from '@/utils/locales'

defineOptions({
  name: 'GlobalConfig'
})
</script>

<style scoped>
:deep(.el-form-item) {
  @apply pb-2 border-b;
}
:deep(.el-form-item__label) {
  @apply font-semibold;
}
:deep(.el-input-number) {
  @apply w-full;
}
:deep(input[type='number']) {
  @apply text-left;
}
:deep(.el-select) {
  @apply w-full;
}
</style>
