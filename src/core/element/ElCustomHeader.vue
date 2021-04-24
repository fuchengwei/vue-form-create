<template>
  <el-header class="btn-bar">
    <slot></slot>
    <el-button
      v-if="$attrs.uploadJson"
      type="text"
      size="medium"
      @click="$emit('uploadJson')"
    >
      <template #icon>
        <SvgIcon iconClass="upload" />
      </template>
      导入JSON
    </el-button>
    <el-button
      v-if="$attrs.clearable"
      type="text"
      size="medium"
      @click="$emit('clearable')"
    >
      <template #icon>
        <SvgIcon iconClass="clearable" />
      </template>
      清空
    </el-button>
    <el-button
      v-if="$attrs.preview"
      type="text"
      size="medium"
      @click="$emit('preview')"
    >
      <template #icon>
        <SvgIcon iconClass="preview" />
      </template>
      预览
    </el-button>
    <el-button
      v-if="$attrs.generateJson"
      type="text"
      size="medium"
      @click="$emit('generateJson')"
    >
      <template #icon>
        <SvgIcon iconClass="generate-json" />
      </template>
      生成JSON
    </el-button>
    <el-button
      v-if="$attrs.generateCode"
      type="text"
      size="medium"
      @click="$emit('generateCode')"
    >
      <template #icon>
        <SvgIcon iconClass="generate-code" />
      </template>
      生成代码
    </el-button>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

export default defineComponent({
  name: 'CustomHeader',
  components: {
    SvgIcon
  },
  emits: ['uploadJson', 'clearable', 'preview', 'generateJson', 'generateCode']
})
</script>
