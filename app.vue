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
    background-color: #121212;
  }

  main {
    position: fixed;
    background-color: #121212;
    width: 100%;
    min-height: 100vh;
  }
  
</style>