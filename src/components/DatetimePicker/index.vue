<template>
  <div>date</div>
</template>

<script setup>
import { defineProps,defineEmits } from "vue"

const props = defineProps({
  type: {
    type: String,
    default: 'date',
  },
  modelValue: Date,
  minDate: {
    type: Date,
    default: () => new Date(new Date().getFullYear() - 10, 0, 1),
    validator: (val) => {
      return Object.prototype.toString.call(val) === '[object Date]' && !Number.isNaN((val).getTime());
    }
  },
  maxDate: {
    type: Date,
    default: () => new Date(new Date().getFullYear() + 10, 11, 31),
    validator: (val) => {
      return Object.prototype.toString.call(val) === '[object Date]' && !Number.isNaN((val).getTime());
    }
  },
})
const emit = defineEmits('')
</script>

<style lang="less" scoped>

</style>