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
            <AntdGenerateLayoutForm :element="colItem" v-if="islayoutComponent(colItem.type)" :key="colItem.key"></AntdGenerateLayoutForm>
            <AntdGenerateFormItem
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
import { defineComponent, inject } from 'vue'
import AntdGenerateFormItem from './AntdGenerateFormItem.vue'
import { islayoutComponent } from '@/config/antd'

export default defineComponent({
  name: 'AntdGenerateLayoutForm',
  components: {
    AntdGenerateFormItem
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
