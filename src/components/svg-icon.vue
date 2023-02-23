<template>
  <svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size" :style="{ color: props.color }" v-on="$attrs">
    <use :xlink:href="symbolId" rel="external nofollow" fill="currentcolor" />
  </svg>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SvgIcon'
})

const props = withDefaults(
  defineProps<{
    name: string
    size?: string
    color?: string
    prefix?: string
  }>(),
  {
    size: '1em',
    prefix: 'svg-icon'
  }
)

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
