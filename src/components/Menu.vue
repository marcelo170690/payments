<template>
  <Menubar :model="items" />
</template>

<script setup>
import { ref } from 'vue';
import { Menubar } from 'primevue';
import { useRouter } from 'vue-router';
const router = useRouter();
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/');
    }
  },
  {
    label: 'Services',
    icon: 'pi pi-list',
    items: [
      {
        label: 'Información',
        icon: 'pi pi-info-circle',
        command: () => {
          router.push({
            name: 'services',
          });
        },
      },
      {
        label: 'Realizar Pago',
        icon: 'pi pi-dollar',
        command: () => {
          router.push({
            name: 'register-payments',
          });
        },
      },
    ]
  },
  {
    label: 'To Do',
    icon: 'pi pi-server',
    command: () => {
      router.push({
        name: 'todo-list',
      });
    },
  }
]);
</script>