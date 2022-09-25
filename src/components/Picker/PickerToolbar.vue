<template>
  <div class="van-picker__toolbar">
    <slot name="toolbar" v-if="slots.toolbar"></slot>
    kkkk
    <!-- <template v-else>
      <button
          type="button"
          :class="['van-picker__cancel','van-haptics-feedback']"
          @onClick="onCancel"
        >
          {{slots.cancel ? slots.cancel() : props.cancelButtonText}}
        </button>
      <div :class="['van-picker__title', 'van-ellipsis']">{{props.title}}</div>
      <button
        type="button"
        :class="['van-picker__confirm', 'van-haptics-feedback']"
        @onClick="onConfirm"
      >
        {{slots.confirm ? slots.confirm() : props.confirmButtonText}}
      </button>
    </template> -->
  </div>
</template>
<script setup>
import { defineProps,defineEmits,useSlots } from "vue";
const slots = useSlots()
const props = defineProps({
  title: String,
  cancelButtonText: {
    type:String,
    default:'取消'
  },
  confirmButtonText: {
    type:String,
    default:'确定'
  },
})
const emit = defineEmits()
const onCancel = () => emit('cancel');
const onConfirm = () => emit('confirm');
console.log('slotstoolbar',slots.toolbar)
</script>