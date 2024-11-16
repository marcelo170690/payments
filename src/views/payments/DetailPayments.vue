<template>
  <div v-for="item in detailsByClient">
    <h1 class="h-10 font-bold text-center ml-6 text-blue-600">{{ item.service }}</h1>
    <DataTable :value="item.payments" stripedRows  scrollable scrollHeight="400px">
      <Column field="payment" header="Titulo">
        <template #body="{ data }">
          {{ data.payment }}
          <i v-if="data.total_paid < data.total" class="pi pi-thumbs-down" style="font-size: 1rem"></i>
          <i v-else class="pi pi-face-smile" style="font-size: 1rem"></i>
        </template>
      </Column>
      <Column field="total" header="Costo">
        <template #body="{ data }">
          <div class="font-bold">
            {{ (data.total).toFixed(2) }}
          </div>
        </template>
      </Column>
      <Column field="total_paid" header="Pagado">
        <template #body="{ data }">
          <div :class="`font-bold ${data.total_paid < data.total ? 'text-red-600' : 'text-green-600'}`">
            {{ (data.total_paid).toFixed(2) }}
          </div>
        </template>
      </Column>
      <!-- <Column field="quantity" header="Quantity"></Column> -->
    </DataTable>
  </div>
</template>

<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';
// import Row from 'primevue/row';
import { defineProps, computed } from 'vue';
const props = defineProps({
  clientId: {
    type: String,
    default: 0,
    required: true,
  },
  details: {
    type: Array,
    default: () => [],
    required: true,
  },
  clients: {
    type: Array,
    default: () => [],
    required: true,
  },
  payments: {
    type: Array,
    default: () => [],
    required: true,
  },
});

const detailsByClient = computed(() => {
  let detailsByService = [];
  let totalClients = props.clients.length;

  let details = props.details;
  if (props.clientId !== '0') {
    details = props.details.filter(item => item.client.$id === props.clientId);
    totalClients = 1;
  }

  for (let i = 0; i < props.payments.length; i++) {
    const elementPayment = props.payments[i];

    const detailsByPayment = details.filter(item => item.payment.$id === elementPayment.$id);
    if (detailsByPayment.length === 0) {
      detailsByPayment.push({
        // {
        //     "amount": 26,
        //     "$id": "672ae1120007a9db67cf",
        //     "$createdAt": "2024-11-06T03:22:57.152+00:00",
        //     "$updatedAt": "2024-11-06T03:22:57.152+00:00",
        //     "$permissions": [],
        //     "client": '',
        //     "payment": ''
        //     "$databaseId": "672ad95700261cb70729",
        //     "$collectionId": "672add8800111e03063a"
        // }
        amount: 0,
        payment: elementPayment,
      });
    }

    const indexService = detailsByService.findIndex(item => item.id === elementPayment.service.$id);
    
    if (indexService === -1) {
      detailsByService.push({
        id: elementPayment.service.$id,
        service: elementPayment.service.title,
        payments: [{
          id: elementPayment.$id,
          payment: elementPayment.title,
          total: elementPayment.amount * totalClients,
          total_paid: 0,
        }],
      });
    }
    for (let j = 0; j < detailsByPayment.length; j++) {
      const element = detailsByPayment[j];
      const indexService = detailsByService.findIndex(item => item.id === element.payment.service.$id);
      if (indexService === -1) {
        detailsByService.push({
          id: element.payment.service.$id,
          service: element.payment.service.title,
          payments: [{
            id: element.payment.$id,
            payment: element.payment.title,
            total: element.payment.amount * totalClients,
            total_paid: element.amount,
          }],
        });
        continue;
      }
      const indexPayment = detailsByService[indexService].payments.findIndex(item => item.id === element.payment.$id);
      if (indexPayment === -1) {
        detailsByService[indexService].payments.push({
          id: element.payment.$id,
          payment: element.payment.title,
          total: element.payment.amount * totalClients,
          total_paid: element.amount,
        });
        continue;
      }
      const oldTotalPaid = detailsByService[indexService].payments[indexPayment].total_paid;
      const newTotalPaid = element.amount;
      const oldElement = detailsByService[indexService].payments[indexPayment];
      oldElement['total_paid'] = oldTotalPaid + newTotalPaid;
      detailsByService[indexService].payments[indexPayment] = oldElement;
    } 
  };

  return detailsByService;
})

</script>