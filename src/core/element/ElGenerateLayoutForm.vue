<template>
  <div>
    <template v-if="element.type === 'grid'">
      <a-row
        type="flex"
        v-if="element.key"
        :key="element.key"
        :gutter="element.options.gutter ?? 0"
        :justify="element.options.justify"
        :align="element.options.align"
      >
        <a-col
          v-for="(col, colIndex) of element.columns"
          :key="colIndex"
          :span="col.span ?? 0"
        >
          <template v-for="colItem of col.list">
            <ElGenerateLayoutForm
              v-if="islayoutComponent(colItem.type)"
              :key="colItem.key"
              :element="colItem"
            />
            <ElGenerateFormItem
              v-else
              :key="colItem.key"
              :element="colItem"
            />
          </template>
        </a-col>
      </a-row>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ElGenerateFormItem from './ElGenerateFormItem.vue'
import { islayoutComponent } from '@/config/antd'

export default defineComponent({
  name: 'ElGenerateLayoutForm',
  components: {
    ElGenerateFormItem
  },
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      islayoutComponent
    }
  }
})
</script>

<style>

</style>
