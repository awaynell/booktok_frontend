<template>
  <div>
    <div class="main_container">
      <Header />
    </div>
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/Header/Header.vue";
</script>
