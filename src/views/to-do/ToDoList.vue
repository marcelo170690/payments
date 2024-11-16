<template>
  <div class="flex justify-center mt-20">
    <Message severity="success" large>
      <template #icon>
        <Avatar image="https://gravatar.com/avatar/10906e3b36db9a76baef6417aad51afe?s=400&d=robohash&r=x" shape="circle" />
      </template>
      <span class="ml-2">
        {{ text }}
      </span>
    </Message>
  </div>
</template>

<script setup>
import { Avatar, Message } from 'primevue';
const text = 'En desarrollo... </>'; 
</script>