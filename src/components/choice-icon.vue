<template>
  <el-popover ref="popoverRef" trigger="click" width="100%" :teleported="false">
    <template #reference>
      <el-input :model-value="props.modelValue" readonly>
        <template #suffix>
          <svg-icon name="ArrowDown" prefix="svg-icon" size="18px" />
        </template>
      </el-input>
    </template>
    <template #default>
      <div class="h-72 overflow-auto no-scrollbar flex flex-wrap">
        <div
          v-for="iconName of remoteIconList"
          :key="iconName"
          @click="handlerSelect(iconName)"
          class="p-1 border mr-1 mt-1 cursor-pointer hover:border-blue-400 hover:text-blue-400"
          :class="[props.modelValue === iconName && 'border-blue-400 text-blue-400']"
        >
          <svg-icon :name="iconName" size="17px" />
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ElPopover } from 'element-plus'
import SvgIcon from '@/components/svg-icon.vue'
import { remoteIconList } from '@/store'

defineOptions({
  name: 'ChoiceIcon'
})

const popoverRef = ref<InstanceType<typeof ElPopover>>()

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (eventName: 'update:modelValue', val: string): void
}>()

const handlerSelect = (iconName: string) => {
  emits('update:modelValue', iconName)
  popoverRef.value?.hide()
}
</script>
