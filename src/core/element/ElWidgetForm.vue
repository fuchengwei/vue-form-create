<template>
  <div class="widget-form-container">
    <div v-if="!widgetForm.list" class="form-empty">从左侧拖拽来添加字段</div>
    <el-form
      label-suffix=":"
      :size="widgetForm.config.size"
      :label-position="widgetForm.config.labelPosition"
      :label-width="`${widgetForm.config.labelWidth}px`"
      :hide-required-asterisk="widgetForm.config.hideRequiredAsterisk"
    >
      <Draggable
        class="widget-form-list"
        item-key="key"
        ghostClass="ghost"
        handle=".drag-widget"
        :animation="200"
        :group="{ name: 'people' }"
        :list="widgetForm.list"
        @add="handleMoveAdd"
      >
        <template #item="{ element, index }">
          <transition-group name="fade" tag="div">
            <template v-if="element.type === 'grid'">
              <el-row
                class="widget-col widget-view"
                type="flex"
                v-if="element.key"
                :key="element.key"
                :class="{ active: widgetFormSelect?.key === element.key }"
                :gutter="element.options.gutter ?? 0"
                :justify="element.options.justify"
                :align="element.options.align"
                @click="handleItemClick(element)"
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
                    :no-transition-on-drag="true"
                    :list="col.list"
                    @add="handleColMoveAdd($event, element, colIndex)"
                  >
                    <template #item="{ element, index }">
                      <transition-group name="fade" tag="div">
                        <ElWidgetFormItem
                          v-if="element.key"
                          :key="element.key"
                          :element="element"
                          :config="widgetForm.config"
                          :selectWidget="widgetFormSelect"
                          @click.stop="handleItemClick(element)"
                          @copy="handleCopyClick(index, col.list)"
                          @delete="handleDeleteClick(index, col.list)"
                        />
                      </transition-group>
                    </template>
                  </Draggable>
                </el-col>
                <div
                  class="widget-view-action widget-col-action"
                  v-if="widgetFormSelect?.key === element.key"
                >
                  <SvgIcon
                    iconClass="delete"
                    @click.stop="handleDeleteClick(index, widgetForm.list)"
                  />
                </div>

                <div
                  class="widget-view-drag widget-col-drag"
                  v-if="widgetFormSelect?.key === element.key"
                >
                  <SvgIcon iconClass="move" className="drag-widget" />
                </div>
              </el-row>
            </template>
            <template v-else>
              <ElWidgetFormItem
                v-if="element.key"
                :key="element.key"
                :element="element"
                :config="widgetForm.config"
                :selectWidget="widgetFormSelect"
                @click="handleItemClick(element)"
                @copy="handleCopyClick(index, widgetForm.list)"
                @delete="handleDeleteClick(index, widgetForm.list)"
              />
            </template>
          </transition-group>
        </template>
      </Draggable>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { v4 } from 'uuid'
import ElWidgetFormItem from './ElWidgetFormItem.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { WidgetForm } from '@/config/element'

const handleListInsert = (key: string, list: any[], obj: any) => {
  const newList: any[] = []
  list.forEach(item => {
    if (item.key === key) {
      newList.push(item)
      newList.push(obj)
    } else {
      if (item.columns) {
        item.columns = item.columns.map((col: any) => ({
          ...col,
          list: handleListInsert(key, col.list, obj)
        }))
      }
      newList.push(item)
    }
  })
  return newList
}

const handleListDelete = (key: string, list: any[]) => {
  const newList: any[] = []
  list.forEach(item => {
    if (item.key !== key) {
      if (item.columns) {
        item.columns = item.columns.map((col: any) => ({
          ...col,
          list: handleListDelete(key, col.list)
        }))
      }
      newList.push(item)
    }
  })
  return newList
}

export default defineComponent({
  name: 'ElWidgetForm',
  components: {
    SvgIcon,
    Draggable,
    ElWidgetFormItem
  },
  props: {
    widgetForm: {
      type: Object as PropType<WidgetForm>,
      required: true
    },
    widgetFormSelect: {
      type: Object
    }
  },
  emits: ['update:widgetForm', 'update:widgetFormSelect'],
  setup(props, context) {
    const handleItemClick = (row: any) => {
      context.emit('update:widgetFormSelect', row)
    }

    const handleCopyClick = (index: number, list: any[]) => {
      const key = v4().replaceAll('-', '')
      const oldList = JSON.parse(JSON.stringify(props.widgetForm.list))

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

      context.emit('update:widgetForm', {
        ...props.widgetForm,
        list: handleListInsert(list[index].key, oldList, copyData)
      })

      context.emit('update:widgetFormSelect', copyData)
    }

    const handleDeleteClick = (index: number, list: any[]) => {
      const oldList = JSON.parse(JSON.stringify(props.widgetForm.list))

      if (list.length - 1 === index) {
        if (index === 0) {
          nextTick(() => context.emit('update:widgetFormSelect', null))
        } else {
          context.emit('update:widgetFormSelect', list[index - 1])
        }
      } else {
        context.emit('update:widgetFormSelect', list[index + 1])
      }

      context.emit('update:widgetForm', {
        ...props.widgetForm,
        list: handleListDelete(list[index].key, oldList)
      })
    }

    const handleMoveAdd = (event: any) => {
      const { newIndex } = event

      const key = v4().replaceAll('-', '')
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

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
      context.emit('update:widgetForm', { ...props.widgetForm, list })

      context.emit('update:widgetFormSelect', list[newIndex])
    }

    const handleColMoveAdd = (
      event: any,
      row: any,
      index: string | number | symbol
    ) => {
      const { newIndex, oldIndex, item } = event
      const list = JSON.parse(JSON.stringify(props.widgetForm.list))

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
            ].options.options.map((item: any) => ({ ...item }))
          }
        }
      }

      context.emit('update:widgetFormSelect', row.columns[index].list[newIndex])
    }

    return {
      handleItemClick,
      handleCopyClick,
      handleDeleteClick,
      handleMoveAdd,
      handleColMoveAdd
    }
  }
})
</script>
