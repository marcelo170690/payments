<template>
  <div class="text-center">
    <Image
      src="https://gravatar.com/avatar/0f7942083534622ab5f8af99d4837cf0?s=400&d=robohash&r=x"
      alt="Image"
      class="w-[250px] h-[250px] mx-auto"  
    />
    <br>
    <Button
      severity="primary"
      rounded
      size="large"
      @click="goServices"
      type="button"
    >
      <i class="pi pi-info-circle"></i>
      Dame CLICK caraspa!
    </Button>
  <div class="text-center">
</div>
</div>
</template>

<script setup>
import { Image, Button } from 'primevue';

import { useRouter } from 'vue-router'
const router = useRouter()

const goServices = () => {
  router.push({
    name: 'services',
  })
}
</script>
