<template>
  <el-form-item label="内容">
    <el-input v-model="state.selectWidgetItem!.config.content" />
  </el-form-item>

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

  <el-form-item label="类型">
    <el-select v-model="state.selectWidgetItem!.config.type" clearable class="w-full">
      <el-option label="Primary" value="primary" />
      <el-option label="Success" value="success" />
      <el-option label="Warning" value="warning" />
      <el-option label="Danger" value="danger" />
      <el-option label="Info" value="info" />
    </el-select>
  </el-form-item>

  <el-form-item label="原生type属性">
    <el-radio-group v-model="state.selectWidgetItem!.config.nativeType">
      <el-radio-button label="button">button</el-radio-button>
      <el-radio-button label="submit">submit</el-radio-button>
      <el-radio-button label="reset">reset</el-radio-button>
    </el-radio-group>
  </el-form-item>

  <el-form-item label="自定义颜色">
    <el-color-picker v-model="state.selectWidgetItem!.config.color" show-alpha />
  </el-form-item>

  <el-form-item label="是否为朴素按钮">
    <el-switch v-model="state.selectWidgetItem!.config.plain" />
  </el-form-item>

  <el-form-item label="是否为文字按钮">
    <el-switch v-model="state.selectWidgetItem!.config.text" />
  </el-form-item>

  <el-form-item label="是否显示文字按钮背景颜色">
    <el-switch v-model="state.selectWidgetItem!.config.bg" />
  </el-form-item>

  <el-form-item label="是否为链接按钮">
    <el-switch v-model="state.selectWidgetItem!.config.link" />
  </el-form-item>

  <el-form-item label="是否为圆角按钮">
    <el-switch v-model="state.selectWidgetItem!.config.round" />
  </el-form-item>

  <el-form-item label="是否为圆形按钮">
    <el-switch v-model="state.selectWidgetItem!.config.circle" />
  </el-form-item>

  <el-form-item label="是否为加载中状态">
    <el-switch v-model="state.selectWidgetItem!.config.loading" />
  </el-form-item>

  <el-form-item label="是否为禁用状态">
    <el-switch v-model="state.selectWidgetItem!.config.disabled" />
  </el-form-item>

  <el-form-item label="原生autofocus属性">
    <el-switch v-model="state.selectWidgetItem!.config.autofocus" />
  </el-form-item>

  <el-form-item label="是否自动在两个中文字符之间插入空格">
    <el-switch v-model="state.selectWidgetItem!.config.autoInsertSpace" />
  </el-form-item>
</template>

<script setup lang="ts">
import { state } from '@/store'

defineOptions({
  name: 'ButtonConfig'
})
</script>
