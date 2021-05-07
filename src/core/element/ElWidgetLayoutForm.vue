<template>
  <div>
    <template v-if="element.type === 'grid'">
      <el-row
        class="widget-col widget-view"
        type="flex"
        v-if="element.key"
        :key="element.key"
        :class="{ active: selectWidgetForm?.key === element.key }"
        :gutter="element.options.gutter ?? 0"
        :justify="element.options.justify"
        :align="element.options.align"
      >
        <el-col
          v-for="(col, colIndex) of element.columns"
          :key="colIndex"
          :span="col.span ?? 0"
        >
          <ElDraggableForm
            :formClass="['widget-col-list']"
            :list="col.list"
            :layoutElement="element"
            :colIndex="colIndex"
            @handleMoveAdd="handleColMoveAdd"
            @handleItemClick="handleItemClick"
            @handleCopyClick="handleCopyClick"
            @handleDeleteClick="handleDeleteClick"
          />
        </el-col>
        <div
          class="widget-view-action widget-col-action"
          v-if="selectWidgetForm?.key === element.key"
        >
          <SvgIcon
            iconClass="delete"
            @click.stop="handleDeleteClick(index, widgetForm.list)"
          />
        </div>

        <div
          class="widget-view-drag widget-col-drag"
          v-if="selectWidgetForm?.key === element.key"
        >
          <SvgIcon iconClass="move" className="drag-widget" />
        </div>
      </el-row>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { v4 } from 'uuid'
import { handleListInsert, handleListDelete } from '@/utils/array'
import { islayoutComponent } from '@/config/element'
import ElDraggableForm from './components/ElDraggableForm.vue'

export default defineComponent({
  name: 'ElWidgetLayoutForm',
  components: {
    SvgIcon,
    ElDraggableForm
  },
  props: {
    element: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup() {
    const selectWidgetForm = inject('selectWidgetFormRef')
    const getSelectWidgetForm = inject<any>('getSelectWidgetForm')
    const updateSelectWidgetForm = inject<any>('updateSelectWidgetForm')

    const widgetForm = inject<any>('widgetFormRef')
    const getWidgetForm = inject<any>('getWidgetForm')
    const updateWidgetForm = inject<any>('updateWidgetForm')

    const handleItemClick = (row: any) => {
      updateSelectWidgetForm(row)
    }

    const handleCopyClick = (index: number, list: any[]) => {
      const newWidgetForm = getWidgetForm()
      const key = v4().replaceAll('-', '')
      const oldList = JSON.parse(JSON.stringify(newWidgetForm.list))

      let copyData = {
        ...list[index],
        key,
        model: `${list[index].type}_${key}`,
        rules: list[index].rules ?? []
      }

      if (
        list[index].type === 'radio' ||
        list[index].type === 'checkbox' ||
        list[index].type === 'select'
      ) {
        copyData = {
          ...copyData,
          options: {
            ...copyData.options,
            options: copyData.options.options.map((item: any) => ({ ...item }))
          }
        }
      }
      const temp = {
        ...newWidgetForm,
        list: handleListInsert(list[index].key, oldList, copyData)
      }

      updateWidgetForm(temp)

      updateSelectWidgetForm(copyData)
    }

    const handleDeleteClick = (index: number, list: any[]) => {
      const newWidgetForm = getWidgetForm()
      const currentSelectWidgetForm = getSelectWidgetForm()
      const oldList = JSON.parse(JSON.stringify(newWidgetForm.list))

      if (list.length - 1 === index) {
        if (index === 0) {
          nextTick(() => updateSelectWidgetForm(null))
        } else {
          updateSelectWidgetForm(list[index - 1])
        }
      } else {
        updateSelectWidgetForm(list[index + 1])
      }

      updateWidgetForm({
        ...newWidgetForm,
        list: handleListDelete(currentSelectWidgetForm.key, oldList)
      })
    }

    const handleColMoveAdd = (event: any, row: any, index: number) => {
      const newWidgetForm = getWidgetForm()
      const { newIndex, oldIndex, item } = event
      const list = JSON.parse(JSON.stringify(newWidgetForm.list))

      if (item.className.includes('data-grid')) {
        item.tagName === 'DIV' &&
          list.splice(oldIndex, 0, row.columns[index].list[newIndex])
        row.columns[index].list.splice(newIndex, 1)
        return false
      }

      const key = v4().replaceAll('-', '')

      row.columns[index].list[newIndex] = JSON.parse(JSON.stringify(row.columns[index].list[newIndex]))

      row.columns[index].list[newIndex] = {
        ...row.columns[index].list[newIndex],
        key,
        model: `${row.columns[index].list[newIndex].type}_${key}`,
        rules: []
      }

      if (
        row.columns[index].list[newIndex].type === 'radio' ||
        row.columns[index].list[newIndex].type === 'checkbox' ||
        row.columns[index].list[newIndex].type === 'select'
      ) {
        row.columns[index].list[newIndex] = {
          ...row.columns[index].list[newIndex],
          options: {
            ...row.columns[index].list[newIndex].options,
            options: row.columns[index].list[
              newIndex
            ].options.options.map((ite: any) => ({ ...ite }))
          }
        }
      }
      updateSelectWidgetForm(row.columns[index].list[newIndex])
    }

    return {
      widgetForm,
      selectWidgetForm,
      handleItemClick,
      handleCopyClick,
      handleDeleteClick,
      handleColMoveAdd,
      islayoutComponent
    }
  }
})
</script>

<style>

</style>
