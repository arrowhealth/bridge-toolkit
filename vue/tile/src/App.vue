<script setup>
import { computed, onMounted, ref } from 'vue';
import * as bridge from '@arrowhealth/bridge-sdk'

const authUser = ref({})
const authStatus = ref({})
const patient = ref({})

const tileClass = computed(() => {
  if (patient.value) {
    return patient.value.id % 2 ? 'valid' : 'invalid'
  }
  return 'none'
})

const updateTile = () => {
  if (patient.value?.id === '4') {
    bridge.disableTile()
  } else {
    bridge.enableTile()
  }

  if (patient.value?.id === '2') {
    bridge.setBadgeCount(5)
  } else {
    bridge.setBadgeCount(0)
  }
}

const clickHandle = () => {
  alert('tile:click')
}

onMounted(() => {
  bridge.getAuthUser().then(v => authUser.value = v)
  bridge.getAuthStatus().then(v => authStatus.value = v)
  bridge.getPatient().then(v => {
    patient.value = v
    updateTile()
  })
  bridge.onPatientChanged(v => {
    patient.value = v
    updateTile()
  })
})
</script>

<template>
  <div class="tile" :class="tileClass" @click="clickHandle">
    <div v-if="patient?.id">{{ patient?.id }}</div>
    <img v-else width="20" height="20" src="data:image/svg+xml,%3Csvg width='25' height='32' viewBox='0 0 25 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.308 19.6925C6.8701 19.6925 2.46177 15.2841 2.46177 9.84627C2.46177 4.40833 6.87004 0 12.308 0C17.746 0 22.1543 4.40828 22.1543 9.84627C22.1543 15.284 17.746 19.6925 12.308 19.6925ZM12.308 20.9231C19.4583 20.9231 23.692 24.216 24.6034 30.5951C24.7095 31.3366 24.134 32 23.3852 32H1.23091C0.482056 32 -0.0934286 31.3366 0.0126283 30.5951C0.923998 24.2157 5.15748 20.9231 12.308 20.9231Z' fill='white'/%3E%3C/svg%3E%0A" alt="" srcset="">
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  font-weight: bold;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
}

.tile.valid {
  border-color: lime;
}

.tile.invalid {
  border-color: red;
}

.tile.none {
  border-color: aqua;
}
</style>
