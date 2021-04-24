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
          <Draggable
            class="widget-col-list"
            item-key="key"
            ghostClass="ghost"
            handle=".drag-widget"
            :animation="200"
            :group="{ name: 'people' }"
            :list="col.list"
            @add="handleColMoveAdd($event, element, colIndex)"
          >
            <template #item="{ element, index }">
              <transition-group name="fade" tag="div">
                <template v-if="islayoutComponent(element.type)">
                  <ElWidgetLayoutForm
                    v-if="element.key"
                    :key="element.key"
                    :element="element"
                    @click.stop="handleItemClick(element)"
                  />
                </template>
                <template v-else>
                  <ElWidgetFormItem
                    v-if="element.key"
                    :key="element.key"
                    :element="element"
                    @click.stop="handleItemClick(element)"
                    @copy="handleCopyClick(index, col.list)"
                    @delete="handleDeleteClick(index, col.list)"
                  />
                </template>
              </transition-group>
            </template>
          </Draggable>
        </el-col>
        <div
          class="widget-view-action widget-col-action"
          v-if="selectWidgetForm?.key === element.key"
        >
          <SvgIcon
            iconClass="delete"
            @click.stop="handleDeleteClick(index, widgetForm.value.list)"
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
import ElWidgetFormItem from './ElWidgetFormItem.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { v4 } from 'uuid'
import { handleListInsert, handleListDelete } from '@/utils/array'
import Draggable from 'vuedraggable'
import { islayoutComponent } from '@/config/antd'

export default defineComponent({
  name: 'ElWidgetLayoutForm',
  components: {
    Draggable,
    ElWidgetFormItem,
    SvgIcon
  },
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  setup() {
    const selectWidgetForm = inject('selectWidgetFormRef')
    const updateWidgetForm = inject<any>('updateWidgetForm')
    const widgetForm = inject<any>('widgetFormRef')
    const getWidgetForm = inject<any>('getWidgetForm')
    const updateSelectWidgetForm = inject<any>('updateSelectWidgetForm')

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
        list: handleListDelete(list[index].key, oldList)
      })
    }

    const handleMoveAdd = (event: any) => {
      const newWidgetForm = getWidgetForm()
      const { newIndex } = event

      const key = v4().replaceAll('-', '')
      const list = JSON.parse(JSON.stringify(newWidgetForm.list))

      list[newIndex] = {
        ...list[newIndex],
        key,
        model: `${list[newIndex].type}_${key}`,
        rules: []
      }

      if (
        list[newIndex].type === 'radio' ||
        list[newIndex].type === 'checkbox' ||
        list[newIndex].type === 'select'
      ) {
        list[newIndex] = {
          ...list[newIndex],
          options: {
            ...list[newIndex].options,
            options: list[newIndex].options.options.map((item: any) => ({
              ...item
            }))
          }
        }
      }

      if (list[newIndex].type === 'grid') {
        list[newIndex] = {
          ...list[newIndex],
          columns: list[newIndex].columns.map((item: any) => ({ ...item }))
        }
      }

      updateWidgetForm({ ...newWidgetForm, list })

      updateSelectWidgetForm(list[newIndex])
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
      handleMoveAdd,
      handleColMoveAdd,
      islayoutComponent
    }
  }
})
</script>

<style>

</style>
