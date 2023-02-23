<template>
  <el-form label-position="top">
    <el-form-item v-if="state.selectWidgetItem?.key" label="Key">
      <el-input v-model="state.selectWidgetItem.key" readonly />
    </el-form-item>

    <button-config v-if="state.selectWidgetItem?.type === 'Button'" />

    <template v-if="state.selectWidgetItem">
      <el-form-item label="自定义Class">
        <el-button class="w-full" @click="classEditorDialogVisible = true">设置</el-button>
      </el-form-item>

      <el-form-item label="自定义Style">
        <el-button class="w-full" @click="styleEditorDialogVisible = true">设置</el-button>
      </el-form-item>

      <el-form-item label="动态Props">
        <el-button class="w-full" @click="propsEditorDialogVisible = true">设置</el-button>
      </el-form-item>

      <el-form-item v-if="state.selectWidgetItem.events" label="动作设置">
        <el-dropdown trigger="click" class="w-full">
          <el-button class="w-full">设置</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(_, key) in state.selectWidgetItem.events"
                :key="key"
                @click="
                  () => {
                    eventName = key
                    functionEditorDialogVisible = true
                  }
                "
              >
                {{ key }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-form-item>

      <class-editor-dialog v-model="classEditorDialogVisible" />
      <style-editor-dialog v-model="styleEditorDialogVisible" />
      <props-editor-dialog v-model="propsEditorDialogVisible" field-name="dynamicProps" />
      <function-editor-dialog v-model="functionEditorDialogVisible" :event-name="eventName" />
    </template>
  </el-form>
</template>

<script setup lang="ts">
import ClassEditorDialog from './class-editor-dialog.vue'
import StyleEditorDialog from './style-editor-dialog.vue'
import PropsEditorDialog from './props-editor-dialog.vue'
import FunctionEditorDialog from './function-editor-dialog.vue'
import ButtonConfig from '@/config/button-config.vue'

import { state } from '@/store'

defineOptions({
  name: 'WidgetConfig'
})

const classEditorDialogVisible = ref(false)
const styleEditorDialogVisible = ref(false)
const propsEditorDialogVisible = ref(false)
const functionEditorDialogVisible = ref(false)
const eventName = ref('')
</script>
