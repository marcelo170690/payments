<template>
  <section class="
    w-[90%]
    mx-auto
    flex
    flex-wrap
    gap-x-8
    gap-y-4
  ">
    <template
      v-for="image in images"
    >
      <img :src="image.path" alt="" class="w-52 h-52 grow object-cover">
    </template>
  </section>
</template>

<script setup>
  const images = [
    {
      id: 1,
      path: '/src/assets/images/a1.jpg',
    },
    {
      id: 2,
      path: '/src/assets/images/a2.jpg',
    },
    {
      id: 3,
      path: '/src/assets/images/a3.png',
    },
    {
      id: 4,
      path: '/src/assets/images/a4.png',
    },
    {
      id: 5,
      path: '/src/assets/images/a5.png',
    },
    {
      id: 6,
      path: '/src/assets/images/a6.png',
    },
    {
      id: 7,
      path: '/src/assets/images/a7.jpg',
    },
    {
      id: 8,
      path: '/src/assets/images/a8.jpg',
    },
  ];
</script> 