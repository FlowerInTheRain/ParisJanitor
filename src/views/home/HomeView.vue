<template>
  <div id="background-homeview">
    <HeaderView />
    <NavContent class="nav-item"/>
    <CardView />
  </div>
</template>

<script>
import HeaderView from "@/views/home/content/HeaderView.vue";
import NavContent from "@/views/home/content/NavContent.vue";
import CardView from "@/views/home/content/CardView.vue";

export default {
  components: {
    HeaderView,
    NavContent,
    CardView,
  },
};
</script>

<style scoped>
  #background-homeview {
     display: flex;
     flex-direction: column;
     align-items: center;
  }

  .nav-item{
    margin-top: 5px;
  }
</style>
