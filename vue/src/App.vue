<script setup>
import { onMounted, ref } from 'vue';
import * as bridge from '@arrowhealth/bridge-sdk'

const authUser = ref({})
const appConfig = ref({})
const appStatus = ref({})
const patient = ref({})

onMounted(() => {
  bridge.getAuthUser().then(v => authUser.value = v)
  bridge.getAppStatus().then(v => appStatus.value = v)
  bridge.getPatientInfo().then(v => patient.value = v)
  bridge.onPatientChanged(v => patient.value = v)
})
</script>

<template>
  <h2>Bridge Starter (Vue)</h2>

  <strong>AUTH USER</strong>
  <pre><code>{{ JSON.stringify(authUser, null, 2) }}</code></pre>

  <hr />

  <strong>APP STATUS</strong>
  <pre><code>{{ JSON.stringify(appStatus, null, 2) }}</code></pre>

  <hr />

  <strong>PATIENT</strong>
  <pre><code>{{ JSON.stringify(patient, null, 2) }}</code></pre>

  <hr />

  <div class="container">
    <button @click="bridge.setBadgeCount(1)">Set Badge Count</button>
    <button @click="bridge.setBadgeCount(0)">Clear Badge Count</button>
  </div>

  <hr />

  <div class="container">
    <button @click="bridge.showTile()">Show Tile</button>
    <button @click="bridge.hideTile()">Hide Tile</button>
  </div>

  <hr />

  <div class="container">
    <button @click="bridge.closeApp()">Close App</button>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
</style>
