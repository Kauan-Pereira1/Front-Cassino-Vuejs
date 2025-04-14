<template>
  <div class="home">
    <img src="/MangeCoing.jfif" alt="MangeCoin Logo" />
    <h1>🎰 Welcome to MangeVegas 🎰</h1>
    <p>Sinta a emoção do cassino no seu navegador!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  margin-top: 50px;

  img {
    width: 220px;
    border-radius: 50%;
    box-shadow: 0 0 20px gold;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 3rem;
    color: gold;
    text-shadow: 2px 2px #000;
  }

  p {
    color: #ccc;
    font-size: 1.2rem;
  }
}
</style>
