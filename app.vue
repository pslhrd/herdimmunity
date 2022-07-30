<template>
  <main>

    <Header />
    <Loader />
    <!-- <Introduction />  -->
    <Navigation />
    <Content />
    <WebGL />
    <Body ontouchstart="" />
  </main>
</template>

<script setup>
  
</script>

<style lang="scss">

  body {
    width: 100%;
    min-height: 100vh; 
    overflow: hidden;
    user-select: none;
    background-color: black;
  }

  main {
    position: fixed;
    background-color: black;
    width: 100%;
    min-height: 100vh;
  }
  
</style>