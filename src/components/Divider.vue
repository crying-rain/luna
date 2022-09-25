<template>
  <div 
    role="separator" 
    class="van-divider" 
    :class="{
      'van-divider--dashed': props.dashed,
      'van-divider--hairline':props.hairline,
      [`van-divider--content-${props.contentPosition}`]:!!slots.default
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { useSlots,defineProps } from "vue";
const slots = useSlots()
const props = defineProps({ 
  dashed: Boolean,
  hairline: {
    type: Boolean,
    default: true
  },
  contentPosition: {
    type:String,
    default:'center'
  },
})
</script>

<style lang="less" scoped>
.van-divider{
  display: flex;
  align-items: center;
  margin: 16px 0;
  color: #969799;
  font-size: 14px;
  line-height: 24px;
  border-color: red;
  border-style: solid;
  border-width: 0;
  &::before,&::after{
    content: '';
    display: block;
    flex: 1;
    box-sizing: border-box;
    height: 1px;
    border-color: inherit;
    border-style: inherit;
    border-width: 1px 0 0;
  }
  &::before{
    margin-right: 16px;
  }
  &::after{
    margin-left: 16px;
  }
  &--hairline{
    &::before,
    &::after {
      transform: scaleY(0.5);
    }
  }
  &--dashed {
    border-style: dashed;
  }

  &--content-center,
  &--content-left,
  &--content-right {
    &::before {
      margin-right: 16px;
    }

    &::after {
      margin-left: 16px;
    }
  }

  &--content-left {
    &::before {
      max-width: 10%;
    }
  }

  &--content-right {
    &::after {
      max-width: 10%;
    }
  }
}
</style>