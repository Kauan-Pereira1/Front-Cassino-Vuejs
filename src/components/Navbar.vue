<template>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/tokens">Tokens</router-link>
      <router-link to="/slot-machine">Slot Machine</router-link>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Navbar',
  });
  </script>
  
  <style scoped>
  nav {
    display: flex;
    gap: 15px;
    background-color: #333;
    padding: 10px;
    color: white;
  }
  
  a {
    color: #fff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  