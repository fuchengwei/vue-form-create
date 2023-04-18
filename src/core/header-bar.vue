<template>
  <el-header height="45px" class="border-b-2 border-slate-200 flex flex-row-reverse items-center space-x-3 space-x-reverse">
    <div class="flex items-center space-x-1 text-sm text-blue-400 cursor-pointer" v-for="button of buttons" :key="button.name" @click="button.callBack">
      <svg-icon :name="button.icon" prefix="svg-icon" size="18px" color="#60A5FA" />
      <span>{{ button.name }}</span>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/svg-icon.vue'

defineOptions({
  name: 'HeaderBar'
})

const buttons = [
  {
    icon: 'GenerateCode',
    name: '生成代码',
    callBack: () => {}
  },
  {
    icon: 'GenerateJson',
    name: '生成JSON',
    callBack: () => {}
  },
  {
    icon: 'Preview',
    name: '预览',
    callBack: () => {}
  },
  {
    icon: 'Delete',
    name: '清空',
    callBack: () => {}
  },
  {
    icon: 'Upload',
    name: '导入JSON',
    callBack: () => {}
  }
]
</script>
