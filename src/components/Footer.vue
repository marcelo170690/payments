<template>
  <footer class="text-blue-50 p-1 text-center">
    <p>© {{  new Date().getFullYear() }} <b>chiquillos</b></p>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
footer {
  background-color: #078a3e;
  text-align: center;
}
</style>
