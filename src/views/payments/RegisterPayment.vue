<template>
  <Toast />
  <div v-if="!showForm" class="card mt-10">
    <div class="flex flex-col items-center gap-4 mb-2">
      <InputText
        v-model="password"
        placeholder="Contraseña"
        class="w-1/2"
      />
      <Message v-if="passwordError" severity="error" size="small" variant="simple">
        * {{ passwordError }}
      </Message>
    </div>
    <div class="flex flex-col justify-center items-center">
      <Button
        severity="primary"
        label="Verificar"
        class="w-1/2"
        @click="verifyPassword"
      />
    </div>
  </div>
  <div v-else class="card flex justify-center">
    <Card style="width: 25rem;">
      <template #content>
        <div class="flex flex-col justify-center items-center gap-4 mb-2">
          <Select
            v-model="formPaymen.client"
            :options="clients"
            optionLabel="full_name"
            optionValue="$id"
            placeholder="Clientes"
            class="w-full md:w-56"
            :loading="loadingClients"
          />
          <transition-group v-if="errors.client.length > 0" name="p-message" tag="div" class="flex flex-col">
            <Message v-for="(msg, index) of errors.client" :key="`error-client-${index}`" severity="error" size="small" variant="simple">
              {{ msg.content }}
            </Message>
          </transition-group>
        </div>
        <div class="flex flex-col justify-center items-center gap-4 mb-2">
          <Select
            v-model="formPaymen.service"
            :options="services"
            optionLabel="title"
            optionValue="$id"
            placeholder="Servicios"
            class="w-full md:w-56"
            :loading="loadingPayments"
          />
          <transition-group v-if="errors.service.length > 0" name="p-message" tag="div" class="flex flex-col">
            <Message v-for="(msg, index) of errors.service" :key="`error-service-${index}`" severity="error" size="small" variant="simple">
              {{ msg.content }}
            </Message>
          </transition-group>
        </div>
        <div class="flex flex-col justify-center items-center gap-4 mb-2">
          <Select
            v-model="formPaymen.payment"
            :options="payments"
            optionLabel="title"
            optionValue="$id"
            placeholder="Pagos"
            class="w-full md:w-56"
          />
          <transition-group v-if="errors.payment.length > 0" name="p-message" tag="div" class="flex flex-col">
            <Message v-for="(msg, index) of errors.payment" :key="`error-payment-${index}`" severity="error" size="small" variant="simple">
              {{ msg.content }}
            </Message>
          </transition-group>
        </div>
        <div class="flex flex-col justify-center items-center gap-4 mb-2">
          <InputText
            v-model="formPaymen.amount"
            type="number"
            placeholder="Monto"
            class="w-full sm:w-56"
          />
          <transition-group v-if="errors.amount.length > 0" name="p-message" tag="div" class="flex flex-col">
            <Message v-for="(msg, index) of errors.amount" :key="`error-amount-${index}`" severity="error" size="small" variant="simple">
              {{ msg.content }}
            </Message>
          </transition-group>
        </div>
        <div class="flex flex-col justify-center items-center gap-4 mb-2">
          <Select
            v-model="formPaymen.description"
            :options="descriptions"
            optionLabel="desc"
            optionValue="desc"
            placeholder="Descripción"
            class="w-full md:w-56"
          />
          <!-- <Textarea
            v-model="formPaymen.description"
            type="text"
            placeholder="Descripción"
            class="w-full sm:w-56"
          /> -->
          <!-- <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">{{ errors.description }}</Message> -->
        </div>
        <div class="flex flex-col justify-center items-center gap-4 mb-2">
          <Button
            :loading="loading"
            loadingIcon="pi pi-spinner pi-spin"
            type="submit"
            severity="primary"
            label="Registrar"
            class="w-full sm:w-56"
            @click="storePayment"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  watch,
} from 'vue';
import { client, databases, ID } from '../../appwrite/config';
import { useToast } from 'primevue/usetoast';
// import Toast from 'primevue/toast';
import {
  Toast,
  InputText,
  Button,
  Fieldset,
  Textarea,
  Message,
  Select,
  Card,
} from 'primevue';

