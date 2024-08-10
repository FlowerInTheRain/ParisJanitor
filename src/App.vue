<template>
  <router-view></router-view>
</template>


<script>
export default {
  name: 'App',
}
</script>


<style>
  router-view{
    padding: 0;
    margin: 0;
    top : 0;
    left : 0;
    right: 0;
    bottom: 0;
  }

  body {
    font-family: 'Encode Sans Condensed', sans-serif;
    letter-spacing: .03em;
    color: #212121;
    margin: 0;
    padding: 0;
  }

</style>
