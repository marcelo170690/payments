<template>
  <div v-for="item in detailsByClient">
    <h1 class="h-10 font-bold text-center ml-6 text-blue-600">{{ item.service }}</h1>
    <DataTable :value="item.details" stripedRows  scrollable scrollHeight="400px" tableStyle="min-width: 50rem">
      <Column field="payment" header="Titulo">
        <template #body="{ data }">
          {{ data.payment }}
          <i v-if="data.total_paid < data.total" class="pi pi-thumbs-down" style="font-size: 1rem"></i>
          <i v-else class="pi pi-face-smile" style="font-size: 1rem"></i>
        </template>
      </Column>
      <Column field="total" header="Total">
        <template #body="{ data }">
          <div class="font-bold">
            {{ (data.total).toFixed(2) }}
          </div>
        </template>
      </Column>
      <Column field="total_paid" header="Total Pagado">
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
});

const detailsByClient = computed(() => {
  let detailsByService = [];
  let totalClients = props.clients.length;
  let details = props.details;
  if (props.clientId !== '0') {
    details = props.details.filter(item => item.client.$id === props.clientId);
    totalClients = 1;
  }
  console.log(props.clientId);
  console.log(details);
  for (let index = 0; index < details.length; index++) {
    const element = details[index];
    const indexService = detailsByService.findIndex(item => item.id === element.payment.service.$id);
    if (indexService === -1) {
      detailsByService.push({
        id: element.payment.service.$id,
        service: element.payment.service.title,
        details: [{
          id: element.payment.$id,
          payment: element.payment.title,
          total: element.payment.amount * totalClients,
          total_paid: element.amount,
        }],
      });
      continue;
    }
    const indexPayment = detailsByService[indexService].details.findIndex(item => item.id === element.payment.$id);
    if (indexPayment === -1) {
      detailsByService[indexService].details.push({
        id: element.payment.$id,
        payment: element.payment.title,
        total: element.payment.amount * totalClients,
        total_paid: element.amount,
      });
      continue;
    }
    const oldTotalPaid = detailsByService[indexService].details[indexPayment].total_paid;
    const newTotalPaid = element.amount;
    const oldElement = detailsByService[indexService].details[indexPayment];
    oldElement['total_paid'] = oldTotalPaid + newTotalPaid;
    detailsByService[indexService].details[indexPayment] = oldElement;
  }
  return detailsByService;
})

</script>