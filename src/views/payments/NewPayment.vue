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
            v-model="formPaymen.service"
            :options="services"
            optionLabel="title"
            optionValue="$id"
            placeholder="Services"
            class="w-full md:w-56"
            :loading="loadingServices"
          />
          <transition-group v-if="errors.service.length > 0" name="p-message" tag="div" class="flex flex-col">
            <Message v-for="(msg, index) of errors.service" :key="`error-service-${index}`" severity="error" size="small" variant="simple">
              {{ msg.content }}
            </Message>
          </transition-group>
        </div>
        <div class="flex flex-col justify-center items-center gap-4 mb-2">
          <InputText
            v-model="formPaymen.payment"
            placeholder="Título Pago"
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
            placeholder="Monto del Pago"
            class="w-full md:w-56"
            type="number"
          />
          <transition-group v-if="errors.amount.length > 0" name="p-message" tag="div" class="flex flex-col">
            <Message v-for="(msg, index) of errors.amount" :key="`error-amount-${index}`" severity="error" size="small" variant="simple">
              {{ msg.content }}
            </Message>
          </transition-group>
        </div>
        <div class="flex flex-col justify-center items-center gap-4 mb-2">
          <Button
            :loading="loading"
            loadingIcon="pi pi-spinner pi-spin"
            type="submit"
            severity="primary"
            label="Registrar"
            class="w-full md:w-56"
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

const services = ref([]);
const loading = ref(false);
const loadingServices = ref(false);
const loadingPayment = ref(false);

const formPaymen = reactive({
  service: '',
  payment: '',
  amount: 0,
});
const errors = reactive({ 
  service: [],
  payment: [],
  amount: [],
});

const validateForm = () => {
  console.log(formPaymen)
  if (!formPaymen.service) {
    errors.service.push({ type: 'required', content: 'Debe seleccionar un servicio' });
  }
  if (!formPaymen.payment) {
    errors.payment.push({ type: 'required', content: 'Debe agregar un titulo para el pago' });
  }
  if ((formPaymen.payment).length <= 5 && (formPaymen.payment).length >= 30) {
    errors.amount.push({ type: 'minimum', content: 'Debe agregar un titulo entre 5 y 30 caracteres'});
  }
  if (parseFloat(formPaymen.amount) < 0) {
    errors.amount.push({ type: 'minimum', content: 'El monto debe ser mayor a 0'});
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
  formPaymen.service = '';
  formPaymen.payment = '';
  formPaymen.amount = 0;
}

const getServices = async () => {
  try {
    loadingServices.value = true;
    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_SERVICES_ID
    );
    console.log(response.documents)
    services.value = response.documents;
    loadingServices.value = false;
  } catch (error) {
    loadingServices.value = false;
    console.log(error);
  }
}

const storePayment = async () => {
  resetErrors();
  const valid = validateForm();
  try {
    if (!valid) {
      toast.add({ severity: 'warn', summary: 'Datos Invalidos.', life: 3000 });
      return;
    }
    loading.value = true;
    
    const response = await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_PAYMENTS_ID,
      ID.unique(),
      {
        service: formPaymen.service,
        title: formPaymen.payment,
        status: true,
        amount: parseFloat(formPaymen.amount),
        currency: 'BOB'
      }
    );
    console.log(response);
    resetData();
    toast.add({ severity: 'success', summary: 'Se guardo el pago exitosamente.', life: 3000 });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
    toast.add({ severity: 'error', summary: 'No se pudo guardar.', life: 3000 });
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
  getServices();
}

</script>
