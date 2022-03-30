<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
import { useBridgeStore } from '../store/bridge'
import { TileApp } from '../store/schema'
import { usePatientStore } from '../store/patient'
import { useConfigStore } from '../store/config'

const bridgeStore = useBridgeStore()
const { state: configState, getAuthOptions, getConfig } = useConfigStore()
const { state: patientState, getPatients } = usePatientStore()
const selectedAuth = ref()
const collapseToolbar = ref(false)
const currentScreen = ref('setup')
const showPassword = ref(false)

bridgeStore.setAccountUrl('http://localhost:3000')
bridgeStore.setApiUrl('http://localhost:5000')

const userForm = reactive({
  realm: 'bridge',
  username: '',
  password: ''
})

watch(collapseToolbar, val => {
  if (val) bridgeStore.setToolbarMode('collapsed')
  else bridgeStore.setToolbarMode('full')
})

var selectedPatient = ref('')
watch(selectedPatient, (patient: any) => {
  bridgeStore.setPatient(patient || null)
})

const logout = () => {
  bridgeStore.logout()
  currentScreen.value = 'setup'
}

const submit = async () => {
  const config = await getConfig()
  // setup auth user
  if (selectedAuth.value.id === 'mock') {
    bridgeStore.setAuthUser(selectedAuth.value.data)
    config.apps.forEach((app: TileApp) => app.status = 'pass')
  } else if (selectedAuth.value.id === 'none') {
    bridgeStore.setAuthUser(null)
    config.apps.forEach((app: TileApp) => app.status = 'pass')
  } else if (selectedAuth.value.id === 'user') {
    bridgeStore.setUserSession(selectedAuth.value.data)
    config.apps.forEach((app: TileApp) => app.status = 'pending')
  } else if (selectedAuth.value.id === 'login') {
    bridgeStore.setAuthUser(null)
    const userSession = Object.assign({}, selectedAuth.value.data, {
      username: userForm.username,
      password: userForm.password
    })
    console.log(userSession)
    debugger
    bridgeStore.setUserSession(userSession)
    config.apps.forEach((app: TileApp) => app.status = 'pending')
  }


  bridgeStore.setConfig(config, { includeAccount: ['login', 'user'].includes(selectedAuth.value.id) })
  bridgeStore.showBridge()
  currentScreen.value = 'bridge'
}

onMounted(async () => {
  bridgeStore.showVersion()
  await getAuthOptions()
  await getPatients()

  selectedAuth.value = configState.authOptions[0]
})
</script>

<template>
  <div class="relative p-4 gap-5 grid">
    <div v-if="currentScreen === 'setup'" class="grid gap-5 p-8">
      <div class="text-xl">Authentication</div>
      <div v-if="configState.authOptions" class="flex flex-wrap items-center gap-5">
        <label v-for="authOpt in configState.authOptions">
          <input type="radio" name="authGroup" :value="authOpt" v-model="selectedAuth" />
          {{ authOpt.label }}
        </label>
      </div>
      <div v-if="selectedAuth">
        <strong>{{ selectedAuth.title }}</strong>
        <br />
        {{ selectedAuth.desc }}
      </div>
      <div v-if="selectedAuth && selectedAuth.id === 'login'" class="flex flex-wrap gap-2">
        <input name="username" placeholder="Email" class="textinput" v-model="userForm.username" />
        <input
          name="password"
          placeholder="Password"
          :type="showPassword ? 'text' : 'password'"
          class="textinput"
          v-model="userForm.password"
        />
        <button class="btn-icon" @click="showPassword = !showPassword">
          <div v-if="showPassword" class="i-tabler-eye-off"></div>
          <div v-else class="i-tabler-eye"></div>
        </button>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <button class="btn" @click="submit">Run Bridge</button>
      </div>
    </div>

    <div v-else-if="currentScreen === 'bridge'" class="grid gap-5 p-8">
      <div class="text-xl">Toolbar</div>

      <div class="flex flex-wrap gap-5">
        <label>
          <input type="checkbox" v-model="bridgeStore.state.openAuthAsPopout" />
          Popout Account
        </label>
        <label>
          <input type="checkbox" v-model="collapseToolbar" />
          Collapsed
        </label>
      </div>

      <div class="text-xl">Patient</div>
      <div class="flex flex-wrap items-center gap-2">
        <select v-model="selectedPatient" class="px-2 p-1 border-2 border-gray-200 rounded">
          <option value>None</option>
          <option
            v-for="patient in patientState.patients"
            :value="patient"
          >{{ `${patient.id} - ${patient.first} ${patient.last}` }}</option>
        </select>
      </div>

      <div class="mt-6">
        <button v-if="currentScreen === 'bridge'" class="btn" @click="logout">Back to Setup</button>
      </div>
    </div>
  </div>
</template>