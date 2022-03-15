<script setup>
import { onMounted, ref } from 'vue';
import * as bridge from '@arrowhealth/bridge-sdk'

const patient = ref({})
const session

onMounted(async () => {
  patient.value = await bridge.getPatientInfo()
  bridge.onPatientChanged(patientInfo => patient.value = patientInfo)
})
</script>

<template>
  <h2>Bridge Starter (Vue)</h2>
  <strong>PATIENT INFO</strong>
  <pre><code>{{JSON.stringify(patient, null, 2)}}</code></pre>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
