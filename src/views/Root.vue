<template>
  <template v-for="item in menu">
    <div
      class="
        hover:cursor-pointer
        border-[4px]
        border-x-violet-600
        rounded-md
        bg-violet-300
        text-center
        ml-2 mr-2 mt-4 pb-2
      "
      @click="goRoute(item.name)"
    >
      <img v-if="item.image" :src="item.image" alt="" height="50" width="50">
      <p class="text-violet-800 font-medium">{{ item.title }}</p>
      <hr>
      <p class="text-violet-500 leading-6 font-light">{{ item.description }}</p>
    </div>
  </template>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const menu = [
    {
      title: 'Test 1',
      name: 'test1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam adipisci architecto incidunt pariatur officiis reprehenderit voluptas! Deleniti, sapiente laudantium beatae assumenda perspiciatis iste mollitia quas quo odit similique expedita officia!',
      image: '', 
    },
    {
      title: 'Test 2',
      name: 'test2',
      description:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam adipisci architecto incidunt pariatur officiis reprehenderit voluptas! Deleniti, sapiente laudantium beatae assumenda perspiciatis iste mollitia quas quo odit similique expedita officia!',
      image: '',
    },
    {
      title: 'Clientes',
      name: 'clients',
      description: 'Servicios que se pagan por mensualidad como ser disney plus, Max y otros.',
      image: '/src/assets/logos/logo1.png',
    },
    {
      title: 'Payments',
      name: 'payments',
      description: 'Registrar pago de cliente',
      image: '/src/assets/images/a4.png',
    },
  ];

  const goRoute = (routeName) => {
    router.push(routeName);
  }
</script>
