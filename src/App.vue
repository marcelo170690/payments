<template>
  <div class="flex flex-col min-h-screen">
    <!-- Menú -->
    <Menu />

    <!-- Contenido principal -->
    <main class="flex-grow">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'
import { useRouter } from 'vue-router'; 
const router = useRouter()
const goInicio = () => {
  router.push('/');
}
</script>

<style scoped>
.content {
  flex: 1; /* Hace que el contenido principal crezca y ocupe el espacio disponible */
}
</style>
