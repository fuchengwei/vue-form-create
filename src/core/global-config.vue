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

    <h4 class="text-sm font-semibold text-gray-600 pb-2 border-b mb-5">表单配置</h4>

    <el-form-item label="表单大小">
      <el-radio-group v-model="state.formConfig.size">
        <el-radio-button label="large" />
        <el-radio-button label="default" />
        <el-radio-button label="small" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="星号位置">
      <el-radio-group v-model="state.formConfig.requireAsteriskPosition">
        <el-radio-button label="left" />
        <el-radio-button label="right" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="标签位置">
      <el-radio-group v-model="state.formConfig.labelPosition">
        <el-radio-button label="left" />
        <el-radio-button label="right" />
        <el-radio-button label="top" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="标签长度">
      <el-input v-model="state.formConfig.labelWidth" placeholder="请输入标签长度" />
    </el-form-item>

    <el-form-item label="标签后缀">
      <el-input v-model="state.formConfig.labelSuffix" placeholder="请输入标签后缀" />
    </el-form-item>

    <el-form-item label="行内表单模式">
      <el-switch v-model="state.formConfig.inline" />
    </el-form-item>

    <el-form-item label="是否隐藏必填字段星号">
      <el-switch v-model="state.formConfig.hideRequiredAsterisk" />
    </el-form-item>

    <el-form-item label="是否显示校验错误信息">
      <el-switch v-model="state.formConfig.showMessage" />
    </el-form-item>

    <el-form-item label="是否以行内形式展示校验信息">
      <el-switch v-model="state.formConfig.inlineMessage" />
    </el-form-item>

    <el-form-item label="是否在输入框中显示校验结果图标">
      <el-switch v-model="state.formConfig.statusIcon" />
    </el-form-item>

    <el-form-item label="是否在rules改变后立即触发验证">
      <el-switch v-model="state.formConfig.validateOnRuleChange" />
    </el-form-item>

    <el-form-item label="是否在校验失败时滚动到第一个">
      <el-switch v-model="state.formConfig.scrollToError" />
    </el-form-item>

    <el-form-item label="是否禁用">
      <el-switch v-model="state.formConfig.disabled" />
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
