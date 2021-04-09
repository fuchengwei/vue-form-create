<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$attrs"
  />
  <svg v-else :class="svgClass" arig-hidden="true" v-on="$attrs">
    <use :href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import * as utils from '@/utils'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const isExternal = computed(() =>
      utils.isExternal(props.iconClass as string)
    )
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      } else {
        return 'svg-icon'
      }
    })
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
    }))

    return {
      isExternal,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
})
</script>

<style lang="stylus" scoped>
.svg-icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
.svg-external-icon
  background-color currentColor
  mask-size cover !important
  display inline-block
</style>
