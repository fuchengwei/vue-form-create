<template>
  <el-container direction="horizontal" class="h-full font-mono">
    <el-aside width="250px">左侧字段</el-aside>
    <el-container direction="vertical" class="border-x border-slate-300">
      <header-bar />
      <el-main>Main</el-main>
    </el-container>
    <el-aside width="300px">
      <el-container>
        <el-header height="45px" class="border-b-2 border-slate-200 flex items-center text-sm text-center cursor-pointer">
          <div
            class="flex-1 relative"
            v-for="tab of tabs"
            :key="tab.key"
            :class="[currentTab === tab.key && 'after:absolute after:-left-2 after:-right-2 after:-bottom-2.5 after:content-[\'\'] after:h-0.5 after:bg-blue-400']"
            @click="currentTab = tab.key"
          >
            {{ tab.title }}
          </div>
        </el-header>
        <el-main class="p-3">
          <global-config v-if="currentTab === 'GlobalSetting'" />
        </el-main>
      </el-container>
    </el-aside>
  </el-container>
</template>

<script setup lang="ts">
import HeaderBar from './header-bar.vue'
import GlobalConfig from './global-config.vue'

defineOptions({
  name: 'DesignForm'
})

type TabType = 'GlobalSetting' | 'FieldSetting'

const currentTab = ref<TabType>('GlobalSetting')

const tabs: { key: TabType; title: string }[] = [
  {
    key: 'FieldSetting',
    title: '字段设置'
  },
  {
    key: 'GlobalSetting',
    title: '全局设置'
  }
]
</script>
