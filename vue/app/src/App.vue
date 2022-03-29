<script setup>
import { onMounted, ref } from 'vue';
import * as bridge from '@arrowhealth/bridge-sdk'

const authUser = ref({})
const authStatus = ref({})
const patient = ref({})

onMounted(() => {
  bridge.getAuthUser().then(v => authUser.value = v)
  bridge.getAuthStatus().then(v => authStatus.value = v)
  bridge.getPatient().then(v => patient.value = v)
  bridge.onPatientChanged(v => patient.value = v)
})
</script>

<template>
  <h2>Bridge Starter (Vue)</h2>

  <div class="section">
    <div class="title">Bridge User</div>
    <pre><code>{{ JSON.stringify(authUser, null, 2) }}</code></pre>
  </div>

  <div class="section">
    <div class="title">Authentication Status</div>
    <div class="actions">
      <button @click="bridge.setAuthStatus('require')">Login Required</button>
      <button @click="bridge.setAuthStatus('fail')">Auth Failed</button>
      <button @click="bridge.setAuthStatus('pass')">Auth Passed</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Patient</div>
    <pre><code>{{ JSON.stringify(patient, null, 2) }}</code></pre>
  </div>

  <div class="section">
    <div class="title">Badge</div>
    <div class="actions">
      <button @click="bridge.setBadgeCount(0)">0</button>
      <button @click="bridge.setBadgeCount(9)">9</button>
      <button @click="bridge.setBadgeCount(99)">99</button>
      <button @click="bridge.setBadgeCount(999)">999</button>
      <button @click="bridge.setBadgeCount(9999)">9999</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Tile</div>
    <div class="actions">
      <button @click="bridge.showTile()">Show</button>
      <button @click="bridge.hideTile()">Hide</button>
      <button @click="bridge.enableTile()">Enable</button>
      <button @click="bridge.disableTile()">Disable</button>
      <button @click="bridge.captureUserEvents()">Capture User Events</button>
      <button @click="bridge.releaseUserEvents()">Release User Events</button>
    </div>
  </div>

  <div class="section">
    <div class="title">Application</div>
    <div class="actions">
      <button @click="bridge.closeApp()">Close App</button>
    </div>
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

.section {
  background-color: #f9f9f9;
  padding: 12px 20px;
  border-radius: 10px;
  margin-bottom: 18px;
}

.title {
  font-weight: bold;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
</style>
