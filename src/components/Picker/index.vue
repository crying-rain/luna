<template>
  <div class="van-picker">
    <toolbar
      v-slots="pick(slots, pickerToolbarSlots)"
      @onConfirm="confirm"
      @onCancel="cancel">
      </toolbar>
  </div>
</template>

<script setup>
import { defineProps,defineEmits,defineExpose,useSlots } from "vue";
import { makeNumericProp, pick} from '@/utils'
import Toolbar from "./PickerToolbar.vue";

const slots = useSlots()
const pickerToolbarSlots = ['cancel', 'confirm', 'title', 'toolbar'];
const props = defineProps({
  title: String,
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  itemHeight: makeNumericProp(44),
  showToolbar: Boolean,
  swipeDuration: makeNumericProp(1000),
  visibleItemCount: makeNumericProp(6),
  cancelButtonText: String,
  confirmButtonText: String,
})
console.log('slots',slots.toolbar())
console.log('...pick(props,',props)
</script>

<style lang="less" scoped>
.van-picker{
  position: relative;
  background: #fff;
  user-select: none;
  &__toolbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
  }
}
</style>