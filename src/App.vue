<template>
  <button @click="goInicio">
    Inicio
  </button>
  <div>
    <router-view></router-view>
  </div>
  <Footer />
</template>

<script setup>
import Footer from './components/Footer.vue'
import { useRouter } from 'vue-router'; 
const router = useRouter()
const goInicio = () => {
  router.push('/');
}
</script>

<style scoped>
</style>
