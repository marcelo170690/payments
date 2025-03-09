<template>
  <Tabs v-model:value="tabValue" scrollable>
    <TabList>
      <Tab
        v-for="(item, index) in [allOption, ...clients]"  
        :value="item.$id" as="div" class="flex items-center gap-2"
      >
        <Avatar
          :image="item.photo_url ? item.photo_url : 'https://gravatar.com/avatar/c3d22a2727cfc628268326ebc61f0598?s=400&d=robohash&r=x'"
          shape="circle"
        />
        <span class="font-bold whitespace-nowrap">{{ item.full_name }}</span>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel
        v-for="(item, index) in [allOption, ...clients]"
        :value="item.$id"
      >
        <Details
          :clients="clients"
          :client-id="item.$id"
          :details="details"
          :payments="payments"
        />
      </TabPanel>
      
    </TabPanels>
  </Tabs>
</template>

<script setup>
import Card from 'primevue/card';
import Button from 'primevue/button';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Avatar from 'primevue/avatar';
import { ref, onMounted } from 'vue';
import { databases, Query } from '../../appwrite/config';
// import { oauthAppWrite } from './api/oauth'
// components
import Details from './DetailPayments.vue';

const clients = ref([]);
const loading = ref(false);
const details = ref([]);
const payments = ref([]);
const tabValue = ref('0');

const getClients = async () => {
  // const oaw = oauthAppWrite;
  try {
    loading.value = true;
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_CLIENTS_ID
    );
    clients.value = response.documents;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
}

const getDetails = async () => {
  // const oaw = oauthAppWrite;
  try {
    loading.value = true;
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_DETAILS_ID,
      [
        Query.limit(100),
        Query.offset(0)
      ]
    );
    details.value = response.documents;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
}
const getPayments = async () => {
  try {
    loading.value = true;
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_PAYMENTS_ID,
    );
    payments.value = response.documents;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
}

onMounted(() => {
  getClients();
  getDetails();
  getPayments();
});

// import { computed } from 'vue'

const allOption = ref({
  full_name: 'TODOS',
  status: true,
  photo_url: 'https://gravatar.com/avatar/54179f521a96ed27d61c15121d31ae1f?s=400&d=robohash&r=x',
  $id: '0',
  $createdAt: "2024-11-06T02:52:05.791+00:00",
  $updatedAt: "2024-11-06T02:52:05.791+00:00",
  $permissions: [],
  $databaseId: "672ad95700261cb70729",
  $collectionId: "672ad9650023a7c2078e"
});
</script>

