<template>
  <div class="app">
    <MainPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MainPage from '@/pages/MainPage.vue';

export default defineComponent({
  name: 'App',

  components: {
    MainPage,
  },
});
</script>
