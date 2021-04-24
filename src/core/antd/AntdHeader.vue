<template>
  <a-layout-header class="btn-bar">
    <slot></slot>
    <a-button
      v-if="$attrs.uploadJson"
      type="link"
      size="small"
      @click="$emit('uploadJson')"
    >
      <template #icon>
        <SvgIcon iconClass="upload" />
      </template>
      导入JSON
    </a-button>
    <a-button
      v-if="$attrs.clearable"
      type="link"
      size="small"
      @click="$emit('clearable')"
    >
      <template #icon>
        <SvgIcon iconClass="clearable" />
      </template>
      清空
    </a-button>
    <a-button
      v-if="$attrs.preview"
      type="link"
      size="small"
      @click="$emit('preview')"
    >
      <template #icon>
        <SvgIcon iconClass="preview" />
      </template>
      预览
    </a-button>
    <a-button
      v-if="$attrs.generateJson"
      type="link"
      size="small"
      @click="$emit('generateJson')"
    >
      <template #icon>
        <SvgIcon iconClass="generate-json" />
      </template>
      生成JSON
    </a-button>
    <a-button
      v-if="$attrs.generateCode"
      type="link"
      size="small"
      @click="$emit('generateCode')"
    >
      <template #icon>
        <SvgIcon iconClass="generate-code" />
      </template>
      生成代码
    </a-button>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

export default defineComponent({
  name: 'AntdHeader',
  components: {
    SvgIcon
  },
  emits: ['uploadJson', 'clearable', 'preview', 'generateJson', 'generateCode']
})
</script>
