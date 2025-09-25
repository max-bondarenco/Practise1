<template>
  <div class="app-layout">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/navbar.vue';
import { useFirstLoad } from './composables/useFirstLoad';

useFirstLoad();
</script>

<style scoped>
.app-layout {
  display: flex;
}

.main-content {
  margin-left: 220px;
  padding: 2rem;
  width: calc(100% - 220px);
}
</style>
