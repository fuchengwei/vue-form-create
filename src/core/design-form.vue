<template>
  <el-container direction="horizontal" class="h-full font-mono">
    <el-aside width="250px">左侧字段</el-aside>
    <el-container direction="vertical" class="border-x border-slate-300">
      <header-bar />
      <el-main>Main</el-main>
    </el-container>
    <el-aside width="200px">Aside</el-aside>
  </el-container>
</template>

<script setup lang="ts">
import HeaderBar from './header-bar.vue'

defineOptions({
  name: 'DesignForm'
})
</script>
