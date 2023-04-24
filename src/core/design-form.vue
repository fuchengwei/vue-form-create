<template>
  <el-container direction="horizontal" class="h-full font-mono">
    <el-aside width="250px">
      <components-group />
    </el-aside>
    <el-container direction="vertical" class="border-x border-slate-300">
      <header-bar />
      <widget-form />
    </el-container>
    <el-aside width="300px">
      <el-container class="h-screen">
        <el-header height="45px" class="border-b-2 border-slate-200 flex items-center text-sm text-center cursor-pointer">
          <div
            class="flex-1 relative h-full flex items-center justify-center"
            v-for="tab of tabs"
            :key="tab.key"
            :class="[currentTab === tab.key && 'after:absolute after:-left-2 after:-right-2 after:bottom-0 after:content-[\'\'] after:h-0.5 after:bg-blue-400']"
            @click="currentTab = tab.key"
          >
            {{ tab.title }}
          </div>
        </el-header>
        <el-main class="p-3">
          <global-config v-show="currentTab === 'GlobalSetting'" />
          <widget-config v-show="currentTab === 'FieldSetting'" />
        </el-main>
      </el-container>
    </el-aside>
  </el-container>
</template>

<script setup lang="ts">
import ComponentsGroup from './components-group.vue'
import HeaderBar from './header-bar.vue'
import WidgetForm from './widget-form.vue'
import GlobalConfig from './global-config.vue'
import WidgetConfig from './widget-config.vue'
import { state } from '@/store'
import { debounceLoadRemoteIcon } from '@/utils'

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

watchEffect(() => debounceLoadRemoteIcon(state.iconSrc))
</script>
