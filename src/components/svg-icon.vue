<template>
  <svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size" v-on="$attrs">
    <use :xlink:href="symbolId" rel="external nofollow" :fill="props.color" />
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
