<template>
  <div class="van-pull-refresh">
    <div 
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      :style="trackStyle"
    >
      <div class="van-pull-refresh__head" :style="getHeadStyle()">
        <span>{{statusText}}</span>
      </div>
      <slot></slot>
    </div>
  </div>

</template>

<script setup>
import { computed, reactive, ref, nextTick, watch} from 'vue'
const props = defineProps({
  disabled: Boolean,
  modelValue: Boolean,
  headHeight: {
    type: [Number, String],
    default: 50,
  },
  successText: String,
  pullingText: String,
  loosingText: String,
  loadingText: String,
  pullDistance: [Number, String],
  successDuration: {
    type: [Number, String],
    default: 500,
  },
  animationDuration: {
    type: [Number, String],
    default: 300,
  },
})
const emit = defineEmits(['change','refresh','update:modelValue'])
const startX = ref(0);
const startY = ref(0);
const deltaX = ref(0);
const deltaY = ref(0);
const offsetX = ref(0);
const offsetY = ref(0);
const direction = ref('');
const statusText = ref('下拉刷新')
const state = reactive({
  status:'normal',
  duration:0,
  distance:0
})
const TEXT_STATUS = ['pulling', 'loosing', 'success'];
const isVertical = () => direction.value === 'vertical';
const isHorizontal = () => direction.value === 'horizontal';

const reset = () => {
  deltaX.value = 0;
  deltaY.value = 0;
  offsetX.value = 0;
  offsetY.value = 0;
  direction.value = '';
};

const trackStyle = computed(()=>{
  return {
    transitionDuration: `${state.duration}ms`,
    transform: state.distance
      ? `translate3d(0,${state.distance}px, 0)`
      : '',
  }
})
const getDirection = (x, y)=> {
  if (x > y) {
    return 'horizontal';
  }
  if (y > x) {
    return 'vertical';
  }
  return '';
}
const getScrollTop = (el) => {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
}
// 头部样式
const getHeadStyle = ()=> {
  if(props.distance !== 50){
    return {
      height:`${props.headHeight}px`
    }
  }
}
const getStatusText = () => {
  const { status } = state;
  if (status === 'normal') {
    statusText.value = ''
  } else if(status === 'pulling'){
    statusText.value = '下拉即可刷新'
  }else if(status === 'loosing'){
    statusText.value = '释放即可刷新'
  }else if(status === 'loading'){
    statusText.value = '加载中'
  }
};
const isTouchable = () =>
  state.status !== 'loading' &&
  state.status !== 'success' &&
  !props.disabled;

const ease = (distance) => {
  console.log('这是滑动的距离',distance)
  console.log('props.pullDistance',+props.headHeight)
  const pullDistance = +(props.pullDistance || props.headHeight);
  if (distance > pullDistance) {
    console.log(1111)
    if (distance < pullDistance * 2) {
      console.log(2222)
      distance = pullDistance + (distance - pullDistance) / 2;
    } else {
      distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
      console.log(3333,distance)
    }
  }
  return Math.round(distance);
};

const setStatus = (distance, isLoading) => {
  const pullDistance = +(props.pullDistance || props.headHeight);
  state.distance = distance;

  if (isLoading) {
    state.status = 'loading';
    statusText.value = '加载中'
  } else if (distance === 0) {
    state.status = 'normal';
    statusText.value = ''
  } else if (distance < pullDistance) {
    state.status = 'pulling';
    statusText.value = '下拉即可刷新'
  } else {
    state.status = 'loosing';
    statusText.value = '释放即可刷新'
  }
  emit('change', {
    status: state.status,
    distance,
  });
};
 const showSuccessTip = () => {
  state.status = 'success';

  setTimeout(() => {
    setStatus(0);
  }, +props.successDuration);
};
const onTouchStart = (e)=> {
  reset()
  console.log('开始出发了',e)
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientY
}
const onTouchMove = (e)=> {
  deltaX.value = e.touches[0].clientX - startX.value
  deltaY.value = e.touches[0].clientY - startY.value
  offsetX.value = Math.abs(deltaX.value)
  offsetY.value = Math.abs(deltaY.value)
  // const LOCK_DIRECTION_DISTANCE = 10;
  //   if (
  //     !direction.value ||
  //     (offsetX.value < LOCK_DIRECTION_DISTANCE &&
  //       offsetY.value < LOCK_DIRECTION_DISTANCE)
  //   ) {
  //     direction.value = getDirection(offsetX.value, offsetY.value);
  //   }
  console.log('开始异动了',ease(deltaY.value))

    setStatus(ease(deltaY.value));
}
const onTouchEnd = (e)=> {
  if (deltaY.value && isTouchable()) {
    state.duration = +props.animationDuration;
    if (state.status === 'loosing') {
      console.log('这是什么状态',state.status)
      setStatus(+props.headHeight, true);
      emit('update:modelValue', true);

      // ensure value change can be watched
      nextTick(() => emit('refresh'));
    } else {
      console.log('这是什么状态2',state.status)
      setStatus(0);
    }
  }
  // state.distance = 0;
}
watch(
  () => props.modelValue,
  (value) => {
    console.log('value',value)
    state.duration = +props.animationDuration;

    if (value) {
      setStatus(+props.headHeight, true);
    } else if (props.successText) {
      showSuccessTip();
    } else {
      setStatus(0, false);
    }
  }
);

</script>

<style lang="less" scoped>
.van-pull-refresh {
  background-color: #fff;
  &__head {
    position: absolute;
    left: 0;
    width: 100%;
    height: 50px;
    overflow: hidden;
    color: #ccc;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    transform: translateY(-100%);
  }
}

</style>
