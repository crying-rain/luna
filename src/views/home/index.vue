<template>
  <div>
    <pull-refresh v-model="loading" @refresh="onRefresh">
      <div v-for="item in list" :key="item.value">
        <div class="list">
          <img width="100" height="50" :src="item.image" alt="">
          <div>
            <span>{{item.title}}</span>
            <span>{{item.value}}</span>
            <span>{{count}}</span>
          </div>
        </div>
        <divider :dashed="true" content-position="right" :hairline="false">横线</divider>
      </div>
    </pull-refresh>
    <!-- <button @click="handleClick">按钮</button> -->
    <!-- <datetime-picker type="datetime"/> -->
    <picker 
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <template #toolbar>
        <div>hahahh</div>
      </template>
      <!-- <template #title>
        <div>title</div>
      </template>
      <template #confirm>
        <div>confirm</div>
      </template>
      <template #cancel>
        <div>cancel</div>
      </template> -->
    </picker>
  </div>
</template>
<script setup>
import { ref } from "vue";
  import PullRefresh from "@/components/PullRefresh.vue";
  import Divider from "@/components/Divider.vue";
  import DatetimePicker from "@/components/DatetimePicker/index.vue";
  import Picker from "@/components/Picker/index.vue";

  const list = [
    {
      title:'问界M1',
      value:'M1',
      image:'https://aito.auto/content/dam/aito/cn/homepage/main/img/0905/homepage-m5ev-0905.webp'
    },
    {
      title:'问界M2',
      value:'M2',
      image:'https://aito.auto/content/dam/aito/cn/homepage/main/img/0905/homepage-m5ev-0905.webp'
    },
    {
      title:'问界M3',
      value:'M3',
      image:'https://aito.auto/content/dam/aito/cn/homepage/main/img/0905/homepage-m5ev-0905.webp'
    },
    {
      title:'问界M4',
      value:'M4',
      image:'https://aito.auto/content/dam/aito/cn/homepage/main/img/0905/homepage-m5ev-0905.webp'
    },
    {
      title:'问界M5',
      value:'M5',
      image:'https://aito.auto/content/dam/aito/cn/homepage/main/img/0905/homepage-m5ev-0905.webp'
    },
    {
      title:'问界M6',
      value:'M6',
      image:'https://aito.auto/content/dam/aito/cn/homepage/main/img/0905/homepage-m5ev-0905.webp'
    },
    {
      title:'问界M7',
      value:'M7',
      image:'https://aito.auto/content/dam/aito/cn/homepage/main/img/0905/homepage-m5ev-0905.webp'
    }
  ]
  const count = ref(0);
  const loading = ref(false);
  const onRefresh = () => {
    setTimeout(() => {
      loading.value = false;
      count.value++;
    }, 1000);
  };
  const onConfirm = ()=>{
    console.log('确认')
  }
  const onCancel = ()=>{
    console.log('取消')
  }
</script>
<style lang="less" scoped>
.list{
  display: flex;
  align-items: center;
}
</style>