const toast = useToast();

const showForm = ref(false);
const password = ref(null);
const passwordError = ref(null);

const clients = ref([]);
const services = ref([]);
const payments = ref([]);
const descriptions = ref([
  {
    desc: 'Pago total',
  },
  {
    desc: 'Pago parcial',
  },
  {
    desc: 'Pago saldo',
  },
  {
    desc: 'Pago retrasado',
  },
  {
    desc: 'Pago pago adelantado',
  },
]);
const loading = ref(false);
const loadingClients = ref(false);
const loadingPayments = ref(false);

const formPaymen = reactive({
  client: '',
  service: '',
  payment: '',
  amount: 0,
  description: 'Pago total',
});
const errors = reactive({ 
  client: [],
  service: [],
  payment: [],
  amount: [],
  description: [],
});

const validateForm = () => {
  if (parseFloat(formPaymen.amount) <= 0) {
    errors.amount.push({ type: 'minimum', content: 'Monto deberia ser menor a 0'});
  }
  if (parseFloat(formPaymen.amount) > 9999999) {
    errors.amount.push({ type: 'minimum', content: 'Monto no deberia ser mayor a 9999999'});
  }
  if (!formPaymen.client) {
    errors.client.push({ type: 'required', content: 'Debe seleccionar un cliente' });
  }
  if (!formPaymen.service) {
    errors.service.push({ type: 'required', content: 'Debe seleccionar un servicio' });
  }
  if (!formPaymen.payment) {
    errors.payment.push({ type: 'required', content: 'Debe seleccionar un pago' });
  }

  for (let key in errors) {
    if (errors[key].length > 0) return false;
  }
  return true;
};

const resetErrors = () => {
  for (let key in errors) {
    errors[key] = [];
  }
}
const resetData = () => {
  formPaymen.client = '';
  formPaymen.service = '';
  formPaymen.payment = '';
  formPaymen.amount = 0;
  formPaymen.description = 'Pago total';
}

const getClients = async () => {
  // const oaw = oauthAppWrite;
  try {
    loadingClients.value = true;
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_CLIENTS_ID
    );
    clients.value = response.documents;
    loadingClients.value = false;
  } catch (error) {
    loadingClients.value = false;
    console.log(error);
  }
}

const getServices = async () => {
  try {
    loadingPayments.value = true;
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_SERVICES_ID
    );
    services.value = response.documents;
    loadingPayments.value = false;
  } catch (error) {
    loadingPayments.value = false;
    console.log(error);
  }
}

const storePayment = () => {
  resetErrors();
  const valid = validateForm();
  try {
    if (!valid) {
      toast.add({ severity: 'warn', summary: 'Datos Invalidos.', life: 3000 });
      return;
    }
    loading.value = true;
    const promise = databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_DETAILS_ID,
      ID.unique(),
      {
        amount: parseFloat(formPaymen.amount),
        client: formPaymen.client,
        payment: formPaymen.payment,
      }
    );

    promise.then(function (response) {
      loading.value = false;
      resetData();
      toast.add({ severity: 'success', summary: 'Se guardo el pago exitosamente.', life: 3000 });
    }, function (error) {
      loading.value = false;
      console.log(error);
      toast.add({ severity: 'error', summary: 'No se pudo guardar.', life: 3000 });
    });
  } catch (error) {
    console.log(error)
  }
}

const verifyPassword = () => {
  if (password.value !== 'marcelo@') {
    toast.add({ severity: 'warn', summary: 'Contraseña Inválida.', life: 3000 });
    return;
  }
  toast.add({ severity: 'success', summary: 'Contraseña Correcta.', life: 3000 });
  showForm.value = true;
  getClients();
  getServices();
}

watch(() => formPaymen.service, (service) => {
  if (service) {
    const indexService = services.value.findIndex(item => item.$id === service);
    if (indexService !== -1) {
      payments.value = services.value[indexService].payments;
      formPaymen.payment = '';
    }
  }
});

// onMounted(() => {
  
// })

</script>
