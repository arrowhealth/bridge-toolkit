import { reactive } from "vue"

const state = reactive<{
  auth: any,
  config: any
}>({
  auth: [],
  config: null
})

const getConfig = async () => {
  const response = await fetch('config.json')
  state.config = await response.json()
  return state.config
}

const getAuth = async () => {
  const response = await fetch('auth.json')
  state.auth = await response.json()
  return state.auth
}

export const useConfigStore = () => {
  return {
    state,
    getAuth,
    getConfig,
  }
}