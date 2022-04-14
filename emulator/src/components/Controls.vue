<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useBridgeStore } from '../store/bridge'
import { TileApp } from '../store/schema'
import { usePatientStore } from '../store/patient'
import { useConfigStore } from '../store/config'
import { useLocalStorage } from '@vueuse/core'

const bridgeStore = useBridgeStore()
const { state: configState, getAuth, getConfig } = useConfigStore()
const { state: patientState, getPatients } = usePatientStore()
const selectedAuth = ref()
const currentScreen = ref('setup')
const selectedId = useLocalStorage('emulator:auth_id', 'mock')

var selectedPatient = ref('')
watch(selectedPatient, (patient: any) => {
  bridgeStore.setPatient(patient || null)
})

const logout = () => {
  bridgeStore.logout()
  selectedPatient.value = ''
  currentScreen.value = 'setup'
}

const submit = async () => {
  const config = await getConfig()
  selectedId.value = selectedAuth.value.id
  // setup auth user
  if (selectedAuth.value.id === 'mock') {
    bridgeStore.setAuthUser(selectedAuth.value.data)
    config.apps.forEach((app: TileApp) => app.status = 'pass')
  } else if (selectedAuth.value.id === 'testuser') {
    bridgeStore.setUserSession(selectedAuth.value.data)
    config.apps.forEach((app: TileApp) => app.status = 'pending')
  } else if (selectedAuth.value.id === 'bridgeuser') {
    bridgeStore.setAuthUser(null)
    bridgeStore.setUserSession({ realm: 'emulator', username: selectedAuth.value.data.username })
    config.apps.forEach((app: TileApp) => app.status = 'pending')
  }

  const overrides = configState.config.overrides
  if (overrides?.accountUrl) bridgeStore.setAccountUrl(overrides.accountUrl)
  if (overrides?.apiUrl) bridgeStore.setApiUrl(overrides.apiUrl)
  if (overrides?.proxyUrl) bridgeStore.setProxyUrl(overrides.proxyUrl)

  bridgeStore.setConfig(config, { includeAccount: ['testuser', 'bridgeuser'].includes(selectedAuth.value.id) })
  bridgeStore.showBridge()
  currentScreen.value = 'bridge'
}

onMounted(async () => {
  bridgeStore.showVersion()
  await getAuth()
  await getPatients()

  const filteredAuthList = configState.auth.filter((auth: any) => auth.id === selectedId.value)
  selectedAuth.value = filteredAuthList.length ? filteredAuthList[0] : configState.auth[0]
})
</script>

<template>
  <div class="relative p-4 gap-5 grid">
    <div v-if="currentScreen === 'setup'" class="grid gap-5 p-8">
      <div class="text-xl">Authentication</div>
      <div v-if="configState.auth" class="flex flex-wrap items-center gap-5">
        <label v-for="auth in configState.auth">
          <input type="radio" name="authGroup" :value="auth" v-model="selectedAuth" />
          {{ auth.label }}
        </label>
      </div>
      <div v-if="selectedAuth">
        <strong>{{ selectedAuth.title }}</strong>
        <br />
        {{ selectedAuth.desc }}
      </div>
      <div v-if="selectedAuth && selectedAuth.id === 'bridgeuser'" class="flex flex-wrap gap-2">
        <a href="https://bridge.arrowhealth.io/login" target="bridge" class="text-blue-500 font-medium">
          Login to account
        </a>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <button class="btn" @click="submit">Run Bridge</button>
      </div>
    </div>

    <div v-else-if="currentScreen === 'bridge'" class="grid gap-5 p-8">
      <div class="text-xl">Patient</div>
      <div class="flex flex-wrap items-center gap-2">
        <select v-model="selectedPatient" class="px-2 p-1 border-2 border-gray-200 rounded">
          <option value>None</option>
          <option v-for="patient in patientState.patients" :value="patient">{{
            `${patient.id} - ${patient.first} ${patient.last}`
          }}</option>
        </select>
      </div>

      <div class="mt-6">
        <button v-if="currentScreen === 'bridge'" class="btn" @click="logout">Back to Setup</button>
      </div>
    </div>
  </div>
</template>